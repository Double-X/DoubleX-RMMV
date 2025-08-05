/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Bar
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
 *      1. http://pastebin.com/fVNeBpks
 *      Video:
 *      1. https://www.youtube.com/watch?v=xY_HrHi0e5M
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00d(GMT 0600 19-5-2021):
 *      1. Fixed all notetags not working bug
 *      v1.00c(GMT 1700 16-9-2016):
 *      1. Improved this plugin's effectiveness, efficiency and robustness
 *      v1.00b(GMT 1400 31-5-2016):
 *      1. Improved this plugin's effectiveness, efficiency and readibility
 *      v1.00a(GMT 1500 19-2-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set when/how ATB bars are shown on battler sprites
 * @author DoubleX
 *
 * @param bar_show
 * @desc Sets the code as bar_show determining when the battler ATB bars will be
 *       shown on the battler sprites
 *       It'll only be used by battlers not using <patb bar show: code> notetags
 *       Available bar_show codes:
 *       always - The battler ATB bars will always be shown on the enemy sprites
 *       defeat - The actor ATB bars will always be shown on the actor sprites
 *                while the enemy ATB bars will only be shown on the enemy
 *                sprites for those being defeated before
 *                This code will only be available if DoubleX RMMV Death Records
 *                is used
 *       Setting bar_show as an unavailable code means the battler ATB bars will
 *       never be shown on the battler sprites
 * @default always
 *
 * @param bar_w
 * @desc Sets the width of the ATB bars shown on the battler sprites as bar_w
 *       It'll only be used by battlers not using any <patb bar w: w> notetag
 * @default 87
 *
 * @param bar_h
 * @desc Sets the height of the ATB bars shown on the battler sprites as bar_h
 *       It'll only be used by battlers not using any <patb bar h: h> notetag
 * @default 16
 *
 * @param bar_x
 * @desc Sets the x offset of the ATB bars shown on the battler sprites as bar_x
 *       It'll only be used by battlers not using any <patb bar x: x> notetag
 * @default 0
 *
 * @param bar_y
 * @desc Sets the y offset of the ATB bars shown on the battler sprites as bar_y
 *       It'll only be used by battlers not using any <patb bar y: y> notetag
 * @default 0
 *
 * @param bar_opacity
 * @desc Sets the opacity of the ATB bars shown on the battler sprites as
 *       bar_opacity
 *       It'll only be used by battlers not using any
 *       <patb bar opacity: opacity> notetag
 * @default 255
 *
 * @param bar_text_size
 * @desc Sets the size of the description text of the ATB bars shown on the
 *       battler sprites as bar_text_size
 *       It'll only be used by battlers not using any <patb bar text size: size>
 *       notetag
 * @default 13
 *
 * @help
 * The default plugin file name is DoubleX RMMV Popularized ATB Bar v100d
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Bar_File, which must be done via opening this plugin js
 * file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      The 1st notetag that's being read by the battler will be used
 *      1. <patb bar show: code>
 *         - Sets the code determining when the battler ATB bars will be shown
 *           on the battler sprites as code
 *           Available codes are those of bar_show
 *         - Setting code as an unavailable code means the battler ATB bars
 *           will never be shown on the battler sprites
 *      2. <patb bar w: w>
 *         - Sets the width of the ATB bars shown on the battler sprites as w
 *      3. <patb bar h: h>
 *         - Sets the height of the ATB bars shown on the battler sprites as h
 *      4. <patb bar x: x>
 *         - Sets the x offset of the ATB bars shown on the battler sprites as
 *           x
 *      5. <patb bar y: y>
 *         - Sets the y offset of the ATB bars shown on the battler sprites as
 *           y
 *      6. <patb bar opacity: opacity>
 *         - Sets the opacity of the ATB bars shown on the battler sprites as
 *           opacity
 *      7. <patb bar text size: size>
 *         - Sets the size of the description text of the ATB bars shown on
 *           the battler sprites as size
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.patb.param
 *         - Returns the value of param listed in the plugin manager
 *      2. $gameSystem.patb.param = val
 *         - Sets the value of param listed in the plugin manager as val
 *         - All $gameSystem.patb.param changes will be saved
 *    # Actor/Class/Weapon/Armor/Enemy/State manipulations
 *      1. meta.patb_bar_show
 *         - Returns the code determining when the battler ATB bars will be
 *           shown on the battler sprites
 *      2. meta.patb_bar_show = code
 *         - Sets the code determining when the battler ATB bars will be shown
 *           on the battler sprites as code
 *         - All meta.patb_bar_show changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.patb_bar_w
 *         - Returns the width of the ATB bars shown on the battler sprites
 *      4. meta.patb_bar_w = w
 *         - Sets the width of the ATB bars shown on the battler sprites as w
 *         - All meta.patb_bar_w changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.patb_bar_h
 *         - Returns the height of the ATB bars shown on the battler sprites
 *      6. meta.patb_bar_w = h
 *         - Sets the height of the ATB bars shown on the battler sprites as h
 *         - All meta.patb_bar_h changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.patb_bar_x
 *         - Returns the x offset of the ATB bars shown on the battler sprites
 *      8. meta.patb_bar_y = x
 *         - Sets the x offset of the ATB bars shown on the battler sprites as
 *           x
 *         - All meta.patb_bar_x changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      9. meta.patb_bar_y
 *         - Returns the y offset of the ATB bars shown on the battler sprites
 *      10. meta.patb_bar_y = y
 *          - Sets the y offset of the ATB bars shown on the battler sprites
 *            as y
 *          - All meta.patb_bar_y changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      11. meta.patb_bar_opacity
 *          - Returns the opacity of the ATB bars shown on the battler sprites
 *      12. meta.patb_bar_opacity = opacity
 *          - Sets the opacity of the ATB bars shown on the battler sprites
 *            as opacity
 *          - All meta.patb_bar_opacity changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      13. meta.patb_bar_text_size
 *          - Returns the size of the description text of the ATB bars shown
 *            on the battler sprites
 *      14. meta.patb_bar_text_size = size
 *          - Sets the size of the description text of the ATB bars shown on
 *            the battler sprites as size
 *          - All meta.patb_bar_size changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Bar"] = "v1.00d";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Bar_File
DoubleX_RMMV.PATB_Bar_File = "DoubleX RMMV Popularized ATB Bar v100d";

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

function Window_Patb_Bar() { this.initialize.apply(this, arguments); }

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *----------------------------------------------------------------------------*/

// data: The data to have its notetags read
DataManager.load_patb_bar_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_bar_data_notes(data);
    this.load_patb_bar_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_bar_notes = function(data) { // New
    var meta = data.meta;
    var show = /< *patb +bar +show *: *(\w+)*>/i;
    var w = /< *patb +bar +w *: *(\d+)*>/i;
    var h = /< *patb +bar +h *: *(\d+)*>/i;
    var x = /< *patb +bar +x *: *(\d+)*>/i;
    var y = /< *patb +bar +y *: *(\d+)*>/i;
    var opacity = /< *patb +bar +opacity *: *(\d+)*>/i;
    var size = /< *patb +bar +text +size *: *(\d+)*>/i;
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(show)) { return meta.patb_bar_show = RegExp.$1; }
        if (line.match(w)) { return meta.patb_bar_w = +RegExp.$1; }
        if (line.match(h)) { return meta.patb_bar_h = +RegExp.$1; }
        if (line.match(x)) { return meta.patb_bar_x = +RegExp.$1; }
        if (line.match(y)) { return meta.patb_bar_y = +RegExp.$1; }
        if (line.match(opacity)) { return meta.patb_bar_opacity = +RegExp.$1; }
        if (line.match(size)) { return meta.patb_bar_text_size = +RegExp.$1; }
    });
}; // DataManager.load_patb_bar_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_bar_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_bar_params();
    // Added
    var val, params;
    params = PluginManager.parameters(DoubleX_RMMV.PATB_Bar_File);
    Object.keys(params).forEach(function(param) {
        val = +params[param];
        this._patb[param] = isNaN(val) ? params[param] : val;
    }, this);
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
/* _patb_bar_show: The battler sprite ATB bar visibility flag
 * _patb_bar_w: The battler sprite ATB bar width
 * _patb_bar_h: The battler sprite ATB bar height
 * _patb_bar_x: The battler sprite ATB bar x offset
 * _patb_bar_y: The battler sprite ATB bar y offset
 * _patb_bar_opacity: The battler sprite ATB bar opacity
 * _patb_bar_text_size: The battler sprite ATB bar description text size
 */

Game_Battler.prototype.init_patb_bar = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_bar();
    // Added
    this._patb_battler_change.patb_bar_show = true;
    this._patb_note_change.patb_bar_show = true;
    this._patb_battler_change.patb_bar_w = true;
    this._patb_note_change.patb_bar_w = true;
    this._patb_battler_change.patb_bar_h = true;
    this._patb_note_change.patb_bar_h = true;
    this._patb_battler_change.patb_bar_x = true;
    this._patb_note_change.patb_bar_x = true;
    this._patb_battler_change.patb_bar_y = true;
    this._patb_note_change.patb_bar_y = true;
    this._patb_battler_change.patb_bar_opacity = true;
    this._patb_note_change.patb_bar_opacity = true;
    this._patb_battler_change.patb_bar_text_size = true;
    this._patb_note_change.patb_bar_text_size = true;
    //
}; // Game_Battler.prototype.init_patb

// note: The battler sprite ATB bar notetag
Game_Battler.prototype.patb_bar_note = function(note) { // New; Hotspot
    if (this.are_patb_battler_changed("patb_" + note)) {
        this.set_patb_bar_note(note);
    }
    return this["_patb_" + note];
}; // Game_Battler.prototype.patb_bar_note

// note: The battler sprite ATB bar notetag
Game_Battler.prototype.set_patb_bar_note = function(note) {
// New; Potential Hotspot
    var patb_note = "_patb_" + note;
    this[patb_note] = this.set_patb_notes("patb_" + note);
    if (!this[patb_note]) { this[patb_note] = $gameSystem.patb[note]; }
    if (note !== "bar_show") { return; }
    if (!this.isAlive()) { return this._patb_bar_show = false; }
    if (this._patb_bar_show === "always") { return this._patb_bar_show = true; }
    if (this._patb_bar_show === "defeat") {
        return this._patb_bar_show = this.is_patb_defeated();
    }
    this._patb_bar_show = false;
}; // Game_Battler.prototype.set_patb_bar_note

Game_Battler.prototype.is_patb_defeated = function() { // New; Potential Hotspot
    return true; // This doesn't mean the battler's defeated before by default
}; // Game_Battler.prototype.is_patb_defeated

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.is_patb_defeated = function() { // New; Potential Hotspot
    if (!DoubleX_RMMV["Death Records"]) { return true; }
    var death_record = this._enemyDeathRecords[enemyId];
    return death_record && death_record > 0;
}; // Game_Enemy.prototype.is_patb_defeated

/*----------------------------------------------------------------------------
 *    # Edit class: Sprite_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_bar: The battler sprite ATB bar

Sprite_Battler.prototype.initMembersPatbBar =
Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    this.initMembersPatbBar();
    this.set_patb_bar(); // Added
}; // Sprite_Battler.prototype.initMembers

/*----------------------------------------------------------------------------
 *    Reconfigures the battler sprite ATB bar upon battler change
 *----------------------------------------------------------------------------*/
Sprite_Battler.prototype.setBattlerPatbBar =
Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) { // Hotspot
    var change = battler !== this._battler; // Added
    this.setBattlerPatbBar(battler);
    if (battler && change) { this._patb_bar.battler = battler; } // Added
}; // Sprite_Battler.prototype.setBattler

Sprite_Battler.prototype.updatePatbBar = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() { // Hotspot
    this.updatePatbBar();
    this._patb_bar.updateBar(); // Added
}; // Sprite_Battler.prototype.update

Sprite_Battler.prototype.set_patb_bar = function() { // New
    this._patb_bar = new Window_Patb_Bar();
    this.addChild(this._patb_bar);
}; // Sprite_Battler.prototype.set_patb_bar

/*----------------------------------------------------------------------------
 *    # New class: Window_Patb_Bar
 *----------------------------------------------------------------------------*/

Window_Patb_Bar.prototype = Object.create(Window_Base.prototype);
Window_Patb_Bar.prototype.constructor = Window_Patb_Bar;

/*----------------------------------------------------------------------------
 *    New public instance variable
 *----------------------------------------------------------------------------*/
Object.defineProperty(Window_Patb_Bar.prototype, 'battler', {
    // The battler owning the battler sprite ATB bar
    set: function(battler) { this._battler = battler; },
    configurable: true
});

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
/* _fillWidth: The battler sprite ATB bar fill width
 * _redraw: The battler sprite ATB bar redraw flag
 */

Window_Patb_Bar.prototype.initialize = function() {
    var patb = $gameSystem.patb, x = patb.bar_x, y = patb.bar_y;
    var w = patb.bar_w, h = patb.bar_h;
    Window_Base.prototype.initialize.call(this, x, y, w, h);
	this.opacity = 0; // Only the battler sprite ATB bar needs to be shown
}; // Window_Patb_Bar.prototype.initialize

Window_Patb_Bar.prototype.standardFontSize = function() { // Hotspot
    if (this._battler) {
        return this._battler.patb_bar_note("bar_text_size");
    }
    return Window_Base.prototype.standardFontSize.call(this);
}; // Window_Patb_Bar.prototype.standardFontSize

Window_Patb_Bar.prototype.standardPadding = function() { // Hotspot
    return 0; // The whole window is just the battler sprite ATB bar
}; // Window_Patb_Bar.prototype.standardPadding

Window_Patb_Bar.prototype.resetFontSettings = function() { // Hotspot
    if (this.contents.fontSize === this.standardFontSize()) { return; }
    Window_Base.prototype.resetFontSettings.call(this);
    this._redraw = true;
}; // Window_Patb_Bar.prototype.resetFontSettings

Window_Patb_Bar.prototype.updateBar = function() { // Hotspot
    this.updateVisible();
    if (!this.visible) { return; }
    this.resetFontSettings();
    this.updateNotes();
    this.updateFillWidth();
    if (this.needRedraw()) { this.redraw(); }
}; // Window_Patb_Bar.prototype.updateBar

Window_Patb_Bar.prototype.updateVisible = function() { // Hotspot
    if (!$gameSystem.is_patb()) { return this.visible = false; }
    if (!BattleManager.can_update_patb()) { return this.visible = false; }
    if (!this._battler) { return this.visible = false; } // It's to play safe
    this.visible = this._battler.patb_bar_note("bar_show");
}; // Window_Patb_Bar.prototype.updateVisible

Window_Patb_Bar.prototype.updateNotes = function() { // Hotspot
    this.updateX();
    this.updateY();
    this.updateW();
    this.updateH();
    this.contentsOpacity = this._battler.patb_bar_note("bar_opacity");
}; // Window_Patb_Bar.prototype.updateNotes

Window_Patb_Bar.prototype.updateX = function() { // v1.00b+; Hotspot
    var newX = this._battler.patb_bar_note("bar_x");
    if (this.x !== newX) { this.x = newX; }
}; // Window_Patb_Bar.prototype.updateX

Window_Patb_Bar.prototype.updateY = function() { // v1.00b+; Hotspot
    var newY = this._battler.patb_bar_note("bar_y");
    if (this.y !== newY) { this.y = newY; }
}; // Window_Patb_Bar.prototype.updateY

Window_Patb_Bar.prototype.updateW = function() { // Hotspot
    var newW = this._battler.patb_bar_note("bar_w");
    if (this.width === newW) return;
    this.width = newW;
    this._redraw = true;
}; // Window_Patb_Bar.prototype.updateW

Window_Patb_Bar.prototype.updateH = function() { // Hotspot
    var newH = this._battler.patb_bar_note("bar_h");
    if (this.height === newH) return;
    this.height = newH;
    this._redraw = true;
}; // Window_Patb_Bar.prototype.updateH

Window_Patb_Bar.prototype.updateFillWidth = function() { // Hotspot
    var lastFillWidth = this._fillWidth, type = this._battler.patb_type();
    this._fillWidth = this.width * this._battler.patb_fill_rate(type);
    this._redraw = this._redraw || lastFillWidth !== this._fillWidth;
}; // Window_Patb_Bar.prototype.updateFillWidth

/*----------------------------------------------------------------------------
 *    Only redraws the ATB bar when it can change to boost performance
 *----------------------------------------------------------------------------*/
Window_Patb_Bar.prototype.needRedraw = function() { // Hotspot
    if (this._redraw) {
        this._redraw = false;
        return true;
    }
    return BattleManager.need_patb_refresh;
}; // Window_Patb_Bar.prototype.needRedraw

Window_Patb_Bar.prototype.redraw = function() { // Potential Hotspot
    var color = this.gaugeBackColor(), width = this._fillWidth;
    this.contents.fillRect(0, 0, this.width, this.height, color);
    var colors = this._battler.patb_colors(this._battler.patb_type());
    var color1 = this.textColor(colors[0]), color2 = this.textColor(colors[1]);
    this.contents.gradientFillRect(0, 0, width, this.height, color1, color2);
    this.changeTextColor(this.systemColor());
    var text = this._battler.patb_bar_text();
    this.contents.drawText(text, 0, 0, this.textWidth(text), this.height);
}; // Window_Patb_Bar.prototype.redraw

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Bar, place it below PATB Core.");
}

/*============================================================================*/
