/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Compatibility
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
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/SXpV9Zwt
 *      Video:
 *      1. https://www.youtube.com/watch?v=aoBI3DaE3g8
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. Place this plugin below all DoubleX RMMV Popularized ATB addons
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.05a(GMT 0600 26-12-2022):
 *      1. Compatible With Yanfly Engine Plugins - Battle Artificial
 *         Intelligence Core
 *      v1.04a(GMT 0500 1-1-2022):
 *      1. Compatible With Yanfly Engine Plugins - Battle Engine Extension -
 *         Animated Sideview Enemies
 *      v1.03f(GMT 0700 23-6-2021):
 *      1. Fixed the visuals of the action sequences of actor sprites being
 *         reset when other actors are inputable bug
 *      v1.03e(GMT 0700 19-6-2020):
 *      1. Fixed the <= patb reset: val> notetag always resetting the ATB to 0
 *         with Yanfly Engine Plugins - Battle Engine Core bug
 *      v1.03d(GMT 0300 14-5-2020):
 *      1. Fixed target cursor disappearing when the windows' refreshed
 *      2. Fixed skill/item/target help window not showing after it's closed
 *      v1.03c(GMT 0400 28-4-2020):
 *      1. Fixed not closing the target help window when the actor's dead with
 *         Yanfly Engine Plugins - Battle Engine Core enabled
 *      v1.03b(GMT 0200 7-9-2017):
 *      1. Fixed returning the sprite of the currently inputable actor to its
 *         home position when an action performs its finish sequence
 *         compatiblity issue
 *      v1.03a(GMT 0400 27-8-2017):
 *      1. Supports Action Sequences in
 *         Yanfly Engine Plugins - Battle Engine Core
 *      2. Fixed more changing currently inputable actor with
 *         Yanfly Engine Plugins - Target Extension - Selection Control
 *         compatibility issues
 *      v1.02b(GMT 1400 26-8-2017):
 *      1. Fixed showing status window with MOG_BattleHud compatility issue
 *      2. Fixed changing currently inputable actor with
 *         Yanfly Engine Plugins - Target Extension - Selection Control
 *         compatibility issue
 *      v1.02a(GMT 1400 13-8-2017):
 *      1. Compatible with
 *         Yanfly Engine Plugins - Target Extension - Selection Control
 *      v1.01b(GMT 0400 11-8-2017):
 *      1. Fixed the wrong actor window position bug when using skills/items
 *         on party members
 *      v1.01a(GMT 0500 10-8-2017):
 *      1. Compatible with MOG_BattleHud
 *      v1.00e(GMT 1200 5-8-2017):
 *      1. Fixed the next action incorrectly highlighting all members in the
 *         same party/troop after using an party/troop targeting skill/item
 *      v1.00d(GMT 1500 11-8-2016):
 *      1. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.00c(GMT 1400 9-8-2016):
 *      1. Fixed skills/items not needing selections not working when
 *         Select Help Window in Yanfly Engine Plugins - Battle Engine Core is
 *         set as false
 *      v1.00b(GMT 0400 16-7-2016):
 *      1. PATB Hotkey supports selecting inputable actors via touch input
 *         when Yanfly Engine Plugins - Battle Engine Core is used with
 *         Visual Actor Select being set as true as well
 *         Mouse Over applies to PATB Hotkey as well
 *      v1.00a(GMT 1600 12-4-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Popularized ATB compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## (v1.03a+)Action Sequences(Yanfly Engine Plugins - Battle Engine Core)
 *       Reference tag: YEP_BattleEngineCore_ActionSequences
 *----------------------------------------------------------------------------
 *    # DoubleX RMMV Popularized ATB Core
 *      1. atb val: Target Typing, Operator Value
 *         - Use Operator to assign Value to the atb value of targets included
 *           by Target Typing, which can be any Target Typing supported by
 *           Action Sequences that targets battlers not cooling down
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      2. atb val %: Target Typing, Operator Value
 *         - Use Operator to assign Value% of the maximum atb value to the atb
 *           value of targets included by Target Typing, which can be any
 *           Target Typing supported by Action Sequences that targets battlers
 *           not cooling down
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      3. reset atb val: Target Typing
 *         - Resets the atb value of targets included by Target Typing, which
 *           can be any Target Typing supported by Action Sequences, to the
 *           maximum atb value in delay fill mode and 0 if otherwise
 *      4. reset atb: Target Typing
 *         - Clears all actions of targets included by Target Typing, which
 *           can be any Target Typing supported by Action Sequences
 *    # DoubleX RMMV Popularized ATB Charge
 *      1. charge val: Target Typing, Operator Value
 *         - Use Operator to assign Value to the charge value of targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences that targets battlers charging
 *           actions
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      2. charge val %: Target Typing, Operator Value
 *         - Use Operator to assign Value% of the maximum atb value to the
 *           charge value of targets included by Target Typing, which can be
 *           any Target Typing supported by Action Sequences that targets
 *           battlers charging actions
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *    # DoubleX RMMV Popularized ATB Cooldown
 *      1. cooldown val: Target Typing, Operator Value
 *         - Use Operator to assign Value to the cooldown value of targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences that targets battlers cooling down
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      2. cooldown val %: Target Typing, Operator Value
 *         - Use Operator to assign Value% of the maximum atb value to the
 *           cooldown value of targets included by Target Typing, which can be
 *           any Target Typing supported by Action Sequences that targets
 *           battlers cooling down
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *    # DoubleX RMMV Popularized ATB Countdown
 *      1. countdown clock: Target Typing, Operator Value State
 *         - Use operator to assign Value to the number of frames as the
 *           countdown clock of state with id State for targets included by
 *           Target Typing, which can be any any Target Typing supported by
 *           Action Sequences that targets battlers having said state
 *         - The fps is assumed to be always 60
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      2. countdown freeze: Target Typing, Flag State
 *         - Assign Flag, which is either true or false, to set whether the
 *           countdown clock of state with id State is frozen for targets
 *           included by Target Typing, which can be any any Target Typing
 *           supported by Action Sequences that targets battlers having said
 *           state
 *    # DoubleX RMMV Popularized ATB Delay
 *      1. delay frame: Target Typing, Operator Value
 *         - Use Operator to assign Value to the number of frames as delay for
 *           targets included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *         - The fps is assumed to be always 60
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *    # DoubleX RMMV Popularized ATB Reset
 *      1. reset val: Target Typing, Operator Value
 *         - Use Operator to assign Value to the atb reset value for targets
 *           included by Target Typing, which can be any Target Typing
 *           supported by Action Sequences
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *      2. reset val %: Target Typing, Operator Value
 *         - Use Operator to assign Value% of the maximum atb value to the atb
 *           reset value for targets included by Target Typing, which can be
 *           any Target Typing supported by Action Sequences
 *         - Operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # (v1.05a+)Yanfly Engine Plugins - Battle Artificial Intelligence Core
 *      1. The last action in the enemy AI priority list will still be
 *         executed even when no actions in the list fulfill their conditions
 *         - Reference tag: YEP_BattleAICore_ClearInvalidAIActions
 *         - Extended BattleManager.add_patb_action_battler and
 *           Game_Enemy.prototype.setAIPattern to clear all those invalid
 *           actions
 *         - This fix might cause some other compatibility issues with some
 *           other plugins extending or rewriting makeActions
 *    # (v1.04a+)Yanfly Engine Plugins - Battle Engine Extension -
 *      Animated Sideview Enemies
 *      1. The ATB bars in DoubleX RMMV Popularized ATB Bar are needlessly
 *         mirrored as well when mirroring animated sideview enemies
 *         - Reference tag: YEP_X_AnimatedSVEnemies_UnmirrorMirroredATBBars
 *         - Extended Window_Patb_Bar.prototype.updateBar to mirror the ATB
 *           bars again if their parents are mirrored
 *         - This fix might cause minor performance issues on low-end mobiles
 *    # (v1.02a+)Yanfly Engine Plugins - Target Extension - Selection Control
 *      1. The enemy window freezes when the current inputable actor becomes
 *         not inputable
 *         - Reference tag: YEP_X_SelectionControl_StopUnlockingEnemyWindow
 *         - Extended Scene_Battle.prototype.close_patb_selection_windows to
 *           stop closing the enemy window upon the aforementioned event
 *      2. (v1.02b+)The currently inputable actor changes when picking targets
 *         - Reference tag: YEP_X_SelectionControl_NewStatusWindowIndex
 *         - Added get property patb_index in Window_BattleStatus
 *         - Extended Window_BattleStatus.prototype.select to use a new
 *           variable to store the index that are not affected by selecting
 *           targets
 *         - Extended Window_BattleEnemy.prototype.hide and
 *           Window_BattleEnemy.prototype.select to select targets without
 *           changing the new index
 *    # (v1.01a+)MOG_BattleHud:
 *      1. The ATB bar doesn't gather any DoubleX RMMV Popularized ATB data
 *         - Reference tag: MOG_BattleHud_PATB_Data
 *         - Rewritten Battle_Hud.prototype.update_at to support cooldown too
 *         - Extended Battle_Hud.prototype.at, Battle_Hud.prototype.max_at,
 *           Battle_Hud.prototype.cast_at, Battle_Hud.prototype.cast_max_at
 *           and Battle_Hud.prototype.is_casting to support atb and charge
 *         - Added Battle_Hud.prototype.cooldown_at,
 *           Battle_Hud.prototype.cooldown_max_at,
 *           Battle_Hud.prototype.is_cooling_down and
 *           Battle_Hud.prototype.is_max_cooldown to support cooldown
 *      2. (v1.01b+) The actor window isn't fully shown
 *         - Reference tag: MOG_BattleHud_Actor_Window
 *         - Removed Scene_Battle.prototype.update_patb_window_positions to
 *           let MOG_BattleHud handle the actor window position
 *      3. (v1.02b+)The original status window will be shown when the current
 *         inputable actor becomes not inputable
 *         - Reference tag: MOG_BattleHud_StopShowingStatusWindow
 *         - Extended Scene_Battle.prototype.close_patb_selection_windows to
 *           stop showing the status window upon the aforementioned event
 *    # Yanfly Engine Plugins - Battle Engine Core:
 *      1. All battler actions are recreated upon starting actor inputs
 *         - Reference tag: YEP_BattleEngineCore_StopRecreateAction
 *         - Stopped calling BattleManager.createActions when patb's effective
 *      2. Valid actions don't execute at all
 *         - Reference tag: YEP_BattleEngineCore_HandleNewPhases
 *         - Extended BattleManager.can_update_patb_process to handle new
 *           phases added by Yanfly Engine Plugins - Battle Engine Core
 *      3. The battler's atb's reset right after executing 1 action already
 *         - Reference tag: YEP_BattleEngineCore_StopAllActsEnd
 *         - Stopped calling Game_Battler.prototype.on_all_patb_acts_end when
 *           the battler still has actions
 *      4. Skills/Items targeting all/random allies/enemies are confirmed
 *         before the target selection's complete
 *         - Reference tag: YEP_BattleEngineCore_StopConfirmAllRandomSelection
 *         - Removed all Game_Action.prototype.confirm_patb_item contents
 *         - (v1.00c+) Stopped this fix when Select Help Window is false
 *      5. Right now wait_cond_code full and force run atb are still
 *         functioning as act
 *         - Due to BattleManager.can_update_patb_process to handle new phases
 *           added by Yanfly Engine Plugins - Battle Engine Core
 *      6. (v1.00e+) Subsequent actions of an all-selection one all wrongly
 *         mark all party/troop members
 *         - Reference tag: YEP_BattleEngineCore_StopWrongAllSelections
 *         - Extended Scene_Battle.prototype.select_next_patb_command to stop
 *           marking actions as all selections
 *      7. (v1.03b+) The sprite of the currently inputable actor will return
 *         to its home position when any action performs its finish sequence
 *         - Reference tag: YEP_BattleEngineCore_StopInputableActorReturnHome
 *         - Extended Game_Battler.prototype.spriteReturnHome to disable this
 *           function for the currently inputable actor
 *      8. (v1.03c+) The target help window remains when the actor's dead
 *         - Reference tag: YEP_BattleEngineCore_CloseInvalidTargetHelpWindow
 *         - Added Window_Help.prototype.deselect and extended
 *           Scene_Battle.prototype.patb_selection_windows to close the stale
 *           help window
 *      9. (v1.03d+) The skill/item target help window doesn't show
 *         - Reference tag: YEP_BattleEngineCore_ShowHelpWindow
 *         - Extended commandSkill, commandItem, selectActorSelection and
 *           selectActorSelection to explicitly open the help window
 *      10. (v1.03d+) The selection and help window lost info after refresh
 *         - Reference tag: YEP_BattleEngineCore_UpdateSelectionHelpWindow
 *         - Extended refresh_patb_windows to reselect the selection windows
 *           and update their respective help windows
 *      11. (v1.03e+) The <= patb reset: val> notetag always reset the ATB
 *          value to 0
 *          - Reference tag: YEP_BattleEngineCore_StopSubjectOnAllActsEnd
 *          - Extended BattleManager.endAction to stop calling onAllActionsEnd
 *            twice for the action execution subject
 *      12. (v1.03f+) The visuals of action sequences of actor sprites will be
 *          reset when there are other inputable actors
 *          - Reference tag: YEP_BattleEngineCore_StopRefreshBattlerMotion
 *          - Rewritten Game_Battler.prototype.requestMotionRefresh to stop
 *            refreshing the motions of battler sprites when executing the
 *            action sequences
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Compatibility"] = "v1.05a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of how DoubleX RMMV Popularized ATB and each
 *           addressed plugin works
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

if (Imported.YEP_BattleEngineCore) {

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *----------------------------------------------------------------------------*/

 /*----------------------------------------------------------------------------
  *    (v1.03e+)New public instance variables
  *----------------------------------------------------------------------------*/
 Object.defineProperties(BattleManager, {
     // Whether onAllActionsEnd is called by BattleManager.endAction
     "is_end_patb_act": { get: function() {
         return this._is_end_patb_act;
     }, configurable: true }
 });

BattleManager.initMembersPatbCompatibility = BattleManager.initMembers;
BattleManager.initMembers = function() { // v1.03a+
    this.initMembersPatbCompatibility();
    // Added to setup the mapping from the action sequence tag to their handlers
    this.init_patb_act_sequences();
    // YEP_BattleEngineCore_ActionSequences
}; // BattleManager.initMembers

BattleManager.endActionPatbCompatibility = BattleManager.endAction;
BattleManager.endAction = function() { // v1.03e+
    // Added to stop calling onAllActionsEnd for the action execution subject
    if ($gameSystem.is_patb()) { this._is_end_patb_act = true; }
    // YEP_BattleEngineCore_StopSubjectOnAllActsEnd
    BattleManager.endActionPatbCompatibility();
    this._is_end_patb_act = false;
}; // BattleManager.endAction

BattleManager.processActionSequencePatbCompatibility =
BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
// v1.03a+
    // Added to process new action sequences mimicking patb plugin calls
    if (this.is_patb_act_sequence(actionName)) {
        return this.process_patb_act_sequence(actionName, actionArgs);
    }
    // YEP_BattleEngineCore_ActionSequences
    return this.processActionSequencePatbCompatibility(actionName, actionArgs);
}; // BattleManager.processActionSequence

BattleManager.createActionsPatbCompatibility = BattleManager.createActions;
BattleManager.createActions = function() {
    // Rewritten to stop recreating battler actions when starting actor inputs
    if (!$gameSystem.is_patb()) { this.createActionsPatbCompatibility(); }
    // YEP_BattleEngineCore_StopRecreateAction
}; // BattleManager.createActions

BattleManager.can_update_patb_process_compatibility =
BattleManager.can_update_patb_process;
BattleManager.can_update_patb_process = function() { // Hotspot
    // Added to let BattleManager.update handle all phases when executing action
    if (this._phase === 'actionList' || this._phase === 'actionTargetList') {
        this.update();
        return false;
    } else if (this._phase === 'phaseChange') {
        this.update();
        return false;
    }
    // YEP_BattleEngineCore_HandleNewPhases
    return this.can_update_patb_process_compatibility();
}; // BattleManager.can_update_patb_process

BattleManager.init_patb_act_sequences = function() { // v1.03a+; New
    this._patb_act_sequences = {
        // DoubleX RMMV Popularized ATB Core
        'ATB VAL': 'process_patb_val_act_sequence',
        'ATB VAL %': 'process_patb_val_percent_act_sequence',
        'RESET ATB VAL': 'process_reset_patb_val_act_sequence',
        'RESET ATB': 'process_reset_patb_act_sequence',
        //
        // DoubleX RMMV Popularized ATB Charge
        'CHARGE VAL': 'process_patb_charge_val_act_sequence',
        'CHARGE VAL %': 'process_patb_charge_val_percent_act_sequence',
        //
        // DoubleX RMMV Popularized ATB Cooldown
        'COOLDOWN VAL': 'process_patb_cooldown_val_act_sequence',
        'COOLDOWN VAL %': 'process_patb_cooldown_val_percent_act_sequence',
        //
        // DoubleX RMMV Popularized ATB Countdown
        'COUNTDOWN CLOCK': 'process_patb_countdown_clock_act_sequence',
        'COUNTDOWN FREEZE': 'process_patb_countdown_freeze_act_sequence',
        //
        // DoubleX RMMV Popularized ATB Delay
        'DELAY FRAME': 'process_patb_delay_frame_act_sequence',
        //
        // DoubleX RMMV Popularized ATB Reset
        'RESET VAL': 'process_patb_reset_val_act_sequence',
        'RESET VAL %': 'process_patb_reset_val_percent_act_sequence'
        //
    };
    this._patb_act_sequence_regex = {
        // DoubleX RMMV Popularized ATB Core
        'ATB VAL': / *(.+) +(\d+) */i,
        'ATB VAL %': / *(.+) +(\d+) */i,
        'RESET ATB VAL': /.*/i,
        'RESET ATB': /.*/i,
        //
        // DoubleX RMMV Popularized ATB Charge
        'CHARGE VAL': / *(.+) +(\d+) */i,
        'CHARGE VAL %': / *(.+) +(\d+) */i,
        //
        // DoubleX RMMV Popularized ATB Cooldown
        'COOLDOWN VAL': / *(.+) +(\d+) */i,
        'COOLDOWN VAL %': / *(.+) +(\d+) */i,
        //
        // DoubleX RMMV Popularized ATB Countdown
        'COUNTDOWN CLOCK': / *(.+) +(\d+) +(\d+) */i,
        'COUNTDOWN FREEZE': / *(\w+) +(\d+) */i,
        //
        // DoubleX RMMV Popularized ATB Delay
        'DELAY FRAME': / *(.+) +(\d+) */i,
        //
        // DoubleX RMMV Popularized ATB Reset
        'RESET VAL': / *(.+) +(\d+) */i,
        'RESET VAL %': / *(.+) +(\d+) */i
        //
    };
}; // BattleManager.init_patb_act_sequences

BattleManager.is_patb_act_sequence = function(actionName) { // v1.03a+; New
    return Object.keys(this._patb_act_sequences).indexOf(actionName) >= 0;
}; // BattleManager.processActionSequence

BattleManager.process_patb_act_sequence = function(actionName, actionArgs) {
// v1.03a+; New
    if (!$gameSystem.is_patb()) { return true; }
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length <= 0) { return true; };
    var cmd = actionArgs[1];
    if (cmd && !cmd.match(this._patb_act_sequence_regex[actionName])) {
        return true;
    }
    return this[this._patb_act_sequences[actionName]](targets, cmd);
}; // BattleManager.process_patb_act_sequence

BattleManager.process_patb_val_act_sequence = function(targets) {
// v1.03a+; New
    var operator = RegExp.$1, val = +RegExp.$2 * 1.0;
    targets.forEach(function(target) {
        if (this.is_patb_charge(target)) { target.reset_patb(); }
        var atb = target.patb_val.atb;
        target.patb_val.atb = target.operate_patb_notes(atb, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_val_act_sequence

BattleManager.process_patb_val_percent_act_sequence = function(targets) {
// v1.03a+; New
    var operator = RegExp.$1, temp = +RegExp.$2;
    targets.forEach(function(target) {
        if (this.is_patb_charge(target)) { target.reset_patb(); }
        var val = temp * target.max_patb_val / 100.0, atb = target.patb_val.atb;
        target.patb_val.atb = target.operate_patb_notes(atb, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_val_percent_act_sequence

BattleManager.process_reset_patb_val_act_sequence = function(targets) {
// v1.03a+; New
    targets.forEach(function(target) { target.reset_patb_val(); }, this);
    return true;
}; // BattleManager.process_reset_patb_val_act_sequence

BattleManager.process_reset_patb_act_sequence = function(targets) {
// v1.03a+; New
    targets.forEach(function(target) { target.reset_patb(); }, this);
    return true;
}; // BattleManager.process_reset_patb_act_sequence

BattleManager.process_patb_charge_val_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Charge"]) { return true; }
    var operator = RegExp.$1, val = +RegExp.$2 * 1.0;
    targets.filter(this.is_patb_charge, this).forEach(function(target) {
        var charge = target.patb_val.charge;
        target.patb_val.charge =
                target.operate_patb_notes(charge, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_charge_val_act_sequence

BattleManager.process_patb_charge_val_percent_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Charge"]) { return true; }
    var operator = RegExp.$1, temp = +RegExp.$2;
    targets.filter(this.is_patb_charge, this).forEach(function(target) {
        var val = temp * target.max_patb_val / 100.0;
        var charge = target.patb_val.charge;
        target.patb_val.charge =
                target.operate_patb_notes(charge, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_charge_val_percent_act_sequence

BattleManager.is_patb_charge = function(target) { // v1.03a+; New
    if (this.is_patb_cooldown(target)) { return false; }
    return DoubleX_RMMV["PATB Charge"] && target.is_patb_charge();
}; // BattleManager.is_patb_charge

BattleManager.process_patb_cooldown_val_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Cooldown"]) { return true; }
    var operator = RegExp.$1, val = +RegExp.$2 * 1.0;
    targets.filter(this.is_patb_cooldown, this).forEach(function(target) {
        var cooldown = target.patb_val.cooldown;
        target.patb_val.cooldown =
                target.operate_patb_notes(cooldown, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_cooldown_val_act_sequence

BattleManager.process_patb_cooldown_val_percent_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Cooldown"]) { return true; }
    var operator = RegExp.$1, temp = +RegExp.$2;
    targets.filter(this.is_patb_cooldown, this).forEach(function(target) {
        var val = temp * target.max_patb_val / 100.0;
        var cooldown = target.patb_val.cooldown;
        target.patb_val.cooldown =
                target.operate_patb_notes(cooldown, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_cooldown_val_percent_act_sequence

BattleManager.is_patb_cooldown = function(target) { // v1.03a+; New
    return target.is_patb_cooldown();
}; // BattleManager.is_patb_cooldown

BattleManager.process_patb_countdown_clock_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Countdown"]) { return true; }
    var operator = RegExp.$1, val = +RegExp.$2, state_id = +RegExp.$3;
    // Separating the filter function would cause make it too hard for learners
    targets.filter(function(target) {
        return target.isStateAdded(state_id);
    }, this).forEach(function(target) {
        var clock = target.patb_countdown_clock[state_id];
        var new_clock = target.operate_patb_notes(clock, operator, val);;
        target.patb_countdown_clock[state_id] = new_clock;
    }, this);
    //
    return true;
}; // BattleManager.process_patb_countdown_clock_act_sequence

BattleManager.process_patb_countdown_freeze_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Countdown"]) { return true; }
    var is_freeze = RegExp.$1 === "true", state_id = +RegExp.$2;
    // Separating the filter function would cause make it too hard for learners
    targets.filter(function(target) {
        return target.isStateAdded(state_id);
    }, this).forEach(function(target) {
        target.patb_countdown_freeze[state_id] = is_freeze;
    }, this);
    //
    return true;
}; // BattleManager.process_patb_countdown_freeze_act_sequence

BattleManager.process_patb_delay_frame_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Delay"]) { return true; }
    var operator = RegExp.$1, val = +RegExp.$2;
    // Restricting delay to its intended scope would make this sequence useless
    targets.forEach(function(target) {
        var delay = target.patb_delay;
        target.patb_delay = target.operate_patb_notes(delay, operator, val);
    }, this);
    //
    return true;
}; // BattleManager.process_patb_delay_frame_act_sequence

BattleManager.process_patb_reset_val_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Reset"]) { return true; }
    var operator = RegExp.$1, val = +RegExp.$2 * 1.0;
    targets.forEach(function(target) {
        var reset = target.patb_reset_val;
        target.patb_reset_val = target.operate_patb_notes(reset, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_reset_val_act_sequence

BattleManager.process_patb_reset_val_percent_act_sequence = function(targets) {
// v1.03a+; New
    if (!DoubleX_RMMV["PATB Reset"]) { return true; }
    var operator = RegExp.$1, temp = +RegExp.$2;
    targets.forEach(function(target) {
        var val = temp * target.max_patb_val / 100.0;
        var reset = target.patb_reset_val;
        target.patb_reset_val = target.operate_patb_notes(reset, operator, val);
    }, this);
    return true;
}; // BattleManager.process_patb_reset_val_percent_act_sequence

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

Game_Battler.prototype.requestMotionRefresh = function() { // v1.03f+; Rewrite
    var deadMotion = this.deadMotion();
    if (this.isDead() && this._motionType !== deadMotion) {
      this.requestMotion(deadMotion);
    }
    if (this.isDead() && this._motionType === deadMotion) { return; }
    if (this._motionType === 'victory') { return; }
    if (this._motionType === 'escape' && !BattleManager.isInputting()) {
        return;
    } else if (this._motionType === 'guard' && !BattleManager.isInputting()) {
        return;
    }
    this.clearMotion();
    // Rewritten to stop refreshing motion when executing action sequences
    if (this.battler() && BattleManager.isInputting() && (!$gameSystem.is_patb() || BattleManager._phase !== "actionList" && BattleManager._phase !== "actionTargetList")) {
      this.battler().refreshMotion();
    }
    // YEP_BattleEngineCore_StopRefreshBattlerMotion
}; // Game_Battler.prototype.requestMotionRefresh

Game_Battler.prototype.spriteReturnHomePatbCompatibility =
Game_Battler.prototype.spriteReturnHome;
Game_Battler.prototype.spriteReturnHome = function() { // v1.03b+
    // Added to stop returning home for the sprite of the currently inpuable one
    if ($gameSystem.is_patb() && BattleManager.actor() === this) { return; }
    // YEP_BattleEngineCore_StopInputableActorReturnHome
    this.spriteReturnHomePatbCompatibility();
}; // Game_Battler.prototype.spriteReturnHome

Game_Battler.prototype.on_all_patb_acts_end_comnpatibility =
Game_Battler.prototype.on_all_patb_acts_end;
Game_Battler.prototype.on_all_patb_acts_end = function() {
    // Added to stop resetting the battler's atb when there's still actions
    if (this.currentAction() || BattleManager.is_end_patb_act) { return; }
    // YEP_BattleEngineCore_StopAllActsEnd
    this.on_all_patb_acts_end_comnpatibility();
}; // Game_Battler.prototype.on_all_patb_acts_end

/*----------------------------------------------------------------------------
 *    # (v1.03c+)Edit class: Window_Help
 *----------------------------------------------------------------------------*/

// Added to let the help window call the deselect method
Window_Help.prototype.deselect = Window_Help.prototype.deselect || function() {};
// YEP_BattleEngineCore_CloseInvalidTargetHelpWindow

/*----------------------------------------------------------------------------
 *    # (v1.04a)Edit class: Window_Patb_Bar
 *----------------------------------------------------------------------------*/

// Don't check if animated sideview enemies are on as it's a general problem
Window_Patb_Bar.prototype.updateBarCompatibility =
Window_Patb_Bar.prototype.updateBar;
Window_Patb_Bar.prototype.updateBar = function() { // Hotspot
    this.updateBarCompatibility();
    // Added to mirror the ATB bar again if its parent's mirrored
    if (this.visible) { Sprite_StateIcon.prototype.updateMirror.call(this); }
    // YEP_X_AnimatedSVEnemies_UnmirrorMirroredATBBars
}; // Window_Patb_Bar.prototype.updateBar
// Fixes like this might cause minor performance issues on low-end mobiles

/*----------------------------------------------------------------------------
 *    # (v1.03c+)Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

 [
     "commandSkill",
     "commandItem",
     "selectActorSelection",
     "selectEnemySelection"
 ].forEach(function(func) {
     Scene_Battle.prototype[func + "PatbCompatibility"] =
     Scene_Battle.prototype[func];
     Scene_Battle.prototype[func] = function() {
         this[func + "PatbCompatibility"]();
         // Added to ensure that the target help window will be shown and active
         this._helpWindow.open();
         // YEP_BattleEngineCore_ShowHelpWindow
     }; // Scene_Battle.prototype[func]
 });

 Scene_Battle.prototype.refresh_patb_windows_comnpatibility =
 Scene_Battle.prototype.refresh_patb_windows;
 Scene_Battle.prototype.refresh_patb_windows = function() { // New
     this.refresh_patb_windows_comnpatibility();
     // Added to refresh the target help window as well
     [this._actorWindow, this._enemyWindow].forEach(function(window) {
       if (!window.visible) { return; }
       window.reselect();
       window.updateHelp();
     }, this);
     // YEP_BattleEngineCore_UpdateSelectionHelpWindow
 }; // Scene_Battle.prototype.refresh_patb_windows

Scene_Battle.prototype.patb_selection_windows_comnpatibility =
Scene_Battle.prototype.patb_selection_windows;
Scene_Battle.prototype.patb_selection_windows = function() { // v1.03c+
    // Edited to close the target help window as well
    return this.patb_selection_windows_comnpatibility().concat(
            [this._helpWindow]);
    // YEP_BattleEngineCore_CloseInvalidTargetHelpWindow
}; // Scene_Battle.prototype.patb_selection_windows

if (Imported.YEP_X_SelectionControl) {

/*----------------------------------------------------------------------------
 *    # (v1.02b+)Edit class: Window_BattleStatus
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variable
 *----------------------------------------------------------------------------*/
// The index without being influenced by YEP_X_SelectionControl
Object.defineProperty(Window_BattleStatus.prototype, "patb_index", {
    get: function() { /* Hotspot */ return this._patb_index; },
    configurable: true
});

/*----------------------------------------------------------------------------
 *    Uses a new variable to store the index that are not from target windows
 *----------------------------------------------------------------------------*/
Window_BattleStatus.prototype.select = function(index) { // New
    Window_Selectable.prototype.select.call(this, index);
    if (!$gameTemp.is_patb_selecting_targets) { this._patb_index = index; }
}; // Window_BattleStatus.prototype.select

/*----------------------------------------------------------------------------
 *    # (v1.02b+)Edit class: Window_BattleEnemy
 *----------------------------------------------------------------------------*/

Window_BattleEnemy.prototype.hidePatbCompatibility =
Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    // Added to ensure the new index won't be influenced by selecting targets
    $gameTemp.is_patb_selecting_targets = true;
    // YEP_X_SelectionControl_NewStatusWindowIndex
    Window_BattleEnemy.prototype.hidePatbCompatibility.call(this);
    // Added to ensure the new index will be influenced by everything else
    $gameTemp.is_patb_selecting_targets = false;
    // YEP_X_SelectionControl_NewStatusWindowIndex
}; // Window_BattleEnemy.prototype.hide

Window_BattleEnemy.prototype.selectPatbCompatibility =
Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    // Added to ensure the new index won't be influenced by selecting targets
    $gameTemp.is_patb_selecting_targets = true;
    // YEP_X_SelectionControl_NewStatusWindowIndex
    Window_BattleEnemy.prototype.selectPatbCompatibility.call(this, index);
    // Added to ensure the new index will be influenced by everything else
    $gameTemp.is_patb_selecting_targets = false;
    // YEP_X_SelectionControl_NewStatusWindowIndex
}; // Window_BattleEnemy.prototype.select

/*----------------------------------------------------------------------------
 *    # (v1.00e+)Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

// actor_indices: The indices of all currently inputable actors
Scene_Battle.prototype.update_patb_actor_selection = function() {
// v1.02b+; Rewrite; Hotspot
    var actor_indices = BattleManager.inputable_patb_actor_indices();
    // Rewritten to use the index that are not changed by YEP_X_SelectionControl
    var index = this._statusWindow.patb_index;
    // YEP_X_SelectionControl_NewStatusWindowIndex
    if (actor_indices.indexOf(index) >= 0) { return; }
    // Deactivates the active input windows that should be no longer active
    if (index >= 0) { return this.close_patb_selection_windows(); }
    if (this._partyCommandWindow.active) {
        if (actor_indices.length <= 0) {
            this.close_patb_window(this._partyCommandWindow);
        }
        return;
    }
    //
    if (actor_indices.length <= 0) { return; }
    BattleManager.changeActor(actor_indices[0], 'waiting');
    this.startActorCommandSelection();
}; // Scene_Battle.prototype.update_patb_actor_selection

Scene_Battle.prototype.select_next_patb_command_comnpatibility =
Scene_Battle.prototype.select_next_patb_command;
Scene_Battle.prototype.select_next_patb_command = function() { // v1.00b+
    this.select_next_patb_command_comnpatibility();
    // Added to ensure that subsequent actions won't be marked as all selections
    BattleManager.stopAllSelection();
    // YEP_BattleEngineCore_StopWrongAllSelections
}; // Scene_Battle.prototype.select_next_patb_command

Scene_Battle.prototype.close_patb_selection_windows_comnpatibility =
Scene_Battle.prototype.close_patb_selection_windows;
Scene_Battle.prototype.close_patb_selection_windows = function() { // v1.02a+
    // Added to save the last active status before stopping it from being closed
    var is_enemy_window_active = this._enemyWindow.active;
    // YEP_X_SelectionControl_StopUnlockingEnemyWindow
    this.close_patb_selection_windows_comnpatibility();
    // Added to load the last active status after stopping it from being closed
    if (is_enemy_window_active) this._enemyWindow.activate();
    // YEP_X_SelectionControl_StopUnlockingEnemyWindow
}; // Scene_Battle.prototype.close_patb_selection_windows

} // if (Imported.YEP_X_SelectionControl)

if (DoubleX_RMMV["PATB Hotkey"]) {

/*----------------------------------------------------------------------------
 *    # (v1.00b+)Edit class: Window_ActorCommand.
 *----------------------------------------------------------------------------*/

Window_ActorCommand.prototype.processTouch = function() { // New; Hotspot
    this.process_patb_hotkey_touch();
    Window_Selectable.prototype.processTouch.call(this);
}; // Window_ActorCommand.prototype.processTouch

Window_ActorCommand.prototype.process_patb_hotkey_touch = function() {
// New; Hotspot
    if (!this.isOpenAndActive() || !$gameSystem.is_patb()) { return; }
    this.process_patb_hotkey_touch_select();
    this.process_patb_hotkey_touch_trigger();
}; // Window_ActorCommand.prototype.process_patb_hotkey_touch

Window_ActorCommand.prototype.process_patb_hotkey_touch_select = function() {
// New; Hotspot
    if (!Yanfly.Param.BECSelectMouseOver) { return; }
    var index = this.getMouseOverActor();
    if (index < 0) { return; }
    var mem = $gameParty.battleMembers()[index];
    if (mem.isSelected()) { return; }
    SoundManager.playCursor();
    $gameParty.select(mem);
}; // Window_ActorCommand.prototype.process_patb_hotkey_touch_select

Window_ActorCommand.prototype.process_patb_hotkey_touch_trigger = function() {
// New; Hotspot
    if (!eval(Yanfly.Param.BECActorSelect)) { return; }
    if (!TouchInput.isTriggered() || this.isTouchedInsideFrame()) { return; }
    var i = this.getClickedActor();
    if (i < 0) { return; }
    return this.callHandler($gameSystem.patb["hotkey_actor_" + i.toString()]);
}; // Window_ActorCommand.prototype.process_patb_hotkey_touch_trigger

Window_ActorCommand.prototype.getClickedActor =
Window_BattleActor.prototype.getClickedActor;

Window_ActorCommand.prototype.isClickedActor =
Window_BattleActor.prototype.isClickedActor;

Window_ActorCommand.prototype.getMouseOverActor =
Window_BattleActor.prototype.getMouseOverActor;

Window_ActorCommand.prototype.isMouseOverActor =
Window_BattleActor.prototype.isMouseOverActor;

} // if (DoubleX_RMMV["PATB Hotkey"])

} // if (Imported.YEP_BattleEngineCore)

if (Imported.YEP_BattleAICore) {

/*----------------------------------------------------------------------------
 *    # (v1.05a+)Edit class: BattleManager
 *----------------------------------------------------------------------------*/

BattleManager.add_patb_action_battler_compatibility =
BattleManager.add_patb_action_battler;
BattleManager.add_patb_action_battler = function(battler) { // v1.05a+
    // Added to clear invalid actions upon calling setAIPattern
    var is_added = this._actionBattlers.indexOf(battler) >= 0;
    if (is_added && $gameTemp.is_patb_set_ai_pattern) {
        battler.makeActionsPatb();
    }
    // YEP_BattleAICore_ClearInvalidAIActions
    BattleManager.add_patb_action_battler_compatibility(battler);
}; // BattleManager.add_patb_action_battler

/*----------------------------------------------------------------------------
 *    # (v1.05a+)Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.setAIPatternPatbCompatibility =
Game_Enemy.prototype.setAIPattern;
Game_Enemy.prototype.setAIPattern = function() {
    // Added to notify add_patb_action_battler to call makeActionsPatb
    $gameTemp.is_patb_set_ai_pattern = true;
    // YEP_BattleAICore_ClearInvalidAIActions
    this.setAIPatternPatbCompatibility();
    // Added to notify add_patb_action_battler to not call makeActionsPatb
    $gameTemp.is_patb_set_ai_pattern = false;
    // YEP_BattleAICore_ClearInvalidAIActions
}; // Game_Enemy.prototype.setAIPattern

} // if (Imported.YEP_BattleAICore)

if (Imported.MOG_BattleHud) {

/*----------------------------------------------------------------------------
 *    # (v1.01a+)Edit class: Battle_Hud
 *----------------------------------------------------------------------------*/

Battle_Hud.prototype.update_at = function() {
    if (this._at_meter) {
        if (!this.at === -1) { return this._at_meter.visible = false; }
        this._at_meter.visible = true;
        if(!this._at_flow[0]) {
            // Rewritten to update the cooldown atb bars as well
            if (this.is_casting()) {
                if (this.is_max_cast()) {
                    return this.refresh_at_meter(this._at_meter, this.cast_at(), this.cast_max_at(), 3);
                }
                return this.refresh_at_meter(this._at_meter, this.cast_at(), this.cast_max_at(), 2);
            } else if (this.is_cooling_down()) {
                if (this.is_max_cooldown()) {
                    return this.refresh_at_meter(this._at_meter, this.cooldown_at(), this.cooldown_max_at(), 3);
                }
                return this.refresh_at_meter(this._at_meter, this.cooldown_at(), this.cooldown_max_at(), 2);
            } else if (this.is_max_at()) {
                return this.refresh_at_meter(this._at_meter, this.at(), this.max_at(), 1);
            }
            // MOG_BattleHud_PATB_Data
            return this.refresh_at_meter(this._at_meter, this.at(), this.max_at(), 0);
        }
        // Rewritten to update the cooldown atb bars as well
        if (this.is_casting()) {
            if (this.is_max_cast()) {
                this.refresh_at_meter_flow(this._at_meter, this.cast_at(), this.cast_max_at(), 3, this._at_flow[1]);
            } else {
                this.refresh_at_meter_flow(this._at_meter, this.cast_at(), this.cast_max_at(), 2, this._at_flow[1]);
            }
        } else if (this.is_cooling_down()) {
            if (this.is_max_cooldown()) {
                this.refresh_at_meter_flow(this._at_meter, this.cooldown_at(), this.cooldown_max_at(), 3, this._at_flow[1]);
            } else {
                this.refresh_at_meter_flow(this._at_meter, this.cooldown_at(), this.cooldown_max_at(), 2, this._at_flow[1]);
            }
        } else if (this.is_max_at()) {
            this.refresh_at_meter_flow(this._at_meter, this.at(), this.max_at(), 1, this._at_flow[1]);
        } else {
            this.refresh_at_meter_flow(this._at_meter, this.at(), this.max_at(), 0, this._at_flow[1]);
        }
        // MOG_BattleHud_PATB_Data
        this._at_flow[1] += 1.5;
        if (this._at_flow[1] > this._at_flow[3]) { this._at_flow[1] = 0; }
    }
}; // Battle_Hud.prototype.update_at

Battle_Hud.prototype.at_patb_compatibility = Battle_Hud.prototype.at;
Battle_Hud.prototype.at = function() {
    // Added to use the ATB value from PATB only if it's active
    if ($gameSystem.is_patb()) { return this._battler.patb_val.atb; }
    // MOG_BattleHud_PATB_Data
    return this.at_patb_compatibility();
}; // Battle_Hud.prototype.at

Battle_Hud.prototype.max_at_patb_compatibility = Battle_Hud.prototype.max_at;
Battle_Hud.prototype.max_at = function() {
    // Added to use the ATB value from PATB only if it's active
    if ($gameSystem.is_patb()) { return this._battler._max_patb_val; }
    // MOG_BattleHud_PATB_Data
    return this.max_at_patb_compatibility();
}; // Battle_Hud.prototype.max_at

Battle_Hud.prototype.cast_at_patb_compatibility = Battle_Hud.prototype.cast_at;
Battle_Hud.prototype.cast_at = function() {
    // Added to use the ATB value from PATB only if it's active
    if ($gameSystem.is_patb()) {
        if (!DoubleX_RMMV["PATB Charge"]) { return 0; }
        return this._battler.patb_val.charge;
    }
    // MOG_BattleHud_PATB_Data
    return this.cast_at_patb_compatibility();
}; // Battle_Hud.prototype.cast_at

Battle_Hud.prototype.cast_max_at_patb_compatibility =
        Battle_Hud.prototype.cast_max_at;
Battle_Hud.prototype.cast_max_at = function() {
    // Added to use the ATB value from PATB only if it's active
    if ($gameSystem.is_patb()) { return this._battler._max_patb_val; }
    // MOG_BattleHud_PATB_Data
    return this.cast_max_at_patb_compatibility();
}; // Battle_Hud.prototype.cast_max_at

Battle_Hud.prototype.is_casting_patb_compatibility =
        Battle_Hud.prototype.is_casting;
Battle_Hud.prototype.is_casting = function() {
    // Added to use the ATB value from PATB only if it's active
    if ($gameSystem.is_patb()) {
        if (!DoubleX_RMMV["PATB Charge"]) { return false; }
        return this._battler.is_patb_charge();
    }
    // MOG_BattleHud_PATB_Data
    return this.is_casting_patb_compatibility();
}; // Battle_Hud.prototype.is_casting

Battle_Hud.prototype.cooldown_at = function() { // New; Hotspot
    if (!$gameSystem.is_patb() || !DoubleX_RMMV["PATB Cooldown"]) { return 0; }
    return this._battler.patb_val.cooldown;
}; // Battle_Hud.prototype.cooldown_at

Battle_Hud.prototype.cooldown_max_at = function() { // New; Hotspot
    return $gameSystem.is_patb() ? this._battler._max_patb_val : 1;
}; // Battle_Hud.prototype.cooldown_max_at

Battle_Hud.prototype.is_cooling_down = function() { // New; Hotspot
    if ($gameSystem.is_patb() && DoubleX_RMMV["PATB Cooldown"]) {
        return this._battler.is_patb_cooldown();
    }
    return false;
}; // Battle_Hud.prototype.is_cooling_down

Battle_Hud.prototype.is_max_cooldown = function() { // New; Hotspot
	return this.cooldown_at() >= this.cooldown_max_at();
}; // Battle_Hud.prototype.is_max_cooldown

/*----------------------------------------------------------------------------
 *    # (v1.01b+)Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

Scene_Battle.prototype.update_patb_window_positions = function() { // Rewrite
    // Removed to let MOG_BattleHud handle the actor window positions
    // MOG_BattleHud_Actor_Window
}; // Scene_Battle.prototype.update_patb_window_positions

Scene_Battle.prototype.close_patb_selection_windows_comnpatibility2 =
Scene_Battle.prototype.close_patb_selection_windows;
Scene_Battle.prototype.close_patb_selection_windows = function() { // v1.02b+
    this.close_patb_selection_windows_comnpatibility2();
    // Added to stop showing the status window
    this._statusWindow.close();
    this._statusWindow.hide();
    // MOG_BattleHud_StopShowingStatusWindow
}; // Scene_Battle.prototype.close_patb_selection_windows

} // if (Imported.MOG_BattleHud)

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Compatibility, place it below all other PATB plugins.");
}

/*============================================================================*/