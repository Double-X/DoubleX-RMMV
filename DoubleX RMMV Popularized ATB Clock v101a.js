/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Clock
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
 *      1. http://pastebin.com/hEjUyYnY
 *      Video:
 *      1. https://www.youtube.com/watch?v=l9-IX16T9Gg
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01a(GMT 1200 25-3-2022):
 *      1. Added the following parameters:
 *         - turn_clock_bar_x
 *         - turn_clock_bar_y
 *         - turn_clock_bar_width
 *         - turn_clock_bar_height
 *         - turn_clock_bar_back_color
 *         - turn_clock_bar_color1
 *         - turn_clock_bar_color2
 *      v1.00b(GMT 0400 3-7-2016):
 *      1. Fixed below configuration changes not taking place in same battle:
 *         - turn_clock_window_x
 *         - turn_clock_window_y
 *         - turn_clock_window_width
 *         - turn_clock_window_height
 *         - turn_clock_text_size
 *         - turn_clock_text_x
 *         - turn_clock_text_y
 *      2. Increased this plugin's effectiveness, efficiency and flexibility
 *      v1.00a(GMT 1000 24-1-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users show the battle turn clock, unit and count in battle
 * @author DoubleX
 *
 * @param show_turn_clock_window
 * @desc Setups a window in battle showing the battle turn clock, unit and
 *       count if show_turn_clock_window is set as true
 * @default true
 *
 * @param turn_clock_window_x
 * @desc Sets the x position of the battle turn clock window as
 *       turn_clock_window_x
 * @default 0
 *
 * @param turn_clock_window_y
 * @desc Sets the y position of the battle turn clock window as
 *       turn_clock_window_y
 * @default 168
 *
 * @param turn_clock_window_width
 * @desc Sets the width of the battle turn clock window as
 *       turn_clock_window_width
 * @default 400
 *
 * @param turn_clock_window_height
 * @desc Sets the height of the battle turn clock window as
 *       turn_clock_window_height
 * @default 60
 *
 * @param turn_clock_text_size
 * @desc Sets the size of the text shown in the battle turn clock window as
 *       turn_clock_text_size
 * @default 20
 *
 * @param turn_clock_text_x
 * @desc Sets the x position of the text shown in the battle turn clock window
 *       as turn_clock_text_x
 * @default 0
 *
 * @param turn_clock_text_y
 * @desc Sets the y position of the text shown in the battle turn clock window
 *       as turn_clock_text_x
 * @default -8
 *
 * @param turn_clock_text_act
 * @desc Sets the text showing that the clock unit's action as
 *       turn_clock_text_act
 * @default Action
 *
 * @param turn_clock_text_sec
 * @desc Sets the text showing that the clock unit's second as
 *       turn_clock_text_sec
 * @default Frame
 *
 * @param turn_clock_text_unavailable
 * @desc Sets the text showing that the clock unit's unavailable as
 *       turn_clock_text_unavailable
 * @default Stopped
 *
 * @param turn_clock_bar_x
 * @desc (v1.01a+)Sets the x offset of the turn clock bar as turn_clock_bar_x
 * @default 0
 *
 * @param turn_clock_bar_y
 * @desc (v1.01a+)Sets the y offset of the turn clock bar as turn_clock_bar_y
 * @default 0
 *
 * @param turn_clock_bar_width
 * @desc (v1.01a+)Sets the width of the turn clock bar as turn_clock_bar_width
 * @default 360
 *
 * @param turn_clock_bar_height
 * @desc (v1.01a+)Sets the height of the turn clock bar as turn_clock_bar_height
 * @default 54
 *
 * @param turn_clock_bar_back_color
 * @desc (v1.01a+)Sets the color of the turn clock back bar as
 *       turn_clock_bar_back_color
 *       turn_clock_bar_back_color must return a valid text color code
 * @default 15
 *
 * @param turn_clock_bar_color1
 * @desc (v1.01a+)Sets the 1st color of the turn clock bar as
 *       turn_clock_bar_color1
 *       turn_clock_bar_color1 must return a valid text color code
 * @default 7
 *
 * @param turn_clock_bar_color2
 * @desc (v1.01a+)Sets the 2nd color of the turn clock bar as
 *       turn_clock_bar_color2
 *       turn_clock_bar_color2 must return a valid text color code
 * @default 8
 *
 * @help
 * The battle turn clock text will be hardcoded in the below format:
 * Turn Turn Count : Current Clock / Max Clock Unit
 * The default plugin file name is DoubleX RMMV Popularized ATB Clock v101a
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Clock_File, which must be done via opening the plugin js
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
DoubleX_RMMV["PATB Clock"] = "v1.01a";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Clock_File
DoubleX_RMMV.PATB_Clock_File = "DoubleX RMMV Popularized ATB Clock v101a";

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

function Window_Patb_Clock() { this.initialize.apply(this, arguments); }

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_clock_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_clock_params();
    // Added
    var val, ps = PluginManager.parameters(DoubleX_RMMV.PATB_Clock_File);
    Object.keys(ps).forEach(function(param) {
        val = +ps[param];
        this._patb[param] = isNaN(val) ? ps[param] : val;
    }, this);
    this._patb.show_turn_clock_window = ps.show_turn_clock_window === "true";
    //
}; // Game_System.prototype.init_patb_params

Game_System.prototype.is_patb_clock_unit = function() { // New; Hotspot
    var unit = this._patb.turn_unit_code;
    return unit === "act" || unit === "sec";
}; // Game_System.prototype.is_patb_clock_unit

/*----------------------------------------------------------------------------
 *    # New class: Window_Patb_Clock
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _text: The cached battle turn clock text
// _textSize: The cached battle system clock text size
// _textX: The cached battle system clock text x offset
// _textY: The cached battle system clock text y offset
// (v1.01a+) _barX: The cached battle system clock bar x offset
// (v1.01a+) _barY: The cached battle system clock bar y offset
// (v1.01a+) _barW: The cached battle system clock bar width
// (v1.01a+) _barH: The cached battle system clock bar height
// (v1.01a+) _backColor: The cached battle system clock back bar color
// (v1.01a+) _barColor1: The cached battle system clock bar 1st color
// (v1.01a+) _barColor2: The cached battle system clock bar 2nd color

Window_Patb_Clock.prototype = Object.create(Window_Base.prototype);
Window_Patb_Clock.prototype.constructor = Window_Patb_Clock;

Window_Patb_Clock.prototype.initialize = function() {
    var patb = $gameSystem.patb, x = patb.turn_clock_window_x;
    var y = patb.turn_clock_window_y, width = patb.turn_clock_window_width;
    var height = patb.turn_clock_window_height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}; // Window_Patb_Clock.prototype.initialize

Window_Patb_Clock.prototype.update = function() { // v1.00b+; Hotspot
    Window_Base.prototype.update.call(this);
    this.visible = $gameSystem.patb.show_turn_clock_window;
    if (!this.visible) { return; }
    this.updateXYWH();
    this.updateBarText();
}; // Window_Patb_Clock.prototype.update

Window_Patb_Clock.prototype.updateXYWH = function() { // v1.00b+; Hotspot
    var patb = $gameSystem.patb, width = patb.turn_clock_window_width;
    var x = patb.turn_clock_window_x, y = patb.turn_clock_window_y;
    var height = patb.turn_clock_window_height;
    if (this.x !== x) { this.x = x; }
    if (this.y !== y) { this.y = y; }
    if (this.width !== width) { this.width = width; }
    if (this.height !== height) { this.height = height; }
}; // Window_Patb_Clock.prototype.updateXYWH

Window_Patb_Clock.prototype.updateBarText = function() { // v1.01a+; Hotspot
    var x = this._barX, y = this._barY, w = this._barW, h = this._barH;
    var backColor = this._barBackColor;
    var color1 = this._barColor1, color2 = this._barColor2, text = this._text;
    var textSize = this._textSize, textX = this._textX, textY = this._textY;
    this.updateCache();
    var updateText = x !== this._barX || y !== this._barY || w !== this._barW;
    updateText = updateText || h !== this._barH || color1 !== this._barColor1;
    updateText = updateText || color2 !== this._barColor2;
    updateText = updateText || backColor !== this._barBackColor;
    var isUpdateTextSize = textSize !== this._textSize;
    updateText = updateText || text !== this._text || isUpdateTextSize;
    updateText = updateText || textX !== this._textX || textY !== this._textY;
    if (!updateText) { return; }
    if (isUpdateTextSize) { this.resetFontSettings(); }
    this.redrawBarText();
}; // Window_Patb_Clock.prototype.updateBarText

Window_Patb_Clock.prototype.updateCache = function() { // v1.01a+; Hotspot
    var patb = $gameSystem.patb;
    this._barX = patb.turn_clock_bar_x, this._barY = patb.turn_clock_bar_y;
    this._barW = patb.turn_clock_bar_width;
    this._barH = patb.turn_clock_bar_height;
    this._barBackColor = patb.turn_clock_bar_back_color;
    this._barColor1 = patb.turn_clock_bar_color1;
    this._barColor2 = patb.turn_clock_bar_color2;
    this._text = this.setText(), this._textSize = patb.turn_clock_text_size;
    this._textX = patb.turn_clock_text_x, this._textY = patb.turn_clock_text_y;
}; // Window_Patb_Clock.prototype.updateCache

Window_Patb_Clock.prototype.setText = function() { // Hotspot
    var text = "Turn " + $gameTroop.turnCount() + " : ";
    var patb = $gameSystem.patb;
    if ($gameSystem.is_patb_clock_unit()) {
        var unit = patb.turn_unit_code;
        text += BattleManager.patb_turn_clock[unit] + " / ";
        text += $gameSystem.max_patb_turn_unit(unit) + " ";
        return text + patb["turn_clock_text_" + unit];
    }
    return text + patb.turn_clock_text_unavailable;
}; // Window_Patb_Clock.prototype.setText

Window_Patb_Clock.prototype.redrawBarText = function() { // v1.01a+; Hotspot
    this.contents.clear();
    var x = this._barX, y = this._barY, w = this._barW, h = this._barH;
    this.contents.fillRect(x, y, w, h, this.textColor(this._barBackColor));
    if ($gameSystem.is_patb_clock_unit()) {
        var unit = $gameSystem.patb.turn_unit_code;
        var current = BattleManager.patb_turn_clock[unit];
        var fillW = w * current * 1.0 / $gameSystem.max_patb_turn_unit(unit);
        var color1 = this.textColor(this._barColor1);
        var color2 = this.textColor(this._barColor2);
        this.contents.gradientFillRect(x, y, fillW, h, color1, color2);
    }
    var textW = this.textWidth(this._text);
    this.drawText(this._text, this._textX, this._textY, textW);
}; // Window_Patb_Clock.prototype.redrawBarText

Window_Patb_Clock.prototype.standardFontSize = function() { // Potential Hotspot
    return this._textSize;
}; // Window_Patb_Clock.prototype.standardFontSize

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_clock_window: The battle turn clock window

Scene_Battle.prototype.createAllWindowsPatbClock =
Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    this.createAllWindowsPatbClock();
    if ($gameSystem.is_patb()) { this.create_patb_clock_window(); } // Added
}; // Scene_Battle.prototype.createAllWindows

Scene_Battle.prototype.update_patb_process_clock =
Scene_Battle.prototype.update_patb_process;
Scene_Battle.prototype.update_patb_process = function() { // Hotspot
    this.update_patb_process_clock();
    this._patb_clock_window.update(); // Added
}; // Scene_Battle.prototype.update_patb_process

Scene_Battle.prototype.close_patb_windows_clock =
Scene_Battle.prototype.close_patb_windows;
Scene_Battle.prototype.close_patb_windows = function() {
    this.close_patb_windows_clock();
    this.close_patb_clock_windows(); // Added
}; // Scene_Battle.prototype.close_patb_windows

Scene_Battle.prototype.create_patb_clock_window = function() { // New
    this._patb_clock_window = new Window_Patb_Clock();
    this.addWindow(this._patb_clock_window);
}; // Scene_Battle.prototype.create_patb_clock_window

Scene_Battle.prototype.close_patb_clock_windows = function() { // New
    this._patb_clock_window.hide();
    this._patb_clock_window.deactivate();
    this._patb_clock_window.close();
}; // Scene_Battle.prototype.close_patb_clock_windows

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Clock, place it below PATB Core.");
}

/*============================================================================*/
