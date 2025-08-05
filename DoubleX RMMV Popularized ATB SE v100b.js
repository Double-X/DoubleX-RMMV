/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB SE
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
 *      1. http://pastebin.com/1WAnkLrW
 *      Video:
 *      1. https://www.youtube.com/watch?v=n2kzUs1xMvY
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 1300 31-8-2016):
 *      1. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.00a(GMT 0800 23-1-2016):
 *      1. Fixed not loading this plugin's notetag bug
 *      2. Increased this plugin's compactness
 *      3. 1st completed version of this plugin finished
 *      v0.00b(GMT 0700 29-11-2015):
 *      1. Increased this plugin's compactness and readability
 *      v0.00a(GMT 0400 28-11-2015):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users add SE to be played when battlers become able to act
 * @author DoubleX
 *
 * @param battler_can_act_se_file
 * @desc Sets the filename of the se to be played when battlers become able to
 *       act as battler_can_act_se_file
 *       It'll only be used on battlers having no effective
 *       <patb can act se: file, vol, pitch, pan> notetags
 *       If battler_can_act_se_file doesn't return an existing se filename,
 *       the default will be not playing se when battlers become able to act
 * @default Bell3
 *
 * @param battler_can_act_se_vol
 * @desc Sets the volume of the se to be played when battlers become able to
 *       act as battler_can_act_se_vol
 *       It'll only be used on battlers having no effective
 *       <patb can act se: file, vol, pitch, pan> notetags
 *       battler_can_act_se_vol must return a Number between 0 and 100
 * @default 80
 *
 * @param battler_can_act_se_pitch
 * @desc Sets the pitch of the se to be played when battlers become able to
 *       act as battler_can_act_se_pitch
 *       It'll only be used on battlers having no effective
 *       <patb can act se: file, vol, pitch, pan> notetags
 *       battler_can_act_se_pitch must return a Number between 50 and 150
 * @default 100
 *
 * @param battler_can_act_se_pan
 * @desc Sets the pan of the se to be played when battlers become able to
 *       act as battler_can_act_se_pan
 *       It'll only be used on battlers having no effective
 *       <patb can act se: file, vol, pitch, pan> notetags
 *       battler_can_act_se_pan must return a Number between -100 and 100
 * @default 0
 *
 * @help
 * The default plugin file name is DoubleX RMMV Popularized ATB SE v100b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_SE_File, which must be done via opening this plugin js
 * file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      1. <patb can act se: file, vol, pitch, pan>
 *         - Sets the filename, volume, pitch and pan of the se to be played
 *           when the battler becomes able to act as file, vol, pitch and pan
 *           respectively
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
 *    # State manipulations
 *      1. meta.patb_can_act_se
 *         - Returns the filename, volume, pitch and pan in
 *           <patb can act se: file, vol, pitch, pan> in the form of
 *           [file, vol, pitch, pan]
 *      2. meta.patb_can_act_se = [file, vol, pitch, pan]
 *         - Sets the filename, volume, pitch and pan in
 *           <patb can act se: file, vol, pitch, pan> as
 *           file, vol, pitch and pan
 *         - All meta.patb_can_act_se changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB SE"] = "v1.00b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_SE_File
DoubleX_RMMV.PATB_SE_File = "DoubleX RMMV Popularized ATB SE v100b";

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
DataManager.load_patb_se_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_se_data_notes(data);
    this.load_patb_se_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_se_notes = function(data) { // New
    var lines = data.note.split(/[\r\n]+/), m = data.meta, se;
    se = /< *patb +can +act +se *: *(\w+) *, *(\d+) *, *(\d+) *, *(\d+) *>/i;
    for (var index = 0, length = lines.length; index < length; index++) {
        if (!lines[index].match(se)) { continue; }
        m.patb_can_act_se = [RegExp.$1, +RegExp.$2, +RegExp.$3, +RegExp.$4];
        return;
    }
}; // DataManager.load_patb_se_notes

/*----------------------------------------------------------------------------
 *    # (v1.00b+)Edit class: BattleManager
 *----------------------------------------------------------------------------*/

// battler: The battler to be makred as actable
BattleManager.add_patb_se_action_battler =
BattleManager.add_patb_action_battler;
BattleManager.add_patb_action_battler = function(battler) {
    var s, actable = this._actionBattlers.indexOf(battler) >= 0; // Added
    this.add_patb_se_action_battler(battler);
    // Added
    if (actable) { return; }
    s = battler.patb_can_act_se();
    AudioManager.playSe({ name: s[0], volume: s[1], pitch: s[2], pan: s[3] });
    //
}; // BattleManager.add_patb_action_battler

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_se_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_se_params();
    // Added
    var val, params;
    params = PluginManager.parameters(DoubleX_RMMV.PATB_SE_File);
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
 *    New private instance variable
 *----------------------------------------------------------------------------*/
// _patb_can_act_se: The array of battler can act se file, volume, pitch and pan

Game_Battler.prototype.make_patb_act_se = Game_Battler.prototype.make_patb_act;
Game_Battler.prototype.make_patb_act = function() {
    var s, actable = BattleManager.action_battlers.indexOf(this) >= 0; // Added
    this.make_patb_act_se();
    // Added
    if (actable) { return; }
    s = this.patb_can_act_se();
    AudioManager.playSe({ name: s[0], volume: s[1], pitch: s[2], pan: s[3] });
    //
}; // Game_Battler.prototype.make_patb_act

Game_Battler.prototype.init_patb_se = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_se();
    // Added
    this._patb_battler_change.can_act_se = true;
    this._patb_note_change.can_act_se = true;
    //
}; // Game_Battler.prototype.init_patb

/*----------------------------------------------------------------------------
 *    Rereads the effective can act se notetag only if its values can change
 *----------------------------------------------------------------------------*/
Game_Battler.prototype.patb_can_act_se = function() { // New
    if (this.are_patb_battler_changed("can_act_se")) {
        this.set_patb_can_act_se();
    }
    return this._patb_can_act_se;
}; // Game_Battler.prototype.patb_can_act_se

Game_Battler.prototype.set_patb_can_act_se = function() { // New
    this._patb_can_act_se = this.set_patb_notes("patb_can_act_se");
    if (this._patb_can_act_se) { return; }
    var patb = $gameSystem.patb, file = patb.battler_can_act_se_file;
    var vol = patb.battler_can_act_se_vol, pan = patb.battler_can_act_se_pan;
    var pitch = patb.battler_can_act_se_pitch;
    this._patb_can_act_se = [file, vol, pitch, pan];
}; // Game_Battler.prototype.set_patb_can_act_se

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB SE, place it below PATB Core.");
}

/*============================================================================*/
