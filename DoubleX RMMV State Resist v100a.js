/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV State Resistance
 *----------------------------------------------------------------------------
 *    # Introduction
 *      In the default RMMV setting, a state's either added with a fixed x-y
 *      remaining turns for all battlers, or not added at all.
 *      Also, battlers don't have their own resistance protecting their states
 *      from being removed
 *      With this plugin, you can set some states to have different remaining
 *      turns on different battlers, and set some battlers to have their own
 *      resistance protecting their states from being removed
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
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/6dh43cfC
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0800 28-5-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you set some states to have state removal/turn resistances
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy Notetags:
 *      Equip notetags take the highest priority, followed by class, actor and
 *      enemy
 *      1. <operator state resist turn: stateId, turn>
 *         - Assigns turn to the modifiers of the remaining turns of state
 *           with stateId when applying the state to the battler
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *         - If the final remaining turn's nonpositive, the state won't be
 *           added
 *         - This notetag won't work for states not having remaining turns
 *         - E.g.: <+ state resist turn: 2, 1> means the remaining turns of
 *           state with id 2 will be increased by 1
 *      2. <operator state resist step: stateId, step>
 *         - Assigns step to the modifiers of the remaining steps of state
 *           with stateId when applying the state to the battler
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *         - If the final remaining step's nonpositive, the state won't be
 *           added outside battle and will be instantly removed outside battle
 *         - This notetag won't work for states not having remaining steps
 *         - E.g.: <+ state resist step: 2, 1> means the remaining steps of
 *           state with id 2 will be increased by 1
 *      3. <operator state resist damage remove: stateId, chance>
 *         - Assigns chance to the removal chance% of state with stateId when
 *           removing the state from the battler due to damaging that battler
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *         - If the final removal chance's negative, it'll be regarded as 0%
 *         - This notetag only works if the state has remove by damage checked
 *         - E.g.: <= state resist damage remove: 2, 50> means the removal
 *           chance of state with id 2 due to damaging the battler will be set
 *           as 50%
 *      4. <operator state resist effect remove: stateId, chance>
 *         - Assigns chance to the removal chance% of state with stateId when
 *           removing the state from the battler due to skill/item effects
 *         - operator can be either =, +, -, *, / or %, meaning set to, add
 *           by, subtract by, multiply by, divide by or modulo by respectively
 *         - All instances of this notetag will be used sequentially
 *         - If the final removal chance's negative, it'll be regarded as 0%
 *         - E.g.: <- state resist effect remove: 2, 50> means the removal
 *           chance of state with id 2 due to skill/item effects will be
 *           reduced by 50%
 *      5. <state resist luk effect remove: stateId>
 *         - Applies the same luk formula for modifying the state rate to the
 *           removal chance of state with id stateId due to skill/item effects
 *         - It'll be applied after calculating the final state removal chance
 *         - E.g.: <state resist effect luk remove: 2> sets the luk formula
 *           for modifying the state rate to the removal chance of state with
 *           id 2 due to skill/item effects
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/Enemy manipulations
 *      1. meta.stateResistTurn[stateId]
 *         - Returns the Array of state turn modifiers turns with their
 *           corresponding operators stored in
 *           <operator state resist turn: stateId, turn> in the form of
 *           [opeartor, turn] for state with stateId
 *      2. meta.stateResistTurn[stateId] = [[opeartor, turn], ...]
 *         - Sets the Array of state turn modifiers turns with their
 *           corresponding operators stored in
 *           <operator state resist turn: stateId, turn> in the form of
 *           [opeartor, turn] for state with stateId
 *         - All meta.stateResistanceTurn changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.stateResistStep[stateId]
 *         - Returns the Array of state step modifiers steps with their
 *           corresponding operators stored in
 *           <operator state resist step: stateId, step> in the form of
 *           [opeartor, step] for state with stateId
 *      4. meta.stateResistStep[stateId] = [[opeartor, turn], ...]
 *         - Sets the Array of state step modifiers steps with their
 *           corresponding operators stored in
 *           <operator state resist step: stateId, turn> in the form of
 *           [opeartor, step] for state with stateId
 *         - All meta.stateResistanceStep changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.stateResistDamageRemove[stateId]
 *         - Returns the Array of state removal chance modifiers chance with
 *           their corresponding operators stored in
 *           <operator state resist damage eemove: stateId, chance> in the
 *           form of [opeartor, chance] for state with stateId being removed
 *           due to damaging the battler
 *      6. meta.stateResistDamageRemove[stateId] = [[opeartor, turn], ...]
 *         - Sets the Array of state removal chance modifiers chance with
 *           their corresponding operators stored in
 *           <operator state resist damage remove: stateId, chance> in the
 *           form of [opeartor, chance] for state with stateId being removed
 *           due to damaging the battler
 *         - All meta.stateResistanceDamageRemove changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.stateResistEffectRemove[stateId]
 *         - Returns the Array of state removal chance modifiers chance with
 *           their corresponding operators stored in
 *           <operator state resist effect remove: stateId, chance> in the
 *           form of [opeartor, chance] for state with stateId being removed
 *           due to skill/item effects
 *      8. meta.stateResistEffectRemove[stateId] = [[opeartor, turn], ...]
 *         - Sets the Array of state removal chance modifiers chance with
 *           their corresponding operators stored in
 *           <operator state resist effect remove: stateId, chance> in the
 *           form of [opeartor, chance] for state with stateId being removed
 *           due to skill/item effects
 *         - All meta.stateResistanceEffectRemove changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      9. meta.stateResistLukEffectRemove
 *         - Returns the Array of id of states having the luk formula for
 *           modifying the state rate to also be applied to the final state
 *           removal chance, stored in
 *           <state resist luk effect remove: stateId>, in the form of
 *           [stateId, stateId, stateId, ...]
 *      10. meta.stateResistLukEffectRemove = [stateId, stateId, stateId, ...]
 *          - Sets the Array of id of states having the luk formula for
 *            modifying the state rate to also be applied to the final state
 *            removal chance, stored in
 *           <state resist luk effect remove: stateId>, in the form of
 *           [stateId, stateId, stateId, ...]
 *          - All meta.stateResistLukEffectRemove changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV['State Resist'] = 'v1.00a';

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Some plugin development proficiency to fully comprehend this
 *           plugin
 *----------------------------------------------------------------------------*/

(function(SR) {

    'use strict';

    /* Assigns modifier to current using operator
     * Functional cohesion/Data coupling/Referentially transperant
     * (Number)current: The current value
     * (String)operator: The operator used in modifying the current value
     * (Number)modifier: The value used in modifying the current value
     * Return: The new value(Number)
     */
    SR.operateNotes = function(current, operator, modifier) {
    // v1.00a - v1.00a; New
        switch (operator) {
            case '=': return modifier;
            case '+': return current + modifier;
            case '-': return current - modifier;
            case '*': return current * modifier;
            case '/': return current / modifier;
            case '%': return current % modifier;
            default:
                console.log('Invalid notetag operator: ' + operator);
                console.log('All notetags having this operator are ignored');
                return current;
        }
    }; // SR.operateNotes

    SR.DataManager = {};
    var DM = SR.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() { // v1.00a - v1.00a; Extend
        // Rewritten to load all notetags from all data as well
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    /* Loads all notetags from all data
     * Return success(Boolean)
     * Functional cohesion/Message coupling/Referentially transperant
     */
    DM.loadAllNotes = function() { // v1.00a - v1.00a; New
        var types = [$dataActors, $dataClasses, $dataWeapons, $dataArmors];
        types.concat([$dataEnemies]).forEach(DM.loadTypeNote);
        return true;
    }; // DM.loadAllNotes

    /* Loads all notetags from all data belonging to type
     * Functional cohesion/Message coupling/Referentially transperant
     */
    DM.loadTypeNote = function(type) { // v1.00a - v1.00a; New
        type.forEach(function(data) {
            if (data) DM.loadDataNotes(data.meta, data.note);
        });
    }; // DM.loadTypeNote

    /* Loads all notetags from a data notebox into a data notetag container
     * (Object)meta: The data notetag container
     * (String)note: The data notebox contents
     * Functional cohesion/Data coupling/Referentially transperant
     */
    DM.loadDataNotes = function(meta, note) { // v1.00a - v1.00a; New
        var sRT = meta.stateResistTurn = {};
        var sRS = meta.stateResistStep = {};
        var sRDR = meta.stateResistDamageRemove = {};
        var sRER = meta.stateResistEffectRemove = {};
        var sRELR = meta.stateResistLukEffectRemove = [];
        var turn = /< *(.+) +state +resist +turn *: *(\d+) *, * (\d+) *>/i;
        var step = /< *(.+) +state +resist +step *: *(\d+) *, * (\d+) *>/i;
        var damage = /< *(.+) +state +resist +damage +remove *: *(\d+) *, *(\d+) *>/i;
        var effect = /< *(.+) +state +resist +effect +remove *: *(\d+) *, *(\d+) *>/i;
        var effectLuk = /< *state +resist +luk +effect +remove *: *(\d+) *>/i;
        // Skips to the next line if the current contains any notetag instance
        note.split(/[\r\n]+/).forEach(function(line) {
            if (line.match(turn)) return DM.storeDataNotes(sRT, RegExp.$2);
            if (line.match(step)) return DM.storeDataNotes(sRS, RegExp.$2);
            if (line.match(damage)) return DM.storeDataNotes(sRDR, RegExp.$2);
            if (line.match(effect)) return DM.storeDataNotes(sRER, RegExp.$2);
            if (line.match(effectLuk)) return sRELR.push(RegExp.$1);
        });
        //
    }; // DM.loadDataNotes

    /* Helper function
     * (Object)note: The data notetag value container
     * (String)stateId: The id of the state affected by the notetag container
     * Functional cohesion/Data coupling
     */
    DM.storeDataNotes = function(note, stateId) { // v1.00a - v1.00a; New
        note[stateId] = note[stateId] || [];
        note[stateId].push([RegExp.$1, +RegExp.$3]);
    }; // DM.storeDataNotes

    SR.Game_Action = {};
    var GA = SR.Game_Action;

    GA.itemEffectRemoveState = Game_Action.prototype.itemEffectRemoveState;
    Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
    // v1.00a - v1.00a; Rewrite
        // Rewritten to use all effect remove and effect luk remove notetags too
        var stateId = effect.dataId, note = 'EffectRemove';
        var chance = effect.value1;
        chance = GBB.getMultiNoteVal.call(target, note, stateId, chance);
        chance *= GA.removeStateLukEffectRate.call(this, target, note, stateId);
        if (Math.random() >= chance) return;
        target.removeState(stateId);
        this.makeSuccess(target);
        //
    }; // Game_Action.prototype.itemEffectRemoveState

    /* Returns the luk effect rate applied to removing states(Number)
     * (Object)target: The action target
     * (String)note: The notetag identifier
     * (String)stateId: The id of the state affected by the notetag instances
     * Functional cohesion/Data coupling
     */
    GA.removeStateLukEffectRate = function(target, note, stateId) {
    // v1.00a - v1.00a; New
        note = 'stateResistLuk' + note;
        var types = target.stateResistNoteTypes(), type;
        // Use the luk effect rate if a state removal luk notetag's found
        for (var i = 0, typeL = types.length; i < typeL; i++) {
            type = types[i];
            for (var j = 0, dataL = type.length; j < dataL; j++) {
                if (type[j].meta[note].indexOf(stateId) >= 0) {
                    return this.removeStateLukEffectRate(target);
                }
            }
        }
        //
        return 1;
    }; // GA.removeStateLukEffectRate

    SR.Game_BattlerBase = {};
    var GBB = SR.Game_BattlerBase;

    GBB.resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    // v1.00a - v1.00a; Extend
        GBB.resetStateCounts.apply(this, arguments);
        // Added to use all state turn modifying notetags too
        var turn = this._stateTurns[stateId];
        turn = GBB.getMultiNoteVal.call(this, 'Turn', stateId, turn);
        this._stateTurns[stateId] = turn;
        //
    }; // Game_BattlerBase.prototype.resetStateCounts

    /* Returns the array of all notetag types(Array)
     * Functional cohesion/Data coupling/Referentially transperant
     */
    Game_Battler.prototype.stateResistNoteTypes = function() {
     // v1.00a - v1.00a; New
        // Ensures this plugin works for battlers not being actors nor enemies
        return [];
        //
    }; // Game_Battler.prototype.stateResistNoteTypes

    /* Calculates the final value using all notetags instances(Number)
     * (String)note: The notetag identifier
     * (String)stateId: The id of the state affected by the notetag instances
     * (Number)val: The value to be modified by all notetags instances
     * Functional cohesion/Data coupling
     */
    GBB.getMultiNoteVal = function(note, stateId, val) { // v1.00a - v1.00a; New
        note = 'stateResist' + note;
        // Iteratively use all notetag instances sequentially
        this.stateResistNoteTypes().forEach(function(type) {
            type.forEach(function(data) {
                if (!data.meta[note][stateId]) return;
                data.meta[note][stateId].forEach(function(vals) {
                    val = SR.operateNotes(val, vals[0], vals[1]);
                });
            });
        });
        //
        return val;
    }; // GBB.getMultiNoteVal

    SR.Game_Battler = {};
    var GB = SR.Game_Battler;

    GB.removeStatesByDamage = Game_Battler.prototype.removeStatesByDamage;
    Game_Battler.prototype.removeStatesByDamage = function() {
    // v1.00a - v1.00a; Rewrite
        // Rewritten to use all damage remove and damage luk remove notetags too
        var chance, note = 'DamageRemove', stateId;
        this.states().forEach(function(state) {
            stateId = state.id;
            chance = state.chanceByDamage;
            chance = GBB.getMultiNoteVal.call(this, note, stateId, chance);
            if (state.removeByDamage && Math.randomInt(100) < chance) {
                this.removeState(state.id);
            }
        }, this);
        //
    }; // Game_Battler.prototype.removeStatesByDamage

    SR.Game_Actor = {};
    var GActor = SR.Game_Actor;

    GActor.resetStateCounts = Game_Actor.prototype.resetStateCounts;
    Game_Actor.prototype.resetStateCounts = function(stateId) {
    // v1.00a - v1.00a; Extend
        GActor.resetStateCounts.apply(this, arguments);
        // Added to use all state step modifying notetags too
        var step = this._stateSteps[stateId];
        step = GBB.getMultiNoteVal.call(this, 'Step', stateId, step);
        this._stateSteps[stateId] = step;
        //
    }; // Game_Actor.prototype.resetStateCounts

    /* Returns the array of all notetag types
     * Return: The array of all notetag types(Array)
     * Functional cohesion/Data coupling
     */
    Game_Actor.prototype.stateResistNoteTypes = function() {
    // v1.00a - v1.00a; New
        var types = Game_Battler.prototype.stateResistNoteTypes.call(this);
        // Ensures the returned array won't contain null
        return types.concat([this.equips().filter(function(equip) {
            return equip;
        })]).concat([[this.currentClass()], [this.actor()]]);
        //
    }; // Game_Battler.prototype.stateResistNoteTypes

    /* Returns the array of all notetag types
     * Return: The array of all notetag types(Array)
     * Functional cohesion/Data coupling
     */
    Game_Enemy.prototype.stateResistNoteTypes = function() {
    // v1.00a - v1.00a; New
        var types = Game_Battler.prototype.stateResistNoteTypes.call(this);
        // Ensures the returned array won't contain null
        return types.concat([[this.enemy()]]);
        //
    }; // Game_Battler.prototype.stateResistNoteTypes

})(DoubleX_RMMV.State_Resist = {});

/*============================================================================*/
