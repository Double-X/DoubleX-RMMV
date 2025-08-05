/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Reset
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
 *      1. http://pastebin.com/b1w0zqYw
 *      Video:
 *      1. https://www.youtube.com/watch?v=Iqy7c1Wm7TQ
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00c(GMT 1400 18-6-2020):
 *      1. atb_reset_code now supports all battler getter names
 *      v1.00b(GMT 1400 31-5-2016):
 *      1. Fixed a bug where the reset value is always 0 in the delay mode
 *      v1.00a(GMT 0800 20-2-2016):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set skills/items to have different ATB reset values
 * @author DoubleX
 *
 * @help
 * (v1.00c+)atb_reset_code now also supports the following:
 *          hp, mp, tp, mhp, mmp, atk, def, mat, mdf, agi, luk, hit, eva,
 *          cri, cev, mev, mrf, cnt, hrg, mrg, trg, tgr, grd, rec, pha, mcr,
 *          tcr, pdr, mdr, fdr, exr(Actually any battler getter name)
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item Notetags:
 *      1. <operator patb reset: val>
 *         - Assigns val to the battler's atb reset value via operator
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Skill/Item manipulations
 *      1. meta.patb_reset
 *         - Returns the atb reset value with the operator stored in
 *           <operator patb reset: val> in the form of [opeartor, val]
 *      2. meta.patb_reset = [opeartor, val]
 *         - Sets the atb reset value with the operator stored in
 *           <operator patb reset: val> as string operator and Number val
 *         - All meta.patb_reset changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. patb_reset_val
 *         - Returns the battler ATB reset value
 *      2. patb_reset_val = val
 *         - Sets the battler ATB reset value as val
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Reset"] = "v1.00c";

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
DataManager.load_all_patb_reset_notes = DataManager.load_all_patb_notes;
DataManager.load_all_patb_notes = function() {
    // Added
    [$dataSkills, $dataItems].forEach(function(type) {
        type.forEach(function(data) {
            if (data) { this.load_patb_reset_notes(data); }
        }, this);
    }, this);
    //
    return this.load_all_patb_reset_notes();
}; // DataManager.load_all_patb_notes

// data: The data to have its notetags read
DataManager.load_patb_reset_notes = function(data) { // New
    var reset = /< *(.+) +patb +reset *: *(\d+) *>/i, m = data.meta;
    m.patb_reset = [];
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(reset)) { m.patb_reset.push([RegExp.$1, +RegExp.$2]); }
    });
}; // DataManager.load_patb_reset_notes

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *----------------------------------------------------------------------------*/

BattleManager.endActionPatbReset = BattleManager.endAction;
BattleManager.endAction = function() {
    // Added to cache the ATB reset value
    if ($gameSystem.is_patb() && this._action && this._action.item()) {
        this._subject.set_patb_reset_val(this._action.item());
    }
    //
    this.endActionPatbReset();
}; // BattleManager.endAction

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variable
 *----------------------------------------------------------------------------*/

Object.defineProperty(Game_Battler.prototype, 'patb_reset_val', {
    get: function() { return this._patb_reset_val; },
    set: function(val) { this._patb_reset_val = val; },
    configurable: true
});

Game_Battler.prototype.init_patb_reset = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_reset();
    this._patb_reset_val = 0; // Added
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.reset_patb_val_reset =
Game_Battler.prototype.reset_patb_val;
Game_Battler.prototype.reset_patb_val = function() {
    this.reset_patb_val_reset();
    var reset = $gameSystem.patb.atb_reset_code;
    var val = reset ? this[reset] || 0 : 0;
    if ($gameSystem.patb.atb_fill_code === "delay") {
        this._patb_val.atb -= this._patb_reset_val + val;
        this._patb_val.atb = Math.max(this._patb_val.atb, 0);
    } else {
        this._patb_val.atb += this._patb_reset_val + val;
        this._patb_val.atb = this._patb_val.atb.clamp(0, this._max_patb_val);
    }
    this._patb_reset_val = 0;
}; // Game_Battler.prototype.reset_patb_val

Game_Battler.prototype.set_patb_reset_val = function(item) {
    var val = this._patb_reset_val;
    item.meta.patb_reset.forEach(function(reset) {
        val = this.operate_patb_notes(val, reset[0], reset[1]);
    }, this);
    this._patb_reset_val = val;
}; // Game_Battler.prototype.set_patb_reset_val

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Reset, place it below PATB Core.");
}

/*============================================================================*/
