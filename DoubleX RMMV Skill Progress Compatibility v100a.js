/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Skill Progress Compatibility
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. If you repost this plugin directly(rather than just linking back),
 *         you shall inform me of these direct repostings. I always reserve
 *         the right to request you to edit those direct repostings.
 *      5. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions not needing follow so.
 *      6. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Skill Progress
 *      Abilities:
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      DoubleX RMMV Skill Progress:
 *      1. https://pastebin.com/6XdtFJYD
 *      This plugin:
 *      1. https://pastebin.com/PhPhgJry
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1100 6-Dec-2019):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Skill Progress compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # DoubleX RMMV Skill Hotkeys
 *      1. Progress command window and hotkey command window are needlessly
 *         separate
 *         - Reference tag: DoubleX_RMMV.Skill_Hotkeys.onItemOk
 *         - Combined the view progress command from its window into the hotkey
 *           counterpart to be more effective and efficient
 *    # Yanfly Engine Plugins - Skill Learn System
 *      1. All skills that shouldn't be learnable are falsely learnable
 *         - Reference tag: YEP_SkillLearnSystem_Window_SkillLearnEnabled
 *         - Added Window_SkillLearn.prototype.isCurrentItemEnabled using the
 *           original Window_SkillList counterpart logic to stop
 *           DoubleX RMMV Skill Progress from breaking isCurrentItemEnabled in
 *           Window_SkillLearn
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Progress Compatibility"] = "v1.00a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of how DoubleX RMMV Skill Progress and each
 *           addressed plugin works
 *         - Some Javascript coding proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Skill Progress"]) {

DoubleX_RMMV.Skill_Progress_Compatibility = {};

/*----------------------------------------------------------------------------*/

if (DoubleX_RMMV.Skill_Hotkeys) {

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillHotkeyCmd
 *      - Integrates the bind command into the skill progress command window
 *----------------------------------------------------------------------------*/

(function(SPC, SP) {

    "use strict";

    var _WSHC = SPC.Window_SkillHotkeyCmd = { orig: {}, new: {} };
    var $ = Window_SkillHotkeyCmd.prototype;

    _WSHC.orig._makeCmdList = $._makeCmdList;
    _WSHC.new._makeCmdList = $._makeCmdList = function(skillId) {
    // v1.00a - v1.00a; Extended
        _WSHC.orig._makeCmdList.apply(this, arguments);
        // Added to integrate the view skill progress command from its window
        var skillProgress = SceneManager._scene._skillProgress;
        if (!skillProgress) return;
        var cmdView = SP.params.cmdView.call(skillProgress.cmdWin);
        this.addCommand(cmdView, "viewSkillProgress",
                skillId && this._actor.isSkillProgress(skillId));
        //
    }; // $._makeCmdList

})(DoubleX_RMMV.Skill_Progress_Compatibility, DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Skill
 *      - Integrates skillHotkeys._cmdWindow into _skillProgress.cmdWin
 *----------------------------------------------------------------------------*/

(function(SPC, SP, SH) {

    "use strict";

    var _SS = SPC.Scene_Skill = { orig: {}, SP: {}, SH: {} };
    var _SP = SP.Scene_Skill.new, _SH = SH.Scene_Skill.new;
    var _WS = SP.Window_SkillList.orig, $ = Scene_Skill.prototype;

    _SS.orig.onItemOk = $.onItemOk;
    _SP.onItemOk = $.onItemOk = function() { // v1.00a - v1.00a; Extended
        // Edited to integrate the view progress and bind hotkey commands
        if (_SH._isSetupCmdWindow.call(this)) {
            return _SH._setupCmdWindow.call(this);
        }
        var enabled = _WS.isEnabled.call(this._itemWindow, this.item());
        var progress = _SP._isSkillProgress.call(this);
        if (enabled && progress) return this._skillProgress.cmdWin.setup();
        if (!enabled && progress) return _SP._showSkillProgress.call(this);
        if (enabled && !progress) _SS.orig.onItemOk.apply(this, arguments);
        //
    }; // $.onItemOk

    _SS.SP._showSkillProgress = _SP._showSkillProgress;
    _SP._showSkillProgress = function() { // v1.00a - v1.00a; Extended
        // Added to cancel the hotkey command window which is an idempotent call
        _SH._onCmdWindowCancel.call(this);
        //
        // The ordering must be this or stat cond next win won't close properly
        _SS.SP._showSkillProgress.apply(this, arguments);
        //
    }; // _SP._showSkillProgress

    _SS.SH._hotkeyCmdWindow = _SH._hotkeyCmdWindow;
    _SH._hotkeyCmdWindow = function() { // v1.00a - v1.00a; Extended
        var win = _SS.SH._hotkeyCmdWindow.apply(this, arguments);
        // Added to set the bind hotkey handler
        win.setHandler("viewSkillProgress", _SP._showSkillProgress.bind(this));
        // DoubleX_RMMV.Skill_Hotkeys.onItemOk
        return win;
    }; // _SH._hotkeyCmdWindow

})(DoubleX_RMMV.Skill_Progress_Compatibility, DoubleX_RMMV.Skill_Progress,
        DoubleX_RMMV.Skill_Hotkeys);

} // if (DoubleX_RMMV.Skill_Hotkeys)

/*----------------------------------------------------------------------------*/

var Imported = Imported || {};
if (Imported.YEP_SkillLearnSystem) {

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillLearn
 *      - Stops Skill Progress from breaking skill learnabilities
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var _WSL = SP.Window_SkillList.orig, $ = Window_SkillLearn.prototype;

    /**
     * Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Boolean} The check result
     */
    $.isCurrentItemEnabled = $.isCurrentItemEnabled || function() {
        // Yanfly can add the vanilla one to fix compatibility with all plugins
        return _WSL.isCurrentItemEnabled.call(this);
        // YEP_SkillLearnSystem_Window_SkillLearnEnabled
    }; // $.isCurrentItemEnabled

})(DoubleX_RMMV.Skill_Progress);

} // if (Imported.YEP_SkillLearnSystem)

/*----------------------------------------------------------------------------*/

} else {
    alert("Place Skill Progress Compatibility below Skill Progress.");
}

/*============================================================================*/
