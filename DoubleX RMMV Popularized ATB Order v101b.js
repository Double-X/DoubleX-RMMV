/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Order
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
 *      1. http://pastebin.com/xgKkFRev
 *      Video:
 *      1. https://www.youtube.com/watch?v=5xXQeX14FyA
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01b(GMT 1400 5-8-2017):
 *      1. Fixed "missing this in forEach" bug causing crashes in battle tests
 *      v1.01a(GMT 0500 16-7-2016):
 *      1. Added <patb order sheet folder: folder>,
 *      <patb order sheet name: name>, <patb order icon hue: hue> and
 *      <patb order icon smooth: smooth>
 *      2. Fixed <patb order icon index: row, column> and
 *         <patb order icon opacity: opacity> notetag value not being number
 *      3. Increased this plugin's effectiveness, efficiency and simplicity
 *      v1.00b(GMT 1400 2-7-2016):
 *      1. Fixed not updating the actor icon after changing actors in battle
 *      2. Fixed below configuration changes not taking place in same battle:
 *         - battler_order_window_x
 *         - battler_order_window_y
 *         - battler_order_window_width
 *         - battler_order_window_height
 *         - battler_order_bar_width
 *         - battler_order_bar_x
 *         - battler_order_bar_y
 *         - battler_order_text_size
 *         - battler_order_text_x
 *         - battler_order_text_y
 *         - battler_order_sprite_size
 *         - battler_order_sheet_folder
 *         - battler_order_sheet_name
 *         - battler_order_sheet_hue
 *         - battler_order_sheet_smooth
 *         - battler_order_sprite_width
 *         - battler_order_sprite_height
 *         - battler_order_sprite_x
 *         - actor_order_sprite_y
 *         - enemy_order_sprite_y
 *      3. Increased this plugin's effectiveness, efficiency and flexibility
 *      v1.00a(GMT 1400 31-5-2016):
 *      1. 1st completed version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you set the battle to show all battlers' atb in 1 bar
 * @author DoubleX
 *
 * @param show_battler_order_window
 * @desc Setups a window in battle showing all battler atb statuses if
 *       show_battler_order_window is set as true
 * @default true
 *
 * @param battler_order_window_x
 * @desc Sets the x position of the battler order window as
 *       battler_order_window_x
 * @default 400
 *
 * @param battler_order_window_y
 * @desc Sets the y position of the battler order window as
 *       battler_order_window_y
 * @default 108
 *
 * @param battler_order_window_width
 * @desc Sets the width of the battler order window as
 *       battler_order_window_width
 * @default 416
 * @param battler_order_window_height
 * @desc Sets the height of the battler order window as
 *       battler_order_window_height
 * @default 120
 *
 * @param battler_order_bar_width
 * @desc Sets the width of each atb bar shown in the battler order window as
 *       battler_order_bar_width
 * @default 116
 *
 * @param battler_order_bar_x
 * @desc Sets the x position of the atb bars shown in the battler order window
 *       as battler_order_bar_x
 * @default 16
 *
 * @param battler_order_bar_y
 * @desc Sets the y position of the atb bars shown in the battler order window
 *       as battler_order_bar_y
 * @default 12
 *
 * @param battler_order_text_size
 * @desc Sets the size of the atb bar description texts shown in the battler
 *       order window as battler_order_text_size
 * @default 28
 *
 * @param battler_order_text_x
 * @desc Sets the x position of the atb bar description texts shown in the
 *       battler order window as battler_order_text_x
 * @default 18
 *
 * @param battler_order_text_y
 * @desc Sets the y position of the atb bar description texts shown in the
 *       battler order window as battler_order_text_y
 * @default 24
 *
 * @param battler_order_sprite_size
 * @desc Sets the size of the battler sprites in the battler order window as
 *       battler_order_sprite_size
 * @default 40
 *
 * @param battler_order_sprite_opacity
 * @desc Sets the opacity of the battler sprites in the battler order window
 *       as battler_order_sprite_opacity
 * @default 255
 *
 * @param battler_order_sheet_folder
 * @desc Sets the folder of the sprite sheet used by the battler sprites in the
 *       battler order window as battler_order_sheet_folder
 * @default img/system/
 *
 * @param battler_order_sheet_name
 * @desc Sets the filename of the sprite sheet in battler_order_sheet_folder
 *       used by the battler sprites in the battler order window as
 *       battler_order_sheet_name
 * @default IconSet
 *
 * @param battler_order_sheet_hue
 * @desc Sets the hue of battler_order_sheet_name used by the battler sprites in
 *       the battler order window as battler_order_sheet_hue
 * @default 0
 *
 * @param battler_order_sheet_smooth
 * @desc Sets the smooth flag of battler_order_sheet_name used by the battler
 *       sprites in the battler order window as battler_order_sheet_smooth
 * @default true
 *
 * @param battler_order_sprite_width
 * @desc Sets the width of each sprite in sprite sheet used by the battler
 *       sprites in the battler order window as battler_order_sprite_width
 * @default 32
 *
 * @param battler_order_sprite_height
 * @desc Sets the height of each sprite in sprite sheet used by the battler
 *       sprites in the battler order window as battler_order_sprite_height
 * @default 32
 *
 * @param battler_order_sprite_x
 * @desc Sets the leftmost x position of the battler sprites in the battler
 *       order window as battler_order_sprite_x
 * @default 14
 *
 * @param actor_order_sprite_y
 * @desc Sets the y position of the actor sprites in the battler order window
 *       as actor_order_sprite_y
 * @default 8
 *
 * @param enemy_order_sprite_y
 * @desc Sets the y position of the enemy sprites in the battler order window
 *       as enemy_order_sprite_y
 * @default 72
 *
 * @help
 * The description text of the atb bar's hardcoded as atb with its colors
 * hardcoded to be the same as the default of those of battler atb bars
 * If the charge addon's used, the charge bar's hardcoded at the right of the
 * atb bar with its description text hardcoded as charge and colors hardcoded
 * to be the same as the dedault of those of battler charge bars
 * If the cooldown addon's used, the cooldown bar's hardcoded at the right of
 * the atb bar and the right of the charge bar(if present) with its
 * description text hardcoded as cooldown and colors hardcoded to be the same
 * as the default of those of battler cooldown bars
 * If both the charge and cooldown addons are used, it's highly encouraged and
 * recommended to place the former above the latter
 * The default plugin file name is DoubleX RMMV Popularized ATB Order v101b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Order_File, which must be done via opening this plugin js
 * file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      Notetag settings override their correponding configuration settings
 *      1. <patb order icon index: row, column>
 *         - Sets the row and column of icon used by this battler's sprite in
 *           the battler order window as row and column respectively
 *         - The row and column are used with battler_order_sheet_name
 *         - The 1st notetag that's being read by the battler will be used
 *         - If either row or column is neagtive or this notetag's absent, the
 *           actors' face graphics will be used for actors and the enemies'
 *           battler sprites will be used for enemies
 *      2. <patb order icon opacity: opacity>
 *         - Sets the opacity of icon used by this battler's sprite in the
 *           battler order window as opacity ranged from 0 to 255
 *         - The 1st notetag that's being read by the battler will be used
 *      3. (v1.01a+)<patb order sheet folder: folder>
 *         - Sets the folder of the sprite sheet used by the battler sprites
 *           in the battler order window as folder
 *         - The 1st notetag that's being read by the battler will be used
 *      4. (v1.01a+)<patb order sheet name: name>
 *         - Sets the name of the sprite sheet in the specified folder used by
 *           the battler sprites in the battler order window as name
 *         - The 1st notetag that's being read by the battler will be used
 *      5. (v1.01a+)<patb order icon hue: hue>
 *         - Sets the hue of icon used by this battler's sprite in the battler
 *           order window as hue ranged from -360 to 360
 *         - The 1st notetag that's being read by the battler will be used
 *      6. (v1.01a+)<patb order icon smooth: smooth>
 *         - Sets the smooth of icon used by this battler's sprite in the
 *           battler order window as smooth which can be either true or false
 *         - The 1st notetag that's being read by the battler will be used
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.patb.param
 *         - Returns the value of param listed in the plugin manager
 *      2. $gameSystem.patb.param = val
 *         - Sets the value of param listed in the plugin manager as val
 *         - All $gameSystem.patb.param changes will be saved
 *    # Data actor/class/weapon/armor/enemy/state manipulations
 *      1. meta.patb_order_icon_index
 *         - Returns the row and column of icon used by this battler's sprite
 *           in the battler order window stored in
 *           <patb order icon index: row, column> in the form of [row, column]
 *      2. meta.patb_order_icon_index = [row, column]
 *         - Sets the index of icon used by this battler's sprite in the
 *           battler order window stored in
 *           <patb order icon index: row, column> in the form of [row, column]
 *         - All meta.patb_order_icon_index changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.patb_order_icon_opacity
 *         - Returns the opacity of icon used by this battler's sprite in the
 *           battler order window stored in <patb order icon opacity: opacity>
 *           as Number opacity ranged from 0 to 255
 *      4. meta.patb_order_icon_opacity = opacity
 *         - Sets the opacity of icon used by this battler's sprite in the
 *           battler order window stored in <patb order icon opacity: opacity>
 *           as Number opacity ranged from 0 to 255
 *         - All meta.patb_order_icon_opacity changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.patb_order_sheet_folder
 *         - Returns the folder of sprite sheet used by this battler's sprite
 *           in the battler order window stored in
 *           <patb order sheet folder: folder> as file path in String
 *      6. meta.patb_order_sheet_folder = folder
 *         - Sets the folder of sprite sheet used by this battler's sprite in
 *           the battler order window stored in
 *           <patb order sheet folder: folder> as String folder
 *         - All meta.patb_order_sheet_folder changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. (v1.01a+)meta.patb_order_sheet_name
 *         - Returns the name of sprite sheet used by this battler's sprite in
 *           the battler order window stored in <patb order sheet name: name>
 *           as file name in String
 *      8. (v1.01a+)meta.patb_order_sheet_name = name
 *         - Sets the name of sprite sheet used by this battler's sprite in
 *           the battler order window stored in <patb order sheet name: name>
 *           as String name
 *         - All meta.patb_order_sheet_name changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Order"] = "v1.01b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Order_File
DoubleX_RMMV.PATB_Order_File = "DoubleX RMMV Popularized ATB Order v101b";

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

function Sprite_Patb_Order_Battler_Icon() {
    this.initialize.apply(this, arguments);
}
function Sprite_Patb_Order_Actor_Icon() {
    this.initialize.apply(this, arguments);
}
function Sprite_Patb_Order_Enemy_Icon() {
    this.initialize.apply(this, arguments);
}
function Window_Patb_Order() { this.initialize.apply(this, arguments); }

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *----------------------------------------------------------------------------*/

// data: The data to have its notetags read
DataManager.load_patb_order_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_order_data_notes(data);
    this.load_patb_order_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_order_notes = function(data) { // New
    var meta = data.meta, name = /< *patb +order +sheet +name *: *(\w+) *>/i;
    var icon_index = /< *patb +order +icon +index *: *(\d+) *, *(\d+) *>/i;
    var opacity = /< *patb +order +icon +opacity *: *(\d+) *>/i;
    var folder = /< *patb +order +sheet +folder *: *(\w+) *>/i;
    var hue = /< *patb +order +icon +hue *: *(\d+) *>/i;
    var smooth = /< *patb +order +icon +smooth *: *(\w+) *>/i;
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (!meta.patb_order_icon_index && line.match(icon_index)) {
            return meta.patb_order_icon_index = [+RegExp.$1, +RegExp.$2];
        } else if (!meta.patb_order_icon_opacity && line.match(opacity)) {
            return meta.patb_order_icon_opacity = +RegExp.$1;
        } else if (!meta.patb_order_sheet_folder && line.match(folder)) {
            return meta.patb_order_sheet_folder = RegExp.$1;
        } else if (!meta.patb_order_sheet_name && line.match(name)) {
            return meta.patb_order_sheet_name = RegExp.$1;
        } else if (!meta.patb_order_icon_hue && line.match(hue)) {
            return meta.patb_order_icon_hue = +RegExp.$1;
        } else if (!meta.patb_order_icon_smooth && line.match(smooth)) {
            return meta.patb_order_icon_smooth = RegExp.$1 === "true";
        }
    });
}; // DataManager.load_patb_order_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_order_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_order_params();
    // Added
    var params = PluginManager.parameters(DoubleX_RMMV.PATB_Order_File), val;
    Object.keys(params).forEach(function(param) {
        val = +params[param];
        this._patb[param] = isNaN(val) ? params[param] : val;
    }, this);
    this._patb.show_battler_order_window =
    params.show_battler_order_window === "true";
    this._patb.battler_order_sheet_smooth =
    params.battler_order_sheet_smooth === "true";
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _order_icon_index: The index of battler icon in battler_order_sheet_name
// _order_icon_opacity: The opacity of battler icon in battler_order_sheet_name

Game_Battler.prototype.init_patb_order = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_order();
    // Added
    this._patb_battler_change.order_icon_index = true;
    this._patb_battler_change.order_icon_opacity = true;
    this._patb_battler_change.order_sheet_folder = true;
    this._patb_battler_change.order_sheet_name = true;
    this._patb_note_change.order_icon_index = true;
    this._patb_note_change.order_icon_opacity = true;
    this._patb_note_change.order_sheet_folder = true;
    this._patb_note_change.order_sheet_name = true;
    //
}; // Game_Battler.prototype.init_patb

/*----------------------------------------------------------------------------
 *    Rereads the effective battler icon notetag only if its values can change
 *----------------------------------------------------------------------------*/
Game_Battler.prototype.patb_order_note = function(note) {
// v1.01a+; New; Hotspot
    if (this.are_patb_battler_changed(note)) { this["set_patb_" + note](); }
    return this["_patb_" + note];
}; // Game_Battler.prototype.patb_order_note

Game_Battler.prototype.set_patb_order_icon_index = function() {
// New; Potential Hotspot
    this._patb_order_icon_index = this.set_patb_notes("patb_order_icon_index");
    if (this._patb_order_icon_index) { return; }
    this._patb_order_icon_index = [];
}; // Game_Battler.prototype.set_patb_order_icon_index

Game_Battler.prototype.set_patb_order_icon_opacity = function() {
// New; Potential Hotspot
    this._patb_order_icon_opacity =
    this.set_patb_notes("patb_order_icon_opacity");
    if (this._patb_order_icon_opacity) { return; }
    this._patb_order_icon_opacity =
    $gameSystem.patb.battler_order_sprite_opacity;
}; // Game_Battler.prototype.set_patb_order_icon_opacity

Game_Battler.prototype.set_patb_order_sheet_folder = function() {
// v1.01a+; New; Potential Hotspot
    this._patb_order_sheet_folder =
    this.set_patb_notes("patb_order_sheet_folder");
    if (this._patb_order_sheet_folder) { return; }
    this._patb_order_sheet_folder = $gameSystem.patb.battler_order_sheet_folder;
}; // Game_Battler.prototype.set_patb_order_sheet_folder

Game_Battler.prototype.set_patb_order_sheet_name = function() {
// v1.01a+; New; Potential Hotspot
    this._patb_order_sheet_name = this.set_patb_notes("patb_order_sheet_name");
    if (this._patb_order_sheet_name) { return; }
    this._patb_order_sheet_name = $gameSystem.patb.battler_order_sheet_name;
}; // Game_Battler.prototype.set_patb_order_sheet_name

Game_Battler.prototype.set_patb_order_icon_hue = function() {
// v1.01a+; New; Potential Hotspot
    this._patb_order_icon_hue = this.set_patb_notes("patb_order_icon_hue");
    if (this._patb_order_icon_hue) { return; }
    this._patb_order_icon_hue = $gameSystem.patb.battler_order_sprite_hue;
}; // Game_Battler.prototype.set_patb_order_icon_hue

Game_Battler.prototype.set_patb_order_icon_smooth = function() {
// v1.01a+; New; Potential Hotspot
    this._patb_order_icon_smooth =
    this.set_patb_notes("patb_order_icon_smooth");
    if (this._patb_order_icon_smooth !== null) { return; }
    this._patb_order_icon_smooth = $gameSystem.patb.battler_order_sprite_smooth;
}; // Game_Battler.prototype.set_patb_order_icon_smooth

/*----------------------------------------------------------------------------
 *    # (v1.00b+)Edit class: Game_Party
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variables
 *----------------------------------------------------------------------------*/
Object.defineProperties(Game_Party.prototype, {
    // The list of id of actors that are just added into the party
    "added_patb_actor_ids": { get: function() {
        return this._added_patb_actor_ids;
    }, configurable: true },
    // The list of id of actors that are just removed from the party
    "removed_patb_actor_ids": { get: function() {
        return this._removed_patb_actor_ids;
    }, configurable: true },
});

Game_Party.prototype.initializePatb = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    this.initializePatb();
    // Added
    this._added_patb_actor_ids = [], this._removed_patb_actor_ids = [];
    //
}; // Game_Party.prototype.initialize

Game_Party.prototype.addActorPatb = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    // Added to mark that this actor's just added into the party'
    if (!this._actors.contains(actorId)) {
        this._added_patb_actor_ids.push(actorId);
    }
    //
    this.addActorPatb(actorId);
}; // Game_Party.prototype.addActor

Game_Party.prototype.removeActorPatb = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    // Added to mark that this actor's just removed from the party'
    if (this._actors.contains(actorId)) {
        this._removed_patb_actor_ids.push(actorId);
    }
    //
    this.removeActorPatb(actorId);
}; // Game_Party.prototype.removeActor

/*----------------------------------------------------------------------------
 *    # New class: Sprite_Patb_Order_Battler_Icon
 *      This class only supports actor and enemy icons
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _atbTypes: The list of all ATB types
// _battler: The owner of this battler sprite
// _bitmapSource: The last source battler sprite bitmap
// _bitmapSh: The height of the source battler sprite bitmap
// _bitmapSw: The width of the source battler sprite bitmap
// _bitmapSx: The x position of the source battler sprite bitmap
// _bitmapSy: The y position of the source battler sprite bitmap
// _iconIndex: The index of battler icon in battler_order_sheet_name
// _iconSize: The battler icon size
// _lastBitmapSource: The last source battler sprite bitmap
// _xOrigin: The leftmost x position of this battler sprite in the order window

Sprite_Patb_Order_Battler_Icon.prototype = Object.create(Sprite_Base.prototype);
Sprite_Patb_Order_Battler_Icon.prototype.constructor =
Sprite_Patb_Order_Battler_Icon;

// battler: The owner of this battler sprite
Sprite_Patb_Order_Battler_Icon.prototype.initialize = function(battler) {
    Sprite_Base.prototype.initialize.call(this);
    this._battler = battler, this.anchor.x = this.anchor.y = 0;
    var patb = $gameSystem.patb;
    this._iconSize = patb.battler_order_sprite_size;
    this._iconIndex = [], this.opacity = patb.battler_order_sprite_opacity;
    this.updateIcon();
    this.updateIconSheet();
    this._xOrigin = patb.battler_order_sprite_x;
    this._atbTypes = Object.keys(this._battler.patb_val);
    if (patb.atb_fill_code === "delay") {
        var barW = patb.battler_order_bar_width;
        this._xOrigin += barW * (Object.keys(battler.patb_val).length - 1);
    }
    this.x = this._xOrigin;
    this.bitmap = new Bitmap(this._iconSize, this._iconSize);
    this.updateBitmapSource();
}; // Sprite_Patb_Order_Battler_Icon.prototype.initialize

Sprite_Patb_Order_Battler_Icon.prototype.update = function() { // Hotspot
    this.visible = this._battler.isAlive();
    if (!this.visible) { return; }
    this.opacity = this._battler.patb_order_note("order_icon_opacity");
    if (this.opacity <= 0) { return; }
    // Updating this._bitmapSource and this.bitmap can be too resource consuming
    this.updateBitmap();
    this.updateXPos();
    this.updateYPos(); // Only actor and enemy sprites can use this function
    this.updateBitmapSource();
    //
}; // Sprite_Patb_Order_Battler_Icon.prototype.update

Sprite_Patb_Order_Battler_Icon.prototype.updateBitmapSource = function() {
// Hotspot
    var sameIcon = this.isSameIcon(), sameIconSheet = this.isSameIconSheet();
    if (sameIcon && sameIconSheet) return this.updateIconSize();
    if (this.isValidIconIndex()) { return this.setBitmapSourceIcon(); }
    // Only actor and enemy sprites can use this function
    this.setBitmapSourceBattler();
    //
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateBitmapSource

Sprite_Patb_Order_Battler_Icon.prototype.isSameIcon = function() {
// v1.00b+; Hotspot
    var iconIndex = this._iconIndex, iconChange;
    var bitmapSw = this._bitmapSw, bitmapSh = this._bitmapSh;
    this.updateIcon();
    var patb = $gameSystem.patb;
    if (this.isValidIconIndex()) {
        this._bitmapSw = patb.battler_order_sprite_width;
        this._bitmapSh = patb.battler_order_sprite_height;
    }
    iconChange = bitmapSw !== this._bitmapSw || bitmapSh !== this._bitmapSh;
    return iconChange || iconIndex !== this._iconIndex;
}; // Sprite_Patb_Order_Battler_Icon.prototype.isSameIcon

Sprite_Patb_Order_Battler_Icon.prototype.updateIcon = function() {
// v1.00b+; Hotspot
    this._iconIndex = this._battler.patb_order_note("order_icon_index");
    var patb = $gameSystem.patb;
    this._bitmapSw = patb.battler_order_sprite_width;
    this._bitmapSh = patb.battler_order_sprite_height;
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateIcon

Sprite_Patb_Order_Battler_Icon.prototype.isValidIconIndex = function() {
// v1.01a+; Hotspot
    if (this._iconIndex.length < 2) { return false; }
    return this._iconIndex[0] >= 0 && this._iconIndex[1] >= 0;
}; // Sprite_Patb_Order_Battler_Icon.prototype.isValidIconIndex

Sprite_Patb_Order_Battler_Icon.prototype.isSameIconSheet = function() {
// v1.00b+; Hotspot
    var iconFolder = this._iconFolder, iconFilename = this._iconFilename;
    var iconHue = this._iconHue, iconSmooth = this._iconSmooth, iconSheetChange;
    this.updateIconSheet();
    iconSheetChange = iconFolder !== this._iconFolder;
    iconSheetChange = iconSheetChange || iconFilename !== this._iconFilename;
    iconSheetChange = iconSheetChange || iconHue !== this._iconHue;
    return iconSheetChange || iconSmooth !== this._iconSmooth;
}; // Sprite_Patb_Order_Battler_Icon.prototype.isSameIconSheet

Sprite_Patb_Order_Battler_Icon.prototype.updateIconSheet = function() {
// v1.00b+; Hotspot
    this._iconFolder = this._battler.patb_order_note("order_sheet_folder");
    this._iconFilename = this._battler.patb_order_note("order_sheet_name");
    this._iconHue = this._battler.patb_order_note("order_icon_hue");
    this._iconSmooth = this._battler.patb_order_note("order_icon_smooth");
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateIconSheet

Sprite_Patb_Order_Battler_Icon.prototype.updateIconSize = function() {
// v1.00b+; Hotspot
    var iconSize = this._iconSize;
    this._iconSize = $gameSystem.patb.battler_order_sprite_size;
    if (iconSize !== this._iconSize) { this.redrawBitmap(); }
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateIconSize

Sprite_Patb_Order_Battler_Icon.prototype.setBitmapSourceIcon = function() {
// Potential Hotspot
    var patb =$gameSystem.patb, folder = this._iconFolder, hue = this._iconHue;
    var filename = this._iconFilename, smooth = this._iconSmooth;
    this._bitmapSource = ImageManager.loadBitmap(folder, filename, hue, smooth);
    this._bitmapSx = this._iconIndex[0] * this._bitmapSw;
    this._bitmapSy = this._iconIndex[1] * this._bitmapSh;
}; // Sprite_Patb_Order_Battler_Icon.prototype.setBitmapSourceIcon

Sprite_Patb_Order_Battler_Icon.prototype.updateBitmap = function() {
// Potential Hotspot
    if (this._lastBitmapSource === this._bitmapSource) { return; }
    this._lastBitmapSource = this._bitmapSource;
    this._bitmapSw = this._bitmapSw || this._bitmapSource.width;
    this._bitmapSh = this._bitmapSh || this._bitmapSource.height;
    this._iconSize = $gameSystem.patb.battler_order_sprite_size;
    this.redrawBitmap();
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateBitmapSource

Sprite_Patb_Order_Battler_Icon.prototype.redrawBitmap = function() {
// v1.00b+; Potential Hotspot
    var sx = this._bitmapSx, sy = this._bitmapSy;
    var sw = this._bitmapSw, sh = this._bitmapSh, ds = this._iconSize;
    this.bitmap.blt(this._bitmapSource, sx, sy, sw, sh, 0, 0, ds, ds);
}; // Sprite_Patb_Order_Battler_Icon.prototype.redrawBitmap

Sprite_Patb_Order_Battler_Icon.prototype.updateXPos = function() { // Hotspot
    var patb = $gameSystem.patb, barW = patb.battler_order_bar_width;
    var newX = this._xOrigin = patb.battler_order_sprite_x;
    var currentType = this._battler.patb_type(), type;
    var sign = patb.atb_fill_code === "delay" ? -1 : 1, r;
    for (var i = 0, length = this._atbTypes.length; i < length; i++) {
        type = this._atbTypes[i];
        if (currentType === type) {
            r = this._battler.patb_fill_rate(type);
            return this.x = newX + barW * (type === "cooldown" ? 1 - r : r);
        }
        newX += barW * sign;
    }
}; // Sprite_Patb_Order_Battler_Icon.prototype.updateXPos

/*----------------------------------------------------------------------------
 *    # New class: Sprite_Patb_Order_Actor_Icon
 *----------------------------------------------------------------------------*/

Sprite_Patb_Order_Actor_Icon.prototype =
Object.create(Sprite_Patb_Order_Battler_Icon.prototype);
Sprite_Patb_Order_Actor_Icon.prototype.constructor =
Sprite_Patb_Order_Actor_Icon;

Sprite_Patb_Order_Actor_Icon.prototype.setBitmapSourceBattler = function() {
    this._bitmapSource = ImageManager.loadFace(this._battler.faceName());
    var faceIndex = this._battler.faceIndex();
    this._bitmapSx = faceIndex % 4 * Window_Base._faceWidth;
    this._bitmapSy = Math.floor(faceIndex / 4) * Window_Base._faceHeight;
    this._bitmapSw = Window_Base._faceWidth;
    this._bitmapSh = Window_Base._faceHeight;
}; // Sprite_Patb_Order_Actor_Icon.prototype.setBitmapSourceBattler

Sprite_Patb_Order_Actor_Icon.prototype.updateYPos = function() {
// v1.00b+; Hotspot
    var newY = $gameSystem.patb.actor_order_sprite_y;
    if (this.y !== newY) { this.y = newY; }
}; // Sprite_Patb_Order_Actor_Icon.prototype.updateYPos

/*----------------------------------------------------------------------------
 *    # New class: Sprite_Patb_Order_Enemy_Icon
 *----------------------------------------------------------------------------*/

Sprite_Patb_Order_Enemy_Icon.prototype =
Object.create(Sprite_Patb_Order_Battler_Icon.prototype);
Sprite_Patb_Order_Enemy_Icon.prototype.constructor =
Sprite_Patb_Order_Enemy_Icon;

Sprite_Patb_Order_Enemy_Icon.prototype.setBitmapSourceBattler = function() {
    var func = $gameSystem.isSideView() ? "loadSvEnemy" : "loadEnemy";
    var name = this._battler.battlerName();
    this._bitmapSource = ImageManager[func](name, this._battler.battlerHue());
    this._bitmapSx = this._bitmapSy = 0, this._bitmapSw = this._bitmapSh = null;
}; // Sprite_Patb_Order_Enemy_Icon.prototype.setBitmapSourceBattler

Sprite_Patb_Order_Enemy_Icon.prototype.updateYPos = function() {
// v1.00b+; Hotspot
    var newY = $gameSystem.patb.enemy_order_sprite_y;
    if (this.y !== newY) { this.y = newY; }
}; // Sprite_Patb_Order_Enemy_Icon.prototype.updateYPos

/*----------------------------------------------------------------------------
 *    # New class: Window_Patb_Order
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
// _actor_sprites: The container of all actor sprites
// _atbTypes: The list of all ATB bar types
// _barColor1: The color 1 of ATB bar of each ATB type
// _barColor2: The color 2 of ATB bar of each ATB type
// _barW: The width of ATB bar of each ATB type
// _barX: The x offset of ATB bar of each ATB type
// _barY: The y offset of ATB bar of each ATB type
// _enemy_sprites: The container of all enemy sprites
// _textSize: The ATB bar description text size
// _textX: The x offset of ATB bar description text of each ATB type
// _textY: The y offset of ATB bar description text of each ATB type
// _redrawBars: The ATB bar redraw flag
// _redrawTexts: The ATB bar description text redraw flag

Window_Patb_Order.prototype = Object.create(Window_Base.prototype);
Window_Patb_Order.prototype.constructor = Window_Patb_Order;

Window_Patb_Order.prototype.initialize = function() {
    var patb = $gameSystem.patb;
    var x = patb.battler_order_window_x, y = patb.battler_order_window_y;
    var width = patb.battler_order_window_width;
    var height = patb.battler_order_window_height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._barColor1 = {}, this._barColor2 = {};
    // $gameParty.battleMembers()[0] always exists upon battle start
    this._atbTypes = Object.keys($gameParty.battleMembers()[0].patb_val);
    //
    this.updateBars();
    this.updateTexts();
    this.drawBarTexts();
    this.initializeBattlerSprites();
}; // Window_Patb_Order.prototype.initialize

Window_Patb_Order.prototype.initializeBattlerSprites = function() {
    this._actor_sprites = {}, this._enemy_sprites = {};
    var key;
    $gameParty.battleMembers().forEach(function(mem) {
        key = mem.actorId();
        this._actor_sprites[key] = new Sprite_Patb_Order_Actor_Icon(mem);
        this.addChild(this._actor_sprites[key]);
    }, this);
    $gameTroop.members().forEach(function(mem) {
        key = mem.index();
        this._enemy_sprites[key] = new Sprite_Patb_Order_Enemy_Icon(mem);
        this.addChild(this._enemy_sprites[key]);
    }, this);
}; // Window.Patb_Order.prototype.initializeBattlerSprites

Window_Patb_Order.prototype.update = function() { // Hotspot
    Window_Base.prototype.update.call(this);
    this.visible = $gameSystem.patb.show_battler_order_window;
    if (!this.visible) { return; }
    this.updateXYWH();
    this.updateBars();
    this.updateTexts();
    if (this._redrawBars || this._redrawTexts) { this.drawBarTexts(); }
    this.addActorSprites();
    this.removeActorSprites();
    this.updateBattlerSprites();
}; // Window_Patb_Order.prototype.update

Window_Patb_Order.prototype.updateXYWH = function() { // v1.00b+; Hotspot
    var patb = $gameSystem.patb, width = patb.battler_order_window_width;
    var x = patb.battler_order_window_x, y = patb.battler_order_window_y;
    var height = patb.battler_order_window_height;
    if (this.x !== x) this.x = x;
    if (this.y !== y) this.y = y;
    if (this.width !== width) this.width = width;
    if (this.height !== height) this.height = height;
}; // Window_Patb_Order.prototype.updateXYWH

Window_Patb_Order.prototype.updateBars = function() { // v1.00b+; Hotspot
    var barW = this._barW, barX = this._barX, barY = this._barY;
    var patb = $gameSystem.patb;
    this._barW = patb.battler_order_bar_width;
    this._barX = patb.battler_order_bar_x;
    this._barY = patb.battler_order_bar_y;
    this._redrawBars = barX !== this._barX || barY !== this._barY;
    this._redrawBars = this._redrawBars || barW !== this._barW;
    this.updateBarColors();
}; // Window_Patb_Order.prototype.updateBars

Window_Patb_Order.prototype.updateBarColors = function() { // v1.00b+; Hotspot
    // Loosens the coupling among charge, cooldown and order plugins
    var barC1, barC2, patb = $gameSystem.patb;
    this._atbTypes.forEach(function(type) {
        barC1 = this._barColor1[type], barC2 = this._barColor2[type];
        this._barColor1[type] = this.textColor(patb[type + "_c1"]);
        this._barColor2[type] = this.textColor(patb[type + "_c2"]);
        this._redrawBars = this._redrawBars || barC1 !== this._barColor1[type];
        this._redrawBars = this._redrawBars || barC2 !== this._barColor2[type];
    }, this);
    //
}; // Window_Patb_Order.prototype.updateBarColors

Window_Patb_Order.prototype.updateTexts = function() { // v1.00b+; Hotspot
    var textSize = this._textSize, textX = this._textX, textY = this._textY;
    var patb = $gameSystem.patb;
    this._textSize = patb.battler_order_text_size;
    this._textX = patb.battler_order_text_x;
    this._textY = patb.battler_order_text_y;
    this._redrawTexts = textX !== this._textX || textY !== this._textY;
    this._redrawTexts = this._redrawTexts || textSize !== this._textSize;
    if (textSize !== this._textSize) { this.resetFontSettings(); }
}; // Window_Patb_Order.prototype.updateTexts

Window_Patb_Order.prototype.drawBarTexts = function() {
// v1.00b+; Potential Hotspot
    this._redrawBars = this._redrawTexts = false;
    this.contents.clear();
    this.drawBars();
    this.drawTexts();
}; // Window_Patb_Order.prototype.drawBarTexts

Window_Patb_Order.prototype.drawBars = function() { // Potential Hotspot
    var patb = $gameSystem.patb, barC1, barC2, sign = 1, barX = this._barX;
    if (patb.atb_fill_code === "delay") {
        barX += this._barW * (types.length - 1), sign = -1;
    }
    // Loosens the coupling among charge, cooldown and order plugins
    this._atbTypes.forEach(function(type) {
        barC1 = this._barColor1[type], barC2 = this._barColor2[type];
        this.drawGauge(barX, this._barY, this._barW, 1, barC1, barC2);
        barX += this._barW * sign;
    }, this);
    //
}; // Window_Patb_Order.prototype.drawBars

Window_Patb_Order.prototype.drawTexts = function() { // Potential Hotspot
    var textX = this._textX, sign = 1;
    if ($gameSystem.patb.atb_fill_code === "delay") {
        textX += this._barW * (types.length - 1), sign = -1;
    }
    // Loosens the coupling among charge, cooldown and order plugins
    this._atbTypes.forEach(function(type) {
        this.drawText(type, textX, this._textY, this.textWidth(type));
        textX += this._barW * sign;
    }, this);
    //
}; // Window_Patb_Order.prototype.drawTexts

Window_Patb_Order.prototype.addActorSprites = function() {
    var mem;
    $gameParty.added_patb_actor_ids.forEach(function(actorId) {
        if (this._actor_sprites[actorId]) { return; }
        mem = $gameActors.actor(actorId);
        this._actor_sprites[actorId] = new Sprite_Patb_Order_Actor_Icon(mem);
        this.addChild(this._actor_sprites[actorId]);
    }, this);
    $gameParty.added_patb_actor_ids.length = 0;
}; // Window_Patb_Order.prototype.addActorSprites

Window_Patb_Order.prototype.removeActorSprites = function() {
    var mem;
    $gameParty.removed_patb_actor_ids.forEach(function(actorId) {
        if (!this._actor_sprites[actorId]) { return; }
        this.removeChild(this._actor_sprites[actorId]);
        this._actor_sprites[actorId] = null;
    }, this);
    $gameParty.removed_patb_actor_ids.length = 0;
}; // Window_Patb_Order.prototype.removeActorSprites

Window_Patb_Order.prototype.updateBattlerSprites = function() { // Hotspot
    Object.keys(this._actor_sprites).forEach(function(actorId) {
        this._actor_sprites[actorId].update();
    }, this);
    Object.keys(this._enemy_sprites).forEach(function(enemyId) {
        this._enemy_sprites[enemyId].update();
    }, this);
}; // Window_Patb_Order.prototype.updateBattlerSprites

Window_Patb_Order.prototype.standardFontSize = function() { // Potential Hotspot
    return this._textSize;
}; // Window_Patb_Order.prototype.standardFontSize

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_order_window: The battler order window

Scene_Battle.prototype.createAllWindowsPatbOrder =
Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    this.createAllWindowsPatbOrder();
    if ($gameSystem.is_patb()) { this.create_patb_order_window(); } // Added
}; // Scene_Battle.prototype.createAllWindows

Scene_Battle.prototype.update_patb_process_order =
Scene_Battle.prototype.update_patb_process;
Scene_Battle.prototype.update_patb_process = function() { // Hotspot
    this.update_patb_process_order();
    this._patb_order_window.update(); // Added
}; // Scene_Battle.prototype.update_patb_process

Scene_Battle.prototype.close_patb_windows_order =
Scene_Battle.prototype.close_patb_windows;
Scene_Battle.prototype.close_patb_windows = function() {
    this.close_patb_windows_order();
    this.close_patb_order_windows(); // Added
}; // Scene_Battle.prototype.close_patb_windows

Scene_Battle.prototype.create_patb_order_window = function() { // New
    this._patb_order_window = new Window_Patb_Order();
    this.addWindow(this._patb_order_window);
}; // Scene_Battle.prototype.create_patb_order_window

Scene_Battle.prototype.close_patb_order_windows = function() { // New
    this._patb_order_window.hide();
    this._patb_order_window.deactivate();
    this._patb_order_window.close();
}; // Scene_Battle.prototype.close_patb_order_windows

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Order, place it below PATB Core.");
}

/*============================================================================*/
