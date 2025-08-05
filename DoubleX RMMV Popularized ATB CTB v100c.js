/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB CTB
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
 *      1. http://pastebin.com/rFw3nsAZ
 *      Video:
 *      1. https://www.youtube.com/watch?v=o-DF-tPTsF0
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00c(GMT 0500 3-7-2016):
 *      1. Fixed below configuration changes not taking place in same battle:
 *         - battle_system_window_x
 *         - battle_system_window_y
 *         - battle_system_window_width
 *         - battle_system_window_height
 *         - battle_system_text_size
 *         - battle_system_text_x
 *         - battle_system_text_y
 *      2. Increased this plugin's effectiveness, efficiency and flexibility
 *      v1.00b(GMT 1000 24-1-2016):
 *      1. Fixed not clearing old text before showing new ones bug
 *      2. Increased this plugin's compactness, readability and simplicity
 *      v1.00a(GMT 1400 23-1-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users switch the battle system to mimic charge turn battle
 * @author DoubleX
 *
 * @param show_battle_system_window
 * @desc Setups a window in battle indicating whether atb or ctb's used if
 *       show_battle_system_window is set as true
 * @default true
 *
 * @param battle_system_window_x
 * @desc Sets the x position of the battle system indicator window as
 *       battle_system_window_x
 * @default 0
 *
 * @param battle_system_window_y
 * @desc Sets the y position of the battle system indicator window as
 *       battle_system_window_y
 * @default 108
 *
 * @param battle_system_window_width
 * @desc Sets the width of the battle system indicator window as
 *       battle_system_window_width
 * @default 220
 *
 * @param battle_system_window_height
 * @desc Sets the height of the battle system indicator window as
 *       battle_system_window_height
 * @default 60
 *
 * @param battle_system_text_size
 * @desc Sets the size of the text shown in the battle system indicator window
 *       as battle_system_text_size
 * @default 20
 *
 * @param battle_system_text_x
 * @desc Sets the x position of the text shown in the battle system indicator
 *       window as battle_system_text_x
 * @default 0
 *
 * @param battle_system_text_y
 * @desc Sets the y position of the text shown in the battle system indicator
 *       window as battle_system_text_y
 * @default -8
 *
 * @param atb_battle_system_text
 * @desc Sets the text shown in a window indicating atb's used in battle as
 *       atb_battle_system_text
 * @default Active Time Battle
 *
 * @param ctb_battle_system_text
 * @desc Sets the text shown in a window indicating ctb's used in battle as
 *       ctb_battle_system_text
 * @default Charge Turn Battle
 *
 * @help
 * battle_system_code now supports ctb as well, which changes the battle
 * system into ctb
 * The default plugin file name is DoubleX RMMV Popularized ATB CTB v100c
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_CTB_File, which must be done via opening the plugin js
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
DoubleX_RMMV["PATB CTB"] = "v1.00c";

// The plugin file name must be the same as DoubleX_RMMV.PATB_CTB_File
DoubleX_RMMV.PATB_CTB_File = "DoubleX RMMV Popularized ATB CTB v100c";

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

function Window_Patb_Ctb() { this.initialize.apply(this, arguments); }

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Implements the ctb system replication when it's asked and allowed
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    Runs the global and battler atb clocks until they've to stop
 *----------------------------------------------------------------------------*/
BattleManager.update_patb_ctb = BattleManager.update_patb;
BattleManager.update_patb = function() { // Hotspot
    // Rewritten
    do { this.update_patb_ctb(); } while (this.can_update_patb_ctb());
    //
}; // BattleManager.update_patb

/*----------------------------------------------------------------------------
 *    Checks if the atb frame updates can behave in the ctb manner
 *----------------------------------------------------------------------------*/
BattleManager.can_update_patb_ctb = function() { // New; Hotspot
    if ($gameSystem.patb.battle_system_code !== "ctb") { return false; }
    if (this._phase === 'action' || this.isInputting()) { return false; }
    return !this.isBusy() && !this._need_patb_refresh;
}; // BattleManager.can_update_patb_ctb

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_ctb_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_ctb_params();
    // Added
    var val, params = PluginManager.parameters(DoubleX_RMMV.PATB_CTB_File);
    Object.keys(params).forEach(function(param) {
        val = +params[param];
        this._patb[param] = isNaN(val) ? params[param] : val;
    }, this);
    this._patb.show_battle_system_window =
    params.show_battle_system_window === "true";
    //
}; // Game_System.prototype.init_patb_params

Game_System.prototype.is_patb_ctb = Game_System.prototype.is_patb;
Game_System.prototype.is_patb = function() { // Hotspot
    // Rewritten
    return this.is_patb_ctb() || this._patb.battle_system_code === "ctb";
    //
}; // Game_System.prototype.is_patb

/*----------------------------------------------------------------------------
 *    # New class: Window_Patb_Ctb
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _text: The cached battle system text
// _textSize: The cached battle system text size

Window_Patb_Ctb.prototype = Object.create(Window_Base.prototype);
Window_Patb_Ctb.prototype.constructor = Window_Patb_Ctb;

Window_Patb_Ctb.prototype.initialize = function() {
    var patb = $gameSystem.patb, width = patb.battle_system_window_width;
    var x = patb.battle_system_window_x, y = patb.battle_system_window_y;
    var height = patb.battle_system_window_height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}; // Window_Patb_Ctb.prototype.initialize

Window_Patb_Ctb.prototype.update = function() { // v1.00b+; Hotspot
    Window_Base.prototype.update.call(this);
    this.visible = $gameSystem.patb.show_battle_system_window;
    if (!this.visible) { return; }
    this.updateXYWH();
    this.updateText();
}; // Window_Patb_Ctb.prototype.update

Window_Patb_Ctb.prototype.updateXYWH = function() { // v1.00b+; Hotspot
    var patb = $gameSystem.patb, width = patb.battle_system_window_width;
    var x = patb.battle_system_window_x, y = patb.battle_system_window_y;
    var height = patb.battle_system_window_height;
    if (this.x !== x) this.x = x;
    if (this.y !== y) this.y = y;
    if (this.width !== width) this.width = width;
    if (this.height !== height) this.height = height;
}; // Window_Patb_Ctb.prototype.updateXYWH

Window_Patb_Ctb.prototype.updateText = function() { // Hotspot
    var patb = $gameSystem.patb, textSize = this._textSize, updateText;
    var textX = this._textX, textY = this._textY;
    var text = patb[patb.battle_system_code + "_battle_system_text"];
    this._textSize = patb.battle_system_text_size;
    this._textX = patb.battle_system_text_x;
    this._textY = patb.battle_system_text_y;
    updateText = this._text !== text || this._textSize !== textSize;
    updateText = updateText || this._textX !== textX || this._textY !== textY;
    if (!updateText) { return; }
    if (this._textSize !== textSize) { this.resetFontSettings(); }
    this._text = text, textX = this._textX, textY = this._textY;
    this.contents.clear();
    this.drawText(this._text, textX, textY, this.textWidth(this._text));
}; // Window_Patb_Ctb.prototype.updateText

Window_Patb_Ctb.prototype.standardFontSize = function() { // Potential Hotspot
    return this._textSize;
}; // Window_Patb_Ctb.prototype.standardFontSize

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_ctb_window: The battle system indicator window

Scene_Battle.prototype.createAllWindowsPatbCtb =
Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    this.createAllWindowsPatbCtb();
    if ($gameSystem.is_patb()) { this.create_patb_ctb_window(); } // Added
}; // Scene_Battle.prototype.createAllWindows

Scene_Battle.prototype.update_patb_process_ctb =
Scene_Battle.prototype.update_patb_process;
Scene_Battle.prototype.update_patb_process = function() { // Hotspot
    this.update_patb_process_ctb();
    this._patb_ctb_window.update; // Added
}; // Scene_Battle.prototype.update_patb_process

Scene_Battle.prototype.close_patb_windows_ctb =
Scene_Battle.prototype.close_patb_windows;
Scene_Battle.prototype.close_patb_windows = function() {
    this.close_patb_windows_ctb();
    this.close_patb_ctb_windows(); // Added
}; // Scene_Battle.prototype.close_patb_windows

Scene_Battle.prototype.create_patb_ctb_window = function() { // New
    this._patb_ctb_window = new Window_Patb_Ctb();
    this.addWindow(this._patb_ctb_window);
}; // Scene_Battle.prototype.create_patb_ctb_window

Scene_Battle.prototype.close_patb_ctb_windows = function() { // New
    this._patb_ctb_window.hide();
    this._patb_ctb_window.deactivate();
    this._patb_ctb_window.close();
}; // Scene_Battle.prototype.close_patb_ctb_windows

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB CTB, place it below PATB Core.");
}

/*============================================================================*/
