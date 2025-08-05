/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Unit Filters
 *----------------------------------------------------------------------------
 *    # Introduction
 *      1. Without any plugin, getting a member with specific conditions
 *         relative to the belonging unit, like finding the party member with
 *         the highest amount of hp, demands relatively heavy event setups,
 *         even with the aid of common events, which boost event reusability.
 *      2. With this plugin, the same can be done using several easy, simple
 *         and small plugin calls instead of writing several common events
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
 *         of some unit filters that aren't already available from the default
 *         RMMV codebase, so you're still supposed to write some Javascript
 *         codes with the aid of the new plugin calls provided by this plugin.
 *      2. You're supposed to implement unit filter result set operations -
 *         union, intersection, complement, difference, etc - yourselves.
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. https://pastebin.com/ZWZED0UC
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0800 18-10-2017):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you use plugin calls to use new unit filters in order to
 * write much, much less codes to perform much, much more tasks
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Plugin Call Info
 *       Members refer to all members outside battles and battle members
 *       inside battles respectively
 *----------------------------------------------------------------------------
 *    # Battler manipulations
 *      1. isAnyStateAffected(stateIds)
 *         - Returns whether the battler involved has any state included by
 *           stateIds, which is a list of id of states
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.members()[0].isAnyStateAffected([1, 2]) returns
 *           whether the 1st party member has any state with id 1 or 2
 *      2. isAllStatesAffected(stateIds)
 *         - Returns whether the battler involved has all states included by
 *           stateIds, which is a list of id of states
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameActors.actor(1).isAllStatesAffected([1, 2]) returns whether
 *           the actor with id 1 has all states with id 1 or 2
 *      3. isAnyBuffAffected(stateIds)
 *         - Returns whether the battler involved has any buff included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.members()[0].isAnyBuffAffected([0, 1]) returns
 *           whether the 1st party member has any hp or mp buff
 *      4. isAllBuffsAffected(stateIds)
 *         - Returns whether the battler involved has all buffs included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameActors.actor(1).isAllBuffsAffected([0, 1]) returns whether
 *           the actor with id 1 has all hp and mp buffs
 *      5. isAnyDebuffAffected(stateIds)
 *         - Returns whether the battler involved has any debuff included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.members()[0].isAnyDebuffAffected([0, 1]) returns
 *           whether the 1st party member has any hp or mp debuff
 *      6. isAllDebuffsAffected(stateIds)
 *         - Returns whether the battler involved has all debuffs included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameActors.actor(1).isAllDebuffsAffected([0, 1]) returns whether
 *           the actor with id 1 has all hp and mp debuffs
 *      7. hasAnySkill(skillIds)
 *         - Returns whether the battler involved has any skill included by
 *           skillIds, which is a list of id of corresponding skills
 *         - paramIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.members()[0].hasAnySkill([1, 2]) returns whether the
 *           1st party member has skill with id 1 or 2
 *      8. hasAllSkills(skillIds)
 *         - Returns whether the battler involved has all skills included by
 *           skillIds, which is a list of id of corresponding skills
 *         - paramIds must be an Array of positive Number
 *         - E.g.:
 *           $gameActors.actor(1).hasAllSkills([1, 2]) returns whether the
 *           actor with id 1 has all skills with id 1 and 2
 *    # Unit manipulations
 *      1. memWithAnyState(stateIds)
 *         - Returns the list of members with any state included by stateIds,
 *           which is a list of id of states
 *         - The return value should be an Array of Game_Battler
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.memWithAnyState([1, 2]) returns the list of party
 *           members with any state with id 1 or 2
 *      2. memWithAllStates(stateIds)
 *         - Returns the list of members with all states included by
 *           stateIds, which is a list of id of states
 *         - The return value should be an Array of Game_Battler
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameTroop.memWithAllStates([1, 2]) returns the list of troop
 *           members with all states with id 1 or 2
 *      3. memWithoutAnyState(stateIds)
 *         - Returns the list of members without any state included by
 *           stateIds, which is a list of id of states
 *         - The return value should be an Array of Game_Battler
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.memWithoutAnyState([1, 2]) returns the list of party
 *           members without any state with id 1 or 2
 *      4. memWithoutAllStates(stateIds)
 *         - Returns the list of members without all states included by
 *           stateIds, which is a list of id of states
 *         - The return value should be an Array of Game_Battler
 *         - stateIds must be an Array of positive Number
 *         - E.g.:
 *           $gameTroop.memWithoutAllStates([1, 2]) returns the list of troop
 *           members without all states with id 1 or 2
 *      5. memWithAnyBuff(paramIds)
 *         - Returns the list of members with any buff included by paramIds,
 *           which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.memWithAnyBuff([0, 1]) returns the list of party
 *           members with any hp or mp buff
 *      6. memWithAllBuffs(paramIds)
 *         - Returns the list of members with all buffs included by paramIds,
 *           which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameTroop.memWithAllBuffs([0, 1]) returns the list of troop
 *           members with all hp and mp buffs
 *      7. memWithoutAnyBuff(paramIds)
 *         - Returns the list of members without any buff included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.memWithoutAnyBuff([0, 1]) returns the list of party
 *           members without any hp or mp buff
 *      8. memWithoutAllBuffs(paramIds)
 *         - Returns the list of members without all buffs included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameTroop.memWithoutAllBuffs([0, 1]) returns the list of troop
 *           members without all hp and mp buffs
 *      9. memWithAnyDebuff(paramIds)
 *         - Returns the list of members with any debuff included by paramIds,
 *           which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.memWithAnyDebuff([0, 1]) returns the list of party
 *           members with any hp or mp debuff
 *      10. memWithAllDebuffs(paramIds)
 *         - Returns the list of members with all debuffs included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameTroop.memWithAllDebuffs([0, 1]) returns the list of troop
 *           members with all hp and mp debuffs
 *      11. memWithoutAnyDebuff(paramIds)
 *         - Returns the list of members without any debuff included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameParty.memWithoutAnyDebuff([0, 1]) returns the list of party
 *           members without any hp or mp debuff
 *      12. memWithoutAllDebuffs(paramIds)
 *         - Returns the list of members without all debuffs included by
 *           paramIds, which is a list of id of corresponding parameters
 *         - The return value should be an Array of Game_Battler
 *         - paramIds must be an Array of non negative Number
 *         - E.g.:
 *           $gameTroop.memWithoutAllDebuffs([0, 1]) returns the list of troop
 *           members without all hp and mp debuffs
 *      13. memWithAnySkill(skillIds)
 *         - Returns the list of members with any skill included by skillIds,
 *           which is a list of id of corresponding skills
 *         - The return value should be an Array of Game_Battler
 *         - skillIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.memWithAnySkill([1, 2]) returns the list of party
 *           members with skill having id 1 or 2
 *      14. memWithAllSkills(skillIds)
 *         - Returns the list of members with all skills included by skillIds,
 *           which is a list of id of corresponding skills
 *         - The return value should be an Array of Game_Battler
 *         - skillIds must be an Array of positive Number
 *         - E.g.:
 *           $gameTroop.memWithAllSkills([1, 2]) returns the list of troop
 *           members with skills having id 1 and 2
 *      15. memWithoutAnySkill(skillIds)
 *         - Returns the list of members without any skill included by
 *           skillIds, which is a list of id of corresponding skills
 *         - The return value should be an Array of Game_Battler
 *         - skillIds must be an Array of positive Number
 *         - E.g.:
 *           $gameParty.memWithoutAnySkill([1, 2]) returns the list of party
 *           members without skills having id 1 nor 2
 *      16. memWithoutAllSkills(skillIds)
 *         - Returns the list of members without all skills included by
 *           skillIds, which is a list of id of corresponding skills
 *         - The return value should be an Array of Game_Battler
 *         - skillIds must be an Array of positive Number
 *         - E.g.:
 *           $gameTroop.memWithoutAllSkills([1, 2]) returns the list of troop
 *           members without skills having id 1 and 2
 *      17. anyHighestStatMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, include those being the
 *           highest among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameParty.anyHighestStatMem(["hp", "mp"]) returns the list of
 *           party members with the highest amount of hp or mp among the party
 *      18. allHighestStatsMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, are all the highest among
 *           the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameTroop.allHighestStatsMem(["hp", "mp"]) returns the list of
 *           troop members with the highest amount of hp and mp among the
 *           troop
 *      19. notAnyHighestStatMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, don't include those being
 *           the highest among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameParty.notAnyHighestStatMem(["hp", "mp"]) returns the list of
 *           party members with neither the highest amount of hp nor mp among
 *           the party
 *      20. notAllHighestStatsMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, aren't all the highest
 *           among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameTroop.notAllHighestStatsMem(["hp", "mp"]) returns the list
 *           of troop members without the highest amount of both hp and mp
 *           among the troop
 *      21. anyLowestStatMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, include those being the
 *           lowest among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameParty.anyLowestStatMem(["hp", "mp"]) returns the list of
 *           party members with the lowest amount of hp or mp among the party
 *      22. allLowestStatsMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, are all the lowest among
 *           the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameTroop.allLowestStatsMem(["hp", "mp"]) returns the list of
 *           troop members with the lowest amount of hp and mp among the party
 *      23. notAnyLowestStatMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, don't include those being
 *           the lowest among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameParty.notAnyLowestStatMem(["hp", "mp"]) returns the list of
 *           party members with neither the lowest amount of hp nor mp among
 *           the party
 *      24. notAllLowestStatsMem(stats)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, aren't all the lowest
 *           among the caller
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - E.g.:
 *           $gameTroop.notAllLowestStatsMem(["hp", "mp"]) returns the list of
 *           troop members without the lowest amount of both hp and mp among
 *           the troop
 *      25. anyAboveStatMem(stats, val)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, include those above val
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - val must be a Number
 *         - E.g.:
 *           $gameParty.anyAboveStatMem(["hp", "mp"], 100) returns the list of
 *           party members with the value of hp or mp above 100
 *      26. allAboveStatMem(stats, val)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, are all above val
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - val must be a Number
 *         - E.g.:
 *           $gameTroop.allAboveStatMem(["hp", "mp"], 100) returns the list of
 *           troop members with the value of hp and mp above 100
 *      27. anyBelowStatMem(stats, val)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, include those below val
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - val must be a Number
 *         - E.g.:
 *           $gameParty.anyBelowStatMem(["hp", "mp"], 100) returns the list of
 *           party members with the value of hp or mp below 100
 *      28. allBelowStatMem(stats, val)
 *         - Returns the list of members whose values of
 *           parameters/ex-parameters/sp-parameters included by stats, which
 *           is a list of names of corresponding
 *           parameters/ex-parameters/sp-parameters, are all below val
 *         - The return value should be an Array of Game_Battler
 *         - stats must be an Array of String as names of Game_Battler
 *           properties with the get function
 *         - val must be a Number
 *         - E.g.:
 *           $gameTroop.allBelowStatMem(["hp", "mp"], 100) returns the list of
 *           troop members with the value of hp and mp below 100
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Unit Filters"] = "v1.00a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Little Javascript coding proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Unit_Filters = {};

/*----------------------------------------------------------------------------
 *    # Edit class: Game_BattlerBase
 *      - Implements all the battler manipulation plugin calls
 *----------------------------------------------------------------------------*/

(function(UF) {

    "use strict";

    var $ = Game_BattlerBase.prototype;

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAnyStateAffected = function(stateIds) {
        return stateIds.some(this.isStateAffected, this);
    }; // $.isAnyStateAffected

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAllStatesAffected = function(stateIds) {
        return stateIds.every(this.isStateAffected, this);
    }; // $.isAllStatesAffected

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAnyBuffAffected = function(paramIds) {
        return paramIds.some(this.isBuffAffected, this);
    }; // $.isAnyBuffAffected

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAllBuffsAffected = function(paramIds) {
        return paramIds.every(this.isBuffAffected, this);
    }; // $.isAllBuffsAffected

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAnyDebuffAffected = function(paramIds) {
        return paramIds.some(this.isDebuffAffected, this);
    }; // $.isAnyDebuffAffected

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.isAllDebuffsAffected = function(paramIds) {
        return paramIds.every(this.isDebuffAffected, this);
    }; // $.isAllDebuffsAffected

    /**
     * Plugin call/Pure function
     * @abstract
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAnySkill = function(skillIds) { return false; };

    /**
     * Plugin call/Pure function
     * @abstract
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAllSkills = function(skillIds) { return false; };

})(DoubleX_RMMV.Unit_Filters);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Implements all the actor-specific battler manipulation plugin calls
 *----------------------------------------------------------------------------*/

(function(UF) {

    "use strict";

    var $ = Game_Actor.prototype;

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAnySkill = function(skillIds) {
        return skillIds.some(this.hasSkill, this);
    }; // $.hasAnySkill

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAllSkills = function(skillIds) {
        return skillIds.every(this.hasSkill, this);
    }; // $.hasAllSkills

})(DoubleX_RMMV.Unit_Filters);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *      - Implements all the enemy-specific battler manipulation plugin calls
 *----------------------------------------------------------------------------*/

(function(UF) {

    "use strict";

    UF.Game_Enemy = { orig: {}, new: {} };
    var $ = Game_Enemy.prototype, _UF = UF.Game_Enemy.new;

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAnySkill = function(skillIds) {
        return _UF._hasFilteredSkills.call(this, skillIds, "some");
    }; // $.hasAnySkill

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    $.hasAllSkills = function(skillIds) {
        return _UF._hasFilteredSkills.call(this, skillIds, "every");
    }; // $.hasAllSkills

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @param {String} quantifier - The quantifier for filtering skills
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._hasFilteredSkills = function(skillIds, quantifier) {
        // Optimized to use an O(n) rather than an O(n ^ 2) algorithm
        return skillIds[quantifier](
                _UF._isFilteredSkillFunc(_UF._actSkillIds.call(this)), this);
        //
    }; // _UF._hasFilteredSkills

    /**
     * Pure function
     * @author DoubleX
     * @returns {Object[String, Boolean]} The requested skill id mapping
     * @since v1.00a
     * @version v1.00a
     */
    _UF._actSkillIds = function() {
        return this.enemy().actions.reduce(
                _UF._accumActSkillIds.bind(this), {});
    }; // _UF._actSkillIds

    /**
     * Pure function
     * @author DoubleX
     * @param {Object[String, Boolean]} accumActSkillIds - The accumulated map
     * @param {Object[String, Number]} act - The action data container involved
     * @returns {Object[String, Boolean]} The requested skill id mapping
     * @since v1.00a
     * @version v1.00a
     */
    _UF._accumActSkillIds = function(accumActSkillIds, act) {
        accumActSkillIds[act.skillId] = true;
        return accumActSkillIds;
    }; // _UF._accumActSkillIds

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Number]} actSkillIds - The list of id of skills involved
     * @returns {Function(Number) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isFilteredSkillFunc = function(actSkillIds) {
        /**
         * Pure function
         * @author DoubleX
         * @param {[Number} skillId - The id of the skill involved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(skillId) { return actSkillIds[skillId.toString()]; };
    }; // _UF._isFilteredSkillFunc

})(DoubleX_RMMV.Unit_Filters);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Unit
 *      - Implements all the unit manipulation plugin calls
 *----------------------------------------------------------------------------*/

(function(UF) {

    "use strict";

    UF.Game_Unit = { orig: {}, new: {} };
    var $ = Game_Unit.prototype, _UF = UF.Game_Unit.new;

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAnyState = function(stateIds) {
        return this.members().filter(
                _UF._memWithCondFunc(stateIds, "isAnyStateAffected"), this);
    }; // $.memWithAnyState

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAllStates = function(stateIds) {
        return this.members().filter(
                _UF._memWithCondFunc(stateIds, "isAllStatesAffected"), this);
    }; // $.memWithAllStates

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAnyState = function(stateIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(stateIds, "isAnyStateAffected"), this);
    }; // $.memWithoutAnyState

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} stateIds - The list of id of states involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAllStates = function(stateIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(stateIds, "isAllStatesAffected"), this);
    }; // $.memWithoutAllStates

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAnyBuff = function(paramIds) {
        return this.members().filter(
                _UF._memWithCondFunc(paramIds, "isAnyBuffAffected"), this);
    }; // $.memWithAnyBuff

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAllBuffs = function(paramIds) {
        return this.members().filter(
                _UF._memWithCondFunc(paramIds, "isAllBuffsAffected"), this);
    }; // $.memWithAllBuffs

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAnyBuff = function(paramIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(paramIds, "isAnyBuffAffected"), this);
    }; // $.memWithoutAnyBuff

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAllBuffs = function(paramIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(paramIds, "isAllBuffsAffected"), this);
    }; // $.memWithoutAllBuffs

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAnyDebuff = function(paramIds) {
        return this.members().filter(
                _UF._memWithCondFunc(paramIds, "isAnyDebuffAffected"), this);
    }; // $.memWithAnyDebuff

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAllDebuffs = function(paramIds) {
        return this.members().filter(
                _UF._memWithCondFunc(paramIds, "isAllDebuffsAffected"), this);
    }; // $.memWithAllDebuffs

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAnyDebuff = function(paramIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(paramIds, "isAnyDebuffAffected"), this);
    }; // $.memWithoutAnyDebuff

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} paramIds - The list of id of parameters involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAllDebuffs = function(paramIds) {
        return this.members().filter(_UF._memWithoutCondFunc(
                paramIds, "isAllDebuffsAffected"), this);
    }; // $.memWithoutAllDebuffs

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAnySkill = function(skillIds) {
        return this.members().filter(
                _UF._memWithCondFunc(skillIds, "hasAnySkill"), this);
    }; // $.memWithAnySkill

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithAllSkills = function(skillIds) {
        return this.members().filter(
                _UF._memWithCondFunc(skillIds, "hasAllSkills"), this);
    }; // $.memWithAllSkills

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAnySkill = function(skillIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(skillIds, "hasAnySkill"), this);
    }; // $.memWithoutAnySkill

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[Number]} skillIds - The list of id of skills involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.memWithoutAllSkills = function(skillIds) {
        return this.members().filter(
                _UF._memWithoutCondFunc(skillIds, "hasAllSkills"), this);
    }; // $.memWithoutAllSkills

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.anyHighestStatMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._descendingSort.bind(
                this), "some", _UF._equals.bind(this));
    }; // $.anyHighestStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.allHighestStatsMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._descendingSort.bind(
                this), "every", _UF._equals.bind(this));
    }; // $.allHighestStatsMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.notAnyHighestStatMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._descendingSort.bind(
                this), "every", _UF._notEquals.bind(this));
    }; // $.notAnyHighestStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.notAllHighestStatsMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._descendingSort.bind(
                this), "some", _UF._notEquals.bind(this));
    }; // $.notAllHighestStatsMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.anyLowestStatMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._ascendingSort.bind(
                this), "some", _UF._equals.bind(this));
    }; // $.anyLowestStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.allLowestStatsMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._ascendingSort.bind(
                this), "every", _UF._equals.bind(this));
    }; // $.allLowestStatsMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.notAnyLowestStatMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._ascendingSort.bind(
                this), "every", _UF._notEquals.bind(this));
    }; // $.notAnyLowestStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.notAllLowestStatsMem = function(stats) {
        return _UF._statFilteredMem.call(this, stats, _UF._ascendingSort.bind(
                this), "some", _UF._notEquals.bind(this));
    }; // $.notAllLowestStatsMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.anyAboveStatMem = function(stats, val) {
        return _UF._statValFilteredMem.call(
                this, stats, val, "some", _UF._isGreaterThan.bind(this));
    }; // $.anyAboveStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.allAboveStatMem = function(stats, val) {
        return _UF._statValFilteredMem.call(
                this, stats, val, "every", _UF._isGreaterThan.bind(this));
    }; // $.allAboveStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.anyBelowStatMem = function(stats, val) {
        return _UF._statValFilteredMem.call(
                this, stats, val, "some", _UF._isLessThan.bind(this));
    }; // $.anyBelowStatMem

    /**
     * Plugin call/Pure function
     * @author DoubleX
     * @interface
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    $.allBelowStatMem = function(stats, val) {
        return _UF._statValFilteredMem.call(
                this, stats, val, "every", _UF._isLessThan.bind(this));
    }; // $.allBelowStatMem

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Number]} inputtedIds - The list of id of inputs involved
     * @param {Function(Array[Number]) -> Boolean} condFunc - The condition
     * @returns {Function(Game_Battler) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._memWithCondFunc = function(inputtedIds, condFunc) {
        /**
         * Pure function
         * @author DoubleX
         * @param {Game_Battler} mem - The unit member involved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(mem) { return mem[condFunc](inputtedIds); };
    }; // _UF._memWithAnyStateFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Number]} inputtedIds - The list of id of inputs involved
     * @param {Function(Array[Number]) -> Boolean} condFunc - The condition
     * @returns {Function(Game_Battler) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._memWithoutCondFunc = function(inputtedIds, condFunc) {
        /**
         * Pure function
         * @author DoubleX
         * @param {Game_Battler} mem - The unit member involved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(mem) { return !mem[condFunc](inputtedIds); };
    }; // _UF._memWithoutAnyStateFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} a - A number in the list to be compared in the sort
     * @param {Number} b - A number in the list to be compared in the sort
     * @returns {Number} The comparison result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._ascendingSort = function(a, b) { return a - b; };

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} a - A number in the list to be compared in the sort
     * @param {Number} b - A number in the list to be compared in the sort
     * @returns {Number} The comparison result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._descendingSort = function(a, b) { return b - a; };

    /**
     * Pure function
     * @author DoubleX
     * @param {} a - A value to be checked against
     * @param {} b - A value to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._equals = function(a, b) { return a === b; };

    /**
     * Pure function
     * @author DoubleX
     * @param {} a - A value to be checked against
     * @param {} b - A value to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._notEquals = function(a, b) { return a !== b; };

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Function(Number, Number) -> Number} compareFunc - The compare
     *                                                            function
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    _UF._statFilteredMem =
            function(stats, compareFunc, quantifier, filterFunc) {
        var mems = this.members();
        return mems.filter(_UF._isStatFilteredMemFunc(
                stats, quantifier, filterFunc, _UF._sortedStats.call(
                this, stats, mems, compareFunc)), this);
    }; // _UF._statFilteredMem

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Array[Game_Battler]} mems - The list of unit members involved
     * @param {Function(Number, Number) -> Number} compareFunc - The compare
     *                                                            function
     * @returns {Array[Array[Number]]} The list of lists of sorted stats values
     * @since v1.00a
     * @version v1.00a
     */
    _UF._sortedStats = function(stats, mems, compareFunc) {
        return stats.map(_UF._sortedStatFunc(mems, compareFunc), this);
    }; // _UF._sortedStats

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Game_Battler]} mems - The list of unit members involved
     * @param {Function(Number, Number) -> Number} compareFunc - The compare
     *                                                            function
     * @returns {Function(String) -> Array[Number]} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._sortedStatFunc = function(mems, compareFunc) {
        /**
         * Pure function
         * @author DoubleX
         * @param {String} stat - The name of the stat to be sorted
         * @returns {Array[Number]} The requested list of sorted stat values
         * @since v1.00a
         * @version v1.00a
         */
        return function(stat) {
            return _UF._sortedStat.call(this, mems, compareFunc, stat);
        };
    }; // _UF._sortedStatFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[Game_Battler]} mems - The list of unit members involved
     * @param {Function(Number, Number) -> Number} compareFunc - The compare
     *                                                            function
     * @param {String} stat - The name of the stat to be sorted
     * @returns {Array[Number]} The requested list of sorted stat values
     * @since v1.00a
     * @version v1.00a
     */
    _UF._sortedStat = function(mems, compareFunc, stat) {
        return mems.map(_UF._memStatsFunc(stat), this).sort(compareFunc, this);
    }; // _UF._sortedStat

    /**
     * Pure function
     * @author DoubleX
     * @param {String} stat - The name of the stat to be sorted
     * @returns {Function(String) -> Array[Number]} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._memStatsFunc = function(stat) {
        /**
         * Pure function
         * @author DoubleX
         * @param {Game_Battler} mem - The unit member involved
         * @returns {Number} The requested stat value
         * @since v1.00a
         * @version v1.00a
         */
        return function(mem) { return mem[stat]; };
    }; // _UF._memStatsFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @param {Array[Array[Number]]} sortedStats - The list of lists of sorted
     *                                              stat values
     * @returns {Function(Game_Battler) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatFilteredMemFunc =
            function(stats, quantifier, filterFunc, sortedStats) {
        /**
         * Pure function
         * @author DoubleX
         * @param {Game_Battler} mem - The unit member inolved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(mem) {
            return _UF._isStatFilteredMem.call(
                    this, stats, quantifier, filterFunc, sortedStats, mem);
        };
    }; // _UF._isStatFilteredMemFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @param {Array[Array[Number]]} sortedStats - The list of lists of sorted
     *                                              stat values
     * @param {Game_Battler} mem - The unit member inolved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatFilteredMem =
            function(stats, quantifier, filterFunc, sortedStats, mem) {
        return stats[quantifier](_UF._isStatFilterPassedFunc(
                filterFunc, sortedStats, mem), this);
    }; // _UF._isStatFilteredMem

    /**
     * Pure function
     * @author DoubleX
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @param {Array[Array[Number]]} sortedStats - The list of lists of sorted
     *                                              stat values
     * @param {Game_Battler} mem - The unit member inolved
     * @returns {Function(String, Number) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatFilterPassedFunc = function(filterFunc, sortedStats, mem) {
        /**
         * Pure function
         * @author DoubleX
         * @param {String} stat - The name of the stat involved
         * @param {Number} index - The index of the list of sorted stat values
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(stat, index) {
            return filterFunc(mem[stat], sortedStats[index][0]);
        };
    }; // _UF._isStatFilterPassedFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} a - A number to be checked against
     * @param {Number} b - A number to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isGreaterThan = function(a, b) { return a > b; };

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} a - A number to be checked against
     * @param {Number} b - A number to be checked against
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isLessThan = function(a, b) { return a < b; };

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @returns {Array[Game_Batler]} The list of requested unit members
     * @since v1.00a
     * @version v1.00a
     */
    _UF._statValFilteredMem = function(stats, val, quantifier, filterFunc) {
        return this.members().filter(_UF._isStatValFilteredMemFunc(
                stats, val, quantifier, filterFunc), this);
    }; // _UF._statValFilteredMem

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @returns {Function(Game_Battler) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatValFilteredMemFunc =
            function(stats, val, quantifier, filterFunc) {
        /**
         * Pure function
         * @author DoubleX
         * @param {Game_Battler} mem - The unit member involved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(mem) {
            return _UF._isStatValFilteredMem.call(
                    this, stats, val, quantifier, filterFunc, mem);
        };
    }; // _UF._isStatValFilteredMemFunc

    /**
     * Pure function
     * @author DoubleX
     * @param {Array[String]} stats - The list of names of stats involved
     * @param {Number} val - The value to be checked against
     * @param {String} quantifier - The quantifier for filtering unit members
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @param {Game_Battler} mem - The unit member involved
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatValFilteredMem =
            function(stats, val, quantifier, filterFunc, mem) {
        return stats[quantifier](
                _UF._isStatValFilterPassedFunc(val, filterFunc, mem), this);
    }; // _UF._isStatValFilteredMem

    /**
     * Pure function
     * @author DoubleX
     * @param {Number} val - The value to be checked against
     * @param {Function(Number, Number) -> Boolean} filterFunc - The filter
     *                                                            function
     * @param {Game_Battler} mem - The unit member involved
     * @returns {Function(Game_Battler) -> Boolean} The requested function
     * @since v1.00a
     * @version v1.00a
     */
    _UF._isStatValFilterPassedFunc = function(val, filterFunc, mem) {
        /**
         * Pure function
         * @author DoubleX
         * @param {String} stat - The name of the stat involved
         * @returns {Boolean} The check result
         * @since v1.00a
         * @version v1.00a
         */
        return function(stat) { return filterFunc(mem[stat], val); };
    }; // _UF._isStatValFilterPassedFunc

})(DoubleX_RMMV.Unit_Filters);

/*============================================================================*/
