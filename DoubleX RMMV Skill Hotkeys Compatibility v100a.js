/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Skill Hotkeys Compatibility
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Skill Hotkeys
 *      Abilities:
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. https://pastebin.com/EWqAxchp
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0900 6-9-2019):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Skill Hotkeys compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # Yanfly Engine Plugins - Skill Learn System
 *      1. All skills that shouldn't be learnable are falsely learnable
 *         - Reference tag: YEP_SkillLearnSystem_Window_SkillLearnEnabled
 *         - Added Window_SkillLearn.prototype.isCurrentItemEnabled using the
 *           original Window_SkillList counterpart logic to stop
 *           DoubleX RMMV Skill Hotkeys from breaking isCurrentItemEnabled in
 *           Window_SkillLearn
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Hotkeys Compatibility"] = "v1.00a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of how DoubleX RMMV Skill Hotkeys and each
 *           addressed plugin works
 *         - Some Javascript coding proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Skill Hotkeys"]) {

/*----------------------------------------------------------------------------*/

if (Imported.YEP_SkillLearnSystem) {

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillLearn
 *      - Stops Skill Hotkeys from breaking skill learnabilities
 *----------------------------------------------------------------------------*/

(function(SH) {

    "use strict";

    var _WSL = SH.Window_SkillList.orig;

     /**
      * Nullipotent
      * @author DoubleX
      * @interface
      * @returns {Boolean} The check result
      * @since v1.00a
      * @version v1.00a
      */
    Window_SkillLearn.prototype.isCurrentItemEnabled = function() {
        // Yanfly can add the vanilla one to fix compatibility with all plugins
        return _WSL.isCurrentItemEnabled.call(this);
        // YEP_SkillLearnSystem_Window_SkillLearnEnabled
    }; // Window_SkillLearn.prototype.isCurrentItemEnabled

})(DoubleX_RMMV.Skill_Hotkeys);

} // if (Imported.YEP_SkillLearnSystem)

/*----------------------------------------------------------------------------*/

} else {
    alert("Place Skill Hotkeys Compatibility below Skill Hotkeys.");
}

/*============================================================================*/
