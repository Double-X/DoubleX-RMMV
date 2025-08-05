/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Action Times
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/tX0C3AR2
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00c(GMT 1300 27-1-2016):
 *      1. Fixed using 0 instead of 1 as the initial action times value
 *      v1.00b(GMT 0900 11-11-2015):
 *      1. Added descriptions that will be shown in the plugin manager
 *      2. Fixed some syntax errors
 *      v1.00a(GMT 1400 28-10-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Changes the Action Times traits from being each of them
 *             calculated independently to be added together before calculating
 *             that sum at once
 * @author DoubleX
 * @help
 * Under the default RMMV setting, if p = p1 + p2 + p3 + ... + pn, where pi is
 * the value of an Action Times trait, then the probability distribution on the
 * final action times will be:
 * P(0 or smaller) = 0
 * P(1) = (1 - x1)(1 - x2)(1 - x3)...(1 - xn)
 * P(2) = x1(1 - x2)(1 - x3)(1 - x4)...(1 - xn) + x2(1 - x1)(1 - x3)(1 - x4)...
 * (1 - xn) + x3(1 - x1)(1 - x2)(1 - x4)...(1 - xn) + ... + xn(1 - x1)(1 - x2)
 * (1 - x3)...(1 - x(n - 1))
 * P(3) = x1x2(1 - x3)(1 - x4)(1 - x5)...(1 - xn) + x1x3(1 - x1)(1 - x4)(1 - x5)
 * ...(1 - xn) + x1x4(1 - x2)(1 - x3)(1 - x5)...(1 - xn) + ... + x(n - 1)xn
 * (1 - x1)(1 - x2)(1 - x3)...(1 - x(n-2))
 * ...
 * P(n + 1) = x1x2x3...xn
 * P(n + 2 or larger) = 0
 * With this plugin's used, if a = the integer part of a p and r = the decimal
 * part of p, then the probability distribution on the final action times will
 * be:
 * P(a - 1 or smaller) = 0
 * P(a) = 1 - r
 * P(a + 1) = r
 * P(a + 2 or larger) = 0
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Act_Times"] = "v1.00c";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Little Javascript coding proficiency to fully comprehend this
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
 *  * Why rewrite/extended/What this function does
 *  *----------------------------------------------------------------------*/
/* // arguments: What these arguments are
 * function function_name(arguments) // Version X+; Rewrite/New; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     function_name_code
 *     //
 * end // function_name
 *----------------------------------------------------------------------------*/

Game_Battler.prototype.makeActionTimes = function() { // Rewrite
    // Rewritten to use the sum of all action times at once instead
    var actPercent = this.actionPlusSet().reduce(function(r, p) {
        return r + p;
    }, 1);
    var actTimes = Math.floor(actPercent);
    return Math.random() < actPercent - actTimes ? actTimes + 1 : actTimes;
    //
}; // Game_Battler.prototype.makeActionTimes

/*============================================================================*/
