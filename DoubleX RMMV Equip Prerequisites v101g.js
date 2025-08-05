/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Equip Prerequisites
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
 *      1. http://pastebin.com/6TetJ6dH
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.01g(GMT 0100 18-1-2016):
 *      1. <stat req: stat, operator, val> only support battler getters
 *      2. Fixed Number is not a function bug
 *      v1.01f(GMT 0300 17-1-2016):
 *      1. Fixed undefined variable req bug
 *      2. Exposed this plugin's equip manipulation plugin calls
 *      3. Increased this plugin's compactness, compatibility and readability
 *      v1.01e(GMT 1200 24-11-2015):
 *      1. Fixed unsupported arrow function in ES5 bug
 *      2. The extended functions can be accessed by other custom plugins now
 *      3. Notetags with invalid operators will log message on console instead
 *      4. Increased this plugin's readability and robustness
 *      v1.01d(GMT 1600 6-11-2015):
 *      1. Simplified the notetag reading mechanisms
 *      2. Fixed some typos
 *      v1.01c(GMT 1200 5-11-2015):
 *      1. Fixed undefined this under DoubleX_RMMV.Equip_Prerequisites bug
 *      v1.01b(GMT 0000 5-11-2015):
 *      1. Fixed failing to load notetags due to nil data bug
 *      v1.01a(GMT 1000 4-11-2015):
 *      1. Added <no weapon req: id>, <no armor req: id> and <weapon req: id>
 *         notetags
 *      2. Fixed several logic and syntax errors
 *      3. Increased this plugin's maintainability
 *      v1.00a(GMT 1300 31-10-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users add various prerequisites for equipments to actors
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Equip Notetags:
 *      (v1.01a+)1. <no weapon req: id>
 *         - Sets that equip to be unequippable with an equipped weapon with
 *           id id
 *      (v1.01a+)2. <no armor req: id>
 *         - Sets that equip to be unequippable with an equipped armor with id
 *           id
 *      (v1.01a+)3. <weapon req: id>
 *         - Sets that equip to need an equipped weapon with id id to be
 *           equipped
 *      4. <armor req: id>
 *         - Sets that equip to need an equipped armor with id id to be
 *           equipped
 *      5. <stat req: stat, operator, val>
 *         - Sets that equip to need the owner's stat stat to meet the
 *           operator operator and value val to be equipped
 *         - stat can be any Parameter, Ex-Parameter and Sp-Parameter, hp, mp,
 *           tp and level
 *         - (Advanced)stat can also be any other battler getter name that can
 *           use operator
 *         - operator can be either l, le, e, ge, g or ne, meaning <, <=. ===,
 *           >=, > and !== respectively
 *         - If val is a number, it'll be treated as a Number rather than a
 *           String
 *      6. <var req: id, operator, val>
 *         - Sets that equip to need the value of variable with id id to meet
 *           the operator operator and value val to be equipped
 *         - operator can be either l, le, e, ge, g or ne, meaning <, <=. ===,
 *           >=, > and !== respectively
 *         - If val is a number, it'll be treated as a Number rather than a
 *           String
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Equip manipulations
 *      1. meta.noWeaponReq
 *         - Returns the Array of ids of all equipped weapons making this
 *           equip unequippable
 *      2. meta.noWeaponReq = [id, id, id, ..., id]
 *         - Sets the Array of ids of all equipped weapons making this equip
 *           unequippable
 *         - All meta.noWeaponReq changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      3. meta.noArmorReq
 *         - Returns the Array of ids of all equipped armors making this equip
 *           unequippable
 *      4. meta.noArmorReq = [id, id, id, ..., id]
 *         - Sets the Array of ids of all equipped armors making this equip
 *           unequippable
 *         - All meta.noArmorReq changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      5. meta.weaponReq
 *         - Returns the Array of ids of all equipped weapons needed for this
 *           equip to be equippable
 *      6. meta.weaponReq = id
 *         - Sets the Array of ids of all equipped weapons needed for this
 *           equip to be equippable
 *         - All meta.weaponReq changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      7. meta.armorReq
 *         - Returns the Array of ids of all equipped armors needed for this
 *           equip to be equippable
 *      8. meta.armorReq = id
 *         - Sets the Array of ids of all equipped armors needed for this
 *           equip to be equippable
 *         - All meta.armorReq changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *      9. meta.statReq
 *         - Returns the Array of all stat-operator-value triples, each in the
 *           form of [stat, operator, value], as the equip prerequisites
 *      10. meta.statReq = [[stat, operator, value], [stat, operator, value]]
 *          - Sets the Array of all stat-operator-value triples, each in the
 *            form of [stat, operator, value], as the equip prerequisites
 *          - All meta.statReq changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *      11. meta.varReq
 *          - Returns the Array of all variable-operator-value triples, each
 *            in the form of [variable, operator, value], as the equip
 *            prerequisites
 *      12. meta.varReq = [[variable, operator, value]]
 *          - Sets the Array of all variable-operator-value triples, each in
 *            the form of [variable, operator, value], as the equip
 *            prerequisites
 *          - All meta.varReq changes can be saved if
 *            DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Equip Prerequisites"] = "v1.01g";

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

DoubleX_RMMV.Equip_Req = {};
(function(ER) {

    ER.DataManager = {};
    var DM = ER.DataManager;

    DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        // Rewritten
        return DM.isDatabaseLoaded.apply(this, arguments) && DM.loadAllNotes();
        //
    }; // DataManager.isDatabaseLoaded

    DM.loadAllNotes = function() {
        [$dataWeapons, $dataArmors].forEach(function(type) {
            type.forEach(function(data) {
                if (data) { DM.loadItemNotes(data); }
            });
        });
        return true;
    }; // DM.loadAllNotes

    // data: The data to have its notetags read
    DM.loadItemNotes = function(data) { // v1.01e+; New
        var noWeaponReq = /< *no +weapon +req *: *(\d+) *>/i;
        var noArmorReq = /< *no +armor +req *: *(\d+) *>/i;
        var weaponReq = /< *weapon +req *: *(\d+) *>/i;
        var armorReq = /< *armor +req *: *(\d+) *>/i;
        var statReq = /< *stat +req *: *(.+) *, *(\w+) *, *(\w+) *>/i;
        var varReq = /< *var +req *: *(\d+) *, *(\w+) *, *(\w+) *>/i;
        var meta = data.meta, num;
        meta.noWeaponReq = [];
        meta.noArmorReq = [];
        meta.weaponReq = [];
        meta.armorReq = [];
        meta.statReq = [];
        meta.varReq = [];
        data.note.split(/[\r\n]+/).forEach(function(line) {
            if (line.match(noWeaponReq)) {
                meta.noWeaponReq.push(+RegExp.$1);
            } else if (line.match(noArmorReq)) {
                meta.noArmorReq.push(+RegExp.$1);
            } else if (line.match(weaponReq)) {
                meta.weaponReq.push(+RegExp.$1);
            } else if (line.match(armorReq)) {
                meta.armorReq.push(+RegExp.$1);
            } else if (line.match(statReq)) {
                num = +RegExp.$3;
                if (isNaN(num)) { num = RegExp.$3; }
                meta.statReq.push([RegExp.$1, RegExp.$2, num]);
            } else if (line.match(varReq)) {
                num = +RegExp.$3;
                if (isNaN(num)) { num = RegExp.$3; }
                meta.varReq.push([+RegExp.$1, RegExp.$2, num]);
            }
        });
    }; // DM.loadItemNotes

    ER.Game_BattlerBase = {};
    var GBB = ER.Game_BattlerBase;

    GBB.canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) {
        // Rewritten
        if (!GBB.canEquip.apply(this, arguments)) { return false; }
        return GBB.equipReq.call(this, item);
        //
    }; // Game_BattlerBase.prototype.canEquip

    // item: The equip to be checked
    GBB.equipReq = function(item) { // New
        if (!GBB.equipReqWeapon.call(this, item.meta.noWeaponReq, false)) {
            return false;
        } else if (!GBB.equipReqArmor.call(this, item.meta.noArmorReq, false)) {
            return false;
        } else if (!GBB.equipReqWeapon.call(this, item.meta.weaponReq, true)) {
            return false;
        } else if (!GBB.equipReqArmor.call(this, item.meta.armorReq, true)) {
            return false;
        }
        if (!GBB.equipReqOperator.call(this, item.meta.statReq, "statReq")) {
            return false;
        }
        return GBB.equipReqOperator.call(this, item.meta.varReq, "varReq");
    }; // GBB.equipReq

    /* req: The item equip prerequisites
     * flag: The required to be equipped/unequippable flag
     */
    GBB.equipReqWeapon = function(req, flag) { // New
        return req.length <= 0 || flag === req.some(function(id) {
            return this.hasWeapon($dataWeapons[id]);
        }, this);
    }; // GBB.equipReqWeapon

    /* req: The item equip prerequisites
     * flag: The required to be equipped/unequippable flag
     */
    GBB.equipReqArmor = function(req, flag) { // New
        return req.length <= 0 || flag === req.some(function(id) {
            return this.hasArmor($dataArmors[id]);
        }, this);
    }; // GBB.equipReqArmor

    /* item: The equip to be checked
     * note: The notetag name
     */
    GBB.equipReqOperator = function(req, note) { // New
        if (req.length <= 0) { return true; };
        var varVal = note === "varReq";
        return req.every(function(r) {
            return GBB.equipReqEval.call(this, r, varVal);
        }, this);
    }; // GBB.equipReqOperator

    /* req: The equip prerequisite notetag value array
     * varVal: The variable id flag
     */
    GBB.equipReqEval = function(req, varVal) { // New
        // req[0] must be a battler getter name in case of stat req
        var val = varVal ? $gameVariables.value(req[0]) : this[req[0]];
        //
        switch (req[1]) {
        case "l": return val < req[2];
        case "le": return val <= req[2];
        case "e": return val === req[2];
        case "ge": return val >= req[2];
        case "g": return val > req[2];
        case "n": return val !== req[2];
        default:
            console.log("Invalid operator " + req[1] + " as notetag values");
            return true;
        }
    }; // GBB.equipReqEval

})(DoubleX_RMMV.Equip_Req);

/*============================================================================*/
