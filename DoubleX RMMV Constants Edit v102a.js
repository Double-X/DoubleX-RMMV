/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Constants Edit
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/GPkQXNEu
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.02a(GMT 1400 24-1-2016):
 *      1. Fixed called DoubleX_RMMV.Constants_Edit before it's defined bug
 *      2. All configuration values will be saved in $gameSystem
 *      3. Increased this plugin's readability
 *      v1.01a(GMT 1400 10-11-2015):
 *      1. Added param isDashing under Game_CharacterBase
 *      2. Fixed MHP param not working on actors bug
 *      v1.00b(GMT 0700 8-11-2015):
 *      1. Increased this plugin's simplicity and user-friendliness
 *      v1.00a(GMT 1100 30-10-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users edit some hardcoded default RMMV constants on the fly
 * @author DoubleX
 *
 * @param ---DataManager---
 * @default
 *
 * @param maxSavefiles
 * @desc Sets the maximum save files as maxSavefiles, which must return a Number
 *       Don't change maxSavefiles inside the save menu unless you know what
 *       you're doing
 *       Don't reduce maxSavefiles on the fly unless you know what you're doing
 * @default 20
 *
 * @param ---BattleManager---
 * @default
 *
 * @param _escapeRatio
 * @desc Sets the escape ratio increment upon each failed party escape as
 *       _escapeRatio, which must return a Number
 * @default 0.1
 *
 * @param ---Game_Action---
 * @default
 *
 * @param applyCritical
 * @desc Sets the critical damage multiplier as applyCritical, which must return
 *       a Number
 * @default 3
 *
 * @param ---Game_BattlerBase---
 * @default
 *
 * @param MaxBuff
 * @desc Sets the maximum buff level as MaxBuff, which must return a Number
 *       Don't reduce MaxBuff in battles unless you know what you're doing
 *       Don't set MaxBuff as larger than 2 unless you know what you're doing
 * @default 2
 *
 * @param MaxDebuff
 * @desc Sets the maximum debuff level as MaxDeBuff, which must return a Number
 *       Don't reduce MaxDeBuff in battles unless you know what you're doing
 *       Don't set MaxDeBuff as larger than 2 unless you know what you're doing
 * @default 2
 *
 * @param paramMax
 * @desc Sets the maximum parameter values as paramMax
 *       General form: [mhp, mmp, atk, def, mat, mdf, agi, luk]
 *       paramMax must return an Array with at least 8 elements and the first 8
 *       elements always being nonzero Number except mmp which can be any Number
 *       Don't change paramMax on the fly unless you know what you're doing
 * @default 999999, 9999, 999, 999, 999, 999, 999, 999
 *
 * @param paramBuffRate
 * @desc Sets the boost/drop percent of a parameter buff/debuff level as
 *       paramBuffRate, which must return a Number
 *       Don't change paramBuffRate during battles unless you know what you're
 *       doing
 * @default 0.25
 *
 * @param maxTp
 * @desc Sets the maximum tp value as maxTp, which must return a nonzero Number
 *       Don't change maxTp on the fly unless you know what you're doing
 * @default 100
 *
 * @param isDying
 * @desc Sets the critical hp region as hp lower than mhp / isDying
 *       isDying must return a nonzero Number
 *       Don't change isDying on the fly unless you know what you're doing
 * @default 4
 *
 * @param ---Game_Battler---
 * @default
 *
 * @param initTp
 * @desc Sets the maximum initial tp value as initTp if tp isn't preserved
 *       initTp must return a non negative Number
 * @default 25
 *
 * @param chargeTpByDamage
 * @desc Sets the maximum tp value charged by damage as chargeTpByDamage, which
 *       must return a non negative Number
 * @default 50
 *
 * @param ---Game_Actor---
 * @default
 *
 * @param stepsForTurn
 * @desc Sets the number of steps per turn outside battles as stepsForTurn,
 *       which must return a nonzero Number
 *       Don't change stepsForTurn outside battles unless you know what you're
 *       doing
 * @default 20
 *
 * @param basicFloorDamage
 * @desc Sets the basic floor damage as basicFloorDamage, which must return a
 *       Number
 * @default 10
 *
 * @param ---Game_Enemy---
 * @default
 *
 * @param DropItemDouble
 * @desc Sets the enemy item drop rate 2x multiplier as DropItemDouble, which
 *       must return a Number
 * @default 2
 *
 * @param ratingRange
 * @desc Sets the maximum difference between the maximum and minimum effective
 *       enemy action rating as ratingRange, which must return a Number
 * @default 3
 *
 * @param ---Game_Party---
 * @default
 *
 * @param maxGold
 * @desc Sets the maximum game party gold value as maxGold, which must return a
 *       Number
 *       Don't reduce maxGold on the fly unless you know what you're doing
 * @default 99999999
 *
 * @param maxItems
 * @desc Sets the maximum game party items as maxItems, which must return a
 *       Number
 *       Don't reduce maxItems on the fly unless you know what you're doing
 * @default 99
 *
 * @param ratePreemptiveHigh
 * @desc Sets the game party preemptive rate when the game party has higher agi
 *       than that of the troop to be encountered as ratePreemptiveHigh, which
 *       must return a Number
 * @default 0.05
 *
 * @param ratePreemptiveLow
 * @desc Sets the game party preemptive rate when the game party has lower agi
 *       than that of the troop to be encountered as ratePreemptiveLow, which
 *       must return a Number
 * @default 0.03
 *
 * @param ratePreemptiveRaise
 * @desc Sets the game party preemptive rate multiplier as ratePreemptiveRaise,
 *       which must return a Number
 * @default 4
 *
 * @param rateSurpriseLow
 * @desc Sets the game party surprise rate when the game party has lower agi
 *       than that of the troop to be encountered as rateSurpriseLow, which
 *       must return a Number
 * @default 0.03
 *
 * @param rateSurpriseHigh
 * @desc Sets the game party preemptive rate when the game party has higher agi
 *       than that of the troop to be encountered as rateSurpriseHigh, which
 *       must return a Number
 * @default 0.05
 *
 * @param ---Game_Troop---
 * @default
 *
 * @param DropGoldDouble
 * @desc Sets the enemy gold drop rate 2x multiplier as DropGoldDouble, which
 *       must return a Number
 * @default 2
 *
 * @param ---(v1.01a+)Game_CharacterBase---
 * @default
 *
 * @param isDashing
 * @desc Sets the speed exponent increment with 2 as the base when the
 *       characters' dashing as isDashing, which must return a Number
 * @default 1
 *
 * @param ---Game_Player---
 * @default
 *
 * @param isBush
 * @desc Sets the encounter progress value multiplier when the player's in the
 *       bushes part of the map as isBush, which must return a Number
 * @default 2
 *
 * @param hasEncounterHalf
 * @desc Sets the encounter progress value multiplier when the game party has
 *       the encounter half flag as hasEncounterHalf, which must return a Number
 * @default 0.5
 *
 * @param isInShip
 * @desc Sets the encounter progress value multiplier when the player's in a
 *       ship as isInShip, which must return a Number
 * @default 0.5
 *
 * @param ---Scene_Shop---
 * @default
 *
 * @param sellingPriceDivisor
 * @desc Sets the selling price divisor as sellingPriceDivisor, which must
 *       return a nonzero number
 *       Don't change sellingPriceDivisor when showing the selling price unless
 *       you know what you're doing
 * @default 2
 *
 * @help
 * The default plugin file name is DoubleX RMMV Constants Edit v102a
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.Constants_Edit_File, which must be done via opening the plugin
 * js file directly
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.constantsEdit.param
 *         - Returns the value of param under DoubleX_RMMV.Constants_Edit
 *      2. $gameSystem.constantsEdit.param = val
 *         - Sets the value of param under DoubleX_RMMV.Constants_Edit as val
 *         - All DoubleX_RMMV.Constants_Edit.param change will be saved
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Constants Edit"] = "v1.02a";

// The plugin file name must be the same as DoubleX_RMMV.Constants_Edit_File
DoubleX_RMMV.Constants_Edit_File = "DoubleX RMMV Constants Edit v102a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
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
 *  * Why rewrite/extended/What this function does
 *  *----------------------------------------------------------------------*/
/* // arguments: What these arguments are
 * function function_name(arguments) // Version X+; Rewrite/New; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     function_name_code
 *     //
 * end // function_name
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Constants_Edit = {};
(function(CE) {

    /*------------------------------------------------------------------------
     *    # Edit class: DataManager
     *------------------------------------------------------------------------*/

    DataManager.maxSavefiles = function() { // Rewrite
        return $gameSystem.constantsEdit.maxSavefiles; // Rewritten
    }; // DataManager.maxSavefiles

    /*------------------------------------------------------------------------
     *    # Edit class: BattleManager
     *------------------------------------------------------------------------*/

    BattleManager.processEscape = function() { // Rewrite
        $gameParty.removeBattleStates();
        $gameParty.performEscape();
        SoundManager.playEscape();
        var success = this._preemptive ? true :
        (Math.random() < this._escapeRatio);
        if (success) {
            this.displayEscapeSuccessMessage();
            this._escaped = true;
            this.processAbort();
        } else {
            this.displayEscapeFailureMessage();
            // Rewritten
            this._escapeRatio += $gameSystem.constantsEdit._escapeRatio;
            //
            $gameParty.clearActions();
            this.startTurn();
        }
        return success;
    }; // BattleManager.processEscape

    CE.Game_System = {};
    var GS = CE.Game_System;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // The storage of all configuration values
    Object.defineProperty(Game_System.prototype, "constantsEdit", {
        get: function() { return this._constantsEdit; },
        configurable: true
    });

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        GS.initialize.apply(this, arguments);
        GS.initConstantsEditParams.call(this); // Added
    }; // Game_System.prototype.initialize

    GS.initConstantsEditParams = function() {
        var params, filters;
        this._constantsEdit = {};
        params = PluginManager.parameters(DoubleX_RMMV.Constants_Edit_File);
        Object.keys(params).forEach(function(param) {
            this._constantsEdit[param] = +params[param];
        }, this);
        this._constantsEdit.paramMax = params.paramMax.split(", ").
        map(function(num) { return +num; });
    }; // GS.initConstantsEditParams

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Action
     *------------------------------------------------------------------------*/

    Game_Action.prototype.applyCritical = function(damage) { // Rewrite
        return damage * $gameSystem.constantsEdit.applyCritical; // Rewritten
    }; // Game_Action.prototype.applyCritical

    /*------------------------------------------------------------------------
     *    # Edit class: Game_BattlerBase
     *------------------------------------------------------------------------*/

    Game_BattlerBase.prototype.isMaxBuffAffected = function(paramId) {
    // Rewrite
        // Rewritten
        return this._buffs[paramId] === $gameSystem.constantsEdit.MaxBuff;
        //
    }; // Game_BattlerBase.prototype.isMaxBuffAffected

    Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId) {
    // Rewrite
        // Rewritten
        return this._buffs[paramId] === $gameSystem.constantsEdit.MaxDebuff;
        //
    }; // Game_BattlerBase.prototype.isMaxDebuffAffected

    Game_BattlerBase.prototype.paramMax = function(paramId) { // Rewrite
        return $gameSystem.constantsEdit.paramMax[paramId]; // Rewritten
    }; // Game_BattlerBase.prototype.paramMax

    Game_BattlerBase.prototype.paramBuffRate = function(paramId) { // Rewrite
        // Rewritten
        return this._buffs[paramId] * $gameSystem.constantsEdit.paramBuffRate +
        1.0;
    //
    }; // Game_BattlerBase.prototype.paramBuffRate

    Game_BattlerBase.prototype.maxTp = function() { // Rewrite
        return $gameSystem.constantsEdit.maxTp; // Rewritten
    }; // Game_BattlerBase.prototype.maxTp

    Game_BattlerBase.prototype.tpRate = function() { // Rewrite
        return this.tp / this.maxTp(); // Rewritten
    }; // Game_BattlerBase.prototype.tpRate

    Game_BattlerBase.prototype.isDying = function() { // Rewrite
        // Rewritten
        return this.isAlive() && this._hp < this.mhp /
        $gameSystem.constantsEdit.isDying;
        //
    }; // Game_BattlerBase.prototype.isDying

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Battler
     *------------------------------------------------------------------------*/

    Game_Battler.prototype.initTp = function() { // Rewrite
        // Rewritten
        this.setTp(Math.randomInt($gameSystem.constantsEdit.initTp));
        //
    }; // Game_Battler.prototype.initTp

    Game_Battler.prototype.chargeTpByDamage = function(damageRate) { // Rewrite
        // Rewritten
        var value = Math.floor($gameSystem.constantsEdit.chargeTpByDamage *
        damageRate * this.tcr);
        //
        this.gainSilentTp(value);
    }; // Game_Battler.prototype.chargeTpByDamage

    Game_Battler.prototype.regenerateTp = function() { // Rewrite
        var value = Math.floor(this.maxTp() * this.trg); // Rewritten
        this.gainSilentTp(value);
    }; // Game_Battler.prototype.regenerateTp

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Actor
     *------------------------------------------------------------------------*/

    Game_Actor.prototype.paramMax = function(paramId) { // v1.01a+; Rewrite
        // Removed
        //
        return Game_Battler.prototype.paramMax.call(this, paramId);
    }; // Game_Actor.prototype.paramMax

    Game_Actor.prototype.stepsForTurn = function() { // Rewrite
        return $gameSystem.constantsEdit.stepsForTurn; // Rewritten
    }; // Game_Actor.prototype.stepsForTurn

    Game_Actor.prototype.basicFloorDamage = function() { // Rewrite
        return $gameSystem.constantsEdit.basicFloorDamage; // Rewritten
    }; // Game_Actor.prototype.basicFloorDamage

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Enemy
     *------------------------------------------------------------------------*/

    Game_Enemy.prototype.dropItemRate = function() { // Rewrite
        return $gameParty.hasDropItemDouble() ?
        $gameSystem.constantsEdit.DropItemDouble : 1;
    }; // Game_Enemy.prototype.dropItemRate

    Game_Enemy.prototype.selectAllActions = function(actionList) { // Rewrite
        var ratingMax = Math.max.apply(null, actionList.map(function(a) {
            return a.rating;
        }));
        // Rewritten
        var ratingZero = ratingMax - $gameSystem.constantsEdit.ratingRange;
        //
        actionList = actionList.filter(function(a) {
            return a.rating > ratingZero;
        });
        for (var i = 0; i < this.numActions(); i++) {
            this.action(i).setEnemyAction(
            this.selectAction(actionList, ratingZero));
        }
    }; // Game_Enemy.prototype.selectAllActions

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Party
     *------------------------------------------------------------------------*/

    Game_Party.prototype.maxGold = function() { // Rewrite
        return $gameSystem.constantsEdit.maxGold; // Rewritten
    }; // Game_Party.prototype.maxGold

    Game_Party.prototype.maxItems = function(item) { // Rewrite
        return $gameSystem.constantsEdit.maxItems; // Rewritten
    }; // Game_Party.prototype.maxItems

    Game_Party.prototype.ratePreemptive = function(troopAgi) { // Rewrite
        // Rewritten
        var ce = $gameSystem.constantsEdit;
        var rate = this.agility() >= troopAgi ?
        ce.ratePreemptiveHigh : ce.ratePreemptiveLow;
        if (this.hasRaisePreemptive()) { rate *= ce.ratePreemptiveRaise; }
        //
        return rate;
    }; // Game_Party.prototype.ratePreemptive

    Game_Party.prototype.rateSurprise = function(troopAgi) { // Rewrite
        // Rewritten
        var ce = $gameSystem.constantsEdit;
        var rate = this.agility() >= troopAgi ?
        ce.rateSurpriseLow : ce.rateSurpriseHigh;
        //
        if (this.hasCancelSurprise()) { rate = 0; }
        return rate;
    }; // Game_Party.prototype.rateSurprise

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Troop
     *------------------------------------------------------------------------*/

    Game_Troop.prototype.goldRate = function() { // Rewrite
        // Rewritten
        return $gameParty.hasGoldDouble() ?
        $gameSystem.constantsEdit.DropGoldDouble : 1;
        //
    }; // Game_Troop.prototype.goldRate

    /*------------------------------------------------------------------------
     *    # Edit class: Game_CharacterBase
     *------------------------------------------------------------------------*/

    Game_CharacterBase.prototype.realMoveSpeed = function() {
    // v1.01a+; Rewrite
        // Rewritten
        return this._moveSpeed +
        (this.isDashing() ? $gameSystem.constantsEdit.isDashing : 0);
        //
    }; // Game_CharacterBase.prototype.realMoveSpeed

    /*------------------------------------------------------------------------
     *    # Edit class: Game_Player
     *------------------------------------------------------------------------*/

    Game_Player.prototype.encounterProgressValue = function() { // Rewrite
        // Rewritten
        var ce = $gameSystem.constantsEdit;
        var value = $gameMap.isBush(this.x, this.y) ? ce.isBush : 1;
        if ($gameParty.hasEncounterHalf()) { value *= ce.hasEncounterHalf; }
        if (this.isInShip()) { value *= ce.isInShip; }
        //
        return value;
    }; // Game_Player.prototype.encounterProgressValue

    /*------------------------------------------------------------------------
     *    # Edit class: Scene_Shop
     *------------------------------------------------------------------------*/

    Scene_Shop.prototype.sellingPrice = function() { // Rewrite
        // Rewritten
        return Math.floor(this._item.price /
        $gameSystem.constantsEdit.sellingPriceDivisor);
        //
    }; // Scene_Shop.prototype.sellingPrice

})(DoubleX_RMMV.Constants_Edit);

/*============================================================================*/
