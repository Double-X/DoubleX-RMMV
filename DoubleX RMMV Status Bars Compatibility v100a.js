/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Status Bars Compatiblity
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
 *      1. DoubleX RMMV Status Bars
 *      Abilities:
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      DoubleX RMMV Status Bars:
 *      1. https://pastebin.com/5BMvWPbu
 *      This plugin:
 *      1. https://pastebin.com/AXm9hePk
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0700 6-2-2022):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Status Bars compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # Yanfly Engine Plugins - Battle Engine Extension -
 *      Animated Sideview Enemies
 *      1. The status bars in DoubleX RMMV Status Bars are needlessly mirrored
 *         as well when mirroring animated sideview enemies
 *         - Reference tag: YEP_X_AnimatedSVEnemies_UnmirrorMirroredStatusBars
 *         - Extended Window_Patb_Bar.prototype.updateBar to mirror the status
 *           bars again if their parents are mirrored
 *         - This fix might cause minor performance issues on low-end mobiles
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Status Bars Compatibility'] = 'v1.00a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of how DoubleX RMMV Status Bars and each
 *           addressed plugin work
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Status Bars"]) {

DoubleX_RMMV.Status_Bars_Compatibility = {};

/*----------------------------------------------------------------------------*/

// Don't check if animated sideview enemies are on as it's a general problem
if (Imported.YEP_BattleEngineCore) {

(function(SBC) {

    'use strict';

    SBC.Window_Status_Bar = {};
    var _WSB = SBC.Window_Status_Bar;

    _WSB._updateBarStatuses = Window_Status_Bar.prototype._updateBarStatuses;
    Window_Status_Bar.prototype._updateBarStatuses = function(battler) {
    // v1.00a - v1.00a; Extended
        _WSB._updateBarStatuses.apply(this, arguments);
        // Added to mirror the status bar again if its parent's mirrored
        if (this.visible) Sprite_StateIcon.prototype.updateMirror.call(this);
        // YEP_X_AnimatedSVEnemies_UnmirrorMirroredStatusBars
    }; // Window_Status_Bar.prototype._updateBarStatuses

})(DoubleX_RMMV.Status_Bars_Compatibility);

} // if (Imported.YEP_BattleEngineCore)

/*----------------------------------------------------------------------------*/

} else {
    alert("Place Status Bars Compatibility below Status Bars.");
}

/*============================================================================*/
