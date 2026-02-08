import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Use staged upgrade with migration to keep stable state and actors compatible across upgrades

actor {
  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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
    sleepScore : Nat; // 0-100
    trainingLoadScore : Nat; // 0-100
    stressScore : Nat; // 0-100
    painScore : Nat; // 0-100
    overallScore : Nat; // 0-100
    explanations : Text; // Explanation in plain Text
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

  // User Profile Functions with Authorization
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
};
