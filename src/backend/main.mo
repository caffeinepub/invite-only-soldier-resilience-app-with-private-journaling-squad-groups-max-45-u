import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let liveLink = "https://wgn6m-hiaaa-aaaaj-acuza-cai.icp0.io/";

  // Types
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

  public type DailyInput = {
    sleepScore : Nat;
    trainingLoadScore : Nat;
    stressScore : Nat;
    painScore : Nat;
    overallScore : Nat;
    explanations : Text;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    username : Text;
    joinedAt : Time.Time;
    inviteCode : Text;
    disclaimerStatus : ?DisclaimerStatus;
  };

  public type DisclaimerStatus = {
    accepted : Bool;
    timestamp : Time.Time;
  };

  public type ReadinessState = {
    streakCount : Nat;
    highReadinessDays : Nat;
    totalInputs : Nat;
    lastInputTimestamp : Time.Time;
  };

  // Storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let dailyInputs = Map.empty<Principal, [DailyInput]>();
  let readinessStates = Map.empty<Principal, ReadinessState>();
  let journalEntries = Map.empty<Nat, Journaling>();
  let squadGroups = Map.empty<Nat, SquadGroup>();
  let reports = Map.empty<Nat, Report>();

  var nextJournalId : Nat = 0;
  var nextSquadId : Nat = 0;
  var nextReportId : Nat = 0;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
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

  // Daily Input Functions
  public shared ({ caller }) func submitDailyInput(input : DailyInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit daily inputs");
    };

    let userInputs = switch (dailyInputs.get(caller)) {
      case null { [] };
      case (?inputs) { inputs };
    };

    let newInputs = userInputs.concat([input]);
    dailyInputs.add(caller, newInputs);
  };

  public query ({ caller }) func getCallerDailyInputs() : async [DailyInput] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view daily inputs");
    };

    switch (dailyInputs.get(caller)) {
      case null { [] };
      case (?inputs) { inputs };
    };
  };

  public query ({ caller }) func getUserDailyInputs(user : Principal) : async [DailyInput] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own daily inputs");
    };

    switch (dailyInputs.get(user)) {
      case null { [] };
      case (?inputs) { inputs };
    };
  };

  // Readiness State Functions
  public query ({ caller }) func getCallerReadinessState() : async ?ReadinessState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view readiness state");
    };
    readinessStates.get(caller);
  };

  public shared ({ caller }) func updateCallerReadinessState(state : ReadinessState) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update readiness state");
    };
    readinessStates.add(caller, state);
  };

  // Journal Entry Functions
  public shared ({ caller }) func createJournalEntry(entry : { title : Text; content : Text; isShared : Bool; squadGroup : ?Nat }) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create journal entries");
    };

    let id = nextJournalId;
    nextJournalId += 1;

    let newEntry : Journaling = {
      id = id;
      author = caller;
      title = entry.title;
      content = entry.content;
      isShared = entry.isShared;
      squadGroup = entry.squadGroup;
      timestamp = Time.now();
    };

    journalEntries.add(id, newEntry);
    id;
  };

  public query ({ caller }) func getJournalEntry(id : Nat) : async ?Journaling {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };

    switch (journalEntries.get(id)) {
      case null { null };
      case (?entry) {
        if (entry.author == caller or entry.isShared or AccessControl.isAdmin(accessControlState, caller)) {
          ?entry;
        } else {
          Runtime.trap("Unauthorized: Cannot view private journal entry");
        };
      };
    };
  };

  public query ({ caller }) func getCallerJournalEntries() : async [Journaling] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };

    let entries = journalEntries.values().toArray();
    entries.filter(func(entry : Journaling) : Bool { entry.author == caller });
  };

  // Squad Group Functions
  public shared ({ caller }) func createSquadGroup(name : Text, inviteCode : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create squad groups");
    };

    let id = nextSquadId;
    nextSquadId += 1;

    let newGroup : SquadGroup = {
      id = id;
      name = name;
      owner = caller;
      members = [caller];
      createdAt = Time.now();
      inviteCode = inviteCode;
      inviteCreatedAt = Time.now();
    };

    squadGroups.add(id, newGroup);
    id;
  };

  public query ({ caller }) func getSquadGroup(id : Nat) : async ?SquadGroup {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view squad groups");
    };

    switch (squadGroups.get(id)) {
      case null { null };
      case (?group) {
        let isMember = group.members.find(func(member : Principal) : Bool { member == caller });
        if (isMember != null or AccessControl.isAdmin(accessControlState, caller)) {
          ?group;
        } else {
          Runtime.trap("Unauthorized: Not a member of this squad group");
        };
      };
    };
  };

  public shared ({ caller }) func joinSquadGroup(id : Nat, inviteCode : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can join squad groups");
    };

    switch (squadGroups.get(id)) {
      case null { Runtime.trap("Squad group not found"); };
      case (?group) {
        if (group.inviteCode != inviteCode) {
          Runtime.trap("Invalid invite code");
        };

        let isMember = group.members.find(func(member : Principal) : Bool { member == caller });
        if (isMember != null) {
          Runtime.trap("Already a member of this squad group");
        };

        let updatedGroup = {
          id = group.id;
          name = group.name;
          owner = group.owner;
          members = group.members.concat([caller]);
          createdAt = group.createdAt;
          inviteCode = group.inviteCode;
          inviteCreatedAt = group.inviteCreatedAt;
        };

        squadGroups.add(id, updatedGroup);
      };
    };
  };

  // Report Functions
  public shared ({ caller }) func createReport(reportedEntry : ?Nat, reportedUser : ?Principal, reason : Text, details : ?Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create reports");
    };

    let id = nextReportId;
    nextReportId += 1;

    let newReport : Report = {
      id = id;
      reporter = caller;
      reportedEntry = reportedEntry;
      reportedUser = reportedUser;
      reason = reason;
      details = details;
      status = #open;
      timestamp = Time.now();
    };

    reports.add(id, newReport);
    id;
  };

  public query ({ caller }) func getReport(id : Nat) : async ?Report {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reports");
    };
    reports.get(id);
  };

  public query ({ caller }) func getAllReports() : async [Report] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all reports");
    };
    reports.values().toArray();
  };

  public shared ({ caller }) func updateReportStatus(id : Nat, status : ReportStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update report status");
    };

    switch (reports.get(id)) {
      case null { Runtime.trap("Report not found"); };
      case (?report) {
        let updatedReport = {
          id = report.id;
          reporter = report.reporter;
          reportedEntry = report.reportedEntry;
          reportedUser = report.reportedUser;
          reason = report.reason;
          details = report.details;
          status = status;
          timestamp = report.timestamp;
        };
        reports.add(id, updatedReport);
      };
    };
  };

  // Live Link
  public query func getLiveLink() : async Text {
    liveLink;
  };
};
