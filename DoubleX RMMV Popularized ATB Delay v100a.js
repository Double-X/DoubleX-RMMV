/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Delay
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
 *      1. http://pastebin.com/H6fgENvB
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1400 9-2-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set some enemies and/or autobattle/confusion actors
 *             to wait for a while after being actable before inputting action
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      1. <operator patb delay: frame>
 *         - Assigns frame frames to the battler's delay via operator
 *         - The number of frames per second's hardcoded as 60 in RMMV default
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Actor/Class/Weapon/Armor/Enemy/State manipulations
 *      1. meta.patb_delay
 *         - Returns the delay in frame frames with the operator stored in
 *           <operator patb delay: frame> in the form of [opeartor, frame]
 *      2. meta.patb_delay = [opeartor, frame]
 *         - Sets the delay in frame frames with the operator stored in
 *           <operator patb delay: frame> in the form of [opeartor, frame]
 *         - The number of frames per second's hardcoded as 60 in RMMV default
 *         - All meta.patb_delay changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. patb_delay
 *         - Returns the number of frames as delay for enemies or
 *           autobattle/confusion actors after being actable before inputting
 *           actions
 *      2. patb_delay = frame
 *         - Sets the number of frames as delay for enemies or
 *           autobattle/confusion actors after being actable before inputting
 *           actions as frame
 *         - The number of frames per second's hardcoded as 60 in RMMV default
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Delay"] = "v1.00a";

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
DataManager.load_patb_delay_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_delay_data_notes(data);
    this.load_patb_delay_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_delay_notes = function(data) { // New
    var delay = /< *(.+) +patb +delay *: *(\d+) *>/i, meta = data.meta;
    meta.patb_delay = [];
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (!line.match(delay)) { return; }
        meta.patb_delay.push([RegExp.$1, +RegExp.$2]);
    });
}; // DataManager.load_patb_delay_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variable
 *----------------------------------------------------------------------------*/
// The number of frames to be delayed after being actable before inputting acts
Object.defineProperty(Game_Battler.prototype, "patb_delay", {
    get: function() { /* Potential Hotspot */ return this._patb_delay; },
    set: function(frame) { /* Potential Hotspot */ this._patb_delay = frame; },
    configurable: true
});

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _last_patb_delay: The last number of frames to be delayed

Game_Battler.prototype.init_patb_delay = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_delay();
    // Added
    this._patb_delay = this._last_patb_delay = 0;
    this._patb_battler_change.atb_delay = true;
    this._patb_note_change.atb_delay = true;
    //
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.update_patb_delay = Game_Battler.prototype.update_patb;
Game_Battler.prototype.update_patb = function() { // Hotspot
    // Added
    if (this._patb_delay > 0) { return this.update_patb_delay_frames(); }
    //
    this.update_patb_delay();
}; // Game_Battler.prototype.update_patb

Game_Battler.prototype.reset_patb_delay = Game_Battler.prototype.reset_patb;
Game_Battler.prototype.reset_patb = function() {
    this._patb_delay = 0; // Added
    this.reset_patb_delay();
}; // Game_Battler.prototype.reset_patb

Game_Battler.prototype.update_patb_delay_frames = function() { // New; Hotspot
    this.update_max_patb_val();
    this._patb_delay -= 1;
}; // Game_Battler.prototype.update_patb_delay_frames

Game_Battler.prototype.set_patb_delay_frames = function() { // New
    if (this.are_patb_battler_changed("atb_delay")) {
        this._last_patb_delay = this.set_multi_patb_notes(0, "patb_delay");
    }
    this._patb_delay = this._last_patb_delay;
}; // Game_Battler.prototype.set_patb_delay_frames

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *----------------------------------------------------------------------------*/

Game_Actor.prototype.makeAutoBattleActionsPatbDelay =
Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
    this.makeAutoBattleActionsPatbDelay();
    if ($gameSystem.is_patb()) { this.set_patb_delay_frames(); } // Added
}; // Game_Actor.prototype.makeAutoBattleActions

Game_Actor.prototype.makeConfusionActionsPatbDelay =
Game_Actor.prototype.makeConfusionActions ;
Game_Actor.prototype.makeConfusionActions = function() {
    this.makeConfusionActionsPatbDelay();
    if ($gameSystem.is_patb()) { this.set_patb_delay_frames(); } // Added
}; // Game_Actor.prototype.makeConfusionActions

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.makeActionsPatbDelay = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    this.makeActionsPatbDelay();
    if ($gameSystem.is_patb()) { this.set_patb_delay_frames(); } // Added
}; // Game_Enemy.prototype.makeActions

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Delay, place it below PATB Core.");
}

/*============================================================================*/
