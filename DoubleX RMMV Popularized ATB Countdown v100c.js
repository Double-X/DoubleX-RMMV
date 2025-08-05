/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Countdown
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Popularized ATB Core
 *      Abilities:
 *      1. Decent Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/3a2pgKVr
 *      Video:
 *      1. https://www.youtube.com/watch?v=YeyHaybDZt4
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00c(GMT 0700 20-8-2016):
 *      1. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.00b(GMT 0400 16-7-2016):
 *      1. Changed auto removing timing of countdown state to "patb_countdown"
 *      2. Increased this plugin's compatibility and robustness
 *      v1.00a(GMT 0600 6-2-2016):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set some states updating turns per specified seconds
 * @author DoubleX
 *
 * @help
 * You're supposed to edit this js file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # State Notetags:
 *      1. <patb countdown: sec>
 *         - Sets the state to have its turn updated every sec seconds
 *         - Every second in sec only consists of frames with atb updates
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data State manipulations
 *      1. meta.patb_countdown
 *         - Returns the number of seconds per state turn update
 *         - Those seconds only consist of frames with atb updates
 *      2. meta.patb_countdown = sec
 *         - Sets the number of seconds per state turn update as sec
 *         - Every second in sec only consists of frames with atb updates
 *         - All meta.patb_countdown changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. patb_countdown_clock[stateId]
 *         - Returns the countdown clock, measured in frames, of state with id
 *           stateId
 *         - The number of frames per second is hardcoded as 60 by default
 *      2. patb_countdown_clock[stateId] = frames
 *         - Sets the countdown clock, measured in frames, of state with id
 *           stateId, as frames frame
 *         - The number of frames per second is hardcoded as 60 by default
 *      3. patb_countdown_freeze[stateId]
 *         - Returns whether the countdown of a state with id stateId's frozen
 *      4. patb_countdown_freeze[stateId] = boolean
 *         - Sets the countdown of state with id stateId to be frozen if
 *           boolean is true
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Countdown"] = "v1.00c";

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.PATB_Countdown = {

    /* Sets something to happen when the turn of the countdown state state
     * owned by the battler calling on_countdown_update decreases
     * on_countdown_update will be bound to the battler upon use
     */
    on_countdown_update: function(state) {
        // Uses DoubleX RMMV State Triggers to trigger countdown update effects
        //var GBB = DoubleX_RMMV.State_Triggers.Game_BattlerBase;
        //GBB.execStateTriggers.call(this, state.id, "turn");
        //

        // Applies 10 hp damage to the state owner per countdown update
        this._result.clear();
        this._result.success = true;
        this.gainHp(-10);
        this.onDamage(10);
        this.startDamagePopup();
        if (this._hp <= 0) { this.performCollapse(); }
    } // on_countdown_update

}; // DoubleX_RMMV.PATB_Countdown

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of this plugin on the user level, the default
 *           battle system implementations and the atb system concepts
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
 * function_name = function(arguments) { // Version X+; Rewrite/New; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     function_name_code;
 *     //
 * } // function_name
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *----------------------------------------------------------------------------*/

// data: The data to have its notetags read
DataManager.load_all_patb_countdown_notes = DataManager.load_all_patb_notes;
DataManager.load_all_patb_notes = function() {
    // Added
    $dataStates.forEach(function(data) {
        if (data) { this.load_patb_countdown_notes(data); }
    }, this);
    //
    return this.load_all_patb_countdown_notes();
}; // DataManager.load_all_patb_notes

// data: The data to have its notetags read
DataManager.load_patb_countdown_notes = function(data) { // New
    var countdown = /< *patb +countdown *: *(\d+) *>/i;
    var lines = data.note.split(/[\r\n]+/);
    for (var index = 0, length = lines.length; index < length; index++) {
        if (!lines[index].match(countdown)) { continue; }
        // Ensures no other plugin will share the same timing
        data.autoRemovalTiming = "patb_countdown";
        //
        return data.meta.patb_countdown = +RegExp.$1;
    }
}; // DataManager.load_patb_countdown_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *----------------------------------------------------------------------------*/

Game_BattlerBase.prototype.clearStatesPatbCountdown =
Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    this.clearStatesPatbCountdown();
    // Added
    this._patb_countdown_clock = {};
    this._patb_countdown_freeze = {};
    //
}; // Game_BattlerBase.prototype.clearStates

Game_BattlerBase.prototype.eraseStatePatbCountdown =
Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    this.eraseStatePatbCountdown(stateId);
    // Added
    this._patb_countdown_clock[stateId] = undefined;
    this._patb_countdown_freeze[stateId] = undefined;
    //
}; // Game_BattlerBase.prototype.eraseState

Game_BattlerBase.prototype.resetStateCountsPatbCountdown =
Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    this.resetStateCountsPatbCountdown(stateId);
    // Added
    if (!$dataStates[stateId].meta.patb_countdown) { return; }
    this._patb_countdown_clock[stateId] = 0;
    //
}; // Game_BattlerBase.prototype.resetStateCounts

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variables
 *----------------------------------------------------------------------------*/
Object.defineProperties(Game_Battler.prototype, {
    // The countdown clock of all countdown states
    "patb_countdown_clock": { get: function() { // Potential Hotspot
        return this._patb_countdown_clock;
    },  configurable: true },
    // The countdown clock freeze flag for all countdown states
    "patb_countdown_freeze": { get: function() { // Potential Hotspot
        return this._patb_countdown_freeze;
    }, configurable: true }
});

Game_Battler.prototype.init_patb_countdown = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_countdown();
    // Added to prevent rewriting state countdown status upon battle start
    this._patb_countdown_clock = this._patb_countdown_clock || {};
    this._patb_countdown_freeze = this._patb_countdown_freeze || {};
    //
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.update_patb_state_countdown = function() {
// New; Hotspot
    this.states().forEach(function(state) {
        if (this._patb_countdown_clock[state.id] === undefined) { return; }
        if (this._patb_countdown_freeze[state.id]) { return; }
        this._patb_countdown_clock[state.id] += 1;
        // Fps's assumed to be always 60
        var sec = state.meta.patb_countdown * 60;
        //
        if (this._patb_countdown_clock[state.id] % sec != 0) { return; }
        if (this._stateTurns[state.id] >= 0) {
            this._stateTurns[state.id] -= 1;
            this.set_patb_refresh();
        }
        DoubleX_RMMV.PATB_Countdown.on_countdown_update.call(this, state);
    }, this);
    this.removeStatesAuto("patb_countdown");
}; // Game_Battler.prototype.update_patb_state_countdown

/*----------------------------------------------------------------------------
 *    # (v1.00c+)Edit class: Game_Unit
 *----------------------------------------------------------------------------*/

Game_Unit.prototype.update_patb_countdown = Game_Unit.prototype.update_patb;
Game_Unit.prototype.update_patb = function() { // v1.00c+; Hotspot
    this.update_patb_countdown();
    // Added
    this.aliveMembers().forEach(function(mem) {
        mem.update_patb_state_countdown();
    });
    //
}; // Game_Unit.prototype.update_patb

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Countdown, place it below PATB Core.");
}

/*============================================================================*/
