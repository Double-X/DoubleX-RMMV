/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Rate
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
 *      1. http://pastebin.com/AB1XcyvY
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 0900 31-1-2016):
 *      1. Fixed user atb rate notetag updates not reflected to the atb rate
 *      v1.00a(GMT 0500 23-1-2016):
 *      1. Fixed undefined DataManager.this bug
 *      2. Fixed not loading this plugin's notetag bug
 *      3. Fixed name clashes between function patb_rate and getter patb_rate
 *      4. Deleted some meaningless, pointless and useless documentations
 *      5. 1st completed version of this plugin finished
 *      v0.00a(GMT 1300 29-11-2015):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users alter individual battlers' atb rate by data notetags
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State Notetags:
 *      State notetags take the highest priority, followed by enemy, weapon,
 *      armor, class and actor
 *      1. <operator patb rate: rate>
 *         - Assigns rate to the battler's atb rate via operator
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Actor/Class/Weapon/Armor/Enemy/State manipulations
 *      1. meta.patb_rate
 *         - Returns the maximum atb value with the operator stored in
 *           <operator patb rate: rate> in the form of [opeartor, rate]
 *      2. meta.patb_rate = [opeartor, rate]
 *         - Sets the atb rate with the operator stored in
 *           <operator patb rate: rate> as string operator and Number rate
 *         - All meta.patb_rate changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Rate"] = "v1.00b";

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
DataManager.load_patb_rate_data_notes = DataManager.load_patb_data_notes;
DataManager.load_patb_data_notes = function(data) {
    this.load_patb_rate_data_notes(data);
    this.load_patb_rate_notes(data); // Added
}; // DataManager.load_patb_data_notes

// data: The data to have its notetags read
DataManager.load_patb_rate_notes = function(data) { // New
    var rate = /< *(.+) +patb +rate *: *(\d+) *>/i, meta = data.meta;
    meta.patb_rate = [];
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(rate)) { meta.patb_rate.push([RegExp.$1, +RegExp.$2]); }
    });
}; // DataManager.load_patb_rate_notes

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

Game_Battler.prototype.init_patb_rate = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() { // v1.00b+
    this.init_patb_rate();
    // Added
    this._patb_battler_change.atb_rate = true;
    this._patb_note_change.atb_rate = true;
    //
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.get_base_patb_rate = Game_Battler.prototype.get_patb_rate;
Game_Battler.prototype.get_patb_rate = function() { // Hotspot
    // Rewritten
    var rate, last_rate = this._patb_rate.atb;
    this._patb_rate.atb = this.get_base_patb_rate();
    var change = last_rate !== this._patb_rate.atb;
    if (change || this.are_patb_battler_changed("atb_rate")) {
        rate = this._patb_rate.atb;
        this._patb_rate.atb = this.set_multi_patb_notes(rate, "patb_rate");
    }
    return this._patb_rate.atb;
    //
}; // Game_Battler.prototype.get_patb_rate

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Rate, place it below PATB Core.");
}

/*============================================================================*/
