/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Force
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
 *      1. http://pastebin.com/575qkWzC
 *      Video:
 *      1. https://www.youtube.com/watch?v=u8CITsswgPI
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 0500 3-7-2016):
 *      1. Fixed below configuration changes not taking place in same battle:
 *         - force_atb_window_x
 *         - force_atb_window_y
 *         - force_atb_window_width
 *         - force_atb_window_height
 *         - force_atb_text_size
 *         - force_atb_text_x
 *         - force_atb_text_y
 *         - no_force_atb_text
 *         - force_run_atb_text
 *         - force_stop_atb_text
 *      2. Increased this plugin's effectiveness, efficiency and flexibility
 *      v1.00a(GMT 1100 24-1-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set some keys to force run/stop the atb frame update
 * @author DoubleX
 *
 * @param show_force_atb_window
 * @desc Setups a window in battle indicating the atb force status if
 *       show_force_atb_window is set as true
 * @default true
 *
 * @param force_atb_window_x
 * @desc Sets the x position of the atb force status window as
 *       force_atb_window_x
 * @default 220
 *
 * @param force_atb_window_y
 * @desc Sets the y position of the atb force status window as
 *       force_atb_window_y
 * @default 108
 *
 * @param force_atb_window_width
 * @desc Sets the width of the atb force status window as
 *       force_atb_window_width
 * @default 180
 *
 * @param force_atb_window_height
 * @desc Sets the height of the atb force status window as
 *       force_atb_window_height
 * @default 60
 *
 * @param force_atb_text_size
 * @desc Sets the size of the text shown in the atb force status window as
 *       force_atb_text_size
 * @default 20
 *
 * @param force_atb_text_x
 * @desc Sets the x position of the text shown in the atb force status window
 *       as force_atb_text_x
 * @default 8
 *
 * @param force_atb_text_y
 * @desc Sets the y position of the text shown in the atb force status window
 *       as force_atb_text_y
 * @default -8
 *
 * @param no_force_atb_text
 * @desc Sets the text shown in a window indicating atb's not forced as
 *       no_force_atb_text
 * @default No Force ATB
 *
 * @param force_run_atb_text
 * @desc Sets the text shown in a window indicating atb's forced to run as
 *       force_run_atb_text
 * @default ATB Force Run
 *
 * @param force_stop_atb_text
 * @desc Sets the text shown in a window indicating atb's forced to stop as
 *       force_stop_atb_text
 * @default ATB Force Stop
 *
 * @param force_run_atb_key
 * @desc Sets the key changing the atb force status from force stop to no
 *       force or no force to force run as force_run_atb_key
 * @default shift
 *
 * @param force_stop_atb_key
 * @desc Sets the key changing the atb force status from force run to no force
 *       or no force to force stop as force_stop_atb_key
 * @default control
 *
 * @help
 * The default plugin file name is DoubleX RMMV Popularized ATB Force v100b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Force_File, which must be done via opening the plugin js
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
DoubleX_RMMV["PATB Force"] = "v1.00b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Force_File
DoubleX_RMMV.PATB_Force_File = "DoubleX RMMV Popularized ATB Force v100b";

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

function Window_Patb_Force() { this.initialize.apply(this, arguments); }

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_force_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_force_params();
    // Added
    var val, params = PluginManager.parameters(DoubleX_RMMV.PATB_Force_File);
    Object.keys(params).forEach(function(param) {
        val = +params[param];
        this._patb[param] = isNaN(val) ? params[param] : val;
    }, this);
    this._patb.show_force_atb_window = params.show_force_atb_window === "true";
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # New class: Window_Patb_Force
 *----------------------------------------------------------------------------*/

Window_Patb_Force.prototype = Object.create(Window_Base.prototype);
Window_Patb_Force.prototype.constructor = Window_Patb_Force;

/*----------------------------------------------------------------------------
 *    New public instance variable
 *----------------------------------------------------------------------------*/
// (v1.00b+)The atb force status
Object.defineProperty(Window_Patb_Force.prototype, "forceStatus", { // Hotspot
    get: function() { return this._forceStatus; },
    set: function(forceStatus) { this._forceStatus = forceStatus; },
    configurable: true
});

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _text: The cached atb force status text
// _textSize: The cached atb force status text size

// forceStatus: The atb force status
Window_Patb_Force.prototype.initialize = function(forceStatus) {
    this._forceStatus = forceStatus;
    var patb = $gameSystem.patb, x = patb.force_atb_window_x;
    var y = patb.force_atb_window_y, width = patb.force_atb_window_width;
    var height = patb.force_atb_window_height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}; // Window_Patb_Force.prototype.initialize

Window_Patb_Force.prototype.update = function() { // v1.00b+; Hotspot
    Window_Base.prototype.update.call(this);
    this.visible = $gameSystem.patb.show_force_atb_window;
    if (!this.visible) { return; }
    this.updateXYWH();
    this.updateText();
}; // Window_Patb_Force.prototype.update

Window_Patb_Force.prototype.updateXYWH = function() { // v1.00b+; Hotspot
    var patb = $gameSystem.patb, width = patb.force_atb_window_width;
    var x = patb.force_atb_window_x, y = patb.force_atb_window_y;
    var height = patb.force_atb_window_height;
    if (this.x !== x) this.x = x;
    if (this.y !== y) this.y = y;
    if (this.width !== width) this.width = width;
    if (this.height !== height) this.height = height;
}; // Window_Patb_Force.prototype.updateXYWH

Window_Patb_Force.prototype.updateText = function() { // Hotspot
    var patb = $gameSystem.patb, textSize = this._textSize, updateText;
    var textX = this._textX, textY = this._textY;
    this._textX = patb.force_atb_text_x, this._textY = patb.force_atb_text_y;
    var text = patb[this._forceStatus + "_atb_text"];
    this._textSize = patb.force_atb_text_size;
    updateText = this._text !== text || this._textSize !== textSize;
    updateText = updateText || this._textX !== textX || this._textY !== textY;
    if (!updateText) { return; }
    if (this._textSize !== textSize) { this.resetFontSettings(); }
    this._text = text, textX = this._textX, textY = this._textY;;
    this.contents.clear();
    this.drawText(this._text, textX, textY, this.textWidth(this._text));
}; // Window_Patb_Force.prototype.updateText

Window_Patb_Force.prototype.standardFontSize = function() { // Potential Hotspot
    return this._textSize;
}; // Window_Patb_Force.prototype.standardFontSize

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_force_window: The battle system indicator window

Scene_Battle.prototype.createAllWindowsPatbForce =
Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    this.createAllWindowsPatbForce();
    if ($gameSystem.is_patb()) { this.create_patb_force_window(); } // Added
}; // Scene_Battle.prototype.createAllWindows

Scene_Battle.prototype.update_patb_process_force =
Scene_Battle.prototype.update_patb_process;
Scene_Battle.prototype.update_patb_process = function() { // Hotspot
    this.update_patb_force_status(); // Added
    this.update_patb_process_force();
    this._patb_force_window.update(); // Added
}; // Scene_Battle.prototype.update_patb_process

Scene_Battle.prototype.can_update_patb_force =
Scene_Battle.prototype.can_update_patb;
Scene_Battle.prototype.can_update_patb = function() { // Hotspot
    // Added
    if (this._patb_force_window.forceStatus === "force_run") { return true; }
    if (this._patb_force_window.forceStatus === "force_stop") { return false; }
    //
    return this.can_update_patb_force();
}; // Scene_Battle.prototype.can_update_patb

Scene_Battle.prototype.close_patb_windows_force =
Scene_Battle.prototype.close_patb_windows;
Scene_Battle.prototype.close_patb_windows = function() {
    this.close_patb_windows_force();
    this.close_patb_force_windows(); // Added
}; // Scene_Battle.prototype.close_patb_windows

Scene_Battle.prototype.create_patb_force_window = function() { // New
    this._patb_force_window = new Window_Patb_Force("no_force");
    this.addWindow(this._patb_force_window);
}; // Scene_Battle.prototype.create_patb_force_window

Scene_Battle.prototype.update_patb_force_status = function() { // Hotspot
    if (Input.isTriggered($gameSystem.patb.force_run_atb_key)) {
        if (this._patb_force_window.forceStatus === "force_stop") {
            return this._patb_force_window.forceStatus = "no_force";
        }
        this._patb_force_window.forceStatus = "force_run";
    } else if (Input.isTriggered($gameSystem.patb.force_stop_atb_key)) {
        if (this._patb_force_window.forceStatus === "force_run") {
            return this._patb_force_window.forceStatus = "no_force";
        }
        this._patb_force_window.forceStatus = "force_stop";
    }
}; // Scene_Battle.prototype.update_patb_force_status

Scene_Battle.prototype.close_patb_force_windows = function() { // New
    this._patb_force_window.hide();
    this._patb_force_window.deactivate();
    this._patb_force_window.close();
}; // Scene_Battle.prototype.close_patb_force_windows

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Force, place it below PATB Core.");
}

/*============================================================================*/
