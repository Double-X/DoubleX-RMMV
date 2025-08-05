/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Intercept Item
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
 *      1. http://pastebin.com/s12dFf6S
 *      Video:
 *      1. https://www.youtube.com/watch?v=jsuqdjY3FyE
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 1000 30-1-2016):
 *      1. Fixed typo $dataStates(stateId) instead of $dataStates[stateId]
 *      2. Fixed undefined BM.interceptors when changing states outside battle
 *      3. Fixed missing argument item in GB.possibleInterceptStates bug
 *      4. Fixed searching interceptors in the interceptor state id pairs bug
 *      5. Fixed returning interceptor state id pair in GU.interceptor bug
 *      6. Fixed learning skills that are already learnt bug
 *      7. Fixed passing a battler instead of an Array to showNormalAnimation
 *      v1.00a(GMT 1500 16-12-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set states intercepting skills/items conditionally
 *             Designed to mimic FF5's Blue Magic and FF6's Runic command
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item/State Notetags:
 *      1. <intercept item tier: x>
 *         - Lets battlers having states with this notetag intercept
 *           skills/items with this notetag if x is positive for those states
 *           and skills/items
 *         - If the intercept tiers of the states are greater than or equal to
 *           that of the skills/items, they'll be intercepted if other
 *           conditions that are set by you are also met
 *         - If more than 1 battler can intercept a skill/item, the one having
 *           any intercept state for the shortest time will intercept it
 *         - If more than 1 state of the same battler can intercept a
 *           skill/item, the one having the highest priority will intercept it
 *         - This notetag needs <ally intercept item> and/or
 *           <foe intercept item> to be present as well to work
 *      2. <ally intercept item>
 *         - Interceptors having states with this notetag can intercept
 *           skills/items with this notetag if their users are allies and
 *           other conditions are met
 *         - Putting this notetag above <foe intercept item> means allies
 *           will always intercept the skills/items if enemies can also
 *           intercept them
 *         - The ordering of <ally intercept item> and <foe intercept item>
 *           in skills/items to be intercepted will be used if intercepting
 *           states also has both of those notetags
 *      3. <foe intercept item>
 *         - Interceptors having states with this notetag can intercept
 *           skills/items with this notetag if their users are foes and other
 *           conditions are met
 *         - Putting this notetag above <ally intercept item> means foes will
 *           always intercept the skills/items if enemies can also intercept
 *           them
 *         - The ordering of <ally intercept item> and <foe intercept item>
 *           in skills/items to be intercepted will be used if intercepting
 *           states also has both of those notetags
 *      4. <intercept item chance: x>
 *         - Interceptors having states with this notetag have a x% chance to
 *           intercept skills/items that can be intercepted if other
 *           conditions are met
 *         - Skills/items that can be intercepted with this notetag have a x%
 *           chance to be intercepted by interceptors if other conditions are
 *           met
 *         - The real chance of success is that of intercepting states
 *           multiplied by that of skills/items to be intercepted
 *         - If this notetag is absent, the chance of success will be 100%
 *      5. <intercept item mp>
 *         - Interceptors having states with this notetag absorb mp equal to
 *           the mp cost of the skills/items intercepted if those skills/items
 *           also have this notetag
 *      6. <intercept item tp>
 *         - Interceptors having states with this notetag absorb tp equal to
 *           the tp cost of the skills/items intercepted if those skills/items
 *           also have this notetag
 *      7. <hit intercept item mp>
 *         - Failed interceptions due to <intercept item mp limit> will cause
 *           the skill/item to only hit the interceptor if both the
 *           skills/items and states have this notetag
 *      8. <hit intercept item tp>
 *         - Failed interceptions due to <intercept item tp limit> will cause
 *           the skill/item to only hit the interceptor if both the
 *           skills/items and states have this notetag
 *      9. <intercept item learnt>
 *         - Only skills/items that are currently learnt by its battler can be
 *           intercepted if both them and states have this notetag
 *      10. <intercept item usable>
 *          - Only skills/items that are currently usable by its battler can
 *            be intercepted if both them and states have this notetag
 *      11. <learn intercept item>
 *          - Successful interceptions will cause its battler to learn the
 *            intercepted skill/item if both them and states have this notetag
 *            and they're not already learnt
 *----------------------------------------------------------------------------
 *    # State Notetags:
 *      1. <intercept item animation: id>
 *         - Animation with id id will be played upon successful interceptions
 *      2. <intercept item count: x, f>
 *         - The intercepting state will worn off after its battler used it to
 *           intercept x skills/items
 *         - Failed interceptions will also be counted is f is true
 *      3. <intercept item mp limit>
 *         - If this state's used to intercept skills/items and intercepting
 *           them would lead to the battler's mp being greater than that
 *           battler's mmp, the intercept will fail
 *      4. <intercept item tp limit>
 *         - If this state's used to intercept skills/items and intercepting
 *           them would lead to the battler's tp being greater than that
 *           battler's maximum tp, the intercept will fail
 *      5. <intercept item mcr>
 *         - The mp absorbed by the battler using this state to intercept
 *           skills/items will be the actual mp used by their users
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Skill/Item/State manipulations
 *      1. meta.interceptItemTier
 *         - Returns the intercept item tier in <intercept item tier: x>
 *      2. meta.interceptItemTier = tier
 *         - Sets the intercept item tier in <intercept item tier: x> as tier
 *         - All meta.interceptItemTier changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.battlerInterceptItem
 *         - Returns the ally/foe intercept item tier in
 *           <ally intercept item tier> and <foe intercept item tier> in the
 *           form of { ally: true, foe: true }
 *         - Property name ally and foe will be defined only if the former and
 *           latter notetags are used respectively
 *         - The ordering of those property names is that of those notetags
 *      4. meta.battlerInterceptItem = { ally: true, foe: true }
 *         - Sets the ally/foe intercept item tier in
 *           <ally intercept item tier> and <foe intercept item tier> in the
 *           form of { ally: true, foe: true }
 *         - Property name ally and foe will be defined only if the former and
 *           latter notetags are used respectively
 *         - The ordering of those property names is that of those notetags
 *         - All meta.battlerInterceptItem changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.interceptItemChance
 *         - Returns the intercept item chance in <intercept item chance: x>
 *      6. meta.interceptItemChance = percent
 *         - Sets the intercept item chance in <intercept item chance: x> as
 *           percent%
 *         - All meta.interceptItemChance changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.interceptItemMp
 *         - Returns the intercept item mp flag in <intercept item mp>
 *      8. meta.interceptItemMp = flag
 *         - Sets the intercept item mp flag in <intercept item mp> as flag
 *         - All meta.interceptItemMp changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      9. meta.interceptItemTp
 *         - Returns the intercept item tp flag in <intercept item tp>
 *      10. meta.interceptItemTp = flag
 *          - Sets the intercept item tp flag in <intercept item tp> as flag
 *          - All meta.interceptItemTp changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      11. meta.hitInterceptItemMp
 *          - Returns the hit intercept item mp flag in
 *            <hit intercept item mp>
 *      12. meta.hitInterceptItemMp = flag
 *          - Sets the hit intercept item mp flag in <hit intercept item mp>
 *            as flag
 *          - All meta.hitInterceptItemMp changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      13. meta.hitInterceptItemTp
 *          - Returns the hit intercept item tp flag in
 *            <hit intercept item tp>
 *      14. meta.hitInterceptItemTp = flag
 *          - Sets the hit intercept item tp flag in <hit intercept item tp>
 *            as flag
 *          - All meta.hitInterceptItemTp changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      15. meta.interceptItemLearnt
 *          - Returns the intercept item learnt flag in
 *            <intercept item learnt>
 *      16. meta.interceptItemLearnt = flag
 *          - Sets the intercept item learnt flag in <intercept item learnt>
 *            as flag
 *          - All meta.interceptItemLearnt changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      17. meta.interceptItemUsable
 *          - Returns the intercept item usable flag in
 *            <intercept item usable>
 *      18. meta.interceptItemUsable = flag
 *          - Sets the intercept item usable flag in <intercept item usable>
 *            as flag
 *          - All meta.interceptItemUsable changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      19. meta.learnInterceptItem
 *          - Returns the learn intercept item flag in <learn intercept item>
 *      20. meta.learnInterceptItem = flag
 *          - Sets the learn intercept item flag in <learn intercept item> as
 *            flag
 *          - All meta.learnInterceptItem changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *----------------------------------------------------------------------------
 *    # State manipulations
 *      1. meta.interceptItemAnimation
 *         - Returns the intercept item animation id in
 *           <intercept item animation: id>
 *      2. meta.interceptItemAnimation = id
 *         - Sets the intercept item animation id in
 *           <intercept item animation: id> as id
 *         - All meta.interceptItemAnimation changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.interceptItemCount
 *         - Returns the intercept item count with the fail flag in the form
 *           of { count: count, fail: fail }
 *      4. meta.interceptItemCount = { count: count, fail: fail }
 *         - Sets the intercept item count with the fail flag as count and
 *           fail in the form of { count: count, fail: fail }
 *         - All meta.interceptItemCount changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.interceptItemMpLimit
 *         - Returns the intercept item mp limit flag in
 *           <intercept item mp limit>
 *      6. meta.interceptItemMpLimit = flag
 *         - Sets the intercept item mp limit flag in
 *           <intercept item mp limit> as flag
 *         - All meta.interceptItemMpLimit changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.interceptItemTpLimit
 *         - Returns the intercept item tp limit flag in
 *           <intercept item tp limit>
 *      8. meta.interceptItemTpLimit = flag
 *         - Sets the intercept item tp limit flag in
 *           <intercept item tp limit> as flag
 *         - All meta.interceptItemTpLimit changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      9. meta.interceptItemMcr
 *        - Returns the intercept item mcr flag in <intercept item mcr>
 *      10. meta.interceptItemMcr = flag
 *          - Sets the intercept item mcr flag in <intercept item mcr> as flag
 *          - All meta.interceptItemMcr changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Intercept Item"] = "v1.00b";

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
 * function_name = function(arguments) { // Version X+; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     function_name_code
 *     //
 * } // function_name
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Intercept_Item = {};
(function(II) {

    II.DataManager = {};
    var DM = II.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        // Rewritten
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    DM.loadAllNotes = function() {
        [$dataSkills, $dataItems, $dataStates].forEach(function(type) {
            type.forEach(function(data) {
                if (data) { DM.loadDataNotes(data); }
            });
        });
        return true;
    }; // DM.loadAllNotes

    DM.loadDataNotes = function(data) {
        var meta = data.meta, state = $dataStates.indexOf(data) >= 0;
        var tier = /< *intercept +item +tier *: *(\d+) *>/i;
        var ally = /< *ally intercept +item *>/i;
        var foe = /< *foe intercept +item *>/i;
        var chance = /< *intercept +item +chance *: *(\d+) *>/i;
        var mp = /< *intercept +item +mp *>/i;
        var tp = /< *intercept +item +tp *>/i;
        var hitMp = /< *hit +intercept +item +mp *>/i;
        var hitTp = /< *hit +intercept +item +tp *>/i;
        var learnt = /< *intercept +item +learnt *>/i;
        var usable = /< *intercept +item +usable *>/i;
        var learn = /< *learn +intercept +item *>/i;
        var animation, count, mpLimit, tpLimit, mcr;
        meta.interceptItemTier = 0;
        meta.battlerInterceptItem = {};
        meta.interceptItemChance = 100;
        if (state) {
            meta.interceptItemAnimation = 0;
            meta.interceptItemCount = {};
            animation = /< *intercept +item +animation *: *(\d+) *>/i;
            count = /< *intercept +item +count *: *(\d+) *, *(\w+) *>/i;
            mpLimit = /< *intercept +item +mp + limit *>/i;
            tpLimit = /< *intercept +item +tp + limit *>/i;
            mcr = /< *intercept +item +mcr *>/i;
        }
        data.note.split(/[\r\n]+/).forEach(function(line) {
            if (line.match(mp)) { return meta.interceptItemMp = true; }
            if (line.match(tp)) { return meta.interceptItemTp = true; }
            if (line.match(hitMp)) { return meta.hitInterceptItemMp = true; }
            if (line.match(hitTp)) { return meta.hitInterceptItemTp = true; }
            if (line.match(learnt)) { return meta.interceptItemLearnt = true; }
            if (line.match(usable)) { return meta.interceptItemUsable = true; }
            if (line.match(learn)) { return meta.learnInterceptItem = true; }
            if (line.match(tier)) {
                meta.interceptItemTier = +RegExp.$1;
            } else if (line.match(ally)) {
                meta.battlerInterceptItem.ally = true;
            } else if (line.match(foe)) {
                meta.battlerInterceptItem.foe = true;
            } else if (line.match(chance)) {
                meta.interceptItemChance = +RegExp.$1;
            } else if (state) {
                if (line.match(mcr)) { return meta.interceptItemMcr = true; }
                if (line.match(animation)) {
                    meta.interceptItemAnimation = +RegExp.$1;
                } else if (line.match(count)) {
                    meta.interceptItemCount.count = +RegExp.$1;
                    meta.interceptItemCount.fail = RegExp.$2 === "true";
                } else if (line.match(mpLimit)) {
                    meta.interceptItemMpLimit = true;
                } else if (line.match(tpLimit)) {
                    meta.interceptItemTpLimit = true;
                }
            }
        });
        meta.interceptItemChance /= 100;
    }; // DM.loadDataNotes

    // Test
    DM.loadDataNotes = function(data) {
        var meta = data.meta, state = $dataStates.indexOf(data) >= 0;;
        var tier = /< *intercept +item +tier *: *(\d+) *>/i;
        var ally = /< *ally intercept +item *>/i;
        var foe = /< *foe intercept +item *>/i;
        var chance = /< *intercept +item +chance *: *(\d+) *>/i;
        var mp = /< *intercept +item +mp *>/i;
        var tp = /< *intercept +item +tp *>/i;
        var hitMp = /< *hit +intercept +item +mp *>/i;
        var hitTp = /< *hit +intercept +item +tp *>/i;
        var learnt = /< *intercept +item +learnt *>/i;
        var usable = /< *intercept +item +usable *>/i;
        var learn = /< *learn +intercept +item *>/i;
        var animation, count, mpLimit, tpLimit, mcr;
        meta.interceptItemTier = 0;
        meta.battlerInterceptItem = {};
        meta.interceptItemChance = 1;
        if (state) {
            meta.interceptItemAnimation = 0;
            meta.interceptItemCount = {};
            animation = /< *intercept +item +animation *: *(\d+) *>/i;
            count = /< *intercept +item +count *: *(\d+) *, *(\w+) *>/i;
            mpLimit = /< *intercept +item +mp + limit *>/i;
            tpLimit = /< *intercept +item +tp + limit *>/i;
            mcr = /< *intercept +item +mcr *>/i;
        }
        return;
        if (!state && (data.id === 1 || data.id === 2 || data.id === 5)) { return; }
        meta.interceptItemMp = true;
        meta.interceptItemTp = true;
        meta.battlerInterceptItem.foe = true;
        meta.learnInterceptItem = true;
        meta.interceptItemTier = 1;
        meta.interceptItemChance = 1;
        if (!state) { return; }
        meta.interceptItemAnimation = 53;
        meta.interceptItemCount.count = 1;
    }; // DM.loadDataNotes

    II.BattleManager = {};
    var BM = II.BattleManager;

    /*------------------------------------------------------------------------
     *    New public instance variable
     *------------------------------------------------------------------------*/
    // BM.interceptors: The conditional LIFO interceptor-state id pair list

    BM.initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        BM.interceptors = []; // Added
        BM.initMembers.apply(this, arguments);
    }; // BattleManager.initMembers

    BM.startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        BM.startAction.apply(this, arguments);
        BM.tryInitIntercept.call(this); // Added
    }; // BattleManager.startAction

    BM.tryInitIntercept = function() {
        var interceptor, subject = this._subject;
        var act = subject.currentAction(), item = act.item();
        if (item.meta.interceptItemTier <= 0) { return; };
        if (Math.random() >= item.meta.interceptItemChance) { return; };
        interceptor = GA.interceptor.call(act);
        if (!interceptor) { return; }
        BM.initIntercept.call(this, interceptor, subject, act, item);
    }; // BM.tryInitIntercept

    BM.initIntercept = function(interceptor, subject, act, item) {
        if (GB.canSetInterceptState.call(interceptor, subject, item)) {
            BM.successIntercept.call(this, interceptor, subject, act, item);
        } else {
            BM.failIntercept.call(this, interceptor, act, item);
        }
        interceptor.possibleInterceptItemStates.length = 0;
        interceptor.interceptItemState = null;
    }; // BM.initIntercept

    BM.successIntercept = function(interceptor, subject, act, item) {
        var window = this._logWindow;
        WBL.showSuccessIntercept.call(window, interceptor, act, item.name);
        GB.interceptMpTp.call(interceptor, subject, item);
        if (GB.canLearnInterceptItem.call(interceptor, item)) {
            WBL.showLearnItem.call(window, interceptor, item.name);
            interceptor.learnSkill(item.id);
        }
        BattleManager.endAction();
    }; // BM.successIntercept

    BM.failIntercept = function(interceptor, act, item) {
        WBL.showFailIntercept.call(this._logWindow, interceptor, item.name);
        if (GB.isHitInterceptor.call(interceptor, this._subject, item)) {
            this._targets = GA.failInterceptTargets.call(act, interceptor);
        }
    }; // BM.failIntercept

    II.Game_Action = {};
    var GA = II.Game_Action;

    /*------------------------------------------------------------------------
     *    Returns the battler that will try to intercept the action
     *------------------------------------------------------------------------*/
    GA.interceptor = function() {
        var interceptor, mems, item = this.item();
        Object.keys(item.meta.battlerInterceptItem).forEach(function(side) {
            if (interceptor) { return; }
            mems = side === "ally" ? this.friendsUnit() : this.opponentsUnit();
            interceptor = GU.interceptor.call(mems, item, side);
        }, this);
        return interceptor;
    }; // GA.interceptor

    /*------------------------------------------------------------------------
     *    Returns the target list replaced by the failed interceptor only
     *------------------------------------------------------------------------*/
    GA.failInterceptTargets = function(interceptor) {
        var num, targets = [];
        if (this.isForUser() || this.isForOne()) {
            targets.push(interceptor);
        } else if (this.isForRandom()) {
            for (var index = 0, num = this.numTargets(); index < num; index++) {
                targets.push(interceptor);
            }
        } else {
            if (this.isForOpponent()) {
                num = this.opponentsUnit().aliveMembers().length;
            } else if (this.isForDeadFriend()) {
                num = this.friendsUnit().deadMembers().length;
            } else if (this.isForFriend()) {
                num = this.friendsUnit().aliveMembers().length;
            }
            for (var i = 0; i < num; i++) { targets.push(interceptor); }
        }
        return this.repeatTargets(targets);
    }; // GA.failInterceptTargets

    II.Game_BattlerBase = {};
    var GBB = II.Game_BattlerBase;

    GBB.initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        GBB.initInterceptStates.call(this); // Added
        GBB.initMembers.apply(this, arguments);
    }; // Game_BattlerBase.prototype.initMembers

    GBB.clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        GBB.clearStates.apply(this, arguments);
        GBB.clearInterceptStates.call(this);// Added
    }; // Game_BattlerBase.prototype.clearStates

    GBB.eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        // Added
        if ($dataStates[stateId].meta.interceptItemTier > 0) {
            GBB.eraseInterceptStates.call(this, stateId);
        }
        //
        GBB.eraseState.apply(this, arguments);
    }; // Game_BattlerBase.prototype.eraseState

    GBB.addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        GBB.addNewState.apply(this, arguments);
        // Added
        if ($dataStates[stateId].meta.interceptItemTier > 0) {
            GBB.addInterceptStates.call(this, stateId);
        }
        //
    }; // Game_BattlerBase.prototype.addNewState

    GBB.initInterceptStates = function() {
        this._interceptItemStates = [];
        this._possibleInterceptItemStates = [];
        this._interceptItemStateTimes = {};
    }; // GBB.initInterceptStates

    GBB.clearInterceptStates = function() {
        if (!BM.interceptors) { return; } // Fixes crashes upon game starts
        BM.interceptors = BM.interceptors.filter(function(interceptor) {
            return interceptor[0] !== this;
        }, this);
        this._interceptItemStates.length = 0;
        this._interceptItemStateTimes = {};
    }; // GBB.clearInterceptStates

    GBB.eraseInterceptStates = function(stateId) {
        if (!BM.interceptors) { return; } // Fixes crashes outside battles
        var index = BM.interceptors.indexOf([this, stateId]);
        if (index >= 0) { BM.interceptors.splice(index, 1); }
        index = this._interceptItemStates.indexOf($dataStates[stateId]);
        if (index >= 0) { this._interceptItemStates.splice(index, 1); }
        this._interceptItemStateTimes[stateId] = null;
    }; // GBB.eraseInterceptStates

    GBB.addInterceptStates = function(stateId) {
        if (!BM.interceptors) { return; } // Fixes crashes outside battles
        var index = BM.interceptors.indexOf([this, stateId]);
        if (index >= 0) { BM.interceptors.splice(index, 1); }
        BM.interceptors.push([this, stateId]);
        this._interceptItemStates.push($dataStates[stateId]);
        this._interceptItemStateTimes[stateId] = 0;
    }; // GBB.addInterceptStates

    II.Game_Battler = {};
    var GB = II.Game_Battler;

    /*------------------------------------------------------------------------
     *    New public instance variables
     *------------------------------------------------------------------------*/
    Object.defineProperties(Game_Battler.prototype, {
        // The state tried to intercept the skill/item
        "interceptItemState": { get: function() {
            return this._interceptItemState;
        }, set: function(state) {
            this._interceptItemState = state;
        }, configurable: true },
    	// The list of states possible to intercept the skill/item
        "possibleInterceptItemStates": { get: function() {
            return this._possibleInterceptItemStates;
        } , configurable: true }
    });

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // _interceptItemStates: The list of states that can intercept skills/items
    // _interceptItemStateTimes: The number of times each state intercepted

    // side: The ally/foe flag
    GB.hasPossibleInterceptStates = function(item, side) {
        var states = GB.possibleInterceptStates.call(this, item, side);
        if (states.length <= 0) { return false; }
        this._possibleInterceptItemStates = states;
        return true;
    }; // GB.hasPossibleInterceptStates

    // side: The ally/foe flag
    GB.possibleInterceptStates = function(item, side) {
        return this._interceptItemStates.filter(function(state) {
            if (!state.meta.battlerInterceptItem[side]) { return false; }
            if (item.meta.interceptItemTier > state.meta.interceptItemTier) {
                return false;
            } else if (Math.random() >= state.meta.interceptItemChance) {
                return false;
            } else if (GB.isFailInterceptLearnt.call(this, item, state)) {
                return false;
            }
            return !GB.isFailInterceptUsable.call(this, item, state);
        }, this);
    }; // GB.possibleInterceptStates

    GB.isFailInterceptLearnt = function(item, state) {
        if (!item.meta.interceptItemLearnt) { return false; }
        if (!state.meta.interceptItemLearnt) { return false; }
        return this.isActor() && !this.isLearnedSkill(item.id);
    }; // GB.isFailInterceptLearnt

    GB.isFailInterceptUsable = function(item, state) {
        if (!item.meta.interceptItemUsable) { return false; }
        return state.meta.interceptItemUsable && !this.canUse(item);
    }; // GB.isFailInterceptUsable

    /*------------------------------------------------------------------------
     *    Tries to set an intercept state that works and returns the result
     *------------------------------------------------------------------------*/
    GB.canSetInterceptState = function(subject, item) {
        var states = GB.interceptStates.call(this, subject, item);
        if (states.length > 0) {
            this._interceptItemState = states[0];
        	GB.addInterceptStateTimes.call(this, this._interceptItemState);
            return true;
        }
        this._interceptItemState = this._possibleInterceptItemStates[0];
        if (this._interceptItemState.meta.interceptItemCount.fail) {
            GB.addInterceptStateTimes.call(this, this._interceptItemState);
        }
        return false;
    }; // GB.canSetInterceptState

    /*------------------------------------------------------------------------
     *    Returns the list of all intercept states that will work
     *------------------------------------------------------------------------*/
    GB.interceptStates = function(subject, item) {
        return this._possibleInterceptItemStates.filter(function(state) {
            if (GB.isFailInterceptMp.call(this, subject, item, state)) {
                return false;
            }
            return !GB.isFailInterceptTp.call(this, subject, item, state);
        }, this);
    }; // GB.interceptStates

    GB.addInterceptStateTimes = function(state) {
        var count = state.meta.interceptItemCount.count;
        if (!count) { return; }
        this._interceptItemStateTimes[state.id] += 1;
        if (this._interceptItemStateTimes[state.id] < count) { return; }
        this.removeState(state.id);
    }; // GB.addInterceptStateTimes

    GB.interceptMpTp = function(subject, item) {
        var state = this._interceptItemState;
        if (item.meta.interceptItemMp && state.meta.interceptItemMp) {
            this._mp += GB.interceptMp.call(this, subject, item);
            this._mp.clamp(0, this.mmp);
        }
        if (item.meta.interceptItemTp && state.meta.interceptItemTp) {
            this._tp += subject.skillTpCost(item);
            this._tp.clamp(0, this.maxTp());
        }
    }; // GB.interceptMpTp

    GB.canLearnInterceptItem = function(item) {
        if (item.id === this.attackSkillId()) { return false; }
        if (item.id === this.guardSkillId()) { return false; }
        if (!item.meta.learnInterceptItem) { return false; }
        if (!this._interceptItemState.meta.learnInterceptItem) { return false; }
        if (!DataManager.isSkill(item) || !this.isActor()) { return false; }
        return !this.isLearnedSkill(item.id);
    }; // GB.canLearnInterceptItem

    GB.isHitInterceptor = function(subject, item) {
        var state = this._interceptItemState;
        if (GB.isFailInterceptMp.call(this, subject, item, state)) {
            if (item.meta.hitInterceptItemMp && state.meta.hitInterceptItemMp) {
                return true;
            }
        }
        if (GB.isFailInterceptTp.call(this, subject, item, state)) {
            if (item.meta.hitInterceptItemTp && state.meta.hitInterceptItemTp) {
                return true;
            }
        }
        return false;
    }; // GB.isHitInterceptor

    GB.isFailInterceptMp = function(subject, item, state) {
        if (!item.meta.interceptItemMp) { return false; }
        if (!state.meta.interceptItemMp) { return false; }
        if (!state.meta.interceptItemMpLimit) { return false; }
        return this.mmp - this._mp < GB.interceptMp.call(this, subject, item);
    }; // GB.isFailInterceptMp

    GB.isFailInterceptTp = function(subject, item, state) {
        if (!item.meta.interceptItemTp) { return false; }
        if (!state.meta.interceptItemTp) { return false; }
        if (!state.meta.interceptItemTpLimit) { return false; }
        return this.maxTp() - this._tp < subject.skillTpCost(item);
    }; // GB.isFailInterceptTp

    GB.interceptMp = function(subject, item) {
        if (this._interceptItemState.meta.interceptItemMcr) {
            return subject.skillMpCost(item);
        }
        return item.mpCost;
    }; // GB.interceptMp

    II.Game_Unit = {};
    var GU = II.Game_Unit;

    /*------------------------------------------------------------------------
     *    Returns the battler that will try to intercept the action
     *------------------------------------------------------------------------*/
    // side: The ally/foe flag
    GU.interceptor = function(item, side) {
        var mems = this.aliveMembers().filter(function(mem) {
            return GB.hasPossibleInterceptStates.call(mem, item, side);
        });
        var interceptors = BM.interceptors.filter(function(interceptor) {
            return mems.indexOf(interceptor[0]) >= 0;
        });
        if (interceptors.length <= 0) { return null; }
        return interceptors[interceptors.length - 1][0];
    }; // GU.interceptor

    II.Window_BattleLog = {};
    var WBL = II.Window_BattleLog;

    // name: The intercepted skill/item name
    WBL.showSuccessIntercept = function(interceptor, act, name) {
    	var numMethods, text, id;
        this.push('performActionStart', interceptor, act);
        this.push('waitForMovement');
        this.push('performAction', interceptor, act);
        id = interceptor.interceptItemState.meta.interceptItemAnimation;
        this.push('showNormalAnimation', [interceptor], id);
        numMethods = this._methods.length;
        text = interceptor.name() + " intercepts " + name + "!";
        this.push('addText', text);
        if (this._methods.length === numMethods) { this.push('wait'); }
    }; // WBL.showSuccessIntercept

    // name: The intercepted skill/item name
    WBL.showLearnItem = function(interceptor, name) {
    	var numMethods = this._methods.length;
        var text = interceptor.name() + " learns " + name + "!";
        this.push('addText', text);
        if (this._methods.length === numMethods) { this.push('wait'); }
    }; // WBL.showLearnItem

    // name: The intercepted skill/item name
    WBL.showFailIntercept = function(interceptor, name) {
    	var numMethods = this._methods.length;
        var text = interceptor.name() + " fails to intercept " + name + "!";
        this.push('addText', text);
        if (this._methods.length === numMethods) { this.push('wait'); }
    }; // WBL.showFailIntercept

})(DoubleX_RMMV.Intercept_Item);

/*============================================================================*/
