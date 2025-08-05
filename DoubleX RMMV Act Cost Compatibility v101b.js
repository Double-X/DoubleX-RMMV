/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Action Cost Compatibility
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
 *      1. DoubleX RMMV Action Cost
 *      Abilities:
 *      1. Nothing special
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/5DP26uff
 *      Video:
 *      1. https://www.youtube.com/watch?v=TyYqBKaB-Cw
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01b(GMT 0300 20-5-2020):
 *      1. In sync with the latest DoubleX RMMV Action Cost version
 *      v1.01a(GMT 0400 5-2-2020):
 *      1. Addressed compatibility with
 *         - Victor Engine MV - Conditional Turn Battle
 *      v1.00d(GMT 1500 11-8-2016):
 *      1. Removed compatibility with DoubleX RMMV Minimalized ATB
 *      1. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.00c(GMT 1000 5-6-2016):
 *      1. Addressed more compatibility issues with
 *         - DoubleX RMMV Minimalized ATB
 *         - DoubleX RMMV Popularized ATB Core
 *      v1.00b(GMT 0300 29-5-2016):
 *      1. Addressed compatibility with
 *         - DoubleX RMMV Minimalized ATB
 *         - DoubleX RMMV Popularized ATB Core
 *      v1.00a(GMT 1500 22-5-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Fixes DoubleX RMMV Action Cost compatibility issues
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Addressed Plugins
 *----------------------------------------------------------------------------
 *    # DoubleX RMMV Unison Item Config:
 *      1. The action cost is the same for all unison actors
 *         - Reference tag: Unison Item Config Act Cost
 *         - Read <unison item actor act cost: costs> in DM.loadItemNotes
 *         - Drawed the action cost in battle for each unison actor in
 *           WIL.drawActCost and WSL.drawActCost
 *         - The default unison item action cost will be shown for all unison
 *           actors when outside battles
 *    # DoubleX RMMV Unison Item Default:
 *      1. The number of action slot reserved by unison invokees are always 1
 *         - Reference tag: Unison Item Default Invokee Act Slot Num
 *         - Checked the action cost for each unison invokee in
 *           GBB.canUseUnisonSkill and GBB.canUseUnisonItem as well
 *         - Stored and restored the action cost for each unison invokee in
 *           BM.addUnisonActors and BM.eraseUnisonActors as well
 *    # (v1.00b+)DoubleX RMMV Popularized ATB Core:
 *      1. No battler can execute any action at all
 *         - Reference tag: PATB Act Validity
 *         - Extended BattleManager.processTurn to ensure no valid actions
 *           will be falsely regarded as invalid ones
 *    # (v1.00c+)DoubleX RMMV Popularized ATB Core:
 *      1. Battlers inputting skills/items with action cost greater than 1
 *         remains inputable after finishing inputting all skills/items
 *         - Reference tag: PATB Inputability
 *         - Extended Game_Action.prototype.confirm_patb_item,
 *           Scene_Battle.prototype.confirm_patb_act and added GBB.confirmAct
 *           to confirm the reserved action slots as well
 *    # (v1.01a+)Victor Engine MV - Conditional Turn Battle:
 *      1. No actions can be executed at all
 *         - Reference tag: VE CTB Act Validity
 *         - Extended BattleManager.setupAction to ensure no valid actions
 *           will be falsely regarded as invalid ones
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item Notetags:
 *      1. <unison item actor act cost: costs>
 *         - Sets the list of action costs needed for each of the
 *           corresponding id of the unison actor in <unison item actors: ids>
 *           , is used to separate the mp costs in ids
 *           E.g.:
 *           If <unison item actors: 1> is used, then
 *           <unison item actor act cost: 2> means actor with id 1 needs to
 *           use 2 action slots for using the unison skill/item
 *           If <unison item actors: 4, 2> is used, then
 *           <unison item actor act cost: 2, 3> means actor with id 4 and 2
 *           need to use 2 and 3 action slots respectively for using the
 *           unison skill/item
 *           If <unison item actors: 4, 2> is used, then
 *           <unison item actor act cost: 2> means actor with id 4 needs to
 *           pay 2 action slots while that with id 2 needs to use the number
 *           of action slots of the unison skill/item for using it
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Skill/Item manipulations
 *      1. meta.unisonItemActorActCosts
 *         - Returns the Array of action costs each needed by its
 *           corresponding actor with id in meta.unisonItemActors to use this
 *           skill/item
 *      2. meta.unisonItemActorActCosts = [cost, cost, ...]
 *         - Sets the Array of of action costs each needed by its
 *           corresponding actor with id in meta.unisonItemActors to use this
 *           skill/item
 *         - All meta.unisonItemActorActCosts changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['Act Cost Compatibility'] = 'v1.01b';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Solid understanding of how DoubleX RMMV Action Cost and each
 *           addressed plugin works
 *         - Decent plugin development proficiency to fully comprehend this
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

if (DoubleX_RMMV['Act Cost']) {

DoubleX_RMMV.Act_Cost_Compatibility = {};

/*----------------------------------------------------------------------------*/

if (DoubleX_RMMV["PATB Core"]) { // v1.00b+

DoubleX_RMMV.Act_Cost_Compatibility["PATB Core"] = {};

(function(AC, ACCATB) {

    'use strict';

    ACCATB.BattleManager = {};
    var BM = ACCATB.BattleManager;

    BM.processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        // Added to ensures battlers can use valid actions upon executing them
        this._subject.actCostInputs = -999;
        // PATB Act Validity
        BM.processTurn.apply(this, arguments);
    }; // BattleManager.processTurn

    ACCATB.Game_BattlerBase = {};
    var GBB = ACCATB.Game_BattlerBase;

    // act: The action to have all its reserved action slots confirmed
    GBB.confirmAct = function(act) { // v1.00c+; New
        // Ensures all reserved action slots are confirmed as well
        var reservedActs = GB.actCost.call(this, act.item()) - 1;
        var lastAct = this._actions.length - this._actCostInputs - 1;
        for (var index = lastAct; index > lastAct - reservedActs; index--) {
        	this._actions[index].patb_confirm = true;
        }
        // PATB Inputability
    }; // GBB.confirmAct

    var GB = AC.Game_Battler;

    ACCATB.Game_Actor = {};
    var GA = ACCATB.Game_Actor;

    GA.confirm_patb_act = Game_Actor.prototype.confirm_patb_act;
    Game_Actor.prototype.confirm_patb_act = function() {
    // v1.00c+
        GA.confirm_patb_act.apply(this, arguments);
        // Added to ensure all reserved action slots are confirmed as well
        GBB.confirmAct.call(this, this.inputtingAction());
        // PATB Inputability
    }; // Game_Actor.prototype.confirm_patb_act

})(DoubleX_RMMV.Act_Cost, DoubleX_RMMV.Act_Cost_Compatibility["PATB Core"]);

} // if (DoubleX_RMMV["PATB Core"])

/*----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Unison Item Default"]) {

DoubleX_RMMV.Act_Cost_Compatibility["Unison Item Default"] = {};

(function(AC, UI, ACCUI) {

    'use strict';

    var DM = UI.DataManager;
    ACCUI.DataManager = {};
    var DMACCUI = ACCUI.DataManager;

    // data: The data to have its notetags read
    DMACCUI.loadItemNotes = DM.loadItemNotes;
    DM.loadItemNotes = function(data) {
        DMACCUI.loadItemNotes(data);
        // Added to read and store values of <unison item actor act cost: costs>
        var uIAACs = data.meta.unisonItemActorActCosts = [];
        var ACs = /< *unison +item +actor +act +cost *: *(\d+(?: *, *\d+)*) *>/i;
        data.note.split(/[\r\n]+/).forEach(function(line) {
            if (line.match(ACs)) { DM.storeItemNotes(uIAACs); }
        });
        // Unison Item Config Act Cost
    }; // DM.loadItemNotes

    var BM = AC.BattleManager;
    ACCUI.BattleManager = {};
    var BMACCUI = ACCUI.BattleManager;

    BMACCUI.reserveActs = BM.reserveActs;
    BM.reserveActs = function() {
        // Rewritten to not using this function for unison skills/items
        var actor = this.actor();
        if (!actor) { return; }
        if (actor.inputtingAction().item().meta.unisonItemActors.length <= 1) {
            BMACCUI.reserveActs.apply(this, arguments);
        }
        // Unison Item Config Act Cost
    }; // BM.reserveActs

    BMACCUI.releaseReservedActs = BM.releaseReservedActs;
    BM.releaseReservedActs = function() {
        // Added to not using this function for unison skills/items
        var actor = this.actor();
        if (!actor) { return; }
        var act = actor.inputtingAction();
        if (act.item().meta.unisonItemActors.length > 1) { return act.clear(); }
        // Unison Item Config Act Cost
        BMACCUI.releaseReservedActs.apply(this, arguments);
    }; // BM.releaseReservedActs

    BM = UI.BattleManager;

    BM.addUnisonActors = function() { // Rewrite
        var actor = this.actor(), act, item;
        if (actor) { act = actor.inputtingAction(); }
        if (act) { item = act.item(); }
        if (!item || item.meta.unisonItemActors.length <= 1) { return; }
        var actorIds = item.meta.unisonItemActors;
        // Rewritten to store the action cost for each unison invokee as well
        var actSlot = [actor.index(), actor.actionInputIndex];
        var actCosts = item.meta.unisonItemActorActCosts.slice(0);
        var actorId = actor.actorId(), actCost = GB.actCost.call(actor, item);
        BM.unisonActors[actSlot] = [actorIds, actCosts];
        for (var index = 0, length = actorIds.length; index < length; index++) {
            actCosts[index] = actCosts[index] || actCost;
            if (actorId === actorIds[index]) { actCosts[index] -= 1; }
            if (!actCosts[index]) { actCosts.push(actCosts[index]); }
            $gameActors.actor(actorIds[index]).actCostInputs += actCosts[index];
        }
        // Unison Item Config Act Cost
        // Unison Item Default Invokee Act Slot Num
    }; // BM.addUnisonActors

    // actor: The currently selected actor
    BM.eraseUnisonActors = function(actor) { // Rewrite
        var actors = BM.unisonActors[[actor.index(), actor.actionInputIndex]];
        if (!actors) { return; }
        BM.unisonActors[[actor.index(), actor.actionInputIndex]] = null;
        // Rewritten to address the action cost for each unison invokee as well
        var actorIds = actors[0], actCosts = actors[1];
        for (var i = 0, length = actorIds.length; i < length; i++) {
            $gameActors.actor(actorIds[i]).actCostInputs -= actCosts[i];
        }
        // Unison Item Config Act Cost
        // Unison Item Default Invokee Act Slot Num
    }; // BM.eraseUnisonActors

    BMACCUI.clearUnisonActors = BM.clearUnisonActors;
    BM.clearUnisonActors = function() {
        BMACCUI.clearUnisonActors.apply(this, arguments);
        // Added to actCostInputs for reserving action slots from invokees too
        $gameParty.movableMembers().forEach(function(mem) {
            mem.actCostInputs = -999;
        });
        // Unison Item Config Act Cost
        // Unison Item Default Invokee Act Slot Num
    }; // BM.clearUnisonActors

    var GBB = AC.Game_BattlerBase;
    ACCUI.Game_BattlerBase = {};
    var GBBACCUI = ACCUI.Game_BattlerBase;
    GBBACCUI.canReserveActs = GBB.canReserveActs;
    GBB.canReserveActs = function(item) {
        // Added to check for unison acion cost for the unison invoker as well
        if (!item) { return false; }
        if (this.isActor()) {
            var emptyActs = this._actions.filter(function(act) {
                return !act.item();
            }).length;
            var actorId = this.actorId(), actorIds = item.meta.unisonItemActors;
            var actCosts = item.meta.unisonItemActorActCosts;
            if (actorIds.length > 1) {
                for (var i = 0, length = actorIds.length; i < length; i++) {
                    if (actorId !== actorIds[i]) { continue; }
                    if (!actCosts[i]) { break; }
                    return actCosts[i] <= emptyActs - this._actCostInputs;
                }
            }
        }
        // Unison Item Config Act Cost
        return GBBACCUI.canReserveActs.apply(this, arguments);
    }; // GBB.canReserveActs

    GBB = UI.Game_BattlerBase;

    GBBACCUI.canInput = Game_BattlerBase.prototype.canInput;
    Game_BattlerBase.prototype.canInput = function() {
        // Rewritten to check if at least 1 action slot isn't reserved
        if (!GBBACCUI.canInput.apply(this, arguments)) { return false; }
        if (!this.isActor() || !$gameParty.inBattle()) { return true; }
        return this._actCostInputs < this._actions.length;
        // Unison Item Default Invokee Act Slot Num
    }; // Game_BattlerBase.prototype.canInput

    GBB.canUseUnisonSkill = function(skill) { // Rewrite
        var actor, actorIds = skill.meta.unisonItemActors;
        var inBattle = $gameParty.inBattle(), mems = $gameParty.aliveMembers();
        // Added
        var actCosts = skill.meta.unisonItemActorActCosts;
        var actCost = GB.actCost.call(this, skill);
        // Unison Item Default Invokee Act Slot Num
        var learnFlags = skill.meta.unisonItemActorLearn;
        for (var i = 0, length = actorIds.length; i < length; i++) {
            if (this.actorId() === actorIds[i]) { continue; }
            actor = mems.filter(function(m) {
                return m.index() > this.index() && m.actorId() === actorIds[i];
            }, this)[0];
            if (!actor || inBattle && !actor.canInput()) { return false; }
            if (!actor.meetsSkillConditions(skill)) { return false; }
            // Added to check if the unison invokee can pay the action cost
            if (!inBattle) { continue; }
            if (!GBB.hasEnoughActCost.call(actor, actCosts[i] || actCost)) {
                return false;
            }
            // Unison Item Default Invokee Act Slot Num
            if (learnFlags[i] && actor.skills().every(function(s) {
                return s !== skill;
            })) { return false; }
        }
        return true;
    }; // GBB.canUseUnisonSkill

    GBB.canUseUnisonItem = function(item) { // Rewrite
        if (!this.meetsItemConditions(item)) { return false; }
        var actor, actorIds = item.meta.unisonItemActors;
        var inBattle = $gameParty.inBattle(), mems = $gameParty.aliveMembers();
        // Added
        var actCosts = item.meta.unisonItemActorActCosts;
        var actCost = GB.actCost.call(this, item);
        // Unison Item Default Invokee Act Slot Num
        for (var i = 0, length = actorIds.length; i < length; i++) {
            if (this.actorId() === actorIds[i]) { continue; }
            actor = mems.filter(function(m) {
                return m.index() > this.index() && m.actorId() === actorIds[i];
            }, this)[0];
            if (!actor || inBattle && !actor.canInput()) { return false; }
            // Added to check if the unison invokee can pay the action cost
            if (!inBattle) { continue; }
            if (!GBB.hasEnoughActCost.call(actor, actCosts[i] || actCost)) {
                return false;
            }
            // Unison Item Default Invokee Act Slot Num
        }
        return true;
    }; // GBB.canUseUnisonItem

    // actCost: The number of action slots needed for the action
    GBB.hasEnoughActCost = function(actCost) { // New
        // Checks if the unison invokee has enough empty action slots
        return this._actions.length - this._actCostInputs >= actCost;
        // Unison Item Default Invokee Act Slot Num
    }; // GBB.hasEnoughActCost

    var GB = AC.Game_Battler;

    var WIL = AC.Window_ItemList;
    ACCUI.Window_ItemList = {};
    var WILACCUI = ACCUI.Window_ItemList;

    WILACCUI.drawActCost = WIL.drawActCost;
    WIL.drawActCost = function(item, x, y, width) {
        // Added to draw the act cost in battle for each unison actor
        if ($gameParty.inBattle()) {
            var actorIds = item.meta.unisonItemActors;
            if (actorIds.length > 1) {
                var actCosts = item.meta.unisonItemActorActCosts;
                var actorId = BattleManager.actor().actorId();
                for (var i = 0, length = actorIds.length; i < length; i++) {
                    if (!actCosts[i] || actorId !== actorIds[i]) { continue; }
                    return this.drawText(actCosts[i], x, y, width, 'right');
                }
            }
        }
        // Unison Item Config Act Cost
        WILACCUI.drawActCost.apply(this, arguments);
    }; // WIL.drawActCost

    var WSL = AC.Window_SkillList;
    ACCUI.Window_SkillList = {};
    var WSLACCUI = ACCUI.Window_SkillList;

    WSLACCUI.drawActCost = WSL.drawActCost;
    WSL.drawActCost = function(skill, x, y, width) {
        // Added to draw the act cost for each unison actor
        this.changeTextColor(this.normalColor());
        var actorIds = skill.meta.unisonItemActors;
        if (actorIds.length > 1) {
            var actCosts = skill.meta.unisonItemActorActCosts;
            var actorId = this._actor.actorId();
            for (var i = 0, length = actorIds.length; i < length; i++) {
                if (!actCosts[i] || actorId !== actorIds[i]) { continue; }
                return this.drawText(actCosts[i], x, y, width, 'right');
            }
        }
        // Unison Item Config Act Cost
        WSLACCUI.drawActCost.apply(this, arguments);
    }; // WSL.drawActCost

})(DoubleX_RMMV.Act_Cost, DoubleX_RMMV.Unison_Item,
   DoubleX_RMMV.Act_Cost_Compatibility["Unison Item Default"]);

} // if (DoubleX_RMMV["Unison Item Default"])

/*----------------------------------------------------------------------------*/

if (Imported['VE - Conditional Turn Battle']) { // v1.01a+

DoubleX_RMMV.Act_Cost_Compatibility["VE CTB"] = {};

(function(AC, ACCVECTB) {

    'use strict';

    ACCVECTB.BattleManager = {};
    var BM = ACCVECTB.BattleManager;

    BM.setupAction = BattleManager.setupAction;
    BattleManager.setupAction = function(battler) {
        // Added to ensures battlers can use valid actions upon executing them
        battler.actCostInputs = -999;
        // VE CTB Act Validity
        BM.setupAction.apply(this, arguments);
    }; // BattleManager.setupAction

})(DoubleX_RMMV.Act_Cost, DoubleX_RMMV.Act_Cost_Compatibility["VE CTB"]);

} // if (Imported['VE - Conditional Turn Battle'])

/*----------------------------------------------------------------------------*/

} else {
    alert('Place Action Cost Compatibility below Action Cost.');
} // if (DoubleX_RMMV['Act Cost'])

/*============================================================================*/
