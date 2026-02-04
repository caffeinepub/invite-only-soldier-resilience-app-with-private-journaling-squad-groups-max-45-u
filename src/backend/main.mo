import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // system state init
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Constants
  let maxUsers = 45;
  let globalInviteCode : Text = "bootcamp2024";
  let inviteCodeExpiration : Time.Time = 259200000;
  let maxGroupMembers = 45;
  let memberInviteCodeLength = 6;

  public type Report = {
    id : Nat;
    reporter : Principal;
    reportedEntry : ?Nat;
    reportedUser : ?Principal;
    reason : Text;
    details : ?Text;
    status : ReportStatus;
    timestamp : Time.Time;
  };

  public type ReportStatus = {
    #open;
    #inReview;
    #resolved;
  };

  public type Journaling = {
    id : Nat;
    author : Principal;
    title : Text;
    content : Text;
    isShared : Bool;
    squadGroup : ?Nat;
    timestamp : Time.Time;
  };

  public type SquadGroup = {
    id : Nat;
    name : Text;
    owner : Principal;
    members : [Principal];
    createdAt : Time.Time;
    inviteCode : Text;
    inviteCreatedAt : Time.Time;
  };

  type JournalEntryId = Nat;
  type MemberId = Principal;

  public type DisclaimerStatus = {
    accepted : Bool;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    username : Text;
    joinedAt : Time.Time;
    inviteCode : Text;
    disclaimerStatus : ?DisclaimerStatus;
  };

  module UserProfile {
    public type UserProfile = {
      username : Text;
      joinedAt : Time.Time;
      inviteCode : Text;
      disclaimerStatus : ?DisclaimerStatus;
    };

    public func compare(u1 : UserProfile, u2 : UserProfile) : Order.Order {
      Text.compare(u1.username, u2.username);
    };

    public func compareByJoinTime(u1 : UserProfile, u2 : UserProfile) : Order.Order {
      let joinedAt1 = u1.joinedAt.toNat();
      let joinedAt2 = u2.joinedAt.toNat();
      Nat.compare(joinedAt1, joinedAt2);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let journalEntries = Map.empty<Nat, Journaling>();
  var entryCounter = 0;
  let squadGroups = Map.empty<Nat, SquadGroup>();
  var squadCounter = 0;

  let reports = Map.empty<Nat, Report>();
  var reportCounter = 0;

  let usedInviteCodes = Map.empty<Text, Bool>();

  // Helper functions
  func isUserRegistered(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.disclaimerStatus) {
          case (?status) { status.accepted };
          case (null) { false };
        };
      };
      case (null) { false };
    };
  };

  func isGroupMember(caller : Principal, squadId : Nat) : Bool {
    switch (squadGroups.get(squadId)) {
      case (?group) {
        group.members.find(func(m) { m == caller }) != null;
      };
      case (null) { false };
    };
  };

  func isGroupOwner(caller : Principal, squadId : Nat) : Bool {
    switch (squadGroups.get(squadId)) {
      case (?group) { group.owner == caller };
      case (null) { false };
    };
  };

  // User Profile Management (Required by frontend)

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Invitation System

  public query ({ caller }) func getGlobalInviteCode() : async Text {
    // Anyone can view the invite code (guests included)
    if (userProfiles.size() >= maxUsers) {
      Runtime.trap("Maximum number of users reached");
    };
    globalInviteCode;
  };

  public shared ({ caller }) func acceptInvite(username : Text, inviteCode : Text) : async () {
    // No auth check - this is the registration endpoint
    if (userProfiles.size() >= maxUsers) {
      Runtime.trap("Maximum number of users reached");
    };

    switch (userProfiles.get(caller)) {
      case (?_) { Runtime.trap("User already registered") };
      case (null) {
        if (inviteCode != globalInviteCode) {
          Runtime.trap("Invalid invite code");
        };

        // Check username uniqueness
        let existingUsernames = userProfiles.entries().map(
          func((_, profile)) { profile.username }
        ).toArray();
        if (existingUsernames.find(func(u) { u == username }) != null) {
          Runtime.trap("Username already taken");
        };

        let profile : UserProfile = {
          username;
          joinedAt = Time.now();
          inviteCode;
          disclaimerStatus = null;
        };

        userProfiles.add(caller, profile);
        // Assign user role after registration
        AccessControl.assignRole(accessControlState, caller, caller, #user);
      };
    };
  };

  public shared ({ caller }) func acceptDisclaimer() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can accept disclaimer");
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile = {
          username = profile.username;
          joinedAt = profile.joinedAt;
          inviteCode = profile.inviteCode;
          disclaimerStatus = ?{
            accepted = true;
            timestamp = Time.now();
          };
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) { Runtime.trap("User not registered") };
    };
  };

  // Squad Groups

  public query ({ caller }) func getSquadGroup(squadId : Nat) : async ?SquadGroup {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view squad groups");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Only group members can view group details
    if (not isGroupMember(caller, squadId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only group members can view group details");
    };

    squadGroups.get(squadId);
  };

  public query ({ caller }) func getSquadMembers(squadId : Nat) : async [UserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view squad members");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Only group members can view member list
    if (not isGroupMember(caller, squadId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only group members can view members list");
    };

    let group = switch (squadGroups.get(squadId)) {
      case (?group) { group };
      case (null) { Runtime.trap("Squad group does not exist") };
    };

    group.members.map(
      func(userId) {
        switch (userProfiles.get(userId)) {
          case (?profile) { profile };
          case (null) { Runtime.trap("User not found") };
        };
      }
    );
  };

  public shared ({ caller }) func createSquadGroup(name : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create squad groups");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    squadCounter += 1;
    let newGroup : SquadGroup = {
      id = squadCounter;
      name;
      owner = caller;
      members = [caller];
      createdAt = Time.now();
      inviteCode = generateInviteCode(squadCounter);
      inviteCreatedAt = Time.now();
    };
    squadGroups.add(squadCounter, newGroup);
    squadCounter;
  };

  public shared ({ caller }) func joinSquadGroup(inviteCode : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can join squad groups");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Find group by invite code
    var foundGroup : ?SquadGroup = null;
    for ((id, group) in squadGroups.entries()) {
      if (group.inviteCode == inviteCode) {
        foundGroup := ?group;
      };
    };

    let group = switch (foundGroup) {
      case (?g) { g };
      case (null) { Runtime.trap("Invalid invite code") };
    };

    // Check if already a member
    if (group.members.find(func(m) { m == caller }) != null) {
      Runtime.trap("Already a member of this group");
    };

    // Check group capacity
    if (group.members.size() >= maxGroupMembers) {
      Runtime.trap("Group is full");
    };

    let updatedMembers = group.members.concat([caller]);
    let updatedGroup = {
      id = group.id;
      name = group.name;
      owner = group.owner;
      members = updatedMembers;
      createdAt = group.createdAt;
      inviteCode = group.inviteCode;
      inviteCreatedAt = group.inviteCreatedAt;
    };
    squadGroups.add(group.id, updatedGroup);
    group.id;
  };

  public shared ({ caller }) func leaveSquadGroup(squadId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can leave squad groups");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    let group = switch (squadGroups.get(squadId)) {
      case (?g) { g };
      case (null) { Runtime.trap("Squad group does not exist") };
    };

    if (not isGroupMember(caller, squadId)) {
      Runtime.trap("Not a member of this group");
    };

    if (group.owner == caller) {
      Runtime.trap("Owner cannot leave the group. Transfer ownership first or delete the group.");
    };

    let updatedMembers = group.members.filter(func(m) { m != caller });
    let updatedGroup = {
      id = group.id;
      name = group.name;
      owner = group.owner;
      members = updatedMembers;
      createdAt = group.createdAt;
      inviteCode = group.inviteCode;
      inviteCreatedAt = group.inviteCreatedAt;
    };
    squadGroups.add(squadId, updatedGroup);
  };

  public shared ({ caller }) func rotateSquadInviteCode(squadId : Nat) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can rotate invite codes");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Only group owner can rotate invite code
    if (not isGroupOwner(caller, squadId)) {
      Runtime.trap("Unauthorized: Only group owner can rotate invite code");
    };

    let group = switch (squadGroups.get(squadId)) {
      case (?g) { g };
      case (null) { Runtime.trap("Squad group does not exist") };
    };

    let squadIdNat = squadId.toNat();
    let newInviteCode = generateInviteCode(squadIdNat);
    let updatedGroup = {
      id = group.id;
      name = group.name;
      owner = group.owner;
      members = group.members;
      createdAt = group.createdAt;
      inviteCode = newInviteCode;
      inviteCreatedAt = Time.now();
    };
    squadGroups.add(squadId, updatedGroup);
    newInviteCode;
  };

  // Journaling and Reflection

  public shared ({ caller }) func addJournaling(title : Text, content : Text, isShared : Bool, squadGroup : ?Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create journal entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // If sharing to a group, verify membership
    switch (squadGroup) {
      case (?groupId) {
        if (not isGroupMember(caller, groupId)) {
          Runtime.trap("Unauthorized: Can only share to groups you are a member of");
        };
      };
      case (null) {};
    };

    entryCounter += 1;
    let newEntry : Journaling = {
      id = entryCounter;
      author = caller;
      title;
      content;
      isShared;
      squadGroup;
      timestamp = Time.now();
    };
    journalEntries.add(entryCounter, newEntry);
    entryCounter;
  };

  public query ({ caller }) func getJournaling(entryId : Nat) : async ?Journaling {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    let entry = switch (journalEntries.get(entryId)) {
      case (?e) { e };
      case (null) { return null };
    };

    // Author can always view their own entries
    if (entry.author == caller) {
      return ?entry;
    };

    // For shared entries, verify group membership
    if (entry.isShared) {
      switch (entry.squadGroup) {
        case (?groupId) {
          if (isGroupMember(caller, groupId) or AccessControl.isAdmin(accessControlState, caller)) {
            return ?entry;
          };
        };
        case (null) {};
      };
    };

    // Admins can view all entries
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return ?entry;
    };

    Runtime.trap("Unauthorized: Cannot view this entry");
  };

  public query ({ caller }) func getMyJournalEntries() : async [Journaling] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    journalEntries.values().toArray().filter(
      func(entry) { entry.author == caller }
    );
  };

  public query ({ caller }) func getSharedSquadEntries(squadId : Nat) : async [Journaling] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view shared entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Only group members can view shared entries
    if (not isGroupMember(caller, squadId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only group members can view shared entries");
    };

    journalEntries.values().toArray().filter(
      func(entry) {
        switch (entry.squadGroup) {
          case (?groupId) {
            groupId == squadId and entry.isShared;
          };
          case (null) { false };
        };
      }
    );
  };

  public shared ({ caller }) func updateJournaling(entryId : Nat, title : Text, content : Text, isShared : Bool, squadGroup : ?Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update journal entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    let entry = switch (journalEntries.get(entryId)) {
      case (?e) { e };
      case (null) { Runtime.trap("Entry not found") };
    };

    // Only author can update their entry
    if (entry.author != caller) {
      Runtime.trap("Unauthorized: Can only update your own entries");
    };

    // If sharing to a group, verify membership
    switch (squadGroup) {
      case (?groupId) {
        if (not isGroupMember(caller, groupId)) {
          Runtime.trap("Unauthorized: Can only share to groups you are a member of");
        };
      };
      case (null) {};
    };

    let updatedEntry = {
      id = entry.id;
      author = entry.author;
      title;
      content;
      isShared;
      squadGroup;
      timestamp = entry.timestamp;
    };
    journalEntries.add(entryId, updatedEntry);
  };

  public shared ({ caller }) func deleteJournaling(entryId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete journal entries");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    let entry = switch (journalEntries.get(entryId)) {
      case (?e) { e };
      case (null) { Runtime.trap("Entry not found") };
    };

    // Only author can delete their entry (or admin)
    if (entry.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only delete your own entries");
    };

    journalEntries.remove(entryId);
  };

  // Community Guidelines

  public query ({ caller }) func getGuidelines() : async Text {
    // Anyone can view guidelines (including guests)
    "Community Guidelines: Be respectful, constructive, and positive. Violations may result in action.";
  };

  // Reporting System

  public shared ({ caller }) func reportAbuse(reportedEntry : ?Nat, reportedUser : ?Principal, reason : Text, details : ?Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can report abuse");
    };
    if (not isUserRegistered(caller)) {
      Runtime.trap("Unauthorized: Must complete onboarding first");
    };

    // Verify that reported entry exists and is shared in a group the reporter is in
    switch (reportedEntry) {
      case (?entryId) {
        let entry = switch (journalEntries.get(entryId)) {
          case (?e) { e };
          case (null) { Runtime.trap("Reported entry does not exist") };
        };

        if (not entry.isShared) {
          Runtime.trap("Can only report shared entries");
        };

        switch (entry.squadGroup) {
          case (?groupId) {
            if (not isGroupMember(caller, groupId)) {
              Runtime.trap("Can only report entries in groups you are a member of");
            };
          };
          case (null) { Runtime.trap("Entry is not shared in a group") };
        };
      };
      case (null) {};
    };

    // Verify that reported user exists and is in a shared group with reporter
    switch (reportedUser) {
      case (?userId) {
        if (not userProfiles.containsKey(userId)) {
          Runtime.trap("Reported user does not exist");
        };

        // Verify they share at least one group
        var sharesGroup = false;
        for ((_, group) in squadGroups.entries()) {
          if (isGroupMember(caller, group.id) and isGroupMember(userId, group.id)) {
            sharesGroup := true;
          };
        };

        if (not sharesGroup) {
          Runtime.trap("Can only report users in groups you share");
        };
      };
      case (null) {};
    };

    reportCounter += 1;

    let newReport : Report = {
      id = reportCounter;
      reporter = caller;
      reportedEntry;
      reportedUser;
      reason;
      details;
      status = #open;
      timestamp = Time.now();
    };

    reports.add(reportCounter, newReport);
    reportCounter;
  };

  public query ({ caller }) func getAllReports() : async [Report] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all reports");
    };

    reports.values().toArray();
  };

  public query ({ caller }) func getReport(reportId : Nat) : async ?Report {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reports");
    };

    reports.get(reportId);
  };

  public shared ({ caller }) func updateReportStatus(reportId : Nat, status : ReportStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update report status");
    };

    let report = switch (reports.get(reportId)) {
      case (?r) { r };
      case (null) { Runtime.trap("Report not found") };
    };

    let updatedReport = {
      id = report.id;
      reporter = report.reporter;
      reportedEntry = report.reportedEntry;
      reportedUser = report.reportedUser;
      reason = report.reason;
      details = report.details;
      status;
      timestamp = report.timestamp;
    };

    reports.add(reportId, updatedReport);
  };

  // Helper function to generate invite codes
  func generateInviteCode(seed : Nat) : Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var code = "";
    var s = seed;
    for (i in Nat.range(0, memberInviteCodeLength - 1)) {
      let index = s % 36;
      s := s / 36;
      code #= Text.fromChar(chars.chars().toArray()[index]);
    };
    code;
  };
};
