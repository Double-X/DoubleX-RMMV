/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Dynamic Settings Compatibility
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
 *      Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/XdheVbmp
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0400 21-8-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Dynamic Settings compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # DoubleX RMMV Popularized ATB Core:
 *      1. Actor ATB bars aren't drawn properly on the status window when the
 *         value of optDisplayTp's different from that in the system setting
 *         - Reference tag: PATB optDisplayTp
 *         - Rewritten Window_BattleStatus.prototype.patb_gauge_area_width and
 *           Window_BattleStatus.prototype.refresh_patb_bars
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Dynamic Settings Compatibility'] = 'v1.00a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Bsci knowledge on how the addresses plugins work
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV['Dynamic Settings']) {

DoubleX_RMMV.Dynamic_Settings_Compatibility = {};

/*----------------------------------------------------------------------------*/

if (DoubleX_RMMV["PATB Core"]) {

(function(DSCPATB) {

    'use strict';

    DSCPATB.Window_BattleStatus = {};
    var WBS = DSCPATB.Window_BattleStatus;

    WBS.patb_gauge_area_width =
    Window_BattleStatus.prototype.patb_gauge_area_width;
    Window_BattleStatus.prototype.patb_gauge_area_width = function() {
    // Rewrite; Hotspot
        var p = $gameSystem.patb, w = p.hp_bar_w + p.mp_bar_ox + p.mp_bar_w;
        // Rewritten
        if ($gameSystem.dynamicSettings.optDisplayTp) {
            w += p.tp_bar_ox + p.tp_bar_w;
        }
        // PATB optDisplayTp
        return w + p.atb_bar_ox + p.atb_bar_w;
    }; // Window_BattleStatus.prototype.patb_gauge_area_width

    WBS.refresh_patb_bars = Window_BattleStatus.prototype.refresh_patb_bars;
    Window_BattleStatus.prototype.refresh_patb_bars = function() {
    // Rewrite; Hotspot
        var patb = $gameSystem.patb, actor, rect, type;
        // Rewritten
        var ox = patb.hp_bar_w + patb.mp_bar_ox + patb.mp_bar_w;
        ox += patb.atb_bar_ox;
        if ($gameSystem.dynamicSettings.optDisplayTp) {
            ox += patb.tp_bar_ox + patb.tp_bar_w;
        }
        // PATB optDisplayTp
        for (var index = 0, max = this.maxItems(); index < max; index++) {
            actor = $gameParty.battleMembers()[index];
            if (!actor) { continue; }
            type = actor.patb_type();
            if (!actor.patb_val_change[type]) { continue; }
            rect = this.gaugeAreaRect(index);
            this.draw_actor_patb(actor, rect.x + ox, rect.y, type);
            actor.patb_val_change[type] = false;
        }
    }; // Window_BattleStatus.prototype.refresh_patb_bars

})(DoubleX_RMMV.Dynamic_Settings_Compatibility['PATB Core'] = {});

}

/*----------------------------------------------------------------------------*/

} else {
    alert('Place Dynamic Settings Compatibility below Dynamic Settings.');
} // if (DoubleX_RMMV['Dynamic Settings'])

/*============================================================================*/
