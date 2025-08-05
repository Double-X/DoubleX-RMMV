/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Random Skills
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. This plugin lets users to set some skills to be a list of skills
 *       in which one of them will be randomly picked from the list as the
 *       action to be executed
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
 *      Abilities:
 *      1. Nothing special for most ordinary cases
 *      2. Little RMMV plugin development proficiency to fully utilize this
 *         plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1.
 *      Video:
 *      1.
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1300 27-Feb-2020):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you to set some skills to be a list of skills in which
 * one of them will be randomly picked from it as the executed action
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *       1. Among all the same notetag types in the same data, only the 1st
 *          on will be effective(Reference tag: NOTETAG_MONO)
 *       2. Each line can only have at most 1 notetag
 *          (Reference tag: LINE_MONO)
 *----------------------------------------------------------------------------
 *    # Skill Notetag contents:
 *      1. <random skills: varId, switchId>
 *         - Sets the skill to be a list of skills to be randomly picked
 *         - The list is referred by the variable with id varId
 *         - The variable value should be a script in the following form:
 *           { skillId1: weight1, skillId2: weight2, skillId3: weight3, ... }
 *         - The actual skill cost's always the one specified in this skill
 *           itself
 *         - Even normally unusable skills in the list can still be randomly
 *           picked if the switch with id switchId is off
 *         - If that switch is on and none of the skills in the list's
 *           normally usable, then so does this skill itself
 *         - E.g.:
 *           If the value of the variable with id 1 is the following script:
 *           { 1: 2, 2: 3, 3: 5 }
 *           Then <random skills: 1, 2> will set the skill to have 20%, 30%
 *           and 50% chance to pick the skill with id 1, 2 and 3
 *           respectively, as long as the switch with id 2 is off
 *           If it's on and the skill with id 3 isn't normally usable, then
 *           the skill with id 1 and 2 will have 40% and 60% to be picked
 *           instead
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Rand Skills"] = "v1.00a";
DoubleX_RMMV.Rand_Skills = {};

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Some RMMV plugin development proficiency to fully comprehend
 *           this plugin
 *      2. All reference tags are to have clear references between the
 *         Plugin Info and Plugin Implementations by searching them
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for random skills
 *----------------------------------------------------------------------------*/

(function(RS) {

    "use strict";

    RS.DataManager = { orig: {}, new: {} };
    var _DM = RS.DataManager.orig, _RS = RS.DataManager.new;
    _RS._REG_EXP_ID = "< *random +skills *: *\d+, *\d+ *>";
    _RS._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _RS.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v1.00a - v1.00a; Extended
        // Edited to read all notetags of this plugin as well
        return _DM.isDatabaseLoaded.apply(this, arguments) &&
                _RS._isDatabaseLoaded.call(this);
        //
    }; // DataManager.isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The database loaded flag
     * @todo: Make this function Nullipotent to preserve the contract integrity
     */
    _RS._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_RS._areAllNotesLoaded) return true;
        _RS._loadAllNotes.call(this);
        _RS._areAllNotesLoaded = true;
        return _RS._areAllNotesLoaded;
        //
    }; // _RS._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _RS._loadAllNotes = function() {
        $dataSkills.filter(function(data) {
            return data;
        }).forEach(_RS._loadNotes, this);
    }; // _RS._loadAllNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{*}} datum - The datum to have notetags loaded
     */
    _RS._loadNotes = function(datum) {
        datum.note.split(/[\r\n]+/).forEach(
                _RS._loadNote.bind(this, datum.meta));
    }; // _RS._loadNotes

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{*}} meta - The meta of the data to have its notetags loaded
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _RS._loadNote = function(meta, line) {
        // Refer to reference tag NOTETAG_MONO and LINE_MONO
        if (meta.randSkills || !line.match(_RS._REG_EXPS.base)) return;
        meta.randSkills = { varId: RegExp.$1, switchId: RegExp.$2 };
        //
    }; // _RS._loadNote

})(DoubleX_RMMV.Rand_Skills);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Action
 *      - Lets actors to progress skills when the skill hits targets
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Game_Action = { orig: {}, new: {} };
    var _GA = SP.Game_Action.orig, _SP = SP.Game_Action.new;
    var $ = Game_Action.prototype;

    _GA.executeDamage = $.executeDamage;
    _SP.executeDamage = $.executeDamage = function(target, value) {
    // v1.00a - v1.00a; Extended
        _GA.executeDamage.apply(this, arguments);
        // Added to progress the skill used when it hit targets for actors
        _SP._executeDamage.call(this, target, value);
        //
    }; // $.executeDamage

    /**
     * The this pointer is Game_Action.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Game_Battler} target - The target hit by the skill involved
     * @param {Number} value - The damage of the hit involved
     */
    _SP._executeDamage = function(target, value) {
        var subject = this.subject();
        if (!subject.isActor()) return;
        subject.onHitGainSkillProgress(this.item().id, target, value);
    }; // _SP._executeDamage

})(DoubleX_RMMV.Skill_Progress);

/*============================================================================*/
