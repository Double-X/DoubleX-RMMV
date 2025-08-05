/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Event
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
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/QxbNQttB
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 0200 20-2-2016):
 *      1. Improved this plugin's performance, readability and simplicity
 *      v1.00a(GMT 0200 7-2-2016):
 *      1. 1st completed version of this plugin finished
 *      v0.00b(GMT 0700 29-11-2015):
 *      1. Increased this plugin's compactness
 *      v0.00a(GMT 0900 28-11-2015):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users calls some common events at some specific atb timing
 * @author DoubleX
 *
 * @param pre_input_common_event_id
 * @desc Sets the common event with id pre_input_common_event_id to be called
 *       whenever a battler just becomes able to act
 *       pre_input_common_event_id must return a Number
 *       If pre_input_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @param post_input_common_event_id
 * @desc Sets the common event with id post_input_common_event_id to be called
 *       whenever a battler just finished inputting actions
 *       post_input_common_event_id must return a Number
 *       If post_input_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @param pre_reset_common_event_id
 * @desc Sets the common event with id pre_reset_common_event_id to be called
 *       right before resetting a battler's atb
 *       pre_reset_common_event_id must return a Number
 *       If pre_reset_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @param post_reset_common_event_id
 * @desc Sets the common event with id post_reset_common_event_id to be called
 *       right after resetting a battler's atb
 *       post_reset_common_event_id must return a Number
 *       If post_reset_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @param pre_update_common_event_id
 * @desc Sets the common event with id pre_update_common_event_id to be called
 *       right before running a global atb frame update
 *       pre_update_common_event_id must return a Number
 *       If pre_update_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @param post_update_common_event_id
 * @desc Sets the common event with id post_update_common_event_id to be called
 *       right after running a global atb frame update
 *       post_update_common_event_id must return a Number
 *       If post_update_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @help
 * The default plugin file name is DoubleX RMMV Popularized ATB Event v100b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Event_File, which must be done via opening the plugin js
 * file directly
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.patb.param
 *         - Returns the value of param listed in the plugin manager
 *      2. $gameSystem.patb.param = val
 *         - Sets the value of param listed in the plugin manager as val
 *         - All $gameSystem.patb.param changes will be saved
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Event"] = "v1.00b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Event_File
DoubleX_RMMV.PATB_Event_File = "DoubleX RMMV Popularized ATB Event v100b";

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
 *    # Edit class: Game_Temp
 *----------------------------------------------------------------------------*/

// timing: The common event trigger timing
Game_Temp.prototype.call_patb_event = function(timing) { // New
    var id = $gameSystem.patb[timing + "_common_event_id"];
    if ($dataCommonEvents[id]) { this.reserveCommonEvent(id); }
}; // Game_Temp.prototype.call_patb_event

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_event_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_event_params();
    // Added
    var params = PluginManager.parameters(DoubleX_RMMV.PATB_Event_File);
    Object.keys(params).forEach(function(param) {
        this._patb[param] = +params[param];
        if (isNaN(this._patb[param])) {
            throw new Error(param + " must be Number but is: " + params[param]);
        }
    }, this);
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

Game_Battler.prototype.make_patb_act_event =
Game_Battler.prototype.make_patb_act;
Game_Battler.prototype.make_patb_act = function() {
    // Added
    if (BattleManager.action_battlers.indexOf(this) < 0) {
        $gameTemp.call_patb_event("pre_input");
    }
    //
    this.make_patb_act_event();
}; // Game_Battler.prototype.make_patb_act

Game_Battler.prototype.reset_patb_event = Game_Battler.prototype.reset_patb;
Game_Battler.prototype.reset_patb = function() {
    $gameTemp.call_patb_event("pre_reset"); // Added
    this.reset_patb_event();
    $gameTemp.call_patb_event("post_reset"); // Added
}; // Game_Battler.prototype.reset_patb

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *----------------------------------------------------------------------------*/

Game_Actor.prototype.makeAutoBattleActionsPatbEvent =
Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
    this.makeAutoBattleActionsPatbEvent();
    // Added
    if ($gameSystem.is_patb()) { $gameTemp.call_patb_event("post_input"); }
    //
}; // Game_Actor.prototype.makeAutoBattleActions

Game_Actor.prototype.makeConfusionActionsPatbEvent =
Game_Actor.prototype.makeConfusionActions ;
Game_Actor.prototype.makeConfusionActions = function() {
    this.makeConfusionActionsPatbEvent();
    // Added
    if ($gameSystem.is_patb()) { $gameTemp.call_patb_event("post_input"); }
    //
}; // Game_Actor.prototype.makeConfusionActions

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.makeActionsPatbEvent = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    this.makeActionsPatbEvent();
    // Added
    if ($gameSystem.is_patb()) { $gameTemp.call_patb_event("post_input"); }
    //
}; // Game_Enemy.prototype.makeActions

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

Scene_Battle.prototype.update_patb_event = Scene_Battle.prototype.update_patb;
Scene_Battle.prototype.update_patb = function() { // Hotspot
    $gameTemp.call_patb_event("pre_update"); // Added
    this.update_patb_event();
    $gameTemp.call_patb_event("post_update"); // Added
}; // Scene_Battle.prototype.update_patb

Scene_Battle.prototype.confirm_patb_event_act =
Scene_Battle.prototype.confirm_patb_act;
Scene_Battle.prototype.confirm_patb_act = function() {
    this.confirm_patb_event_act();
    $gameTemp.call_patb_event("post_input"); // Added
}; // Scene_Battle.prototype.confirm_patb_act

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Event, place it below PATB Core.");
}

/*============================================================================*/
