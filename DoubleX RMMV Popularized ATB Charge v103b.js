/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Charge
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      You shall keep this plugin's Plugin Info part's contents intact
 *      You shalln't claim that this plugin's written by anyone other than
 *      DoubleX or his aliases
 *      None of the above applies to DoubleX or his aliases
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Popularized ATB Core
 *      Abilities:
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/mgtuHVSt
 *      Video:
 *      1. https://www.youtube.com/watch?v=2T6cnXh_r7c
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.03b(GMT 1400 15-6-2020):
 *      1. Added battler manipulation plugin call fill_up_patb_charge()
 *      v1.03a(GMT 1100 22-8-2017):
 *      1. Lets users cancel all skills/items of the selected charging actor
 *      v1.02a(GMT 1500 12-8-2016):
 *      1. Added post_charge_common_event_id
 *      2. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.01a(GMT 1000 20-2-2016):
 *      1. Lets users set the charge bar description text via notetags
 *      2. Lets users set skill/item to be charged before paying its costs
 *      3. Fixed not refreshing the battler upon starting/ending charging bug
 *      v1.00a(GMT 0500 9-2-2016):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set skills/items to need time to charge before using
 * @author DoubleX
 *
 * @param charge_c1
 * @desc Sets the 1st atb charge bar color as text color charge_c1
 *       charge_c1 must return a valid text color code
 *       charge_c1 should return the same value during the same battle to
 *       ensure proper atb charge bar color displays
 * @default 30
 *
 * @param charge_c2
 * @desc Sets the 2nd atb charge bar color as text color charge_c2
 *       charge_c2 must return a valid text color code
 *       charge_c2 should return the same value during the same battle to
 *       ensure proper atb charge bar color displays
 * @default 31
 *
 * @param charge_bar_text
 * @desc Sets the code of the charge bar description text as charge_bar_text
 *       It'll only be used if no <patb charge text: text> notetag's used
 *       Available charge_bar_text code:
 *       item - The name of the currently charging skill/item will be the charge
 *              bar description text
 *       Setting charge_bar_text as an unavailable code means atb_bar_text
 *       will be the charge bar description text
 *       charge_bar_text should return the same code during the same battle to
 *       ensure proper charge bar text displays
 * @default item
 *
 * @param charge_prior_item_cost
 * @desc Sets the skill/item charging to take place before paying its costs if
 *       charge_prior_item_cost is true
 *       It'll only be used if no <patb charge prior item cost> notetag's used
 *       charge_prior_item_cost should return the same value for the same action
 * @default true
 *
 * @param post_charge_common_event_id
 * @desc Sets the common event with id ppost_charge_common_event_id to be
 *       called right after a battler has finished charging a skill/item
 *       post_charge_common_event_id must return a Number
 *       If post_charge_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @help
 * Skills/items without the <patb charge: scale, code> notetag will be fully
 * charged in 1 frame
 * The default plugin file name is DoubleX RMMV Popularized ATB Charge v103b
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Charge_File, which must be done via opening this plugin
 * js file directly
 * (v1.03a+)You're supposed to edit this js file directly to setup hotkeys
 * cancelling the charging of charging actors with specified party member index
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item Notetags:
 *      1. <patb charge: scale, code>
 *         - Sets the charge rate to use the skill/item's invocation speed,
 *           which will be multiplied by scale
 *         - code can be either of the below:
 *           set - The charge value per frame will be the skill/item's
 *                 invocation speed * scale, which should be nonnegative
 *           add - The charge value per frame will be the absolute value of
 *                 the battler atb gain value per frame + the skill/item's
 *                 invocation speed * scale
 *           multiply - If the skill/item's invocation speed * scale is
 *                      positive, the charge value per frame will be the
 *                      battler atb gain value per frame * the skill/item's
 *                      invocation speed * scale
 *                      If the skill/item's invocation speed * scale is
 *                      negative, the charge value per frame will be the
 *                      battler atb gain value per frame / (the skill/item's
 *                      invocation speed * scale)
 *                      If the skill/item's invocation speed * scale is 0, the
 *                      skill/item will be fully charged in 1 frame
 *      2. <patb charge colors: text color 1, text color 2>
 *         - Changes the atb charge bar color 1 and 2 to text color 1 and 2
 *           respectively when this notetag's used
 *      3. <patb charge text: text>
 *         - Changes the atb charge bar description text as text when this
 *           notetag's used
 *      4. <patb charge prior item cost>
 *         - Sets the skill/item charging to take place before paying its cost
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Skill/Item manipulations
 *      1. meta.patb_charge
 *         - Returns the skill/item invocation speed scale and charge rate
 *           code in the form of { scale: scale, code: code }
 *      2. meta.patb_charge = { scale: scale, code: code }
 *         - Sets the skill/item invocation speed scale and charge rate code
 *           in the form of { scale: scale, code: code }
 *         - All meta.patb_charge changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.patb_charge_colors
 *         - Returns the text colors stored in
 *           <patb charge colors: text color 1, text color 2> in the form of
 *           [text color 1, text color 2]
 *      4. meta.patb_charge_colors = [text color 1, text color 2]
 *         - Sets the text colors stored in
 *           <patb charge colors: text color 1, text color 2> as text color 1
 *           and 2
 *         - All meta.patb_charge_colors changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.patb_charge_text
 *         - Returns the text stored in <patb charge text: text>
 *      6. meta.patb_charge_text = text
 *         - Sets the text stored in <patb charge text: text> as text
 *         - All meta.patb_charge_text changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.patb_charge_prior_item_cost
 *         - Returns whether the skill/item charging will take place before
 *           paying its costs
 *      8. meta.patb_charge_prior_item_cost = boolean
 *         - Sets whether the skill/item charging will take place before
 *           paying its costs
 *         - All meta.patb_charge_prior_item_cost changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. patb_val.charge
 *         - Returns the battler's charge value
 *      2. patb_val.charge = val
 *         - Set the battler's charge value as val
 *           (v1.04b+)Use fill_up_patb_charge() instead if val = max_patb_val
 *           in non-delay fill code and val = 0 in delay fill code, or the
 *           post charge event wouldn't trigger
 *      3. patb_rate.charge
 *         - Returns the battler's charge rate
 *      4. patb_rate.charge = rate
 *         - Set the battler's charge rate as rate
 *         - It'll be reevaluated if it can be changed without plugin calls
 *      5. patb_val_change.atb = true
 *         - Notifies that the charge value's changed
 *         - It must be used right after the atb bar length changed
 *      6. fill_up_patb_charge()
 *          - (v1.04b+)Fully fills up the battler's atb charge to its maximum
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Charge"] = "v1.03b";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Charge_File
DoubleX_RMMV.PATB_Charge_File = "DoubleX RMMV Popularized ATB Charge v103b";

/*============================================================================
 *    ## (v1.03a+)Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.PATB_Charge = {

    /* Sets hotkeys cancelling the charging of the charging actor with the
     * specified party member index
     * The effects will be the same as calling the reset_patb() plugin call
     * None of these hotkeys are supposed to be changed during the same battle
     * Each hotkey will be referenced by $gameSystem.patb.charge_actor_index,
     * where index is the index of the hotkey
     * $gameSystem.patb.charge_actor_count must always be updated to maintain
     * the exact number of these hotkeys
     * The ith hotkey will try to select the charging actor with party member
     * index i - 1
     * Each of these hotkey must be a String
     * Using a keyboard mapping plugin, like Quasi Input, can be useful here
     */
    charging_actors: [
        // Setting these as the same as those in inputable_actors in the hotkey
        // addon would cause the buzzer sound to be played on valid cases too
        "#1", // Referenced by $gameSystem.patb.charge_actor_0
        "#2", // Referenced by $gameSystem.patb.charge_actor_1
        "#3", // Referenced by $gameSystem.patb.charge_actor_2
        "#4", // Referenced by $gameSystem.patb.charge_actor_3
        "#5", // Referenced by $gameSystem.patb.charge_actor_4
        "#6", // Referenced by $gameSystem.patb.charge_actor_5
        "#7", // Referenced by $gameSystem.patb.charge_actor_6
        "#8", // Referenced by $gameSystem.patb.charge_actor_7
        "#9", // Referenced by $gameSystem.patb.charge_actor_8
        "#0" // Referenced by $gameSystem.patb.charge_actor_9
        //
    ]

}; // DoubleX_RMMV.PATB_Charge

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge of this plugin on the user level, the default
 *           battle system implementations and the atb system concepts
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
 * function_name = function(arguments) { // Version X+; Rewrite/New; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     function_name_code;
 *     //
 * } // function_name
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["PATB Core"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *----------------------------------------------------------------------------*/

// data: The data to have its notetags read
DataManager.load_all_patb_charge_notes = DataManager.load_all_patb_notes;
DataManager.load_all_patb_notes = function() {
    // Added
    [$dataSkills, $dataItems].forEach(function(type) {
        type.forEach(function(data) {
            if (data) { this.load_patb_charge_notes(data); }
        }, this);
    }, this);
    //
    return this.load_all_patb_charge_notes();
}; // DataManager.load_all_patb_notes

// data: The data to have its notetags read
DataManager.load_patb_charge_notes = function(data) { // New
    var charge = /< *patb +charge *: *(\d+) *, *(\w+) *>/i;
    var color = /< *patb +charge +colors *: *(\d+) *, *(\d+) *>/i;
    var text = /< *patb +charge +text *: *(\w+) *>/i;
    var cost = /< *patb +charge +prior +item +cost *>/i, m = data.meta;
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(charge)) {
            return m.patb_charge = { scale: +RegExp.$1, code: RegExp.$2 };
        } else if (line.match(color)) {
            return m.patb_charge_colors = [+RegExp.$1, +RegExp.$2];
        }
        if (line.match(text)) { return m.patb_charge_text = RegExp.$1; }
        if (line.match(cost)) { return m.patb_charge_prior_item_cost = true; }
    });
    // Sets the default to be fully charged in 1 frame
    m.patb_charge = m.patb_charge || { scale: 0, code: "multiply" };
    //
}; // DataManager.load_patb_charge_notes

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *----------------------------------------------------------------------------*/

BattleManager.endActionPatbCharge = BattleManager.endAction;
BattleManager.endAction = function() {
    // Added to cache the charge notetags for the next action if there's any
    if ($gameSystem.is_patb()) { this._subject.set_patb_charge(); }
    //
    this.endActionPatbCharge();
    // Added to ensure the action execution subject won't be charging actions
    if ($gameSystem.is_patb()) { this._subject = null; }
    //
}; // BattleManager.endAction

/*----------------------------------------------------------------------------
 *    # (v1.02a+)Edit class: Game_Temp
 *----------------------------------------------------------------------------*/

// timing: The common event trigger timing
Game_Temp.prototype.call_patb_event = function(timing) { // New
    var id = $gameSystem.patb[timing + "_common_event_id"];
    if ($dataCommonEvents[id]) { this.reserveCommonEvent(id); }
}; // Game_Temp.prototype.call_patb_event

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores the values of all configurations listed in the plugin manager
 *----------------------------------------------------------------------------*/

Game_System.prototype.init_patb_charge_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_charge_params();
    // Added
    var ps = PluginManager.parameters(DoubleX_RMMV.PATB_Charge_File), val;
    Object.keys(ps).forEach(function(param) {
        val = +ps[param];
        this._patb[param] = isNaN(val) ? ps[param] : val;
    }, this);
    this._patb.charge_prior_item_cost = ps.charge_prior_item_cost === "true";
    var hotkeys = DoubleX_RMMV.PATB_Charge.charging_actors;
    var length = hotkeys.length;
    this._patb.charge_actor_count = length;
    for (var index = 0; index < length; index++) {
        this._patb["charge_actor_" + index.toString()] = hotkeys[index];
    }
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
/* _patb_charge_item: The cached skill/item for reading its name and notetags
 * _patb_charge_text: The cached charge bar description text
 */

Game_Battler.prototype.useItemPatbCharge = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) { // v1.01a+
    // Rewritten
    if (!$gameSystem.is_patb() || this.patb_charge_prior_item_cost(item)) {
        this.useItemPatbCharge(item);
    }
    //
}; // Game_Battler.prototype.useItem

Game_Battler.prototype.init_patb_charge = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_charge();
    // Added
    this._patb_colors.charge = [];
    this._patb_rate.charge = 0;
    this.mark_patb_charge_change();
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge = this._max_patb_val;
    }
    this._patb_val.charge = 0;
    //
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.update_patb_charge_val =
Game_Battler.prototype.update_patb_val;
Game_Battler.prototype.update_patb_val = function(cap, sign) { // Hotspot
    // Added
    if (this.can_patb_charge(cap, sign)) {
        return this.update_patb_charge(cap, sign);
    }
    //
    this.update_patb_charge_val(cap, sign);
}; // Game_Battler.prototype.update_patb_val

Game_Battler.prototype.set_patb_colors_charge =
Game_Battler.prototype.set_patb_colors;
Game_Battler.prototype.set_patb_colors = function(type) { // Potential Hotspot
    if (type === "charge") { return this.set_patb_charge_colors(); } // Added
    this.set_patb_colors_charge(type);
}; // Game_Battler.prototype.set_patb_colors

Game_Battler.prototype.reset_patb_charge = Game_Battler.prototype.reset_patb;
Game_Battler.prototype.reset_patb = function() { // New
    this.reset_patb_charge_val(); // Added
    this.reset_patb_charge();
}; // Game_Battler.prototype.reset_patb

Game_Battler.prototype.can_patb_act_charge =
Game_Battler.prototype.can_patb_act;
Game_Battler.prototype.can_patb_act = function() { // Hotspot
    // Rewritten
    return this.can_patb_act_charge() && this.has_full_patb_charge();
    //
}; // Game_Battler.prototype.can_patb_act

Game_Battler.prototype.patb_type_charge = Game_Battler.prototype.patb_type;
Game_Battler.prototype.patb_type = function() { // Hotspot
    // Rewritten
    return this.is_patb_charge() ? "charge" : this.patb_type_charge();
    //
}; // Game_Battler.prototype.patb_type_charge

Game_Battler.prototype.patb_bar_text_charge =
Game_Battler.prototype.patb_bar_text;
Game_Battler.prototype.patb_bar_text = function() { // v1.01a+; Hotspot
    // Added
    if (this.is_patb_charge()) { return this.patb_charge_bar_text(); }
    //
    return this.patb_bar_text_charge();
}; // Game_Battler.prototype.patb_bar_text

/*----------------------------------------------------------------------------
 *    Ensures charging won't take place when cooldown's taking place
 *----------------------------------------------------------------------------*/
if (DoubleX_RMMV["PATB Cooldown"]) {

/* cap: The atb value cap stopping further atb value updates
 * sign: The atb value update direction sign
 */
Game_Battler.prototype.can_patb_charge = function(cap, sign) { // New; Hotspot
    if (this.is_patb_cooldown()) { return false; }
    if (this._patb_val.atb * sign < cap * sign) { return false; }
    if (this._patb_val.charge * sign >= cap * sign) { return false; }
    return this._patb_charge_item;
}; // Game_Battler.prototype.can_patb_charge

} else {

/* cap: The atb value cap stopping further atb value updates
 * sign: The atb value update direction sign
 */
Game_Battler.prototype.can_patb_charge = function(cap, sign) { // New; Hotspot
    if (this._patb_val.atb * sign < cap * sign) { return false; }
    if (this._patb_val.charge * sign >= cap * sign) { return false; }
    return this._patb_charge_item;
}; // Game_Battler.prototype.can_patb_charge

} // Game_Battler.prototype.can_patb_charge

Game_Battler.prototype.fill_up_patb_charge = function() { // v1.04b+; New
    // Refreshes the status window when the charging starts
    if (!this.is_patb_charge()) { this.set_patb_refresh(); }
    //
    if ($gameSystem.patb.atb_fill_code === "delay") {
        if (this._patb_val.charge <= 0) { return; }
        this._patb_val.charge = 0;
    } else {
        if (this._patb_val.charge >= this._max_patb_val) { return; }
        this._patb_val.charge = this._max_patb_val;
    }
    //
    this._patb_val_change.charge = true;
    $gameTemp.call_patb_event("post_charge");
}; // Game_Battler.prototype.fill_up_patb_charge

/* cap: The atb value cap stopping further atb value updates
 * sign: The atb value update direction sign
 */
Game_Battler.prototype.update_patb_charge = function(cap, sign) {
// New; Hotspot
    // Refreshes the status window when the charging starts
    if (!this.is_patb_charge()) { this.set_patb_refresh(); }
    //
    var last_val = this._patb_val.charge;
    this._patb_val.charge += this.get_patb_charge_rate() * sign;
    this._patb_val_change.charge = last_val !== this._patb_val.charge;
    if (this._patb_val.charge * sign <= cap * sign) { return; }
    $gameTemp.call_patb_event("post_charge");
    this._patb_val.charge = cap;
}; // Game_Battler.prototype.update_patb_charge

Game_Battler.prototype.get_patb_charge_rate = function() {
// New; Hotspot
    if (this.can_patb_charge_rate_change()) {
        this._patb_rate.charge = this.set_patb_charge_rate();
    }
    return this._patb_rate.charge;
}; // Game_Battler.prototype.get_patb_charge_rate

Game_Battler.prototype.can_patb_charge_rate_change = function() {
// New; Hotspot
    if (this._patb_rate.atb !== this.get_patb_rate()) { return true; }
    return this.are_patb_battler_changed("charge_rate");
}; // Game_Battler.prototype.can_patb_charge_rate_change

Game_Battler.prototype.set_patb_charge_rate = function() {
// New; Potential Hotspot
    var item = this._actions[0].item(), charge = item.meta.patb_charge;
    var r = this._patb_rate.atb, s = item.speed * charge.scale;
    switch (charge.code) {
        case "set": return s;
        case "add": return Math.abs(r + s);
        case "multiply":
            return s > 0 ? r * s : s < 0 ? r / -s : this._max_patb_val;
        default:
            console.log("Invalid code " + charge.code + " as notetag values");
            return this._max_patb_val;
    }
}; // Game_Battler.prototype.set_patb_charge_rate

Game_Battler.prototype.reset_patb_charge_val = function() { // New
    this._patb_charge_item = null;
    this._patb_val_change.charge = true;
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge = this._max_patb_val;
    }
    this._patb_val.charge = 0;
}; // Game_Battler.prototype.reset_patb_charge_val

Game_Battler.prototype.has_full_patb_charge = function() { // New; Hotspot
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge <= 0;
    }
    return this._patb_val.charge >= this._max_patb_val;
}; // Game_Battler.prototype.has_full_patb_charge

Game_Battler.prototype.is_patb_charge = function() { // New; Hotspot
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge < this._max_patb_val;
    }
    return this._patb_val.charge > 0;
}; // Game_Battler.prototype.is_patb_charge

Game_Battler.prototype.set_patb_charge_colors = function() {
// New; Potential Hotspot
    if (this._patb_charge_item) {
        var colors = this._patb_charge_item.meta.patb_charge_colors;
        this._patb_colors.charge = colors;
    }
    if (this._patb_colors.charge) { return; }
    var patb = $gameSystem.patb;
    this._patb_colors.charge = [patb.charge_c1, patb.charge_c2];
}; // Game_Battler.prototype.set_patb_charge_colors

Game_Battler.prototype.set_patb_charge = function() { // New
    this.set_patb_refresh();
    this.mark_patb_charge_change();
    if (this._actions[0] && this._actions[0].item()) {
        return this.set_patb_charge_item();
    }
    // Ensures the battler will be reset right after executing the last action
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge = 0;
    }
    this._patb_val.charge = this._max_patb_val;
    //
}; // Game_Battler.prototype.set_patb_charge

Game_Battler.prototype.set_patb_charge_item = function() { // New
    this.mark_patb_charge_change();
    this._patb_charge_item = this._actions[0].item();
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.charge = this._max_patb_val;
    }
    this._patb_val.charge = 0;
}; // Game_Battler.prototype.set_patb_charge_item

Game_Battler.prototype.mark_patb_charge_change = function() { // v1.01a+; New
    this._patb_note_change.charge_color = true;
    this._patb_note_change.charge_rate = true;
    this._patb_note_change.charge_text = true;
    this._patb_val_change.charge = true;
}; // Game_Battler.prototype.mark_patb_charge_change

Game_Battler.prototype.patb_charge_bar_text = function() {
// v1.01a+; New; Hotspot
    if (this.are_patb_battler_changed("charge_text")) {
        this.set_patb_charge_bar_text();
    }
    return this._patb_charge_text;
}; // Game_Battler.prototype.patb_charge_bar_text

Game_Battler.prototype.set_patb_charge_bar_text = function() {
// v1.01a+; New; Potential Hotspot
    if (this._patb_charge_item) {
        var text = this._patb_charge_item.meta.patb_charge_text;
        if (text) { return this._patb_charge_text = text; }
        if ($gameSystem.patb.charge_bar_text === "item") {
            return this._patb_charge_text = this._patb_charge_item.name;
        }
    }
    this._patb_charge_text = $gameSystem.patb.atb_bar_text;
}; // Game_Battler.prototype.set_patb_charge_bar_text

Game_Battler.prototype.patb_charge_prior_item_cost = function(item) {
// v1.01a+; New
    if (item && item.meta.patb_charge_prior_item_cost !== undefined) {
        return item.meta.patb_charge_prior_item_cost;
    }
    return $gameSystem.patb.charge_prior_item_cost;
}; // Game_Battler.prototype.patb_charge_prior_item_cost

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *----------------------------------------------------------------------------*/

Game_Actor.prototype.confirm_patb_charge_act =
Game_Actor.prototype.confirm_patb_act;
Game_Actor.prototype.confirm_patb_act = function() { // v1.02a+
    this.confirm_patb_charge_act();
    // Added
    var act = this.inputtingAction();
    if (!act) { return; }
    this.set_patb_charge_item();
    var item = act.item();
    if (this.patb_charge_prior_item_cost(item)) { return; }
    this.useItemPatbCharge(item);
    //
}; // Game_Actor.prototype.confirm_patb_act

Game_Actor.prototype.confirm_patb_charge_acts =
Game_Actor.prototype.confirm_patb_acts;
Game_Actor.prototype.confirm_patb_acts = function() {
    this.confirm_patb_charge_acts();
    // Added
    this.set_patb_charge_item();
    this._actions.map(function(act) {
        return act.item();
    }).forEach(function(item) {
        if (this.patb_charge_prior_item_cost(item)) { return; }
        this.useItemPatbCharge(item);
    }, this);
    //
}; // Game_Actor.prototype.confirm_patb_acts

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.makeActionsPatbCharge = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    this.makeActionsPatbCharge();
    if ($gameSystem.is_patb()) { this.set_patb_charge_item(); } // Added
}; // Game_Enemy.prototype.makeActions

/*----------------------------------------------------------------------------
 *    # (v1.03a+)Edit class: Window_BattleStatus
 *----------------------------------------------------------------------------*/

Window_BattleStatus.prototype.processHandling = function() { // New
    Window_Selectable.prototype.processHandling.call(this);
    if (!this.isOpen()) { return; }
    var patb = $gameSystem.patb, hotkey;
    for (var i = 0, length = patb.charge_actor_count; i < length; i++) {
        hotkey = patb["charge_actor_" + i.toString()];
        if (Input.isTriggered(hotkey)) { this.callHandler(hotkey); };
    }
}; // Window_ActorCommand.prototype.processHandling

/*----------------------------------------------------------------------------
 *    # (v1.03a+)Edit class: Scene_Battle
 *----------------------------------------------------------------------------*/

Scene_Battle.prototype.createStatusWindowPatbCharge =
Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
    this.createStatusWindowPatbCharge();
    this.set_patb_charge_handler();
}; // Scene_Battle.prototype.createStatusWindow

Scene_Battle.prototype.set_patb_charge_handler = function() { // New
    var patb = $gameSystem.patb, c_i = this.set_patb_charge_index_actor, hotkey;
    for (var i = 0, length = patb.charge_actor_count; i < length; i++) {
        hotkey = patb["charge_actor_" + i.toString()];
        this._statusWindow.setHandler(hotkey, c_i.bind(this, i));
    }
}; // Scene_Battle.prototype.set_patb_charge_handler

// index: The party member index of the actor to stop charging actions
Scene_Battle.prototype.set_patb_charge_index_actor = function(index) {
    var actor = $gameParty.battleMembers()[index];
    actor.is_patb_charge() ? actor.reset_patb() : SoundManager.playBuzzer();
}; // Scene_Battle.prototype.set_patb_charge_index_actor

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Charge, place it below PATB Core.");
}

/*============================================================================*/
