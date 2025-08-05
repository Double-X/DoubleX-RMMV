/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Random Cast
 *----------------------------------------------------------------------------
 *    # Introduction
 *      1. Without any plugin, creating random actions based on the battler's
 *         identity, class, equips and states can be tedious and troublesome.
 *      2. With this plugin, the same can be done using several easy, simple
 *         and small notetags instead of writing complicated common events
 *         from scratch, thus further improving effectiveness and efficiency.
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
 *      Abilities:
 *      1. Nothing special for most ordinary cases
 *      2. Little RMMV plugin development proficiency to fully utilize this
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. This plugin's meant to be a convenience tool to facilitate the use
 *         of random actions with complex conditionals by using notetags with
 *         game switches and variables, and you still need to manage them.
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1.
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0500 4-12-2018):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you use notetags to trigger random actions when executing
 *            skills/items much like "Randomly Casts..." in the FF series
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *       All the notetags in the same data can be effective(Reference tag:
 *       NOTETAG_MULTI)
 *       Each line can only have at most 1 notetag(Reference tag: LINE_MONO)
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy/State/Skill/Item Notetags:
 *      The skill/item notetags will be used first, followed by those of
 *      states, equips, classes and actors/enemies(Reference tag:
 *      NOTETAG_ORDER)
 *      1. <rand cast: isEnabled, chance, skillId, cost>
 *         - Sets an action with skill id being the value of the variable with
 *           id skillId, having x% of its original cost, to have a y% chance
 *           being cast, where x is the value of the variable with id cost and
 *           y is the value of the variable with id chance, if the game switch
 *           with id isEnabled is on
 *         - E.g.:
 *           If game switch with id 1 is on and variables with id 2, 3 and 4
 *           have 50, 4 and 0 as values respectively, <rand cast: 1, 2, 3, 4>
 *           will set an action with skill id 4 having 50% chance to be cast
 *           withg 0% of its original costs
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Rand Cast"] = "v1.00a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what the action execution implementations do
 *         - Some Javascript coding proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Rand_Cast = {};

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for randomly casting actions
 *----------------------------------------------------------------------------*/

(function(RC) {

    "use strict";

    RC.DataManager = { orig: {}, new: {} };
    var _DM = RC.DataManager.orig, $ = DataManager;
    var _RC = RC.DataManager.new;
    _RC._MSG_INVALID_ID_POST = " isn't a valid id!";
    _RC._MSG_INVALID_NOTE_PRE = "This notetag's invalid:\n";
    _RC._MSG_INVALID_NOTE_POST = "\nBecause:\n";
    _RC._REG_EXP = /< *rand[-_ ]+cast *: *(\d+) *, *(\d+) *, *(\d+) *>/i;
    _RC._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = $.isDatabaseLoaded;
    $.isDatabaseLoaded = function() { // v1.00a - v1.00a; Extended
        // Edited to read all notetags of this plugin as well
        return _DM.isDatabaseLoaded.apply(this, arguments) &&
                _RC._isDatabaseLoaded.call(this);
        //
    }; // $.isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Boolean} The database loaded flag
     * @todo: Make this function Nullipotent to preserve the contract integrity
     */
    _RC._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_RC._areAllNotesLoaded) return true;
        _RC._loadAllNotes.call(this);
        _RC._areAllNotesLoaded = true;
        return _RC._areAllNotesLoaded;
        //
    }; // _RC._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     */
    _RC._loadAllNotes = function() {
        _RC._dataTypes.call(this).forEach(_RC._loadDataTypeNotes, this);
    }; // _RC._loadAllNotes

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Array[Object]} The list of data types to have notetags loaded
     */
    _RC._dataTypes = function() {
        return [
            $dataActors,
            $dataClasses,
            $dataWeapons,
            $dataArmors,
            $dataStates,
            $dataEnemies,
            $dataSkills,
            $dataItems
        ];
    }; // _RC._dataTypes

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object} type - The data type to have notetags loaded
     */
    _RC._loadDataTypeNotes = function(type) {
        type.forEach(_RC._loadDataNotes, this);
    }; // _RC._loadDataTypeNotes

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object/Nullable} data - The data to have notetags loaded
     */
    _RC._loadDataNotes = function(data) {
        if (data) _RC._loadNotes.call(this, data);
    }; // _RC._loadDataNotes

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object} data - The data to have notetags loaded
     */
    _RC._loadNotes = function(data) {
        // Plugin call/command
        data.note.split(/[\r\n]+/).forEach(
                _RC._loadNote.bind(this, data.meta.randCast = []));
        //
    }; // _RC._loadNotes

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Array[Object[Number, Number, Number]]} randCast - The loaded
     *                                                            notetag values
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _RC._loadNote = function(randCast, line) {
        // Refer to reference tags NOTETAG_MULTI and LINE_MONO
        if (!line.match(_RC._REG_EXP)) return;
        _RC._tryStoreNote.call(this, randCast, line, _RC._note.call(this));
        //
    }; // _RC._loadNote

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Object[Number, Number, Number, Number]} The requested note
     */
    _RC._note = function() {
        return {
            isEnabled: +RegExp.$1,
            chance: +RegExp.$2,
            skillId: +RegExp.$3,
            cost: +RegExp.$4
        };
    }; // _RC._note

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Array[Object[Number, Number, Number]]} randCast - The loaded
     *                                                            notetag values
     * @param {String} line - The line being scanned for notetags to be loaded
     * @param {Object[Number, Number, Number, Number]} note - The note values
     *                                                         to be stored
     */
    _RC._tryStoreNote = function(randCast, line, note) {
        var invalidNoteMsg = _RC._invalidNoteMsg.call(this, note);
        if (!_RC._isInvalidMsg.call(this, invalidNoteMsg)) {
            return _RC.showInvalidNoteMsg.call(this, line, invalidNoteMsg);
        }
        randCast.push(note);
    }; // _RC._tryStoreNote

    /**
     * The this pointer is DataManager
     * Pure Function
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number, Number]} note - The note values
     *                                                         to be stored
     * @returns {String} The requested message
     */
    _RC._invalidNoteMsg = function(note) {
        return Object.keys(note).map(_RC._invalidIdMsg.bind(this, note)).
                filter(_RC._isInvalidMsg, this).join("\n");
    }; // _RC._invalidNoteMsg

    /**
     * The this pointer is DataManager
     * Pure Function
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number, Number]} note - The note values
     *                                                         to be stored
     * @param {String} key - The name of the id as the notetag value
     * @returns {String} The requested message
     */
    _RC._invalidIdMsg = function(note, key) {
        var val = note[key];
        return isNaN(val) || val <= 0 || Number.isInteger(val) ?
                key + _RC._MSG_INVALID_ID_POST : "";
    }; // _RC._invalidIdMsg

    /**
     * The this pointer is DataManager
     * Pure Function
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {String} invalidMsg - The message to be checked against
     * @returns {Boolean} The check result
     */
    _RC._isInvalidMsg = function(invalidMsg) { return invalidMsg.length > 0; };

    /**
     * The this pointer is DataManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {String} line - The line being scanned for notetags to be loaded
     * @param {String} invalidNoteMsg - The message to be shown
     */
    _RC._showInvalidNoteMsg = function(line, invalidNoteMsg) {
        alert(_RC._shownInvalidNoteMsg.call(this, line, invalidNoteMsg));
    }; // _RC._showInvalidNoteMsg

    /**
     * The this pointer is DataManager
     * Pure Function
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {String} line - The line being scanned for notetags to be loaded
     * @param {String} invalidNoteMsg - The message to be shown
     * @returns {String} The requested message
     */
    _RC._shownInvalidNoteMsg = function(line, invalidNoteMsg) {
        return _RC._MSG_INVALID_NOTE_PRE + line + _RC._MSG_INVALID_NOTE_POST +
                invalidNoteMsg;
    }; // _RC._shownInvalidNoteMsg

})(DoubleX_RMMV.Rand_Cast);

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Randomly casts actions for each action invocation
 *----------------------------------------------------------------------------*/

(function(RC) {

    "use strict";

    RC.BattleManager = { orig: {}, new: {} };
    var _BM = RC.BattleManager.orig, $ = BattleManager;
    var _RC = RC.BattleManager.new;

    _BM.invokeAction = $.invokeAction;
    $.invokeAction = function(subject, target) { // v1.00a - v1.00a; Extended
        _BM.invokeAction.apply(this, arguments);
        // Added to randomly casts actions
        _RC.invokeAct.call(this, subject, target);
        //
    }; // $.invokeAction

    /**
     * The this pointer is battleManager
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Game_Battler} subject - The subject randomly casting actions
     * @param {Game_Battler} target - The target of the actions invoked
     */
    _RC.invokeAct = function(subject, target) {
        subject.randCastActs(this._action);
    }; // _RC.invokeAct

})(DoubleX_RMMV.Rand_Cast);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *      - Adds randomly cast actions using the effective random cast notetags
 *----------------------------------------------------------------------------*/

(function(RC) {

    "use strict";

    RC.Game_Battler = { orig: {}, new: {} };
    var $ = Game_Battler.prototype, _RC = RC.Game_Battler.new;

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @interface @since v1.00a @version v1.00a
     * @param {Game_Action} act - The action to randomly cast actions
     * @returns {Array[Game_Actions]} The requested list of randomly cast action
     */
    $.randCastActs = function(act) { return _RC._acts.call(this, act); };

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Array} The requested list of data
     */
    $._randCastData = function() { return this.states(); };

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Game_Action} act - The action to randomly cast actions
     * @returns {Number} The requested list of skill ids
     */
    _RC._acts = function(act) {
        return _RC._skillIds.call(this, act).map(_RC._act, this);
    }; // _RC._acts

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Game_Action} act - The action to randomly cast actions
     * @returns {Number} The requested list of skill ids
     */
    _RC._skillIds = function(act) {
        return _RC._notes.call(this, act).filter(_RC._isCast, this).map(
                _RC._skillId, this);
    }; // _RC._skillIds

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Game_Action} act - The action to randomly cast actions
     * @returns {Number} The requested list of skill ids
     */
    _RC._notes = function(act) {
        return _RC._meta.call(this, act.item()).concat(this._randCastData().
                reduce(_RC._accumMeta.bind(this), []));
    }; // _RC._notes

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Array[Object[Number, Number, Number]]} accumNotes - The notetags
     *                                                              collected
     * @param {Nullable} data - The data to have its notetags returned
     */
    _RC._accumMeta = function(accumNotes, data) {
        return accumNotes.concat(_RC._meta.call(this, data));
    }; // _RC._accumMeta

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Nullable} data - The data to have its notetags returned
     * @returns {Array[Object[Number, Number, Number]]} The requested list of
     *                                                 notetags
     */
    _RC._meta = function(data) { return data ? data.meta.randCast : []; };

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Boolean} The check result
     */
    _RC._isCast = function(note) {
        return _RC._isEnabled.call(this, note) && _RC._hasChance.call(
                this, note) && _RC._canPaySkillCost.call(this, note);
    }; // _RC._isCast

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Boolean} The check result
     */
    _RC._isEnabled = function(note) {
        return $gameSwitches.value(note.isEnabled);
    }; // _RC._isEnabled

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Boolean} The check result
     */
    _RC._hasChance = function(note) {
        return $gameVariables.value(note.chance) / 100.0 > Math.random();
    }; // _RC._hasChance

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Boolean} The check result
     */
    _RC._canPaySkillCost = function(note) {
        var skillId = _RC._skillId.call(this, note);
        var multiplier = _RC._skillCostMultiplier.call(this, note);
        return  _RC._canPaySkillTpCost.call(this, skillId, multiplier) &&
                _RC._canPaySkillMpCost.call(this, skillId, multiplier);
    }; // _RC._canPaySkillCost

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Number} The requested multiplier
     */
    _RC._skillCostMultiplier = function(note) {
        return  $gameVariables.value(note.cost) / 100.0;
    }; // _RC._skillCostMultiplier

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Number} skillId - The id of the skill to be checked
     * @param {Number} multiplier - The multiplier of the skill cost
     * @returns {Boolean} The check result
     */
    _RC._canPaySkillTpCost = function(skillId, multiplier) {
        return this._tp >= this.skillTpCost(skillId) * multiplier;
    }; //  _RC._canPaySkillTpCost

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Number} skillId - The id of the skill to be checked
     * @param {Number} multiplier - The multiplier of the skill cost
     * @returns {Boolean} The check result
     */
    _RC._canPaySkillMpCost = function(skillId, multiplier) {
        return this._mp >= this.skillMpCost(skillId) * multiplier;
    }; //  _RC._canPaySkillMpCost

    /**
     * The this pointer is Game_Battler.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Object[Number, Number, Number]} note - The notetag contents
     * @returns {Number} The requested skill id
     */
    _RC._skillId = function(note) { return $gameVariables.value(note.skillId); };

    /**
     * The this pointer is Game_Battler.prototype
     * @author DoubleX @since v1.00a @version v1.00a
     * @param {Number} skillId - The id of the skill used by the action
     * @returns {Game_Action} The requested randomly cast action
     */
    _RC._act = function(skillId) {
        var act = new Game_Action(this, true);
        act.setSkill(skillId);
        if (act.needsSelection()) act.setTarget(this._lastTargetIndex);
        return act;
    }; // _RC._act

})(DoubleX_RMMV.Rand_Cast);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Adds randomly cast actions using the effective random cast notetags
 *----------------------------------------------------------------------------*/

(function(RC) {

    "use strict";

    var $ = Game_Actor.prototype, $$ = Game_Battler.prototype;

    /**
     * The this pointer is Game_Actor.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Array} The requested list of data
     */
    $._randCastData = function() {
        return $$._randCastData.call(this).concat(this.equips()).concat(
                this.currentClass()).concat(this.actor());
    }; // $._randCastData

})(DoubleX_RMMV.Rand_Cast);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *      - Adds randomly cast actions using the effective random cast notetags
 *----------------------------------------------------------------------------*/

(function(RC) {

    "use strict";

    var $ = Game_Enemy.prototype, $$ = Game_Battler.prototype;

    /**
     * The this pointer is Game_Enemy.prototype
     * Nullipotent
     * @author DoubleX @since v1.00a @version v1.00a
     * @returns {Array} The requested list of data
     */
    $._randCastData = function() {
        return $$._randCastData.call(this).concat(this.enemy());
    }; // $._randCastData

})(DoubleX_RMMV.Rand_Cast);

/*============================================================================*/
