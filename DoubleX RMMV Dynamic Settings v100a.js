/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Dynamic Settings
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
 *      1. Little RMMV plugin development proficiency for most basic usages
 *      2. Some RMMV plugin development proficiency to fully utilize this
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/1Lzvyy8M
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1400 15-8-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users change some system settings in game and save them
 * @author DoubleX
 *
 * @param currencyUnit
 * @desc Sets the currency unit
 *       It corresponds to the currency in the system settings
 *       Don't include , in its value
 *       Windows showing the currency unit might need to be refreshed right
 *       after changing currencyUnit
 * @default G
 *
 * @param equipTypes
 * @desc Sets the list of equip types
 *       It corresponds to the equipment types in the type settings
 *       Don't change this when showing equips unless you really know what
 *       you're truly doing
 *       Don't change anything other than the equip type names unless you
 *       really know what you're truly doing
 * @default , Weapon, Shield, Head, Body, Accessory
 *
 * @param locale
 * @desc Sets the locale of the game
 *       Don't include , in its value
 *       Windows showing texts might have to be refreshed right after changing
 *       locale
 * @default en_US
 *
 * @param magicSkills
 * @desc Sets the list of skill type ids needing chanting motions in side view
 *       It corresponds to the magic skills in the system settings
 *       Don't change this during the same battle unless you really know what
 *       you're truly doing
 * @default 1, 2
 *
 * @param menuCommands
 * @desc Sets the enabled status of all menu commands
 *       It corresponds to the menu commands in the system settings
 *       The 1st, 2nd, 3rd, 4th, 5th and 6th status correspond to item, skill,
 *       equip, status, formation and save
 *       Setting an enabled status as anything other than false means it's
 *       true
 *       The menu window might need to be refreshed right after changing
 *       menuCommands
 * @default true, true, true, true, true, true
 *
 * @param optDisplayTp
 * @desc Sets whether tp will be shown
 *       It corresponds to the display tp in battle in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 *       Don't change this when showing actors' statuses unless you really
 *       know what you're truly doing
 * @default true
 *
 * @param optExtraExp
 * @desc Sets whether actors outside battles can gain exp from those battles
 *       It corresponds to the exp for reserve members in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 * @default false
 *
 * @param optFloorDeath
 * @desc Sets whether floor damages alone can directly lead to death
 *       It corresponds to the knockout by floor damage in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 * @default true
 *
 * @param optFollowers
 * @desc Sets whether followers of the leading party member will be shown
 *       It corresponds to the show player followers in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 *       Don't change this from false to true when followers could be
 *       colliding with something else unless you really know what you're
 *       truly doing
 * @default true
 *
 * @param optSideView
 * @desc Sets whether side view will be used
 *       It corresponds to the use side view battle in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 *       Don't change this during the same battle unless you really know what
 *       you're truly doing
 * @default true
 *
 * @param optSlipDeath
 * @desc Sets whether slip damages alone can directly lead to death
 *       It corresponds to the knockout by slip damage in the options of the
 *       system settings
 *       Setting it as anything other than false means it's true
 * @default true
 *
 * @param skillTypes
 * @desc Sets the list of skill types
 *       It corresponds to the skill types in the type settings
 *       Don't change this when showing skill types unless you really know
 *       what you're truly doing
 *       Don't change anything other than the skill type names unless you
 *       really know what you're truly doing
 * @default , Magic, Special
 *
 * @help
 * attackMotions, sounds and termscan only be edited via opening this plugin
 * js file directly
 *
 * The default plugin file name is DoubleX RMMV Dynamic Settings v100a
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.Dynamic_Settings_File, which must be done via opening this
 * plugin js file directly
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Configuration manipulations
 *      1. $gameSystem.dynamicSettings.param
 *         - Returns the value of parameters shown in the plugin manager
 *         - E.g.: Without using the 2nd plugin call,
 *                 $gameSystem.dynamicSettings.menuCommands will return
 *                 [false, false, false, false, false, false]
 *      2. $gameSystem.dynamicSettings.param = val
 *         - Sets the value of parameters shown in the plugin manager as val
 *         - All $gameSystem.dynamicSettings.param changes will be saved
 *         - E.g.: $gameSystem.dynamicSettings.terms.messages.substitute =
 *                 '%1 protected %2!' will set the substitute message to be
 *                 '%1 protected %2!'
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Dynamic Settings'] = 'v1.00a';

// The plugin file name must be the same as DoubleX_RMMV.Dynamic_Settings_File
DoubleX_RMMV.Dynamic_Settings_File = 'DoubleX RMMV Dynamic Settings v100a';

DoubleX_RMMV.Dynamic_Settings = {

    /* Sets the list of attack motions in side view
     * It corresponds to attack motions in the system settings
     * Don't change this during the same battle unless you really know what
     * you're doing
     */
    attackMotions: [
        {
            'type': 0,
            'weaponImageId': 0
        }, {
            'type': 1,
            'weaponImageId': 1
        }, {
            'type': 1,
            'weaponImageId': 2
        }, {
            'type': 1,
            'weaponImageId': 3
        }, {
            'type': 1,
            'weaponImageId': 4
        }, {
            'type': 1,
            'weaponImageId': 5
        }, {
            'type': 1,
            'weaponImageId': 6
        }, {
            'type': 2,
            'weaponImageId': 7
        }, {
            'type': 2,
            'weaponImageId': 8
        }, {
            'type': 2,
            'weaponImageId': 9
        }, {
            'type': 0,
            'weaponImageId': 10
        }, {
            'type': 0,
            'weaponImageId': 11
        }, {
            'type': 0,
            'weaponImageId': 12
        }
    ],

    /* Sets the list of sounds
     * It corresponds to sound in system settings
     */
    sounds: [
        {
            name: 'Cursor2',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Decision1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Cancel2',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Buzzer1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Equip1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Save',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Load',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Battle1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Run',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Attack3',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Damage4',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Collapse1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Collapse2',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Collapse3',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Damage5',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Collapse4',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Recovery',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Miss',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Evasion1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Evasion2',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Reflection',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Shop1',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Item3',
            pan: 0,
            pitch: 100,
            volume: 90
        }, {
            name: 'Item3',
            pan: 0,
            pitch: 100,
            volume: 90
        }
    ],

    /* Sets the terms in the term table
     * It corresponds to the terms settings
     * Windows showing those terms might need to be refreshed right after
     * changing the relevant terms in the term table
     */
	terms: {
		basic: [
		    'Level',
		    'Lv',
		    'HP',
		    'HP',
		    'MP',
		    'MP',
		    'TP',
		    'TP',
		    'EXP',
		    'EXP'
		],
		commands: [
		    'Fight',
		    'Escape',
		    'Attack',
		    'Guard',
		    'Item',
		    'Skill',
		    'Equip',
		    'Status',
		    'Formation',
		    'Save',
		    'Game End',
		    'Options',
		    'Weapon',
		    'Armor',
		    'Key Item',
		    'Equip',
		    'Optimize',
		    'Clear',
		    'New Game',
		    'Continue',
		    null,
		    'To Title',
		    'Cancel',
		    null,
		    'Buy',
		    'Sell'
		],
		params: [
		    'Max HP',
		    'Max MP',
		    'Attack',
		    'Defense',
		    'M.Attack',
		    'M.Defense',
		    'Agility',
		    'Luck',
		    'Hit',
		    'Evasion'
		],
		messages: {
			actionFailure: 'There was no effect on %1!',
			actorDamage: '%1 took %2 damage!',
			actorDrain: '%1 was drained of %2 %3!',
			actorGain: '%1 gained %2 %3!',
			actorLoss: '%1 lost %2 %3!',
			actorNoDamage: '%1 took no damage!',
			actorNoHit: 'Miss! %1 took no damage!',
			actorRecovery: '%1 recovered %2 %3!',
			alwaysDash: 'Always Dash',
			bgmVolume: 'BGM Volume',
			bgsVolume: 'BGS Volume',
			buffAdd: "%1's %2 went up!'",
			buffRemove: "%1's %2 returned to normal!",
			commandRemember: 'Command Remember',
			counterAttack: '%1 counterattacked!',
			criticalToActor: 'A painful blow!!',
			criticalToEnemy: 'An excellent hit!!',
			debuffAdd: "%1's %2 went down!",
			defeat: '%1 was defeated.',
			emerge: '%1 emerged!',
			enemyDamage: '%1 took %2 damage!',
			enemyDrain: '%1 was drained of %2 %3!',
			enemyGain: '%1 gained %2 %3!',
			enemyLoss: '%1 lost %2 %3!',
			enemyNoDamage: '%1 took no damage!',
			enemyNoHit: 'Miss! %1 took no damage!',
			enemyRecovery: '%1 recovered %2 %3!',
			escapeFailure: 'However, it was unable to escape!',
			escapeStart: '%1 has started to escape!',
			evasion: '%1 evaded the attack!',
			expNext: 'To Next %1',
			expTotal: 'Current %1',
			file: 'File',
			levelUp: '%1 is now %2 %3!',
			loadMessage: 'Load which file?',
			magicEvasion: '%1 nullified the magic!',
			magicReflection: '%1 reflected the magic!',
			meVolume: 'ME Volume',
			obtainExp: '%1 %2 received!',
			obtainGold: '%1\\G found!',
			obtainItem: '%1 found!',
			obtainSkill: '%1 learned!',
			partyName: "%1's Party",
			possession: 'Possession',
			preemptive: '%1 got the upper hand!',
			saveMessage: 'Save to which file?',
			seVolume: 'SE Volume',
			substitute: '%1 protected %2!',
			surprise: '%1 was surprised!',
			useItem: '%1 uses %2!',
			victory: '%1 was victorious!'
		}
	}

}; // DoubleX_RMMV.Dynamic_Settings

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

(function(DS) {

    'use strict';

    Object.defineProperty(TextManager, 'currencyUnit', {
    // Rewrite; v1.00a - v1.00a
        get: function() { return $gameSystem.dynamicSettings.currencyUnit; },
        configurable: true
    });

    DS.SoundManager = {};
    var SM = DS.SoundManager;

    // Trades a bit of time performance for a vast amount of simplicity
    SM.playSystemSound = SoundManager.playSystemSound;
    SoundManager.playSystemSound = function(n) { // Rewrite; v1.00a - v1.00a
        // Rewritten
        if ($gameSystem) {
            AudioManager.playStaticSe($gameSystem.dynamicSettings.sounds[n]);
        }
        //
    }; // SoundManager.playSystemSound

    DS.TextManager = {};
    var TM = DS.TextManager;

    TM.basic = TextManager.basic;
    TextManager.basic = function(basicId) { // Rewrite; v1.00a - v1.00a
        // Rewritten
        return $gameSystem.dynamicSettings.terms.basic[basicId] || '';
        //
    }; // TextManager.basic

    TM.param = TextManager.param;
    TextManager.param = function(paramId) { // Rewrite; v1.00a - v1.00a
        // Rewritten
        return $gameSystem.dynamicSettings.terms.params[paramId] || '';
        //
    }; // TextManager.param

    TM.command = TextManager.command;
    TextManager.command = function(commandId) { // Rewrite; v1.00a - v1.00a
        // Rewritten
        return $gameSystem.dynamicSettings.terms.commands[commandId] || '';
        //
    }; // TextManager.command

    TM.message = TextManager.message;
    TextManager.message = function(messageId) { // Rewrite; v1.00a - v1.00a
        // Rewritten
        return $gameSystem.dynamicSettings.terms.messages[messageId] || '';
        //
    }; // TextManager.message

    DS.Game_System = {};
    var GS = DS.Game_System;

    GS.isJapanese = Game_System.prototype.isJapanese;
    Game_System.prototype.isJapanese = function() { // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.locale.match(/^ja/); // Rewritten
    }; // Game_System.prototype.isJapanese

    GS.isChinese = Game_System.prototype.isChinese;
    Game_System.prototype.isChinese = function() { // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.locale.match(/^zh/); // Rewritten
    }; // Game_System.prototype.isChinese

    GS.isKorean = Game_System.prototype.isKorean;
    Game_System.prototype.isKorean = function() { // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.locale.match(/^ko/); // Rewritten
    }; // Game_System.prototype.isKorean

    GS.isCJK = Game_System.prototype.isCJK;
    Game_System.prototype.isCJK = function() { // Rewrite; v1.00a - v1.00a
        // Rewritten
        return $gameSystem.dynamicSettings.locale.match(/^(ja|zh|ko)/);
        //
    }; // Game_System.prototype.isCJK

    GS.isRussian = Game_System.prototype.isRussian;
    Game_System.prototype.isRussian = function() { // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.locale.match(/^ru/); // Rewritten
    }; // Game_System.prototype.isRussian

    GS.isSideView = Game_System.prototype.isSideView;
    Game_System.prototype.isSideView = function() { // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.optSideView; // Rewritten
    }; // Game_System.prototype.isSideView

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() { // Extended; v1.00a - v1.00a
        GS.initialize.apply(this, arguments);
        GS.initializeDynamicSettings.call(this); // Added
    }; // Game_System.prototype.initialize

    /* Stores all configurations into the container being saved in save files
     * Functional cohesion/Message coupling/Idempotent
     */
    GS.initializeDynamicSettings = function() { // New; v1.00a - v1.00a
        var settings = this.dynamicSettings = {};
        var ps = PluginManager.parameters(DoubleX_RMMV.Dynamic_Settings_File);
        Object.keys(ps).forEach(function(param) {
            settings[param] = GS.setConfig.call(this, ps[param]);
        }, this);
        settings.menuCommands = settings.menuCommands.map(function(enabled) {
            return enabled !== 'false';
        });
        settings.attackMotions = DS.attackMotions, settings.sounds = DS.sounds;
        settings.terms = DS.terms;
    } ; // GS.initializeDynamicSettings

    /* Sets the raw configuration value into its expected data format
     * (String)val: The raw configuration value
     * Return: The properly formatted configuration value
     * Functional cohesion/Data coupling/Referentially transparent
     */
    GS.setConfig = function(val) { // New; v1.00a - v1.00a
        if (val.match(/.*, .*/)) return val.split(', ');
        return val === 'false' ?  false : val;
    }; // GS.setConfig

    DS.Game_Action = {};
    var GA = DS.Game_Action;

    GA.isMagicSkill = Game_Action.prototype.isMagicSkill;
    Game_Action.prototype.isMagicSkill = function() {
    // Rewrite; v1.00a - v1.00a
        if (this.isSkill()) {
            // Rewritten
            var settings = $gameSystem.dynamicSettings;
            return settings.magicSkills.contains(this.item().stypeId);
            //
        } else {
            return false;
        }
    }; // Game_Action.prototype.isMagicSkill

    DS.Game_Battler = {};
    var GB = DS.Game_Battler;

    GB.maxSlipDamage = Game_Battler.prototype.maxSlipDamage;
    Game_Battler.prototype.maxSlipDamage = function() {
    // Rewrite; v1.00a - v1.00a
        // Rewritten
        if ($gameSystem.dynamicSettings.optSlipDeath) return this.hp;
        return Math.max(this.hp - 1, 0);
        //
    }; // Game_Battler.prototype.maxSlipDamage

    DS.Game_Actor = {};
    var GActor = DS.Game_Actor;

    GActor.equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() { // Rewrite; v1.00a - v1.00a
        var slots = [], equipTypes = $gameSystem.dynamicSettings.equipTypes;
        // Rewritten
        for (var i = 1; i < equipTypes.length; i++) {
            slots.push(i);
        }
        //
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        return slots;
    }; // Game_Actor.prototype.equipSlots

    GActor.benchMembersExpRate = Game_Actor.prototype.benchMembersExpRate;
    Game_Actor.prototype.benchMembersExpRate = function() {
    // Rewrite; v1.00a - v1.00a
        return $gameSystem.dynamicSettings.optExtraExp ? 1 : 0; // Rewritten
    }; // Game_Actor.prototype.benchMembersExpRate

    GActor.performAttack = Game_Actor.prototype.performAttack;
    Game_Actor.prototype.performAttack = function() {
    // Rewritten; v1.00a - v1.00a
        var weapons = this.weapons();
        var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
        // Rewritten
        var attackMotion = $gameSystem.dynamicSettings.attackMotions[wtypeId];
        //
        if (attackMotion) {
            if (attackMotion.type === 0) {
                this.requestMotion('thrust');
            } else if (attackMotion.type === 1) {
                this.requestMotion('swing');
            } else if (attackMotion.type === 2) {
                this.requestMotion('missile');
            }
            this.startWeaponAnimation(attackMotion.weaponImageId);
        }
    }; // Game_Actor.prototype.performAttack

    GActor.maxFloorDamage = Game_Actor.prototype.maxFloorDamage;
    Game_Actor.prototype.maxFloorDamage = function() {
    // Rewrite; v1.00a - v1.00a
        // Rewritten
        var settings = $gameSystem.dynamicSettings;
        return settings.optFloorDeath ? this.hp : Math.max(this.hp - 1, 0);
        //
    }; // Game_Actor.prototype.maxFloorDamage

    DS.Game_Followers = {};
    var GF = DS.Game_Followers;

    GF.initialize = Game_Followers.prototype.initialize;
    Game_Followers.prototype.initialize = function() {
    // Extended; v1.00a - v1.00a
        GF.initialize.apply(this, arguments);
        this._visible = $gameSystem.dynamicSettings.optFollowers; // Added
    }; // Game_Followers.prototype.initialize

    DS.Window_MenuCommand = {};
    var WMC = DS.Window_MenuCommand;

    WMC.needsCommand = Window_MenuCommand.prototype.needsCommand;
    Window_MenuCommand.prototype.needsCommand = function(name) {
    // Rewrite; v1.00a - v1.00a
        var flags = $gameSystem.dynamicSettings.menuCommands; // Rewritten
        if (flags) {
            switch (name) {
            case 'item':
                return flags[0];
            case 'skill':
                return flags[1];
            case 'equip':
                return flags[2];
            case 'status':
                return flags[3];
            case 'formation':
                return flags[4];
            case 'save':
                return flags[5];
            }
        }
        return true;
    }; // Window_MenuCommand.prototype.needsCommand

    DS.Window_EquipSlot = {};
    var WES = DS.Window_EquipSlot;

    WES.slotName = Window_EquipSlot.prototype.slotName;
    Window_EquipSlot.prototype.slotName = function(index) {
    // Rewrite; v1.00a - v1.00a
        // Rewritten
        var slots = this._actor.equipSlots(), cfg = $gameSystem.dynamicSettings;
        return this._actor ? cfg.equipTypes[slots[index]] : '';
        //
    }; // Window_EquipSlot.prototype.slotName

    DS.Window_SkillType = {};
    var WST = DS.Window_SkillType;

    WST.makeCommandList = Window_SkillType.prototype.makeCommandList;
    Window_SkillType.prototype.makeCommandList = function() {
    // Rewritten; v1.00a - v1.00a
        if (this._actor) {
            var skillTypes = this._actor.addedSkillTypes();
            skillTypes.sort(function(a, b) {
                return a - b;
            });
            skillTypes.forEach(function(stypeId) {
                // Rewritten
                var name = $gameSystem.dynamicSettings.skillTypes[stypeId];
                //
                this.addCommand(name, 'skill', true, stypeId);
            }, this);
        }
    }; // Window_SkillType.prototype.makeCommandList

    DS.Window_ActorCommand = {};
    var WAC = DS.Window_ActorCommand;

    WAC.addSkillCommands = Window_ActorCommand.prototype.addSkillCommands;
    Window_ActorCommand.prototype.addSkillCommands = function() {
    // Rewritten; v1.00a - v1.00a
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
        skillTypes.forEach(function(stypeId) {
            // Rewritten
            var name = $gameSystem.dynamicSettings.skillTypes[stypeId];
            //
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }; // Window_ActorCommand.prototype.addSkillCommands

    DS.Window_BattleStatus = {};
    var WBS = DS.Window_BattleStatus;

    WBS.drawGaugeArea = Window_BattleStatus.prototype.drawGaugeArea;
    Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    // Rewrite; v1.00a - v1.00a
        // Rewritten
        if ($gameSystem.dynamicSettings.optDisplayTp) {
            this.drawGaugeAreaWithTp(rect, actor);
        } else {
            this.drawGaugeAreaWithoutTp(rect, actor);
        }
        //
    }; // Window_BattleStatus.prototype.drawGaugeArea

})(DoubleX_RMMV.Dynamic_Settings);

/*============================================================================*/
