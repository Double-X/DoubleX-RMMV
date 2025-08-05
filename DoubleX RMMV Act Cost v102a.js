/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Action Cost
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
 *      1. Little plugin development proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/pkyCifBZ
 *      Video:
 *      1. https://www.youtube.com/watch?v=epa5v4wZuOs
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.02a(GMT 0300 20-5-2020):
 *      1. Added <max act cost> notetag
 *      v1.01c(GMT 0300 2-9-2017):
 *      1. Fixed all skills/items being not usable outside battle bug
 *      v1.01b(GMT 0800 11-8-2016):
 *      1. Improved compatibility with DoubleX RMMV Popularized ATB Core
 *      v1.01a(GMT 0500 16-9-2016):
 *      1. Compatible with DoubleX RMMV Item Charge and
 *         DoubleX RMMV Item Cooldown
 *      2. Lets you set the action cots text color via textColor
 *      v1.00c(GMT 0400 5-6-2016):
 *      1. Fixed a bug where action cost's checked for non skills/items
 *      v1.00b(GMT 1400 22-5-2016):
 *      1. Fixed making some skills/items becoming not usable after cancelling
 *         attack
 *      v1.00a(GMT 1500 17-4-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you set some skills/items to need more than 1 action slots
 * @author DoubleX
 *
 * @param textColor
 * @desc Sets the text color of the text showing the number of action slots
 *       needed to use the skill/item on the skill/item window
 *       It'll be stored as a Number
 *       Don't change this when it's shown to ensure proper text displays
 *       E.g.: Setting textColor as 15 will set the text color of the text
 *             showing the number of action slots needed to use the skill/item
 *             onthe skill/item window as 15
 * @default 0
 *
 * @help
 * The skill/item window action cost display can be problematic if the action
 * cost's 1000 or above
 * This plugin won't work well if the total number of action slot of a battler
 * is 1000 or above
 * This plugin won't work well if the action cost of attack or guard is
 * greater than 1
 * This plugin won't work well if the action cost isn't positive
 * The default plugin file name is DoubleX RMMV Act Cost v102a
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.Act_Cost_File, which must be done via opening this plugin js
 * file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item Notetags:
 *      1. <act cost: num>
 *         - Sets the number of action slots needed by this skill/item as num
 *      (v1.02a+)2. <max act cost>
 *         - Sets the skill/item to always need all action slots
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Skill/Item notetag manipulations
 *      1. meta.actCost
 *         - Returns the <act cost: num> notetag value num as a Number
 *      2. meta.actCost = num
 *         - Sets the <act cost: num> notetag value num as a Number
 *          - All meta.actCost changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *    # Skill/Item notetag manipulations
 *      1. meta.isMaxActCost
 *         - Returns whether <max act cost> notetag is effective
 *      2. meta.isMaxActCost = boolean
 *         - Sets the <max act cost> notetag to be effective if boolean is
 *           true and ineffective otherwise
 *          - All meta.isMaxActCost changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Act Cost'] = 'v1.02a';

// The plugin file name must be the same as DoubleX_RMMV.Act_Cost_File
DoubleX_RMMV.Act_Cost_File = 'DoubleX RMMV Act Cost v102a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
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

(function(AC) {

    'use strict';

    AC.DataManager = {};
    var DM = AC.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        // Rewritten
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    DM.loadAllNotes = function() {
        [$dataSkills, $dataItems].forEach(function(type) {
            type.forEach(function(data) { if (data) DM.loadNotes(data); });
        });
        return true;
    }; // DM.loadAllNotes

    // (Object)data: The data to have its notetags read
    DM.loadNotes = function(data) {
        var actCost = /< *act +cost *: *(\d+) *>/i;
        var isMaxActCost = /< *max +act +cost *>/i;
        data.meta.actCost = 1; // The default action cost for all skills/items
        data.note.split(/[\r\n]+/).forEach(function(line) {
            if (line.match(actCost)) return data.meta.actCost = +RegExp.$1;
            if (line.match(isMaxActCost)) return data.meta.isMaxActCost = true;
        });
    }; // DM.loadNotes

    AC.BattleManager = {};
    var BM = AC.BattleManager;

    BM.selectNextCommand = BattleManager.selectNextCommand;
    BattleManager.selectNextCommand = function() {
        // Added to reserve action slots for the currently inputted action
        BM.reserveActs.call(this);
        //
        BM.selectNextCommand.apply(this, arguments);
    }; // BattleManager.selectNextCommand

    BM.selectPreviousCommand = BattleManager.selectPreviousCommand;
    BattleManager.selectPreviousCommand = function() {
        // Added to ensure all reserved action slots are empty
        var act = this.actor().inputtingAction();
        if (act) { act.clear(); }
        //
        BM.selectPreviousCommand.apply(this, arguments);
        // Added to release action slots from the currently inputted action
        BM.releaseReservedActs.call(this);
        //
    }; // BattleManager.selectPreviousCommand

    BM.startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        // Added to ensures battlers can use valid actions upon executing them
        BM.clearReservedActs.call(this);
        //
        BM.startTurn.apply(this, arguments);
    }; // BattleManager.startTurn

    BM.reserveActs = function() {
        var actor = this.actor();
        if (!actor) { return; }
        var item = actor.inputtingAction().item();
        actor.actCostInputs += GB.actCost.call(actor, item) - 1;
    }; // BM.reserveActs

    BM.releaseReservedActs = function() {
        var actor = this.actor();
        if (!actor) { return; }
        var act = actor.inputtingAction();
        var item = act.item();
        if (!item) return;
        actor.actCostInputs -= GB.actCost.call(actor, item) - 1;
        if (act) { act.clear(); }
    }; // BM.releaseReservedActs

    BM.clearReservedActs = function() {
        // This plugin's not supposed to work with action cost greater than 999
        $gameParty.movableMembers().forEach(function(mem) {
            mem.actCostInputs = -999;
        });
        $gameTroop.movableMembers().forEach(function(mem) {
            mem.actCostInputs = -999;
        });
        //
    }; // BM.clearReservedActs

    // v1.01a+
    AC.Game_System = {};
    var GS = AC.Game_System;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // actCost: The container of all parameters shown on the plugin manger

    GS.initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        GS.initialize.apply(this, arguments);
        GS.initializeActCost.call(this); // Added
    }; // Game_System.prototype.initialize

    GS.initializeActCost = function() { // New; v1.00a - v1.00a
        this.actCost = {};
        var params = PluginManager.parameters(DoubleX_RMMV.Act_Cost_File);
        Object.keys(params).forEach(function(param) {
            this.actCost[param] = params[param];
        }, this);
    }; // GS.initializeActCost

    AC.Game_BattlerBase = {};
    var GBB = AC.Game_BattlerBase;

    GBB.initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        GBB.initMembers.apply(this, arguments);
        this._actCostInputs = 0; // Added to reset the number of reserved slots
    }; // Game_Actor.prototype.initMembers

    GBB.canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        // Added to check if there are enough empty action slots to be reserved
        if (DataManager.isSkill(item) || DataManager.isItem(item)) {
            if (!GBB.canReserveActs.call(this, item)) { return false; }
        }
        //
        return GBB.canUse.apply(this, arguments);
    }; // Game_BattlerBase.prototype.canUse

    GBB.canReserveActs = function(item) {
        if (!$gameParty.inBattle()) return true;
        if (!item) { return false; }
        var emptyActs = this._actions.filter(function(act) {
            return !act.item();
        }).length;
        return GB.actCost.call(this, item) <= emptyActs - this._actCostInputs;
    }; // GBB.canReserveActs

    AC.Game_Battler = {};
    var GB = AC.Game_Battler;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    Object.defineProperty(Game_Battler.prototype, 'actCostInputs', {
        get: function() { return this._actCostInputs; },
        set: function(num) { this._actCostInputs = num; },
        configurable: true
    });

    GB.clearActions = Game_Battler.prototype.clearActions;
    Game_Battler.prototype.clearActions = function() {
        GB.clearActions.apply(this, arguments);
        this._actCostInputs = 0; // Added to reset the number of reserved slots
    }; // Game_Battler.prototype.clearActions

    GB.actCost = function(item) { // v1.02a+
        if (item.meta.isMaxActCost) return this._actions.length;
        return item.meta.actCost;
    }; // GB.actCost

    AC.Game_Actor = {};
    var GA = AC.Game_Actor;

    GA.selectNextCommand = Game_Actor.prototype.selectNextCommand;
    Game_Actor.prototype.selectNextCommand = function() {
        // Added to return false if the next slot's reserved by actions too
        var maxIndex = this._actions.length - 1;
        if (this._actionInputIndex + this._actCostInputs >= maxIndex) {
            return false;
        }
        //
        return GA.selectNextCommand.apply(this, arguments);
    }; // Game_Actor.prototype.selectNextCommand

    AC.Game_Enemy = {};
    var GE = AC.Game_Enemy;

    GE.selectAction = Game_Enemy.prototype.selectAction;
    Game_Enemy.prototype.selectAction = function(actionList, ratingZero) {
        // Rewritten to only select those that can reserve action slots
        arguments[0] = actionList.filter(function(act) {
            var skill = $dataSkills[act.skillId];
            return GBB.canReserveActs.call(this, skill);
        }, this);
        var act = GE.selectAction.apply(this, arguments);
        if (act) {
            var skill = $dataSkills[act.skillId];
            this._actCostInputs += GB.actCost.call(this, skill) - 1;
        };
        return act;
        //
    }; // Game_Enemy.prototype.selectAction

    AC.Window_ItemList = {};
    var WIL = AC.Window_ItemList;

    WIL.isEnabled = Window_ItemList.prototype.isEnabled;
    Window_ItemList.prototype.isEnabled = function(item) {
        // Rewritten to disable item when its user doesn't have enough actions
        if (!DataManager.isItem(item) || !$gameParty.inBattle()) {
            return WIL.isEnabled.apply(this, arguments);
        }
        var actor = BattleManager.actor();
        return actor && actor.canUse(item);
        //
    }; // Window_ItemList.prototype.isEnabled

    WIL.drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) {
        WIL.drawItem.apply(this, arguments);
        // Added to draw the action cost as well
        var item = this._data[index];
        if (!item) { return; }
        var rect = this.itemRect(index);
        rect.x -= WSL.costWidth.apply(this, arguments);
        rect.width -= this.textPadding();
        WIL.drawActCost.call(this, item, rect.x, rect.y, rect.width);
        //
    }; // Window_ItemList.prototype.drawItem

    WIL.numberWidth = Window_ItemList.prototype.numberWidth;
    Window_ItemList.prototype.numberWidth = function() {
        return WIL.numberWidth.apply(this, arguments) * 2; // Rewritten
    }; // Window_ItemList.prototype.numberWidth

    WIL.drawActCost = function(item, x, y, width) {
        var actor = BattleManager.actor();
        var cost = actor ? GB.actCost.call(actor, item) : item.meta.actCost;
        this.drawText(cost, x, y, width, 'right');
    }; // WIL.drawActCost

    AC.Window_SkillList = {};
    var WSL = AC.Window_SkillList;

    WSL.drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        WSL.drawItem.apply(this, arguments);
        // Added to draw the action cost as well
        var skill = this._data[index];
        if (!skill) { return; }
        var rect = this.itemRect(index);
        rect.x -= WSL.costWidth.apply(this, arguments);
        rect.width -= this.textPadding();
        WSL.drawActCost.call(this, skill, rect.x, rect.y, rect.width);
        //
    }; // Window_SkillList.prototype.drawItem

    WSL.costWidth = Window_SkillList.prototype.costWidth;
    Window_SkillList.prototype.costWidth = function() {
    	// Rewritten
        return WSL.costWidth.apply(this, arguments) + this.textWidth('000');
        //
    }; // Window_SkillList.prototype.costWidth

    WSL.drawActCost = function(skill, x, y, width) {
        this.changeTextColor(this.textColor($gameSystem.actCost.textColor));
        var actor = BattleManager.actor();
        var cost = actor ? GB.actCost.call(actor, skill) : skill.meta.actCost;
        this.drawText(cost, x, y, width, 'right');
        this.changeTextColor(this.normalColor());
    }; // WSL.drawActCost

    AC.Scene_Battle = {}; // v1.00b+
    var SB = AC.Scene_Battle;

    SB.onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        SB.onActorCancel.apply(this, arguments);
        BattleManager.inputtingAction().clear(); // Added
    }; // Scene_Battle.prototype.onActorCancel

    SB.onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        SB.onEnemyCancel.apply(this, arguments);
        BattleManager.inputtingAction().clear(); // Added
    }; // Scene_Battle.prototype.onEnemyCancel

})(DoubleX_RMMV.Act_Cost = {});

/*============================================================================*/
