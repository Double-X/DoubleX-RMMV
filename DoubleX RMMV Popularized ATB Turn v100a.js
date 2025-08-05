/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Turn
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
 *      1. http://pastebin.com/d9dWkYZE
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0500 23-1-2016):
 *      1. Increased this plugin's compactness
 *      2. 1st completed version of this plugin finished
 *      v0.00b(GMT 0700 29-11-2015):
 *      1. Increased this plugin's compactness
 *      v0.00a(GMT 0600 28-11-2015):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users multiply the max turn unit by the number of battlers
 * @author DoubleX
 *
 * @param max_turn_unit_battler_code
 * @desc Sets the code indicating which battlers will be counted for
 *       multiplying with max_turn_unit as max_turn_unit_battler_code
 *       The number of counted battlers will be multiplied to max_turn_unit
 *       Available codes for max_turn_unit_battler_code:
 *       alive_battler - All alive battlers will be counted
 *       alive_actor - All alive actors will be counted
 *       alive_enemy - All alive enemies will be counted
 *       all_battler - All battlers will be counted
 *       all_actor - All actors will be counted
 *       all_enemy - All enemies will be counted
 *       max_turn_unit_battler_code won't be used if it doesn't return any
 *       available code
 * @default alive_battler
 *
 * @help
 * The plugin file name must be the same as DoubleX_RMMV.PATB_Turn_File, which
 * must be edited by editing the plugin js file directly
 * The default value of DoubleX_RMMV.PATB_Turn_File is
 * DoubleX RMMV Popularized ATB Turn v100a
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
DoubleX_RMMV["PATB Turn"] = "v1.00a";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Turn_File
DoubleX_RMMV.PATB_Turn_File = "DoubleX RMMV Popularized ATB Turn v100a";

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
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_turn_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_turn_params();
    // Added
    var ps = PluginManager.parameters(DoubleX_RMMV.PATB_Turn_File);
    Object.keys(ps).forEach(function(p) { this._patb[p] = ps[p]; }, this);
    //
}; // Game_System.prototype.init_patb_params

// unit: The battle turn counter unit
Game_System.prototype.max_patb_turn_unit_count =
Game_System.prototype.max_patb_turn_unit;
Game_System.prototype.max_patb_turn_unit = function(unit) { // Hotspot
    // Rewritten
    var max = this.max_patb_turn_unit_count(unit);
    return max * this.max_patb_turn_unit_multiplier();
    //
}; // Game_System.prototype.max_patb_turn_unit

Game_System.prototype.max_patb_turn_unit_multiplier = function() {
// New; Hotspot
    switch (this._patb.max_turn_unit_battler_code) {
        case "alive_battler":
            var count = $gameParty.aliveMembers().length;
            return (count + $gameTroop.aliveMembers().length);
        case "alive_actor": return $gameParty.aliveMembers().length;
        case "alive_enemy": return $gameTroop.aliveMembers().length;
        case "all_battler":
            var count = $gameParty.battleMembers().length;
            return (count + $gameTroop.members().length);
        case "all_actor": return $gameParty.battleMembers().length;
        case "all_enemy": return $gameTroop.members().length;
        default: return 1;
    }
}; // Game_System.prototype.max_patb_turn_unit_multiplier

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Turn, place it below PATB Core.");
}

/*============================================================================*/
