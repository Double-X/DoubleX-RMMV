/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Popularized ATB Cooldown
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
 *      1. http://pastebin.com/USwE5Au0
 *      Video:
 *      1. https://www.youtube.com/watch?v=tjR2RdGZ5Uw
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01c(GMT 1400 15-6-2020):
 *      1. Added battler manipulation plugin call empty_patb_cooldown()
 *      v1.01b(GMT 1500 11-8-2016):
 *      1. In sync with the latest DoubleX RMMV Popularized ATB Core version
 *      v1.01a(GMT 0200 20-2-2016):
 *      1. Lets users set the cooldown bar description text via notetags
 *      2. Lets users trigger a common event upon battler cooldown finish
 *      3. Fixed not refreshing the battler upon finishing cooldown bug
 *      4. Fixed a compatibility issue with charge addon upon cooldown finish
 *      v1.00a(GMT 1100 9-2-2016):
 *      1. 1st testing version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set skills/items causing user to cooldown after user
 * @author DoubleX
 *
 * @param cooldown_c1
 * @desc Sets the 1st atb cooldown bar color as text color cooldown_c1
 *       cooldown_c1 must return a valid text color code
 *       cooldown_c1 should return the same value during the same battle to
 *       ensure proper atb cooldown bar color displays
 * @default 19
 *
 * @param cooldown_c2
 * @desc Sets the 2nd atb cooldown bar color as text color cooldown_c2
 *       cooldown_c2 must return a valid text color code
 *       cooldown_c2 should return the same value during the same battle to
 *       ensure proper atb cooldown bar color displays
 * @default 26
 *
 * @param cooldown_bar_text
 * @desc Sets the code of the cooldown bar description text as cooldown_bar_text
 *       It'll only be used if no <patb cooldown text: text> notetag's used
 *       Available cooldown_bar_text code:
 *       item - The skill/item name causing the cooldown will be the cooldown
 *              bar description text
 *       Setting cooldown_bar_text as an unavailable code means atb_bar_text
 *       will be the cooldown bar description text
 *       cooldown_bar_text should return the same code during the same battle to
 *       ensure proper cooldown bar text displays
 * @default item
 *
 * @param post_cooldown_common_event_id
 * @desc Sets the common event with id post_cooldown_common_event_id to be
 *       called right after a battler has finished cooling down
 *       post_cooldown_common_event_id must return a Number
 *       If post_cooldown_common_event_id doesn't return the id of an existing
 *       common event, no common event will be called with this timing
 * @default 0
 *
 * @help
 * Battlers using skills/items without the <patb cooldown: scale, code>
 * notetag will be fully cooled down in 1 frame
 * The default plugin file name is DoubleX RMMV Popularized ATB Cooldown v101c
 * If you want to change that, you must edit the value of
 * DoubleX_RMMV.PATB_Cooldown_File, which must be done via opening this plugin
 * js file directly
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Skill/Item Notetags:
 *      1. <patb cooldown: scale, code>
 *         - Sets the cooldown rate to use the skill/item's invocation speed,
 *           which will be multiplied by scale
 *         - code can be either of the below:
 *           set - The cooldown value per frame will be the skill/item's
 *                 invocation speed * scale, which should be nonnegative
 *           add - The cooldown value per frame will be the absolute value of
 *                 the battler atb gain value per frame + the skill/item's
 *                 invocation speed * scale
 *           multiply - If the skill/item's invocation speed * scale is
 *                      positive, the cooldown value per frame will be the
 *                      battler atb gain value per frame * the skill/item's
 *                      invocation speed * scale
 *                      If the skill/item's invocation speed * scale is
 *                      negative, the cooldown value per frame will be the
 *                      battler atb gain value per frame / (the skill/item's
 *                      invocation speed * scale)
 *                      If the skill/item's invocation speed * scale is 0, the
 *                      battler using the skill/item will be fully cooled down
 *                      in 1 frame
 *      2. <patb cooldown colors: text color 1, text color 2>
 *         - Changes the atb cooldown bar color 1 and 2 to text color 1 and 2
 *           respectively when this notetag's used
 *      3. <patb cooldown text: text>
 *         - Changes the atb cooldown bar description text as text when this
 *           notetag's used
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Data Skill/Item manipulations
 *      1. meta.patb_cooldown
 *         - Returns the skill/item invocation speed scale and cooldown rate
 *           code in the form of { scale: scale, code: code }
 *      2. meta.patb_cooldown = { scale: scale, code: code }
 *         - Sets the skill/item invocation speed scale and cooldown rate code
 *           in the form of { scale: scale, code: code }
 *         - All meta.patb_cooldown changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.patb_cooldown_colors
 *         - Returns the text colors stored in
 *           <patb cooldown colors: text color 1, text color 2> in the form of
 *           [text color 1, text color 2]
 *      4. meta.patb_cooldown_colors = [text color 1, text color 2]
 *         - Sets the text colors stored in
 *           <patb cooldown colors: text color 1, text color 2> as text color
 *           1 and 2
 *         - All meta.patb_cooldown_colors changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.patb_cooldown_text
 *         - Returns the text stored in <patb cooldown text: text>
 *      6. meta.patb_cooldown_text = text
 *         - Sets the text stored in <patb cooldown text: text> as text
 *         - All meta.patb_cooldown_text changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *    # Battler manipulations
 *      1. patb_val.cooldown
 *         - Returns the battler's cooldown value
 *      2. patb_val.cooldown = val
 *         - Set the battler's cooldown value as val
 *           (v1.04b+)Use empty_patb_cooldown() instead if val = 0 in
 *           non-delay fill code and val = max_patb_val in delay fill code, or
 *           the cooldown won't finish properly
 *      3. patb_rate.cooldown
 *         - Returns the battler's cooldown rate
 *      4. patb_rate.cooldown = rate
 *         - Set the battler's cooldown rate as rate
 *         - It'll be reevaluated if it can be changed without plugin calls
 *      5. patb_val_change.cooldown = true
 *         - Notifies that the cooldown value's changed
 *         - It must be used right after the atb bar length changed
 *      6. empty_patb_cooldown()
 *          - (v1.04b+)Empties the battler's atb cooldown to its minimum
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["PATB Cooldown"] = "v1.01c";

// The plugin file name must be the same as DoubleX_RMMV.PATB_Cooldown_File
DoubleX_RMMV.PATB_Cooldown_File = "DoubleX RMMV Popularized ATB Cooldown v101c";

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
DataManager.load_all_patb_cooldown_notes = DataManager.load_all_patb_notes;
DataManager.load_all_patb_notes = function() {
    // Added
    [$dataSkills, $dataItems].forEach(function(type) {
        type.forEach(function(data) {
            if (data) { this.load_patb_cooldown_notes(data); }
        }, this);
    }, this);
    //
    return this.load_all_patb_cooldown_notes();
}; // DataManager.load_all_patb_notes

// data: The data to have its notetags read
DataManager.load_patb_cooldown_notes = function(data) { // New
    var cooldown = /< *patb +cooldown *: *(\d+) *, *(\w+) *>/i;
    var color = /< *patb +cooldown +colors *: *(\d+) *, *(\d+) *>/i;
    var text = /< *patb +cooldown +text *: *(\w+) *>/i, meta = data.meta;
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (line.match(cooldown)) {
            return meta.patb_cooldown = { scale: +RegExp.$1, code: RegExp.$2 };
        } else if (line.match(color)) {
            return meta.patb_cooldown_colors = [+RegExp.$1, +RegExp.$2];
        }
        if (line.match(text)) { meta.patb_cooldown_text = RegExp.$1; }
    });
    // Sets the default to be fully cooled down in 1 frame
    meta.patb_cooldown = meta.patb_cooldown || { scale: 0, code: "multiply" };
    //
}; // DataManager.load_patb_cooldown_notes

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *----------------------------------------------------------------------------*/

BattleManager.endActionPatbCooldown = BattleManager.endAction;
BattleManager.endAction = function() {
    // Added to initialize the cooldown right after using the skill/item
    if ($gameSystem.is_patb()) { this._subject.set_patb_cooldown(); }
    //
    this.endActionPatbCooldown();
    // Added to ensure the action execution subject won't be cooling down
    if ($gameSystem.is_patb()) { this._subject = null; }
    //
}; // BattleManager.endAction

/*----------------------------------------------------------------------------
 *    # (v1.01a+)Edit class: Game_Temp
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

Game_System.prototype.init_patb_cooldown_params =
Game_System.prototype.init_patb_params;
Game_System.prototype.init_patb_params = function() {
    this.init_patb_cooldown_params();
    // Added
    var params = PluginManager.parameters(DoubleX_RMMV.PATB_Cooldown_File), val;
    Object.keys(params).forEach(function(param) {
        val = +params[param];
        this._patb[param] = isNaN(val) ? params[param] : val;
    }, this);
    //
}; // Game_System.prototype.init_patb_params

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Battler
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New private instance variables
 *----------------------------------------------------------------------------*/
/* _patb_cooldown_item: The cached skill/item to read its name and notetags
 * _patb_cooldown_text: The cached cooldown bar description text
 */

Game_Battler.prototype.init_patb_cooldown = Game_Battler.prototype.init_patb;
Game_Battler.prototype.init_patb = function() {
    this.init_patb_cooldown();
    // Added
    this._patb_colors.cooldown = [];
    this._patb_rate.cooldown = 0;
    this.mark_patb_cooldown_change();
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.cooldown = this._max_patb_val;
    }
    this._patb_val.cooldown = 0;
    //
}; // Game_Battler.prototype.init_patb

Game_Battler.prototype.update_patb_cooldown_val =
Game_Battler.prototype.update_patb_val;
Game_Battler.prototype.update_patb_val = function(cap, sign) { // Hotspot
    // Added
    if (this.is_patb_cooldown()) {
        return this.update_patb_cooldown(cap, sign);
    }
    //
    this.update_patb_cooldown_val(cap, sign);
}; // Game_Battler.prototype.update_patb_val

Game_Battler.prototype.set_patb_colors_cooldown =
Game_Battler.prototype.set_patb_colors;
Game_Battler.prototype.set_patb_colors = function(type) { // Potential Hotspot
    // Added
    if (type === "cooldown") {
        return this.set_patb_cooldown_colors();
    }
    //
    this.set_patb_colors_cooldown(type);
}; // Game_Battler.prototype.set_patb_colors

Game_Battler.prototype.reset_patb_cooldown = Game_Battler.prototype.reset_patb;
Game_Battler.prototype.reset_patb = function() { // New
    this.reset_patb_cooldown_val(); // Added
    this.reset_patb_cooldown();
}; // Game_Battler.prototype.reset_patb

Game_Battler.prototype.can_patb_act_cooldown =
Game_Battler.prototype.can_patb_act;
Game_Battler.prototype.can_patb_act = function() { // Hotspot
    // Rewritten
    return this.can_patb_act_cooldown() && this.has_empty_patb_cooldown();
    //
}; // Game_Battler.prototype.can_patb_act

Game_Battler.prototype.patb_type_cooldown = Game_Battler.prototype.patb_type;
Game_Battler.prototype.patb_type = function() { // Hotspot
    // Rewritten
    return this.is_patb_cooldown() ? "cooldown" : this.patb_type_cooldown();
    //
}; // Game_Battler.prototype.patb_type_cooldown

Game_Battler.prototype.patb_bar_text_cooldown =
Game_Battler.prototype.patb_bar_text;
Game_Battler.prototype.patb_bar_text = function() { // v1.01a+; Hotspot
    // Added
    if (this.is_patb_cooldown()) { return this.patb_cooldown_bar_text(); }
    //
    return this.patb_bar_text_cooldown();
}; // Game_Battler.prototype.patb_bar_text

Game_Battler.prototype.empty_patb_cooldown = function() { // v1.04b+; New
// New; Hotspot
    if ($gameSystem.patb.atb_fill_code === "delay") {
        if (this._patb_val.cooldown >= this._max_patb_val) { return; }
        this._patb_val.cooldown = this._max_patb_val;
        this.process_post_patb_cooldown(this._max_patb_val, -1);
    } else {
        if (this._patb_val.cooldown <= 0) { return; }
        this._patb_val.cooldown = 0;
        this.process_post_patb_cooldown(0, 1);
    }
    this._patb_val_change.cooldown = true;
}; // Game_Battler.prototype.empty_patb_cooldown

/* cap: The atb value cap stopping further atb value updates
 * sign: The atb value update direction sign
 */
Game_Battler.prototype.update_patb_cooldown = function(cap, sign) {
// New; Hotspot
    var last_val = this._patb_val.cooldown;
    this._patb_val.cooldown -= this.get_patb_cooldown_rate() * sign;
    this._patb_val_change.cooldown = last_val !== this._patb_val.cooldown;
    if (this._patb_val.cooldown * sign <= (this._max_patb_val - cap) * sign) {
        this.process_post_patb_cooldown(cap, sign);
    }
}; // Game_Battler.prototype.update_patb_cooldown

Game_Battler.prototype.get_patb_cooldown_rate = function() {
// New; Hotspot
    if (this.can_patb_cooldown_rate_change()) {
        this._patb_rate.cooldown = this.set_patb_cooldown_rate();
    }
    return this._patb_rate.cooldown;
}; // Game_Battler.prototype.get_patb_cooldown_rate

Game_Battler.prototype.can_patb_cooldown_rate_change = function() {
// New; Hotspot
    if (this._patb_rate.atb !== this.get_patb_rate()) { return true; }
    return this.are_patb_battler_changed("cooldown_rate");
}; // Game_Battler.prototype.can_patb_cooldown_rate_change

Game_Battler.prototype.set_patb_cooldown_rate = function() {
// New; Potential Hotspot
    var c = this._patb_cooldown_item.meta.patb_cooldown;
    var r = this._patb_rate.atb, s = this._patb_cooldown_item.speed * c.scale;
    switch (c.code) {
        case "set": return s;
        case "add": return Math.abs(r + s);
        case "multiply":
            return s > 0 ? r * s : s < 0 ? r / -s : this._max_patb_val;
        default:
            console.log("Invalid code " + c.code + " as notetag values");
            return this._max_patb_val;
    }
}; // Game_Battler.prototype.set_patb_cooldown_rate

/* cap: The atb value cap stopping further atb value updates
 * sign: The atb value update direction sign
 */
Game_Battler.prototype.process_post_patb_cooldown = function(cap, sign) {
// v1.01a+; New
    this._patb_val.cooldown = this._max_patb_val - cap;
    $gameTemp.call_patb_event("post_cooldown");
    this.set_patb_refresh();
    // Caches the next action if there's any or process all actions end
    if (!this._actions[0]) { return this.onAllActionsEnd(); }
    this._patb_cooldown_item = this._actions[0].item();
    //
}; // Game_Battler.prototype.process_post_patb_cooldown

Game_Battler.prototype.reset_patb_cooldown_val = function() { // New
    this._patb_cooldown_item = null;
    this._patb_val_change.cooldown = true;
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.cooldown = this._max_patb_val;
    }
    this._patb_val.cooldown = 0;
}; // Game_Battler.prototype.reset_patb_cooldown_val

Game_Battler.prototype.has_empty_patb_cooldown = function() { // New; Hotspot
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.cooldown >= this._max_patb_val;
    }
    return this._patb_val.cooldown <= 0;
}; // Game_Battler.prototype.has_empty_patb_cooldown

Game_Battler.prototype.is_patb_cooldown = function() { // New; Hotspot
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.cooldown < this._max_patb_val;
    }
    return this._patb_val.cooldown > 0;
}; // Game_Battler.prototype.is_patb_cooldown

Game_Battler.prototype.set_patb_cooldown_colors = function() {
// New; Potential Hotspot
    if (this._patb_cooldown_item) {
        var colors = this._patb_cooldown_item.meta.patb_cooldown_colors;
        this._patb_colors.cooldown = colors;
    }
    if (this._patb_colors.cooldown) { return; }
    var patb = $gameSystem.patb;
    this._patb_colors.cooldown = [patb.cooldown_c1, patb.cooldown_c2];
}; // Game_Battler.prototype.set_patb_cooldown_colors

Game_Battler.prototype.set_patb_cooldown = function() { // New
    this.set_patb_refresh();
    this.mark_patb_cooldown_change();
    if ($gameSystem.patb.atb_fill_code === "delay") {
        return this._patb_val.cooldown = 0;
    }
    this._patb_val.cooldown = this._max_patb_val;
}; // Game_Battler.prototype.set_patb_cooldown

Game_Battler.prototype.set_patb_cooldown_meta = function() { // New
    this.mark_patb_cooldown_change();
    this._patb_cooldown_item = this._actions[0].item();
}; // Game_Battler.prototype.set_patb_cooldown_meta

Game_Battler.prototype.mark_patb_cooldown_change = function() { // v1.01a+; New
    this._patb_note_change.cooldown_color = true;
    this._patb_note_change.cooldown_rate = true;
    this._patb_note_change.cooldown_text = true;
    this._patb_val_change.cooldown = true;
}; // Game_Battler.prototype.mark_patb_cooldown_change

Game_Battler.prototype.patb_cooldown_bar_text = function() {
// v1.01a+; New; Hotspot
    if (this.are_patb_battler_changed("cooldown_text")) {
        this.set_patb_cooldown_bar_text();
    }
    return this._patb_cooldown_text;
}; // Game_Battler.prototype.patb_cooldown_bar_text

Game_Battler.prototype.set_patb_cooldown_bar_text = function() {
// v1.01a+; New; Potential Hotspot
    if (this._patb_cooldown_item) {
        var text = this._patb_cooldown_item.meta.patb_cooldown_text;
        if (text) { return this._patb_cooldown_text = text; }
        if ($gameSystem.patb.cooldown_bar_text === "item") {
            return this._patb_cooldown_text = this._patb_cooldown_item.name;
        }
    }
    this._patb_cooldown_text = $gameSystem.patb.atb_bar_text;
}; // Game_Battler.prototype.set_patb_cooldown_bar_text

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *----------------------------------------------------------------------------*/

Game_Actor.prototype.confirm_patb_cooldown_act =
Game_Actor.prototype.confirm_patb_act;
Game_Actor.prototype.confirm_patb_act = function() { // v1.01b+
    this.confirm_patb_cooldown_act();
    this.set_patb_cooldown_meta(); // Added
}; // Game_Actor.prototype.confirm_patb_act

Game_Actor.prototype.confirm_patb_cooldown_acts =
Game_Actor.prototype.confirm_patb_acts;
Game_Actor.prototype.confirm_patb_acts = function() {
    this.confirm_patb_cooldown_acts();
    this.set_patb_cooldown_meta(); // Added
}; // Game_Actor.prototype.confirm_patb_acts

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.makeActionsPatbCooldown = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    this.makeActionsPatbCooldown();
    if ($gameSystem.is_patb()) { this.set_patb_cooldown_meta(); } // Added
}; // Game_Enemy.prototype.makeActions

/*----------------------------------------------------------------------------*/

} else {
    alert("To use PATB Cooldown, place it below PATB Core.");
}

/*============================================================================*/
