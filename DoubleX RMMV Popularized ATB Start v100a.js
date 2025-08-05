/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Start
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
 *      1. http://pastebin.com/Qeii9CLm
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0500 23-1-2016):
 *      1. Fixed undefined DataManager.this bug
 *      2. Fixed not loading this plugin's notetag bug
 *      3. Fixed starting atb value possible to be under min or over max bug
 *      4. Fixed not passing arguments in set_start_patb_val bug
 *      5. Deleted some meaningless, pointless and useless documentations
 *      6. 1st completed version of this plugin finished
 *      v0.00a(GMT 1400 29-11-2015):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users alter individual battlers' atb value on battle start
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      1. <operator patb start: val>
 *         - Assigns val to the battler's atb value on battle start via
 *           operator
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *         - The final atb value on battle start will become
 *           max_atb_val - atb value on battle start for atb fill code delay
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Actor/Class/Weapon/Armor/Enemy/State manipulations
 *      1. meta.patb_start
 *         - Returns the atb value on battle start with the operator stored in
 *           <operator patb start: val> in the form of [opeartor, val]
 *      2. meta.patb_start = [opeartor, val]
 *         - Sets the atb value on battle start with the operator stored in
 *           <operator patb start: val> as string operator and Number val
 *         - All meta.patb_start changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Start"] = "v1.00a";

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
DataManager.load_patb_start_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_start_data_notes(data);
    this.load_patb_start_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_start_notes = function(data) { // New
    var s = /< *(.+) +patb +start *: *(\d+) *>/i, meta = data.meta;
    meta.patb_start = [];
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(s)) { meta.patb_start.push([RegExp.$1, +RegExp.$2]); }
    });
}; // DataManager.load_patb_start_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *----------------------------------------------------------------------------*/

// start: The battle start type
Game_BattlerBase.prototype.set_base_start_patb_val =
Game_BattlerBase.prototype.set_start_patb_val;
Game_BattlerBase.prototype.set_start_patb_val = function(start) { // New
    // Rewritten
    this.set_base_start_patb_val(start);
    var val = this._patb_val.atb;
    this._patb_val.atb = this.set_multi_patb_notes(val, "patb_start");
    if (this._patb_val.atb < 0) { return this._patb_val.atb = 0; }
    if (this._patb_val.atb <= this._max_patb_val) { return; }
    this._patb_val.atb = this._max_patb_val;
    //
}; // Game_BattlerBase.prototype.set_start_patb_val

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Start, place it below PATB Core.");
}

/*============================================================================*/
