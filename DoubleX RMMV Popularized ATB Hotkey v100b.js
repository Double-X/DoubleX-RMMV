/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Hotkey
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
 *      1. http://pastebin.com/hPe0kGCm
 *      Video:
 *      1. https://www.youtube.com/watch?v=ixFqDbzgacQ
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 0500 11-8-2017):
 *      1. Fixed actors selected by hotkeys not performing the waiting pose
 *         bug
 *      v1.00a(GMT 0900 10-7-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set some hotkeys to select various inputable actors
 * @author DoubleX
 *
 * @param prior_inputable_actor
 * @desc Sets the key setting up the inputable actor at the left of the
 *       current one as prior_inputable_actor
 *       If the current one's the leftmost one, the rightmost one will be
 *       setup instead
 *       Holding prior_inputable_actor can repeatedly setup inputable actors
 *       prior_inputable_actor should remain unchanged during the same battle
 * @default left
 *
 * @param next_inputable_actor
 * @desc Sets the key setting up the inputable actor at the right of the
 *       current one as next_inputable_actor
 *       If the current one's the rightmost one, the leftmost one will be
 *       setup instead
 *       Holding next_inputable_actor can repeatedly setup inputable actors
 *       next_inputable_actor should remain unchanged during the same battle
 * @default right
 *
 * @help
 * The default plugin file name is DoubleX RMMV Popularized ATB Hotkey v100b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Hotkey_File, which must be done via opening this plugin
 * js file directly
 * You're supposed to edit this js file directly to setup hotkeys setting up
 * inputable actors with specified party member index
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.patb.param
 *         - Returns the value of param listed in the plugin manager
 *      2. $gameSystem.patb.param = val
 *         - Sets the value of param listed in the plugin manager as val
 *         - All $gameSystem.patb.param changes will be saved
 *      3. $gameSystem.patb.hotkey_actor_index
 *         - Returns the keyboard mapping of hotkey selecting the inputable
 *           actor with the specified party member index
 *      4. $gameSystem.patb.hotkey_actor_index = keyboard_mapping
 *         - Sets the keyboard mapping of hotkey selecting the inputable actor
 *           with the specified party member index as keyboard_mapping
 *         - All $gameSystem.patb.hotkey_actor_index changes will be saved
 *      5. $gameSystem.patb.hotkey_actor_count
 *         - Returns the number of hotkeys selecting the inputable actor with
 *           specified party member indices
 *      6. $gameSystem.patb.hotkey_actor_count = count
 *         - Sets the number of hotkeys selecting the inputable actor with
 *           specified party member indices as count
 *         - All $gameSystem.hotkey_actor_count changes will be saved
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Hotkey"] = "v1.00b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Hotkey_File
DoubleX_RMMV.PATB_Hotkey_File = "DoubleX RMMV Popularized ATB Hotkey v100b";

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.PATB_Hotkey = {

    /* Sets hotkeys selecting the inputable actor with the specified party
     * member index
     * None of these hotkeys are supposed to be changed during the same battle
     * Each hotkey will be referenced by $gameSystem.patb.hotkey_actor_index,
     * where index is the index of the hotkey
     * $gameSystem.patb.hotkey_actor_count must always be updated to maintain
     * the exact number of these hotkeys
     * The ith hotkey will try to select the inputable actor with party memver
     * index i - 1
     * Each of these hotkey must be a String
     * Using a keyboard mapping plugin, like Quasi Input, can be useful here
     */
    inputable_actors: [
        "#1", // Referenced by $gameSystem.patb.hotkey_actor_0
        "#2", // Referenced by $gameSystem.patb.hotkey_actor_1
        "#3", // Referenced by $gameSystem.patb.hotkey_actor_2
        "#4", // Referenced by $gameSystem.patb.hotkey_actor_3
        "#5", // Referenced by $gameSystem.patb.hotkey_actor_4
        "#6", // Referenced by $gameSystem.patb.hotkey_actor_5
        "#7", // Referenced by $gameSystem.patb.hotkey_actor_6
        "#8", // Referenced by $gameSystem.patb.hotkey_actor_7
        "#9", // Referenced by $gameSystem.patb.hotkey_actor_8
        "#0" // Referenced by $gameSystem.patb.hotkey_actor_9
    ]

}; // DoubleX_RMMV.PATB_Hotkey

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
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_hotkey_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_hotkey_params();
    // Added
    var params = PluginManager.parameters(DoubleX_RMMV.PATB_Hotkey_File);
    Object.keys(params).forEach(function(param) {
        this._patb[param] = params[param];
    }, this);
    var hotkeys = DoubleX_RMMV.PATB_Hotkey.inputable_actors;
    var length = hotkeys.length;
    this._patb.hotkey_actor_count = length;
    for (var index = 0; index < length; index++) {
        this._patb["hotkey_actor_" + index.toString()] = hotkeys[index];
    }
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Window_ActorCommand
 *----------------------------------------------------------------------------*/

Window_ActorCommand.prototype.processHandling = function() { // New
    Window_Selectable.prototype.processHandling.call(this);
    if (!this.isOpenAndActive()) { return; }
    var patb = $gameSystem.patb, hotkey;
    var prior = patb.prior_inputable_actor, next = patb.next_inputable_actor;
    this.process_patb_hotkey(prior);
    this.process_patb_hotkey(next);
    for (var i = 0, length = patb.hotkey_actor_count; i < length; i++) {
        hotkey = patb["hotkey_actor_" + i.toString()];
        if (Input.isTriggered(hotkey)) { this.callHandler(hotkey); };
    }
}; // Window_ActorCommand.prototype.processHandling

// hotkey: The hotkey to be processed
Window_ActorCommand.prototype.process_patb_hotkey = function(hotkey) { // New
	if (!Input.isTriggered(hotkey) && !Input.isRepeated(hotkey)) { return; }
    this.callHandler(hotkey);
}; // Window_ActorCommand.prototype.process_patb_hotkey

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

Scene_Battle.prototype.createActorCommandWindowPatbHotkey =
Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    this.createActorCommandWindowPatbHotkey();
    this.set_patb_hotkey_handler();
}; // Scene_Battle.prototype.createActorCommandWindow

Scene_Battle.prototype.set_patb_hotkey_handler = function() { // New
    var patb = $gameSystem.patb, h_p_n = this.set_patb_hotkey_prior_next_actor;
    var prior = patb.prior_inputable_actor, next = patb.next_inputable_actor;
    this._actorCommandWindow.setHandler(prior, h_p_n.bind(this, -1));
    this._actorCommandWindow.setHandler(next, h_p_n.bind(this, 1));
    var h_i = this.set_patb_hotkey_index_actor, hotkey;
    for (var i = 0, length = patb.hotkey_actor_count; i < length; i++) {
        hotkey = patb["hotkey_actor_" + i.toString()];
        this._actorCommandWindow.setHandler(hotkey, h_i.bind(this, i));
    }
}; // Scene_Battle.prototype.set_patb_hotkey_handler

// sign: The direction to search for new inputable actors
Scene_Battle.prototype.set_patb_hotkey_prior_next_actor = function(sign) {
    var actor_indices = BattleManager.action_battlers.filter(function(battler) {
        return battler.canInput() && battler !== BattleManager.actor();
    }).map(function(battler) { return battler.index(); });
    var length = actor_indices.length;
    if (length <= 0) { return SoundManager.playBuzzer(); }
    SoundManager.playCursor();
    this.close_patb_selection_windows();
    if (length > 1) {
        actor_indices.sort(function(a, b) { return (a - b) * sign; });
        var actor_index = BattleManager.actor().index();
        for (var index = 0; index < length; index++) {
            if (actor_indices[index] * sign > actor_index * sign) {
                BattleManager.changeActor(actor_indices[index], 'waiting');
                return this.startActorCommandSelection();
            }
        }
    }
    BattleManager.changeActor(actor_indices[0], 'waiting');
    this.startActorCommandSelection();
}; // Scene_Battle.prototype.set_patb_hotkey_prior_next_actor

// index: The party member index of the actor to be setup
Scene_Battle.prototype.set_patb_hotkey_index_actor = function(index) {
    var actor = $gameParty.battleMembers()[index];
    if (BattleManager.actor() === actor) { return SoundManager.playBuzzer(); }
    if (!actor || !actor.canInput()) { return SoundManager.playBuzzer(); }
    var actor_index = BattleManager.action_battlers.indexOf(actor);
    if (actor_index < 0) { return SoundManager.playBuzzer(); }
    SoundManager.playCursor();
    this.close_patb_selection_windows();
    BattleManager.changeActor(index, 'waiting');
    this.startActorCommandSelection();
}; // Scene_Battle.prototype.set_patb_hotkey_index_actor

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Hotkey, place it below PATB Core.");
}

/*============================================================================*/
