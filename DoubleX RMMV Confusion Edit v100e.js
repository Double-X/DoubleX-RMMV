/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Confusion Edit
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/LX7qJ74P
 *      Video:
 *      1. https://www.youtube.com/watch?v=NCVMdR7HFls
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00e(GMT 1100 9-9-2022):
 *      1. Fixed infinite loop in targetsForReversedExcludeSelf due to typo
 *      v1.00d(GMT 0200 6-6-2020):
 *      1. Fixed actions having no targets not executing bug
 *      v1.00c(GMT 0300 9-3-2020):
 *      1. Fixed undefined subject in hasValidOriginalTargets
 *      v1.00b(GMT 0800 30-1-2016):
 *      1. Fixed missing return in targetsForOpponents and targetsForFriends
 *      2. Fixed undefined target in targetsForReversedExcludeSelf due to typo
 *      3. Fixed infinite loop with excludeSelf when subject's always selected
 *      v1.00a(GMT 0800 3-1-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you set some states to reverse the ally/foe identification
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # State Notetags:
 *      1. <confusion edit: reverse, excludeSelf>
 *         - Sets the confusion state to reverse the ally/foe identification
 *           only instead of restricting the battler to be merely using the
 *           1st skill in the database if reverse is true and the actions
 *           aren't forced
 *         - Reversal will never take place for state Restriction as Attack an
 *           Enemy nor skill/item scope as The User
 *         - Reversal will have 50% chance to take place for state Restriction
 *           as Attack Anyone
 *         - Reversal will always take place for state Restriction as Attack
 *           an Ally
 *         - Sets the confusion state to make the battler never targeting self
 *           if excludeSelf is true and the actions aren't forced
 *         - Only the effective notetag with the highest priority will be used
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # State manipulations
 *      1. meta.confusionEdit
 *         - Returns the confusion edit reverse and excludeSelf flag in the
 *           form of { reverse: reverse, excludeSelf: excludeSelf }
 *      2. meta.confusionEdit = { reverse: reverse, excludeSelf: excludeSelf }
 *         - Sets the confusion edit reverse and excludeSelf flag in the form
 *           of { reverse: reverse, excludeSelf: excludeSelf }
 *         - All meta.confusionEdit changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Confusion Edit"] = "v1.00e";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Some Javascript coding proficiency to fully comprehend this
 *           plugin
 *      2. Function documentation
 *         - The 1st part describes why this function's rewritten/extended for
 *           rewritten/extended functions or what the function does for new
 *           functions
 *         - The 2nd part describes what the arguments of the function are
 *         - The 3rd part informs which version rewritten, extended or created
 *           this function
 *         - The 4th part informs whether the function's rewritten or new
 *         - The 5th part informs whether the function's a real or potential
 *           hotspot
 *         - The 6th part describes how this function works for new functions
 *           only, and describes the parts added, removed or rewritten for
 *           rewritten or extended functions only
 *         Example:
 * /*----------------------------------------------------------------------
 *  *    Why rewrite/extended/What this function does
 *  *----------------------------------------------------------------------*/
/* // arguments: What these arguments are
 * functionName = function(arguments) { // Version X+; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     functionContents
 *     //
 * } // functionName
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Confusion_Edit = {};
(function(CE) {

    CE.DataManager = {};
    var DM = CE.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        // Rewritten
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    DM.loadAllNotes = function() {
        $dataStates.forEach(function(data) {
            if (data) { DM.loadDataNotes(data); }
        });
        return true;
    }; // DM.loadAllNotes

    // data: The data to have its notetags read
    DM.loadDataNotes = function(data) {
        data.meta.confusionEdit = {};
    	var lines = data.note.split(/[\r\n]+/);
        var regex = /< *confusion +edit *: *(\w+) *, *(\w+) *>/i;
        for (var index = 0, length = lines.length; index < length; index++) {
            if (!lines[index].match(regex)) { continue; }
            data.meta.confusionEdit.reverse = RegExp.$1 === "true";
            return data.meta.confusionEdit.excludeSelf = RegExp.$2 === "true";
        }
    }; // DM.loadDataNotes

    CE.Game_Action = {};
    var GA = CE.Game_Action;

    GA.friendsUnit = Game_Action.prototype.friendsUnit;
    Game_Action.prototype.friendsUnit = function() {
        // Rewritten to reverse the ally/foe identification with reverse flag
        return GA.originalReversedUnit.call(this, "friends", "opponents");
        //
    }; // Game_Action.prototype.friendsUnit

    GA.opponentsUnit = Game_Action.prototype.opponentsUnit;
    Game_Action.prototype.opponentsUnit = function() {
        // Rewritten to reverse the ally/foe identification with reverse flag
        return GA.originalReversedUnit.call(this, "opponents", "friends");
        //
    }; // Game_Action.prototype.opponentsUnit

    GA.setConfusion = Game_Action.prototype.setConfusion;
    Game_Action.prototype.setConfusion = function() {
        // Added to let battlers with reverse flag to use all available skills
        if (GBB.isConfusionEdit.call(this.subject(), "reverse")) { return; }
        //
        GA.setConfusion.apply(this, arguments);
    }; // Game_Action.prototype.setConfusion

    GA.isValid = Game_Action.prototype.isValid;
    Game_Action.prototype.isValid = function() {
        // Rewritten to ensure the target list won't be empty due to excludeSelf
        if (!GA.isValid.apply(this, arguments)) { return false; }
        if (!this.isForOpponent() && !this.isForFriend()) return true;
        return this.makeTargets().length > 0;
        //
    }; // Game_Action.prototype.isValid

    GA.makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        // Rewritten
        if (GBB.isConfusionEdit.call(this.subject(), "reverse")) {
            return this.repeatTargets(GA.makeReversedTargets.call(this));
        } else if (GA.hasValidOriginalTargets.call(this)) {
            return GA.makeTargets.apply(this, arguments);
        }
        return [];
        //
    }; // Game_Action.prototype.makeTargets

    GA.confusionTarget = Game_Action.prototype.confusionTarget;
    Game_Action.prototype.confusionTarget = function() {
        // Rewritten to exclude the subject itself with the excludeSelf flag
        var subject = this.subject();
        var target = GA.confusionTarget.apply(this, arguments);
        if (GBB.isConfusionEdit.call(subject, "excludeSelf")) {
            while (subject === target) {
                target = GA.confusionTarget.apply(this, arguments);
            }
        }
        return target;
        //
    }; // Game_Action.prototype.confusionTarget

    GA.targetsForOpponents = Game_Action.prototype.targetsForOpponents;
    Game_Action.prototype.targetsForOpponents = function() {
    	// Rewritten
        return GA.confusionEditTargets.call(this, "targetsForOpponents");
        //
    }; // Game_Action.prototype.targetsForOpponents

    GA.targetsForFriends = Game_Action.prototype.targetsForFriends;
    Game_Action.prototype.targetsForFriends = function() {
    	// Rewritten
        return GA.confusionEditTargets.call(this, "targetsForFriends");
        //
    }; // Game_Action.prototype.targetsForFriends
    /*------------------------------------------------------------------------
     *    Returns the reversed allies/foes for reverse flag
     *------------------------------------------------------------------------*/
    /* original: The original units to be returned
     * reversed: The units with the reverse flag to the returned
     */
    GA.originalReversedUnit = function(original, reversed) {
        var subject = this.subject();
        if (!this._forcing && GBB.isConfusionEdit.call(subject, "reverse")) {
            switch (subject.confusionLevel()) {
            case 1: return GA[original + "Unit"].apply(this, arguments);
            case 2:
                var side = Math.random() < 0.5 ? original : reversed;
                return GA[side + "Unit"].apply(this, arguments);
            default: return GA[reversed + "Unit"].apply(this, arguments);
            }
        }
        return GA[original + "Unit"].apply(this, arguments);
    }; // GA.originalReversedUnit

    /*------------------------------------------------------------------------
     *    Uses Autobattle with reversed ally/foe definition to mimic confusion
     *------------------------------------------------------------------------*/
    GA.makeReversedTargets = function() {
        if (this.isForOpponent()) { return this.targetsForOpponents(); }
        if (this.isForFriend()) { return this.targetsForFriends(); }
        return [];
    }; // GA.makeReversedTargets

    /*------------------------------------------------------------------------
     *    Returns if excludeSelf is false or self isn't the only valid target
     *------------------------------------------------------------------------*/
    GA.hasValidOriginalTargets = function() {
        if (this._forcing) { return true; }
        var subject = this.subject();
        if (!GBB.isConfusionEdit.call(subject, "excludeSelf")) { return true; }
        if (this.isForUser()) { return false; }
        if (subject.confusionLevel() !== 3) { return true; }
        return this.friendsUnit().aliveMembers().length > 1;
    }; // GA.hasValidOriginalTargets

    // functionName: The targetsForOpponents/targetsForFriends function name
    GA.confusionEditTargets = function(functionName) {
        if (!GBB.isConfusionEdit.call(this.subject(), "excludeSelf")) {
            return GA[functionName].apply(this, arguments);
        }
        // Prevents inifinite loops by checking for cases having no valid target
        if (!GA.canTargetReversed.call(this)) { return []; }
        //
        return GA.targetsForReversedExcludeSelf.call(this, functionName);
    }; // GA.confusionEditTargets

    /*------------------------------------------------------------------------
     *    Checks if there are targets other than self with the reverse flag
     *------------------------------------------------------------------------*/
    GA.canTargetReversed = function() {
    	// User's always equal to self for both original and reversed cases
        if (this.isForUser()) { return false; }
        //
        var level = this.subject().confusionLevel();
        if (level === 1 && this.isForFriend()) {
            return this.friendsUnit().aliveMembers().length > 1;
        } else if (level === 3 && this.isForOpponent()) {
            return this.opponentsUnit().aliveMembers().length > 1;
        }
        return true;
    }; // GA.canTargetReversed

    /*------------------------------------------------------------------------
     *    Returns the target list with both reverse and excludeSelf flags
     *------------------------------------------------------------------------*/
    // functionName: The targetsForOpponents/targetsForFriends function name
    GA.targetsForReversedExcludeSelf = function(functionName) {
        var subject = this.subject();
        var index, num = this.isForRandom() ? this.numTargets() : 1, targets;
        do {
            // Prevents infinite loop by ensuring the subject won't be selected
            if (this._targetIndex === subject.index() && this.isForOne()) {
                this._targetIndex -= 1;
            }
            //
        	targets = GA[functionName].apply(this, arguments);
        	index = targets.indexOf(subject);
        	if (index >= 0) { targets.splice(index, 1); }
        } while (targets.length < num);
        return targets;
    }; // GA.targetsForReversedExcludeSelf

    CE.Game_BattlerBase = {};
    var GBB = CE.Game_BattlerBase;

    /*------------------------------------------------------------------------
     *    Returns the queried notetag value of the 1st found effective notetag
     *------------------------------------------------------------------------*/
    // flag: The reverse/excludeSelf notetag value
    GBB.isConfusionEdit = function(flag) {
        if (!this.isConfused() || !this._states) { return false; }
        var state = this.states().filter(function(state) {
            return state.meta.confusionEdit !== undefined;
        })[0];
        return state && state.meta.confusionEdit[flag];
    }; // GBB.isConfusionEdit

    CE.Game_Actor = {};

    CE.Game_Actor.makeActions = Game_Actor.prototype.makeActions;
    Game_Actor.prototype.makeActions = function() {
        // Added to let actors with the reverse flag to use all available skills
        if (GBB.isConfusionEdit.call(this, "reverse")) {
            Game_Battler.prototype.makeActions.call(this);
            return this.makeAutoBattleActions();
        }
        //
        CE.Game_Actor.makeActions.apply(this, arguments);
    }; // Game_Actor.prototype.makeActions

})(DoubleX_RMMV.Confusion_Edit);

/*============================================================================*/
