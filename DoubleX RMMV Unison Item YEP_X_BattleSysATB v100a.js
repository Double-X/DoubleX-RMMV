/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Unison Item YEP_X_BattleSysATB
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. Yanfly Engine Plugins - Battle System - Active Turn Battle
 *      2. DoubleX RMMV Unison Item Config
 *      3. DoubleX RMMV Unison Item Default
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/y2SMpu9V
 *      Video:
 *      1. https://www.youtube.com/watch?v=9JsrGSjbb2s
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. Place DoubleX RMMV Unison Item Config below YEP_BattleEngineCore
 *      2. Place this plugin below DoubleX RMMV Unison Item Default
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0600 21-5-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you use unison skills/items with YEP_X_BattleSysATB
 * @author DoubleX
 * @help
 * Charge Rate -
 * All actors needed for an unison skill/item will always have the same charge
 * value when charging that skill/item
 * unisonFunctionRule is used to set the unison charge rate for those actors
 *
 * Asynchronous unison skills/items:
 * All <async unison item> notetags will be ignored by this plugin and all
 * unison skills/items will be regarded as asynchronous unison skills/items
 * Right now asynchoronous unison skills/items won't work without charging
 * An asynchoronous unison skill/item is inputable by any battler needed by
 * that skill/item as long as all the needed battlers are alive and pass the
 * skill learn requirements for skills if any, and that battler passes the
 * ordinary skill/item usability checks
 * Battlers having inputted asynchronous unison skills/items will wait for all
 * needed battlers to input those unison skills/items to execute them together
 * They'll stop waiting if any needed battler's not alive
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Unison Item YEP_X_BattleSysATB"] = 'v1.00a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Solid understanding on the implementations of
 *           Yanfly Engine Plugins - Battle System - Active Turn Battle
 *         - Decent Javascript coding proficiency to fully comprehend this
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

if (DoubleX_RMMV["Unison Item Default"]) {

if (Imported.YEP_X_BattleSysATB) {

(function(UI, ATB) {

    'use strict';

    ATB.BattleManager = {};
    var BMATB = ATB.BattleManager;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // The cached mapping from async unison skills/items to all inputted actors
    Object.defineProperty(BattleManager, 'asyncUnisonItems', {
        get: function() { return this._asyncUnisonItems; },
        configurable: true
    });

    BattleManager.actionCastAnimation = function() {
      if (!$gameSystem.isSideView() && this._subject.isActor()) return true;
      if (!this._action.isAttack() && !this._action.isGuard() &&
      this._action.isSkill()) {
        // Rewritten
        var ani = this._action.item().castAnimation;
        if (ani > 0) {
          var actorIds = this._action.item().meta.unisonItemActors;
          if (actorIds.length > 1) {
              var actors = actorIds.map(function(actorId) {
                  return $gameActors.actor(actorId);
              });
              this._logWindow.showAnimation(this._subject, actors, ani);
          } else {
              this._logWindow.showAnimation(this._subject, [this._subject], ani);
          }
        }
        //
      }
      return true;
    }; //BattleManager.actionCastAnimation

    BattleManager.endATBAction = function() {
        if (Imported.YEP_BattleEngineCore) {
          if (this._processingForcedAction) this._phase = this._preForcePhase;
          this._processingForcedAction = false;
        }
        if (this._subject) this._subject.onAllActionsEnd();
        if (this.updateEventMain()) return;
        BMATB.endATBAct.call(this); // Rewritten
        if (this.loadPreForceActionSettings()) return;
        this.updateBattlerATB(true);
        var chargedBattler = this.getChargedATBBattler();
        if (chargedBattler) {
          this.startATBAction(chargedBattler);
        } else {
          this.setATBPhase();
        }
    }; // BattleManager.endATBAction

    BMATB.setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        BMATB.setup.apply(this, arguments);
        this._asyncUnisonItems = {}; // Added
    }; // BattleManager.setup

    BMATB.selectNextCommand = BattleManager.selectNextCommand;
    BattleManager.selectNextCommand = function() {
        if (this.isATB()) {
          if (!this.actor()) return this.setATBPhase();
          this.resetNonPartyActorATB();
          GBBATB.markUnisonActors.call(this.actor()); // Added
          this.actor().setupATBCharge();
          this.actor().spriteStepBack();
          this.actor().requestMotionRefresh();
          this._actorIndex = undefined;
          var chargedBattler = this.getChargedATBBattler();
          if (chargedBattler) {
            this.startATBAction(chargedBattler);
          } else {
            this.setATBPhase();
          }
        } else {
          BMATB.selectNextCommand.apply(this, arguments);
        }
    }; // BattleManager.selectNextCommand

    /*------------------------------------------------------------------------
     *    Removes battlers that are no longer waiting for async unison item
     *------------------------------------------------------------------------*/
    // battler: The battler needed for a marked async unison skill/item
    BMATB.removeAsyncUnisonBattler = function(battler) {
        if (!this._asyncUnisonItems) return;
        var index;
        // The 1st actor in the async unison skill/item actor list's the invoker
        Object.keys(this._asyncUnisonItems).forEach(function(itemId) {
            index = this._asyncUnisonItems[itemId].indexOf(battler);
            if (index > 0) { this._asyncUnisonItems[itemId].splice(index, 1); }
        }, this);
        //
    }; // BMATB.removeAsyncUnisonActor

    /*------------------------------------------------------------------------
     *    Ends the ATB Turn for all unison actors if unison skill/item's used
     *------------------------------------------------------------------------*/
    BMATB.endATBAct = function() {
        var item = this._action.item();
        this._asyncUnisonItems[item.id] = [];
        var ids = item.meta.unisonItemActors;
        BMATB.callUnisonActors.call(this, this._subject, ids, 'endTurnAllATB');
    }; // BMATB.endATBAct

    /*------------------------------------------------------------------------
     *    Asks each unison actor of act to call its battler function func
     *------------------------------------------------------------------------*/
    /* invoker: The unison invoker
     * actorIds: The list of ids of actors needed for the unison skill/item
     * func: The battler function to be called by all unison actors
     */
    BMATB.callUnisonActors = function(invoker, actorIds, func) {
    	invoker[func]();
        if (actorIds.length <= 1) { return; }
        var actor;
        actorIds.forEach(function(actorId) {
            if (actorId === invoker.actorId()) { return; }
            actor = $gameActors.actor(actorId);
            if (!actor) { return; }
            actor[func]();
        });
    }; // BMATB.callUnisonActors

    var GBB = UI.Game_BattlerBase;
    ATB.Game_BattlerBase = {};
    var GBBATB = ATB.Game_BattlerBase;

    Game_BattlerBase.prototype.canInput = function() {
        if (!GBB.canInput.apply(this, arguments)) { return false; }
        if (BattleManager.isATB()) { return true; } // Added
        if (!this.isActor() || !$gameParty.inBattle()) { return true; }
        return this._unisonItemNumInputs < this._actions.length;
    }; // Game_BattlerBase.prototype.canInput

    GBBATB.canUseUnisonSkill = GBB.canUseUnisonSkill;
    GBB.canUseUnisonSkill = function(skill) {
        // Rewritten to check the skill usability for all unison invokees
        if (!BattleManager.isATB()) {
            return GBBATB.canUseUnisonSkill.apply(this, arguments);
        }
        var mems = $gameParty.aliveMembers();
        var actor, actorIds = skill.meta.unisonItemActors;
        var learnFlags = skill.meta.unisonItemActorLearn;
        for (var index = 0, length = actorIds.length; index < length; index++) {
            actor = mems.filter(function(mem) {
                return mem.actorId() === actorIds[index];
            })[0];
            if (!actor) { return false; }
            if (learnFlags[index] && actor.skills().every(function(s) {
                return s !== skill;
            })) { return false; }
        }
        return true;
        //
    }; // GBB.canUseUnisonSkill

    GBBATB.canUseUnisonItem = GBB.canUseUnisonItem;
    GBB.canUseUnisonItem = function(item) {
        // Rewritten to check if all unison invokees are alive
        if (!BattleManager.isATB()) {
            return GBBATB.canUseUnisonItem.apply(this, arguments);
        }
        if (!this.meetsItemConditions(item)) { return false; }
        var mems = $gameParty.aliveMembers();
        var actor, actorIds = item.meta.unisonItemActors;
        for (var index = 0, length = actorIds.length; index < length; index++) {
            if (actorIds[index] === this.actorId()) { continue; }
            if (!mems.filter(function(mem) {
                return mem.actorId() === actorIds[index];
            })[0]) { return false; }
        }
        return true;
        //
    }; // GBB.canUseUnisonItem

    GBBATB.markUnisonActors = function() {
        var item = this.currentAction().item();
        if (!item) { return; }
        this._unisonItemActors = item.meta.unisonItemActors;
        if (item.meta.unisonItemActors.length <= 1) { return; }
        GBBATB.markAsyncUnisonItemActors.call(this, item);
    }; // GBBATB.markUnisonActors

    /*------------------------------------------------------------------------
     *    Executes the async unison item when all unison actors inputted it
     *------------------------------------------------------------------------*/
    // item: The current async unison skill/item
    GBBATB.markAsyncUnisonItemActors = function(item) {
        if (!BattleManager.asyncUnisonItems[item.id]) {
            BattleManager.asyncUnisonItems[item.id] = [];
        }
        var actors = BattleManager.asyncUnisonItems[item.id];
        // The 1st actor in the async unison skill/item actor list's the invoker
        actors.push(this);
        if (actors.length !== this._unisonItemActors.length) { return; }
        var actorIds = this._unisonItemActors, func = 'setupATBCharge';
        BMATB.callUnisonActors.call(BattleManager, actors[0], actorIds, func);
        actors.forEach(function(actor) {
            if (actor) { actor.isUnisonItemReady = true; }
        });
        //
    }; // GBBATB.markAsyncUnisonItemActors

    ATB.Game_Battler = {};
    var GBATB = ATB.Game_Battler;

    /*------------------------------------------------------------------------
     *    New public instance variables
     *------------------------------------------------------------------------*/
    Object.defineProperties(Game_Battler.prototype, {
        // The cached list of ids of all unison actors
        'unisonItemActors': {
            get: function() { return this._unisonItemActors; },
            set: function(actorIds) { this._unisonItemActors = actorIds; },
            configurable: true
        },
        // The flag showing whether the unison skill/item can be executed
        'isUnisonItemReady': {
            get: function() { return this._isUnisonItemReady; },
            set: function(ready) { this._isUnisonItemReady = ready; },
            configurable: true
        }
    });

    GBATB.initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        GBATB.initMembers.apply(this, arguments);
        GBATB.resetUnisonItem.call(this); // Added
    }; // Game_Battler.prototype.initMembers

    GBATB.onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
    Game_Battler.prototype.onAllActionsEnd = function() {
        GBATB.onAllActionsEnd.apply(this, arguments);
        GBATB.resetUnisonItem.call(this); // Added
    }; // Game_Battler.prototype.onAllActionsEnd

    GBATB.resetAllATB = Game_Battler.prototype.resetAllATB;
    Game_Battler.prototype.resetAllATB = function() {
        GBATB.resetAllATB.apply(this, arguments);
        GBATB.resetUnisonItem.call(this); // Added
    }; // Game_Battler.prototype.resetAllATB

    GBATB.resetUnisonItem = function() {
        this._unisonItemActors = [];
        this._isUnisonItemReady = false;
        BMATB.removeAsyncUnisonBattler.call(BattleManager, this);
    }; // GBATB.resetUnisonItem

    /*------------------------------------------------------------------------
     *    Ensures the charging value is the same for all unison actors
     *------------------------------------------------------------------------*/
    GBATB.updateUnisonTick = function() {
        var actors = this._unisonItemActors.map(function(actorId) {
            return $gameActors.actor(actorId);
        });
        if (!actors.every(function(actor) { return actor.isAlive(); })) {
            this.resetAllATB();
            return;
        } else if (!actors.every(function(actor) {
            return actor.isUnisonItemReady && actor.isATBCharging();
        })) {
            this.setATBCharge(0);
            return;
        }
        var minDiff = Number.EPSILON * this.atbChargeDenom();
        var rule = $gameSystem.unisonItem.unisonFunctionRule;
        var val = UI.RULES.call(this, rule, actors.map(function(actor) {
            return actor.atbCharge();
        }));
        actors.forEach(function(actor) {
            // Ensures the unison invoker will always be the fastest
            if (actor === this) { val += minDiff; }
            //
            actor.setATBCharge(val);
        }, this);
    };

    var GA = UI.Game_Actor;
    ATB.Game_Actor = {};
    var GAATB = ATB.Game_Actor;

    Game_Actor.prototype.selectNextCommand = function() {
        // Added
        if (!BattleManager.isATB()) {
            var maxIndex = this._actions.length - this._unisonItemNumInputs - 1;
            if (this._actionInputIndex>= maxIndex) { return false; }
        }
        //
        return GA.selectNextCommand.apply(this, arguments);
    }; // Game_Actor.prototype.selectNextCommand

    /*------------------------------------------------------------------------
     *    Ensures the charging value is the same for all unison actors
     *------------------------------------------------------------------------*/
    Game_Party.prototype.updateTick = function() { // New
        Game_Unit.prototype.updateTick.call(this);
        this.aliveMembers().filter(function(mem) {
            return mem.unisonItemActors.length > 1;
        }).forEach(function(mem) { GBATB.updateUnisonTick.call(mem); });
    }; // Game_Party.prototype.updateTick

    var WBL = UI.Window_BattleLog;

    Window_BattleLog.prototype.displayAction = function(subject, item) {
        WBL.displayAction.apply(this, arguments); // Rewritten
    }; // Window_BattleLog.prototype.displayAction

})(DoubleX_RMMV.Unison_Item, DoubleX_RMMV.Unison_Item_YEP_X_BattleSysATB = {});

} else {
    alert('Place Unison Item YEP_X_BattleSysATB below YEP_X_BattleSysATB.');
}

} else {
    alert('Place Unison Item YEP_X_BattleSysATB below Unison Item Default.');
}

} else {
    alert('Place Unison Item YEP_X_BattleSysATB below Unison Item Config.');
}

/*============================================================================*/
