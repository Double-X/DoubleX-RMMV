/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV State Triggers
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Decent Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/EatwNufM
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.02a(GMT 0200 14-5-2016):
 *      1. Added the timing while to <timing state trigger: STCX, STAX>
 *      v1.01a(GMT 1300 26-2-2016):
 *      1. STCX and STAX take the state using them as an argument as well
 *      v1.00g(GMT 0400 25-12-2015):
 *      1. The aliased functions can be accessed by other custom plugins now
 *      2. Exposed the state plugin calls that can access the notetag values
 *      3. Increased this plugin's compactness, compatibility and readability
 *      v1.00f(GMT 1500 6-11-2015):
 *      1. Fixed undefined this in forEach bug
 *      v1.00e(GMT 1400 6-11-2015):
 *      1. Simplified the notetag reading mechanisms
 *      2. Fixed some typos
 *      v1.00d(GMT 1100 5-11-2015):
 *      1. Fixed undefined this under DoubleX_RMMV.State_Triggers bug
 *      v1.00c(GMT 0000 5-11-2015):
 *      1. Fixed failing to load notetags due to nil $dataStates bug
 *      v1.00b(GMT 1000 4-11-2015):
 *      1. Fixed several logic and syntax errors
 *      2. Increased this plugin's maintainability
 *      v1.00a(GMT 1500 30-10-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Sets some states to trigger some actions when conditions are met
 * @author DoubleX
 *
 * @help
 * You're supposed to edit the plugin js file directly to set notetag values
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # State Notetags:
 *      1. <timing state trigger: STCX, STAX>
 *         - Sets a state to trigger STAX when timing and STCX are met
 *         - timing can be add, turn, remove or custom timings set by you
 *         - add means the state's just added
 *         - turn means the state's remaining turn's just reduced by 1
 *         - remove means the state's just removed
 *         - (v1.02a+)while means the STAX effects are active as long as the
 *           state's active
 *         - timing must only consist of alphanumeric characters
 *         - STCX can be set in State Trigger Condition Functions
 *         - STAX can be set in State Trigger Action Functions
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. DoubleX_RMMV.State_Triggers.prop
 *         - Returns the property prop under DoubleX_RMMV.State_Triggers
 *      2. DoubleX_RMMV.State_Triggers.prop = val
 *         - Sets the property prop under DoubleX_RMMV.State_Triggers as a
 *           function which will be bound to the battler upon use
 *    # State manipulations
 *      All meta.stateTriggers changes can be saved if
 *      DoubleX RMMV Dynamic Data is used
 *      1. meta.stateTriggers[timing]
 *         - Returns the array of all STCX-STAX pairs of timing timing
 *      2. meta.stateTriggers[timing] = [[STCX, STAX], [STCX, STAX], ...]
 *         - Adds a new timing with some STCX-STAX pairs or overwrites all the
 *           existing ones with those pairs if timing is an existing timing
 *      3. meta.stateTriggers[timing][i] = [STCX, STAX]
 *         - Set the ith STCX-STAX pair as the new STCX-STAX pair
 *    # Battler manipulations
 *      (v1.02a+)1. GBB.stateTriggerTraits.call(battler, state, timing)
 *         - Collects all traits from all STAX meeting their corresponding
 *           STCX with timing timing of state applied to battler
 *         - GBB is DoubleX_RMMV.State_Triggers.Game_BattlerBase
 *      2. GBB.execStateTriggers.call(battler, stateId, timing)
 *         - Executes all state triggers with timing timing of state with id
 *           stateId applied to battler
 *         - GBB is DoubleX_RMMV.State_Triggers.Game_BattlerBase
 *============================================================================
 */

'use strict';
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["State Triggers"] = 'v1.02a';

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.State_Triggers = {

    /*------------------------------------------------------------------------
     *    State Trigger Condition Functions
     *    - Setups STCX used by this plugin's notetags
     *------------------------------------------------------------------------*/
    /* STCX are used at:
     * 1. DoubleX_RMMV.State_Triggers.Game_BattlerBase
     *    - return ST[trigger[0]].call(battler, state); in stateTriggerTraits
     *    - if (ST[trigger[0]].call(this)) { ST[trigger[1]].call(this); } in
     *      execStateTriggers
     * STCX are Javascript functions which will be bound to the battler upon use
     * STCX names can only use alphanumeric characters
     * state is the state using the STCX
     * The below STCX are examples added to help you set your STCX
     * You can freely use, rewrite and/or delete these examples
     */

    // Sets the state trigger condition as always true
    STC1: function(state) { return true; },

    // Sets the state trigger condition as needing switch with id x to be on
    STC2: function(state) { return $gameSwitches.value(x); },

    // Sets the state trigger condition as always true
    STC3: function(state) { return false; },

    // Adds new STCX here


    /*------------------------------------------------------------------------
     *    State Trigger Action Values
     *    - Setups STAX used by this plugin's notetags
     *------------------------------------------------------------------------*/
    /* STAX are used at:
     * 1. DoubleX_RMMV.State_Triggers.Game_BattlerBase
     *    - return r.concat(ST[trigger[1]].call(battler, state)); in
     *      stateTriggerTraits
     *    - if (ST[trigger[0]].call(this)) { ST[trigger[1]].call(this); } in
     *      execStateTriggers
     * STAX are Javascript functions which will be bound to the battler upon use
     * STAX names can only use alphanumeric characters
     * state is the state using the STAX
     * If the timing using the STAX is while, the STAX must return an array of
     * Trait Class
     * You can refer to Game_BattlerBase in rpg_objects.js and Trait Class in
     * the RMMV help html
     * The below STAX are examples added to help you set your STAX
     * You can freely use, rewrite and/or delete these examples
     */

    /* Sets the state trigger action as what Special Effect Escape does
     * This STAX's not supposed to work with the timing while as it doesn't
     * return an array of Trait Class
     */
    STA1: function(state) { this.hide(); },

    /* Sets the state trigger action as setting the battler's hp to full
     * This STAX's not supposed to work with the timing while as it doesn't
     * return an array of Trait Class
     */
    STA2: function(state) { this._hp = this.mhp; },

    /* Sets the state trigger action as ultiplying the battler's atk by x * 100%
     * This STAX's supposed to work with the timing while as it returns an array
     * of Trait Class
     */
    STA3: function(state) { return [{"code":21,"dataId":2,"value":x}]; }

    // Adds new STAX here


}; // DoubleX_RMMV.State_Triggers

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

(function(ST) {

    ST.DataManager = {};
    var DM = ST.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        // Rewritten
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    DM.loadAllNotes = function() {
        $dataStates.forEach(function(data) {
            if (data) { DM.loadStateNotes(data); }
        });
        return true;
    }; // DM.loadAllNotes

    // data: The data to have its notetags read
    DM.loadStateNotes = function(data) {
        data.meta.stateTriggers = {};
        var timing, triggers = data.meta.stateTriggers;
        var regExp = /< *(\w+) +state +trigger *: *(\w+) *, *(\w+) *>/i;
        data.note.split(/[\r\n]+/).forEach(function(line) {
            if (!line.match(regExp)) { return; }
            timing = RegExp.$1;
            triggers[timing] = triggers[timing] || [];
            triggers[timing].push([RegExp.$2, RegExp.$3]);
        });
    }; // DM.loadStateNotes

    ST.Game_BattlerBase = {};
    var GBB = ST.Game_BattlerBase;

    GBB.clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        // Added to store the state array right before it's cleared
        var lastStates = this._states;
        //
        GBB.clearStates.apply(this, arguments);
        // Added to trigger the remove actions if the remove conditions are met
        if (!lastStates) { return; }
        lastStates.forEach(function(stateId) {
            GBB.execStateTriggers.call(this, stateId, 'remove');
        }, this);
        //
    }; // Game_BattlerBase.prototype.clearStates

    GBB.eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        // Added to store the state existence flag right before it's erased
        var trigger = this._states.indexOf(stateId) >= 0;
        //
        GBB.eraseState.apply(this, arguments);
        // Added to trigger the remove actions if the remove conditions are met
        if (trigger) { GBB.execStateTriggers.call(this, stateId, 'remove'); }
        //
    }; // Game_BattlerBase.prototype.eraseState

    GBB.resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
        GBB.resetStateCounts.apply(this, arguments);
        // Added to trigger the add actions if the add conditions are met
        if (this._states.indexOf(stateId) < 0) { return; }
        GBB.execStateTriggers.call(this, stateId, 'add');
        //
    }; // Game_BattlerBase.prototype.resetStateCounts

    GBB.updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
    Game_BattlerBase.prototype.updateStateTurns = function() {
        GBB.updateStateTurns.apply(this, arguments);
        // Added to trigger the turn actions if the turn conditions are met
        this._states.forEach(function(stateId) {
            GBB.execStateTriggers.call(this, stateId, 'turn');
        }, this);
        //
    }; // Game_BattlerBase.prototype.updateStateTurns

    GBB.allTraits = Game_BattlerBase.prototype.allTraits;
    Game_BattlerBase.prototype.allTraits = function() { // v1.02a+
        // Rewritten
        var stateTriggerTraits = GBB.allStateTriggerTraits.call(this);
        return stateTriggerTraits.concat(GBB.allTraits.apply(this, arguments));
        //
    }; // Game_BattlerBase.prototype.allTraits

    GBB.allStateTriggerTraits = function() { // v1.02a+
        var battler = this;
        return this.states().reduce(function(r, obj) {
            return r.concat(GBB.stateTriggerTraits.call(battler, obj, 'while'));
        }, []);
    }; // GBB.allStateTriggerTraits

    /* state: The state triggering its actions
     * timing: The timing of the state triggering its actions
     */
    GBB.stateTriggerTraits = function(state, timing) { // v1.02a+
        var triggers = state.meta.stateTriggers[timing];
        if (!triggers) { return []; }
        // Collects all traits returned by STAX meeting STCX with timing timing
        var battler = this;
        return triggers.filter(function(trigger) {
            return ST[trigger[0]].call(battler, state);
        }).reduce(function(r, trigger) {
            return r.concat(ST[trigger[1]].call(battler, state));
        }, []);
        //
    }; // GBB.stateTriggerTraits

    /*------------------------------------------------------------------------
     *    Triggers each state action when each respective condition's met
     *------------------------------------------------------------------------*/
    /* stateId: The id of the state triggering its actions
     * timing: The timing of the state triggering its actions
     */
    GBB.execStateTriggers = function(stateId, timing) {
        var state = $dataStates[stateId];
        var triggers = state.meta.stateTriggers[timing];
        if (!triggers) { return; }
        // Calls each STCX to see if its paired STAX should be called as well
        triggers.forEach(function(trigger) {
            if (!ST[trigger[0]].call(this, state)) { return; }
            ST[trigger[1]].call(this, state);
        }, this);
        //
    }; // GBB.execStateTriggers

})(DoubleX_RMMV.State_Triggers);

/*============================================================================*/
