/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Formulae Edit
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Some Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/8Ynig2Ht
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01b(GMT 0400 9-9-2017):
 *      1. Fixed not loading the edited formulae from save files bug
 *      v1.01a(GMT 1400 27-1-2016):
 *      1. Fixed called DoubleX_RMMV.Formulae_Edit before it's defined bug
 *      2. All configuration values will be saved in $gameSystem
 *      3. Increased this plugin's readability
 *      v1.00b(GMT 1200 17-11-2015):
 *      1. Fixed wrong number of arugments bug for lukEffectRate and
 *         makeEncounterCount
 *      2. Increased this plugin's efficiency
 *      v1.00a(GMT 1300 10-11-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users modify some hardcoded default RMMV formulae on the fly
 * @author DoubleX
 *
 * @param makeEscapeRatio
 * @desc Sets the party escape ratio upon battle start as makeEscapeRatio, which
 *       must return the content of a function that takes the party and troop's
 *       agi, which can be referenced by partyAgi and troopAgi respectively, as
 *       the arguments
 *       The content of the function returned by makeEscapeRatio will be bound
 *       to BattleManager upon use
 * @default this._escapeRatio = 0.5 * partyAgi / troopAgi;
 *
 * @param speed
 * @desc Sets the action speed as speed, which must return the content of a
 *       function that takes the subject's agi, which can be referenced by agi,
 *       as the argument and returns a Number
 *       The content of the function returned by speed will be bound to
 *       Game_Action upon use
 * @default return agi + Math.randomInt(Math.floor(5 + agi / 4));
 *
 * @param lukEffectRate
 * @desc Sets the luk effect rate multiplier applied to adding states and
 *       debuffs to a target as lukEffectRate, which must return the content of
 *       a function that takes a subject and target, which can be referenced by
 *       subject and target respectively, as the arguments and returns a Number
 *       The content of the function returned by lukEffectRate will be bound to
 *       Game_Action upon use
 * @default return Math.max(1.0 + (subject.luk - target.luk) * 0.001, 0.0);
 *
 * @param expForLevel
 * @desc Sets the required experience for levelling up to level as expForLevel,
 *       which must return the content of a function that takes the level,
 *       actor's class, experience basis, extra, acceleration a and b, which can
 *       be referenced by level, c, basis, extra, acc_a and acc_b respectively,
 *       as the arguments and returns a Number
 *       The content of the function returned by expForLevel will be bound to
 *       Game_Actor upon use
 * @default return Math.round(basis * (Math.pow(level - 1, 0.9 + acc_a / 250)) * level * (level + 1) / (6 + Math.pow(level, 2) / 50 / acc_b) + (level - 1) * extra);
 *
 * @param distancePerFrame
 * @desc Sets the characters' moving distance per frame as distancePerFrame,
 *       which must return the content of a function that takes the real move
 *       speed, which can be referenced by speed, as the argument and returns a
 *       Number
 *       The content of the function returned by expForLevel will be bound to
 *       Game_CharacterBase upon use
 * @default return Math.pow(2, speed) / 256;
 *
 * @param makeEncounterCount
 * @desc Sets the number of steps needed to trigger an encounter as
 *       makeEncounterCount, which must return the content of a function that
 *       takes the encounter count, which can be referenced by n, as the
 *       argument
 *       The content of the function returned by makeEncounterCount will be
 *       bound to Game_Player upon use
 * @default this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
 *
 * @help
 * The default plugin file name is DoubleX RMMV Formulae Edit v101b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.Formulae_Edit_File, which must be done via opening the plugin
 * js file directly
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.formulaeEdit.param
 *         - Returns the function param under DoubleX_RMMV.Formulae_Edit
 *      2. $gameSystem.formulaeEdit.param = function
 *         - Sets the function param under DoubleX_RMMV.Formulae_Edit as
 *           function
 *         - All DoubleX_RMMV.Formulae_Edit.param changes will be saved
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Formulae Edit"] = "v1.01b";

// The plugin file name must be the same as DoubleX_RMMV.Formulae_Edit_File
DoubleX_RMMV.Formulae_Edit_File = "DoubleX RMMV Formulae Edit v101b";

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
 *  *    Why rewrite/extended/What this function does
 *  *----------------------------------------------------------------------*/
/* // arguments: What these arguments are
 * functionName = function(arguments) { // Version X+; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     functionContents
 *     //
 * } // functionName
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Formulae_Edit = {};
(function(FE) {

    FE.DataManager = {};
    var DM = FE.DataManager;

    DM.extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) { // v1.01b+
        DM.extractSaveContents.apply(this, arguments);
        $gameTemp.formulaeEdit = GS.formulaeEditFuncs.call($gameSystem);
    }; // DataManager.extractSaveContents

    /*------------------------------------------------------------------------
     *    * Edit class: BattleManager
     *------------------------------------------------------------------------*/

    BattleManager.makeEscapeRatio = function() { // Rewrite
        // Rewritten
        $gameTemp.formulaeEdit.makeEscapeRatio.call(
                this, $gameParty.agility(), $gameTroop.agility());
        //
    }; // BattleManager.makeEscapeRatio

    FE.Game_Temp = {};
    var GT = FE.Game_Temp;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // The storage of all configuration values
    Object.defineProperty(Game_Temp.prototype, "formulaeEdit", {
        get: function() { return this._formulaeEdit; },
        set: function(formulaeEdit) {
            return this._formulaeEdit = formulaeEdit;
        },
        configurable: true
    });

    FE.Game_System = {};
    var GS = FE.Game_System;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // The storage of all configuration values
    Object.defineProperty(Game_System.prototype, "formulaeEdit", {
        get: function() { return this._formulaeEdit; },
        configurable: true
    });

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        GS.initialize.apply(this, arguments);
        GS.initFormulaeEditParams.call(this);
    }; // Game_System.prototype.initialize

    GS.initFormulaeEditParams = function() {
        this._formulaeEdit = GS.formulaeEditParams.call(this);
        $gameTemp.formulaeEdit = GS.formulaeEditFuncs.call(this);
    }; // GS.initFormulaeEditParams

    GS.formulaeEditParams = function() { // v1.01b+
        var params = PluginManager.parameters(DoubleX_RMMV.Formulae_Edit_File);
        return {
            makeEscapeRatio: params.makeEscapeRatio,
            speed: params.speed,
            lukEffectRate: params.lukEffectRate,
            expForLevel: params.expForLevel,
            distancePerFrame: params.distancePerFrame,
            makeEncounterCount: params.makeEncounterCount
        };
    }; // GS.formulaeEditParams

    GS.formulaeEditFuncs = function() { // v1.01b+
        return {
            makeEscapeRatio: new Function(
                    "partyAgi", "troopAgi", this._formulaeEdit.makeEscapeRatio),
            speed: new Function("agi", this._formulaeEdit.speed),
            lukEffectRate: new Function(
                    "subject", "target", this._formulaeEdit.lukEffectRate),
            expForLevel: new Function("level", "c", "basis", "extra", "acc_a",
                    "acc_b", this._formulaeEdit.expForLevel),
            distancePerFrame: new Function(
                    "speed", this._formulaeEdit.distancePerFrame),
            makeEncounterCount: new Function(
                    "n", this._formulaeEdit.makeEncounterCount)
        };;
    }; // GS.formulaeEditParams

    /*------------------------------------------------------------------------
     *    * Edit class: Game_Action
     *------------------------------------------------------------------------*/

    Game_Action.prototype.speed = function() { // Rewrite
        var agi = this.subject().agi;
        var speed = $gameTemp.formulaeEdit.speed.call(this, agi); // Rewritten
        if (this.item()) {
            speed += this.item().speed;
        }
        if (this.isAttack()) {
            speed += this.subject().attackSpeed();
        }
        return speed;
    }; // Game_Action.prototype.speed

    Game_Action.prototype.lukEffectRate = function(target) { // Rewrite
        // Rewritten
        return $gameTemp.formulaeEdit.lukEffectRate.call(
                this, this.subject(), target);
        //
    }; // Game_Action.prototype.lukEffectRate

    /*------------------------------------------------------------------------
     *    * Edit class: Game_Actor
     *------------------------------------------------------------------------*/

    Game_Actor.prototype.expForLevel = function(level) { // Rewrite
        var c = this.currentClass();
        var basis = c.expParams[0], extra = c.expParams[1];
        var acc_a = c.expParams[2], acc_b = c.expParams[3];
        // Rewritten
        return $gameTemp.formulaeEdit.expForLevel.call(
                this, level, c, basis, extra, acc_a, acc_b);
        //
    }; // Game_Actor.prototype.expForLevel

    /*------------------------------------------------------------------------
     *    * Edit class: Game_CharacterBase
     *------------------------------------------------------------------------*/

    Game_CharacterBase.prototype.distancePerFrame = function() { // Rewrite
        // Rewritten
        return $gameTemp.formulaeEdit.distancePerFrame.call(
                this, this.realMoveSpeed());
        //
    }; // Game_CharacterBase.prototype.distancePerFrame

    /*------------------------------------------------------------------------
     *    * Edit class: Game_Player
     *------------------------------------------------------------------------*/

    Game_Player.prototype.makeEncounterCount = function() { // Rewrite
        $gameTemp.formulaeEdit.makeEncounterCount.call(
                this, $gameMap.encounterStep()); // Rewritten
    }; // Game_Player.prototype.makeEncounterCount

})(DoubleX_RMMV.Formulae_Edit);

/*============================================================================*/
