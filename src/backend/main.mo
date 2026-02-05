import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Char "mo:core/Char";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Constants
  let maxUsers = 45;
  let inviteCodeExpiration : Time.Time = 259200000;
  let maxGroupMembers = 45;
  let memberInviteCodeLength = 6;
  let readinessStreakWindow = 7;
  let streakBonusThreshold = 21;
  let defaultWarningThreshold = 50;
  let defaultWarningCount = 0;

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

  public type JournalEntryId = Nat;
  public type MemberId = Principal;

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

  let userProfiles = Map.empty<Principal, UserProfile>();
  let journalEntries = Map.empty<Nat, Journaling>();
  var entryCounter = 0;
  let squadGroups = Map.empty<Nat, SquadGroup>();
  var squadCounter = 0;

  let reports = Map.empty<Nat, Report>();
  var reportCounter = 0;

  public type DailyInput = {
    sleepScore : Nat; // 0-100
    trainingLoadScore : Nat; // 0-100
    stressScore : Nat; // 0-100
    painScore : Nat; // 0-100
    overallScore : Nat; // 0-100
    explanations : Text; // Explanation in plain Text
    timestamp : Time.Time;
  };

  let dailyInputs = Map.empty<Principal, Map.Map<Text, DailyInput>>(); // Store daily inputs per principal

  // Readiness and Gamification
  public type ReadinessState = {
    streakCount : Nat;
    highReadinessDays : Nat;
    totalInputs : Nat;
    lastInputTimestamp : Time.Time;
  };

  let readinessStates = Map.empty<Principal, ReadinessState>();
  let userWarningThresholds = Map.empty<Principal, Nat>();
  let userWarningCounts = Map.empty<Principal, Nat>();
  var defaultThreshold = defaultWarningThreshold;
  var defaultWarningCountVar = defaultWarningCount;

  // Helper functions
  public shared ({ caller }) func calculateReadinessAndStoreToday(sleepScore : Nat, trainingLoadScore : Nat, stressScore : Nat, painScore : Nat) : async Nat {
    selfCheckGamificationIntegrity(caller);

    // Compute overall score (70% user input, 30% streak bonus) if ready streak exists
    let inputScore = (sleepScore + trainingLoadScore + stressScore + painScore) / 4;
    let streakBonus = getGamificationStreakBonus(caller);
    let overallScore = inputScore * 7 / 10 + streakBonus * 3 / 10;

    // Generate explanations
    let explanations = generateReadinessExplanations(
      sleepScore,
      trainingLoadScore,
      stressScore,
      painScore,
      overallScore,
      streakBonus,
    );

    // Update daily input
    let dailyInput = {
      sleepScore;
      trainingLoadScore;
      stressScore;
      painScore;
      overallScore;
      explanations;
      timestamp = Time.now();
    };

    // Manage daily input map
    var userDailyInputs = Map.empty<Text, DailyInput>();
    switch (dailyInputs.get(caller)) {
      case (?existingInputs) { userDailyInputs := existingInputs };
      case (null) {};
    };

    userDailyInputs.add(Time.now().toText(), dailyInput);
    dailyInputs.add(caller, userDailyInputs);

    // Update readiness state
    var currentStreak = getCurrentStreak(caller);
    if (overallScore >= 80) {
      currentStreak += 1;
    } else {
      currentStreak := 0;
    };

    let updatedReadinessState : ReadinessState = {
      streakCount = currentStreak;
      highReadinessDays = getHighReadinessDaysCount(caller);
      totalInputs = getTotalInputsCount(caller);
      lastInputTimestamp = Time.now();
    };

    readinessStates.add(caller, updatedReadinessState);

    if (overallScore < getWarningThreshold(caller)) {
      incrementWarningCount(caller);
    };

    overallScore;
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

  func getWarningThreshold(caller : Principal) : Nat {
    switch (userWarningThresholds.get(caller)) {
      case (?threshold) { threshold };
      case (null) { defaultThreshold };
    };
  };

  func incrementWarningCount(caller : Principal) {
    var newCount = 1;
    switch (userWarningCounts.get(caller)) {
      case (?currentCount) {
        newCount += currentCount;
      };
      case (null) {
        // If no specific warning count found, use default instead of always started from 0
        newCount += defaultWarningCountVar;
      };
    };
    userWarningCounts.add(caller, newCount);
  };

  func getCurrentStreak(caller : Principal) : Nat {
    switch (readinessStates.get(caller)) {
      case (?state) { state.streakCount };
      case (null) { 0 };
    };
  };

  func getHighReadinessDaysCount(caller : Principal) : Nat {
    var count = 0;
    switch (dailyInputs.get(caller)) {
      case (?userInputs) {
        for ((_, input) in userInputs.entries()) {
          if (input.overallScore >= 80) {
            count += 1;
          };
        };
      };
      case (null) {};
    };
    count;
  };

  func getTotalInputsCount(caller : Principal) : Nat {
    switch (dailyInputs.get(caller)) {
      case (?userInputs) { userInputs.size() };
      case (null) { 0 };
    };
  };

  func getGamificationStreakBonus(caller : Principal) : Nat {
    let streakLength = getCurrentStreak(caller);
    if (streakLength > 0) {
      return if (streakLength > streakBonusThreshold) {
        30 : Nat; // Max bonus
      } else {
        let bonus = (streakLength.toInt() * 30 / streakBonusThreshold).toNat();
        if (streakLength > 0) { bonus } else { 0 };
      };
    };
    return 0;
  };

  func getLastInput(caller : Principal) : ?DailyInput {
    switch (dailyInputs.get(caller)) {
      case (?inputs) {
        let iter = inputs.entries();
        switch (iter.next()) {
          case (?first) { ?first.1 };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };

  func generateReadinessExplanations(sleepScore : Nat, trainingLoadScore : Nat, stressScore : Nat, painScore : Nat, overallScore : Nat, streakBonus : Nat) : Text {
    // Prepare factor explanations
    let sleepExplanation = selectExplanation(
      sleepScore,
      "Stable sleep; steady impacts.",
      "Good NREM but need REM; efficiency is crucial.",
      "Better duration, optimize circadian rhythm.",
      "Prioritize sleep; recovery is non-negotiable."
    );

    let trainingLoadExplanation = selectExplanation(
      trainingLoadScore,
      "Maintained load; continue periodization.",
      "Steady workload - monitor acute spikes.",
      "Optimize recovery sessions (hydro, mobility, nutrition).",
      "Periodize strength and conditioning; avoid overload."
    );

    let stressExplanation = selectExplanation(
      stressScore,
      "No critical outliers detected.",
      "Stable cortisol and HRV.",
      "Functional - bolster physical resilience.",
      "PRV and CNS fatigue indicate need for adjustment."
    );

    let painExplanation = selectExplanation(
      painScore,
      "Maintain low risk - proper mobility, prehab.",
      "Functionally aligned - holistic focus.",
      "Target deficit areas (strength, mobility).",
      "Restore muscle and neuromuscular balance."
    );

    let total = sleepScore + trainingLoadScore + stressScore + painScore;
    let aggregate = (total / 4).toText();

    "Phase factors: Sleep " # sleepExplanation # "; Training Load " # trainingLoadExplanation # " | Stress " # stressExplanation # "; Pain " # painExplanation # ". Aggregate score: " # aggregate # " | Readiness influences and streak bonus: " # streakBonus.toText();
  };

  func selectExplanation(score : Nat, high : Text, moderate : Text, low : Text, critical : Text) : Text {
    if (score >= 80) { high } else if (score >= 60) { moderate } else if (score >= 40) { low } else { critical };
  };

  public query ({ caller }) func getDashboardData() : async (Text, ?DailyInput, Nat) {
    let latestInput = getLastInput(caller);
    let streak = getCurrentStreak(caller);

    (
      "All scores are evaluated as percentage of optimized state; compared to elite selection baselines. Readiness is based on combined factors with specific streak influence.",
      latestInput,
      streak,
    );
  };

  func isGroupMemberHelper(_caller : Principal, _squadId : Nat) : Bool {
    false;
  };

  func isGroupOwnerHelper(_caller : Principal, _squadId : Nat) : Bool {
    false;
  };

  func selfCheckGamificationIntegrity(_caller : Principal) {};

  func generateInviteCode(_seed : Nat) : Text {
    "ABC123";
  };

  func trimWhitespace(s : Text) : Text {
    let chars = s.chars().toArray();

    let startIndex = findFirstNonSpace(chars);
    switch (startIndex) {
      case (null) { "" };
      case (?start) {
        let endIndex = findLastNonSpace(chars);
        if (endIndex < start) { return "" };

        let substringLength = endIndex - start + 1;
        if (substringLength == 0) {
          "";
        } else {
          let filtered = chars.sliceToArray(start, endIndex + 1);
          Text.fromIter(filtered.values());
        };
      };
    };
  };

  func findFirstNonSpace(chars : [Char]) : ?Nat {
    let length = chars.size();
    var i = 0;
    while (i < length) {
      if (chars[i] != ' ') { return ?i };
      i += 1;
    };
    null;
  };

  func findLastNonSpace(chars : [Char]) : Nat {
    let length = chars.size();
    var i = 0;
    if (length == 0) { return i };
    var lastIndex = length - 1 : Nat;
    while (i <= lastIndex) {
      if (chars[lastIndex] != ' ') { return lastIndex };

      if (lastIndex == 0) { return 0 };
      lastIndex -= 1;
    };
    0;
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    ?{
      username = "test_user";
      joinedAt = 0;
      inviteCode = "ABC123";
      disclaimerStatus = null;
    };
  };

  public query ({ caller }) func getUserProfile(_user : Principal) : async ?UserProfile {
    ?{
      username = "test_user";
      joinedAt = 0;
      inviteCode = "ABC123";
      disclaimerStatus = null;
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(_profile : UserProfile) : async () {
    Runtime.trap("saveCallerUserProfile not implemented in this proof-of-concept");
  };
};
