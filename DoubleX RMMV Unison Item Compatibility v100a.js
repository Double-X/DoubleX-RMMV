/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Unison Item Compatibility
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions not needing follow so.
 *      5. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Unison Item Config
 *      Abilities:
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. https://pastebin.com/DN5fRYnF
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. Place this plugin below all DoubleX RMMV Unison Item plugins
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1000 9-9-2019):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Unison Item compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # Yanfly Engine Plugins - Skill Core Extension - Party Limit Gauge:
 *      1. The party limit gauge requirement isn't the same with the payment
 *         - Reference tag: YEP_X_PartyLimitGauge_MultiplyPartyLimitCost
 *         - Multiplied partyLimitCost in canPayPartyLimitCost and
 *           drawPartyLimitCost by Math.max(meta.unisonItemActors.length, 1)
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Unison Item Compatibility'] = 'v1.00a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of what DoubleX RMMV Unison Item Config and each
 *           addressed plugin does
 *         - Some plugin development proficiency to fully comprehend this
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
 * functionName = function(arguments) { // Version X+; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     functionContents
 *     //
 * } // functionName
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Unison Item Config"]) {

DoubleX_RMMV.Unison_Item_Compatibility = {};

/*----------------------------------------------------------------------------*/

if (Imported.YEP_X_PartyLimitGauge) {

DoubleX_RMMV.Unison_Item_Compatibility["YEP_X_PartyLimitGauge"] = {};

(function(UI, UIC) {

    'use strict';

    UIC.Game_BattlerBase = {};
    var GB = UIC.Game_BattlerBase;

    GB.canPayPartyLimitCost = Game_BattlerBase.prototype.canPayPartyLimitCost;
    Game_BattlerBase.prototype.canPayPartyLimitCost = function(skill) {
        var unit = this.friendsUnit();
        // Edited to multiply the requirement by the number of unison actors
        var n = Math.max(skill.meta.unisonItemActors.length, 1);
        return unit.partyLimitGaugeCurrent() >= this.partyLimitCost(skill) * n;
        // YEP_X_PartyLimitGauge_MultiplyPartyLimitCost
    }; // Game_BattlerBase.prototype.canPayPartyLimitCost

    UIC.Window_SkillList = {};
    var WSL = UIC.Window_SkillList;

    WSL.drawPartyLimitCost = Window_SkillList.prototype.drawPartyLimitCost;
    Window_SkillList.prototype.drawPartyLimitCost = function(skill, wx, wy, dw) {
        if (this._actor.partyLimitCost(skill) <= 0) return dw;
        var unit = this._actor.friendsUnit();
        if (Yanfly.Param.PLGDrawIcon && unit.partyLimitGaugeIcon() > 0) {
          var iw = wx + dw - Window_Base._iconWidth;
          var icon = unit.partyLimitGaugeIcon();
          this.drawIcon(icon, iw, wy + 2);
          dw -= Window_Base._iconWidth + 2;
        }
        this.changeTextColor(this.textColor(Yanfly.Param.PLGCostColor));
        var fmt = Yanfly.Param.PLGCostFmt;
        // Edited to multiply the requirement by the number of unison actors
        var n = Math.max(skill.meta.unisonItemActors.length, 1);
        var cost = this._actor.partyLimitCost(skill) * n;
        console.info(skill.name, cost);
        // YEP_X_PartyLimitGauge_MultiplyPartyLimitCost
        var text = fmt.format(Yanfly.Util.toGroup(cost),
          unit.partyLimitGaugeCurrent(), unit.partyLimitGaugeIncrements());
        this.contents.fontSize = Yanfly.Param.PLGCostSize;
        this.drawText(text, wx, wy, dw, 'right');
        var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
        this.resetFontSettings();
        return returnWidth;
    }; // Window_SkillList.prototype.drawPartyLimitCost

})(DoubleX_RMMV.Unison_Item, DoubleX_RMMV.Unison_Item_Compatibility["YEP_X_PartyLimitGauge"]);

} // if (Imported.YEP_X_PartyLimitGauge)

/*----------------------------------------------------------------------------*/

} else {
    alert('Place Unison Item Compatibility below Unison Item Config.');
} // if (DoubleX_RMMV["Unison Item Config"])

/*============================================================================*/
