/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Skill Progress Unit Test
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. This plugin performs some rudimetary invariants checking for the
 *       implementations of DoubleX RMMV Skill Progress, and some elementary
 *       value validity checking for the parameters/configurations/notetags of
 *       DoubleX RMMV Skill Progress
 *    2. You can setup how this plugin displays the failed test messages with
 *       their stacktraces
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. If you repost this plugin directly(rather than just linking back),
 *         you shall inform me of these direct repostings. I always reserve
 *         the right to request you to edit those direct repostings.
 *      5. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions not needing follow so.
 *      6. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Plugins:
 *      1. DoubleX RMMV Skill Progress
 *      Abilities:
 *      1. Nothing special for most ordinary cases
 *      2. Little RMMV plugin development proficiency to fully utilize this
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. Using this plugin might lead to noticeable performance penalties
 *----------------------------------------------------------------------------
 *    # Links
 *      DoubleX RMMV Skill Progress:
 *      1. https://pastebin.com/6XdtFJYD
 *      This plugin:
 *      1. https://pastebin.com/NzQVER8u
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. Place this plugin right below DoubleX RMMV Skill Progress
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1000 4-Dec-2019):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets you run some unit tests for DoubleX RMMV Skill Progress
 * This plugin's entirely optional and is mainly for debuggers/developers
 * @author DoubleX
 *
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Progress Unit Test"] = "v1.00a";

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Skill_Progress_Unit_Test = {

    /**
     * Shows the failed parameter test with its value, condition and error
     * Hotspot/No-op
     * @since v1.00a @version v1.00a
     * @param {*} val - The actual parameter value
     * @param {String} param - The parameter being tested
     * @param {String} cond - The parameter validity condition description
     */
    showFailMsg: function(val, param, cond) {
        try { x; } catch (err) {
            console.warn([
                "The " + param + " in DoubleX RMMV Skill Progress has value:",
                val,
                "Which isn't valid because:",
                cond,
                "The source is shown by this stacktrace:",
                err.stack
            ].join("\n"));
        }
    } // showFailMsg

}; // DoubleX_RMMV.Skill_Progress

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Basic knowledge on what unit tests do
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Skill Progress"]) {

/*----------------------------------------------------------------------------*/

(function(SP, SPUT) {

    "use strict";

    // Stores all the original parameter/configuration/notetag functions
    SPUT.orig = { params: {}, cfgs: {}, notes: {} };
    //

    // Stores all the parameter/configuration/notetag function unit tests
    SPUT.unitTest = {
        // Stores all the parameter function unit tests
        params: {
            isEnabled: "checkBool",
            condNotePriority: "checkArrayDataType",
            condNoteChainingRule: "checkChainBoolRule",
            defaultMax: "checkPositiveNum",
            maxNotePriority: "checkArrayDataType",
            maxNoteChainingRule: "checkChainNumRule",
            defaultUseGain: "checkNum",
            useGainNotePriority: "checkArrayDataType",
            useGainNoteChainingRule: "checkChainNumRule",
            defaultHitGain: "checkNum",
            hitGainNotePriority: "checkArrayDataType",
            hitGainNoteChainingRule: "checkChainNumRule",
            nextNotePriority: "checkArrayDataType",
            nextNoteChainingRule: "checkChainListRule",
            defaultKeepCurrent: "checkBool",
            keepCurrentNotePriority: "checkArrayDataType",
            keepCurrentNoteChainingRule: "checkChainBoolRule",
            // There's no need to test this parameter as it returns nothing
            willEnd: "",
            //
            willEndNotePriority: "checkArrayDataType",
            willEndNoteChainingRule: "checkChainListRule",
            // There's no need to test this parameter as it returns nothing
            didEnd: "",
            //
            didEndNotePriority: "checkArrayDataType",
            didEndNoteChainingRule: "checkChainListRule",
            cmdLineH: "checkPositiveNum",
            cmdFontSize: "checkPositiveNum",
            cmdPadding: "checkNonnegativeNum",
            cmdTextPadding: "checkNonnegativeNum",
            cmdBackOpacity: "checkOpacity",
            cmdTranslucentOpacity: "checkOpacity",
            cmdSpacing: "checkNonnegativeNum",
            cmdWinW: "checkPositiveNum",
            cmdWinH: "checkPositiveNum",
            cmdWinX: "checkNum",
            cmdWinY: "checkNum",
            cmdView: "checkString",
            cmdUse: "checkString",
            statLineH: "checkPositiveNum",
            statFontSize: "checkPositiveNum",
            statPadding: "checkNonnegativeNum",
            statTextPadding: "checkNonnegativeNum",
            statBackOpacity: "checkOpacity",
            statTranslucentOpacity: "checkOpacity",
            statSpacing: "checkNonnegativeNum",
            statWinW: "checkPositiveNum",
            statWinH: "checkPositiveNum",
            statWinX: "checkNum",
            statWinY: "checkNum",
            condLineH: "checkPositiveNum",
            condFontSize: "checkPositiveNum",
            condPadding: "checkNonnegativeNum",
            condTextPadding: "checkNonnegativeNum",
            condBackOpacity: "checkOpacity",
            condTranslucentOpacity: "checkOpacity",
            condSpacing: "checkNonnegativeNum",
            condWinW: "checkPositiveNum",
            condWinH: "checkPositiveNum",
            condWinX: "checkNum",
            condWinY: "checkNum",
            nextLineH: "checkPositiveNum",
            nextFontSize: "checkPositiveNum",
            nextPadding: "checkNonnegativeNum",
            nextTextPadding: "checkNonnegativeNum",
            nextBackOpacity: "checkOpacity",
            nextTranslucentOpacity: "checkOpacity",
            nextSpacing: "checkNonnegativeNum",
            nextWinW: "checkPositiveNum",
            nextWinH: "checkPositiveNum",
            nextWinX: "checkNum",
            nextWinY: "checkNum",
            varIds: "checkIdVarArrayNoteFactorObj",
            switchIds: "checkIdSwitchArrayNoteFactorObj"
        }, // params
        // Stores all the configuration function unit tests
        cfgs: {
          // There's no need to test this parameter as it returns nothing
          drawStat: ""
          //
        }, // cfgs
        //
        notes: {}, // Stores all the notetag function unit tests
        // Stores all the notetag type result unit tests
        noteTypes: {
            cond: "checkArray",
            max: "checkPositiveNumArray",
            useGain: "checkNumArray",
            hitGain: "checkNumArray",
            next: "checkIdSkillArray",
            keepCurrent: "checkArray",
            // There's no need to test these parameters as they return nothing
            willEnd: "",
            didEnd: ""
            //
        },
        //
        // Stores all the chained notetag type result unit tests
        chainedNoteTypes: {
            cond: "checkBoolObj",
            max: "checkPositiveNum",
            useGain: "checkNum",
            hitGain: "checkNum",
            next: "checkIdSkillArray",
            keepCurrent: "checkBool",
            // There's no need to test these parameters as they return nothing
            willEnd: "",
            didEnd: ""
            //
        }
        //
    }; // SPUT.unitTest

    // There's no need to test this parameter as it's always valid
    var notes = SPUT.unitTest.notes, checkFunc = new Function("val", "");
    //
    Object.keys(SP.notes).forEach(function(note) { notes[note] = checkFunc; });

    // Stores all the unit test value validity checks
    SPUT.checkFuncs = {

        /**
         * Hotspot/Pure Function
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @returns {Boolean} The check result
         * @since v1.00a @version v1.00a
         */
        checkArray: function(val, param) {
            if (Array.isArray(val)) return true;
            return SPUT.showFailMsg(val, param, "It should be an Array!");
        }, // checkArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkArrayDataType: function(val, param) {
            SPUT.checkFuncs.checkArrayVals(val, param,
                    ["states", "armors", "weapons", "currentClass", "actor"]);
        }, // checkArrayDataType

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[]} vals - The list of valid primitive values
         * @since v1.00a @version v1.00a
         */
        checkArrayVals: function(val, param, vals) {
            if (!SPUT.checkFuncs.checkArray(val, param)) return;
            var cond = [
                "These elements should be within " + vals + ":"
            ].concat(val.map(function(v, i) {
                return vals.indexOf(v) >= 0 ? "" : v + " with index " + i;
            }).filter(function(m) { return m; }));
            if (cond.length <= 1) return;
            SPUT.showFailMsg(JSON.stringify(val), param, cond.join("\n"));
        }, // checkArrayVals

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkBool: function(val, param) {
            if (val === !!val) return;
            SPUT.showFailMsg(val, param, "It should be a Boolean!");
        }, // checkBool

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkBoolObj: function(val, param) {
            if (!SPUT.checkFuncs.checkObj(val, param)) return;
            Object.keys(val).forEach(function(key) {
                SPUT.checkFuncs.checkBool(val[key], JSON.stringify({
                    param: param,
                    key: key
                }));
            });
        }, // checkBoolObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkChainBoolRule: function(val, param) {
            SPUT.checkFuncs.checkVal(
                    val, param, ["first", "every", "last", "some"]);
        }, // checkChainBoolRule

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkChainListRule: function(val, param) {
            SPUT.checkFuncs.checkVal(val, param, Object.keys(
                    SP.Game_SkillProgressRules._RUN_CHAINING_RULES));
        }, // checkChainListRule

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkChainNumRule: function(val, param) {
            SPUT.checkFuncs.checkVal(val, param,
                    ["first", "+", "-", "*", "/", "%", "=", "last"]);
        }, // checkChainNumRule

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[{}]} data - The list of data to check the id array
         * @param {String} type - The data container name
         * @since v1.00a @version v1.00a
         */
        checkIdDataArray: function(val, param, data, type) {
            if (!SPUT.checkFuncs.checkArray(val, param)) return;
            var cond = [
                "These elements should be a valid " + type + " id :"
            ].concat(val.map(function(v, i) {
                var d = data[v];
                return d || d === false ? "" : v + " with index " + i;
            }).filter(function(m) { return m; }));
            if (cond.length <= 1) return;
            SPUT.showFailMsg(JSON.stringify(val), param, cond.join("\n"));
        }, // checkIdDataArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[{}]} data - The list of data to check the id array
         * @param {String} type - The data container name
         * @since v1.00a @version v1.00a
         */
        checkIdGameArrayNoteFactorObj: function(val, param, data, type) {
            if (Array.isArray(val)) {
                return SPUT.checkFuncs.checkIdDataArray(val, param, data, type);
            }
            if (!SPUT.checkFuncs.checkObj(val, param)) return;
            var ids = Object.keys(val);
            SPUT.checkFuncs.checkIdDataArray(ids.map(function(id) {
                return +id;
            }), param, data, type);
            var _SP = SP.Game_SkillProgressCache;
            var notes = _SP._NOTES, factors = _SP._FACTORS;
            ids.forEach(function(id) {
                var noteFactors = ids[id];
                SPUT.checkFuncs.checkArrayVals(noteFactors.notes, param, notes);
                SPUT.checkFuncs.checkArrayVals(
                        noteFactors.factors, param, factors);
            });
        }, // checkIdGameArrayNoteFactorObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkIdSkillArray: function(val, param) {
            SPUT.checkFuncs.checkIdDataArray(
                    val, param, $dataSkills, "skill");
        }, // checkIdSkillArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkIdSwitchArrayNoteFactorObj: function(val, param) {
            SPUT.checkFuncs.checkIdGameArrayNoteFactorObj(
                    val, param, $gameSwitches._data, "switch");
        }, // checkIdSwitchArrayNoteFactorObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkIdVarArrayNoteFactorObj: function(val, param) {
            SPUT.checkFuncs.checkIdGameArrayNoteFactorObj(
                    val, param, $gameVariables._data, "variable");
        }, // checkIdVarArrayNoteFactorObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkNonnegativeNum: function(val, param) {
            if (isNaN(val) || val < 0) SPUT.showFailMsg(
                    val, param, "It should be a nonnegative Number!");
        }, // checkNonnegativeNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkNum: function(val, param) {
            if (!isNaN(val)) return;
            SPUT.showFailMsg(val, param, "It should be a Number!");
        }, // checkNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkNumArray: function(val, param) {
            if (!SPUT.checkFuncs.checkArray(val, param)) return;
            val.forEach(function(v, i) {
                SPUT.checkFuncs.checkNum(v,
                        JSON.stringify({ array: val, index: i, param: param }));
            });
        }, // checkNumArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @returns {Boolean} The check result
         * @since v1.00a @version v1.00a
         */
        checkObj: function(val, param) {
            if (val === Object(val)) return true;
            return SPUT.showFailMsg(val, param, "It should be an Object!");
        }, // checkObj

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkOpacity: function(val, param) {
              if (isNaN(val) || val < 0 && val > 255) SPUT.showFailMsg(val,
                      param, "It should be a Number ranging from 0 to 255!");
        }, // checkOpacity

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkPositiveNum: function(val, param) {
            if (!isNaN(val) && val > 0) return;
            SPUT.showFailMsg(val, param, "It should be a positive Number!");
        }, // checkPositiveNum

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkPositiveNumArray: function(val, param) {
            if (!SPUT.checkFuncs.checkArray(val, param)) return;
            val.forEach(function(v, i) {
                SPUT.checkFuncs.checkPositiveNum(v,
                        JSON.stringify({ array: val, index: i, param: param }));
            });
        }, // checkPositiveNumArray

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @since v1.00a @version v1.00a
         */
        checkString: function(val, param) {
            if (typeof val === "string" || val instanceof String) return;
            SPUT.showFailMsg(val, param, "It should be a String!");
        }, // checkString

        /**
         * Hotspot/No-op
         * @param {*} val - The actual parameter value
         * @param {String} param - The parameter being tested
         * @param {[*]} vals - The list of valid values
         * @since v1.00a @version v1.00a
         */
        checkVal: function(val, param, vals) {
            if (vals.indexOf(val) >= 0) return;
            SPUT.showFailMsg(val, param, "It should be within " + vals + "!");
        } // checkVal

    }; // SPUT.checkFuncs
    //

    /**
     * Pure function
     * @param {String} type - The parameter/configuration/notetag indicator
     * @param {String} param - The parameter being tested
     * @param {(*, String)} checkFunc - The function checking the actual value
     * @returns {() -> *} The function returning the original result
     * @since v1.00a @version v1.00a
     */
    SPUT.unitTestFunc = function(type, param, checkFunc) {
        /**
         * The this pointer refers to that of the original function counterpart
         * Nullipotent
         * @author DoubleX
         * @returns {*} The requested result
         * @since v1.00a
         * @version v1.00a
         */
        return function() {
            // It's possible that SPUT.orig[type][param] will change on the fly
            var val = SPUT.orig[type][param].apply(this, arguments);
            //
            // Added to test the parameter/configuration/notetag value validity
            checkFunc(val, type + "." + param);
            //
            return val;
        };

    }; // SPUT.unitTestFunc

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Extends all parameter/configuration/notetag functions upon load game
 *----------------------------------------------------------------------------*/

(function(SP, SPUT) {

    "use strict";

    SP.DataManager.unitTest = { orig: {}, new: {} };
    var _SP = SP.DataManager.new;
    var _DM = SP.DataManager.unitTest.orig, _UT = SP.DataManager.unitTest.new;

    _DM._extractFuncContent = _SP._extractFuncContent;
    _SP._extractFuncContent = function(funcType, content) {
    // v1.00a - v1.00a; Extended
        _DM._extractFuncContent.apply(this, arguments);
        // Added to unit test the value validity of param/cfg/note functions
        _UT._extractFuncContent.call(this, funcType, content);
        //
    }; // _SP._extractFuncContent

    /**
     * The this pointer is DataManager
     * @param {String} funcType - The parameter/configuration/notetag label
     * @param {String} content - The name of the stored function content
     * @since v1.00a @version v1.00a
     */
    _UT._extractFuncContent = function(funcType, content) {
        // This function should be so stable that it shouldn't be changed later
        var checkFunc = SPUT.checkFuncs[SPUT.unitTest[funcType][content]];
        //
        if (!checkFunc) return;
        SPUT.orig[funcType][content] = SP[funcType][content];
        // Using partial application here would erase the function context
        SP[funcType][content] = SPUT.unitTestFunc(funcType, content, checkFunc);
        //
    }; // _UT._extractFuncContent

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Extends all parameter/configuration/notetag functions upon load game
 *----------------------------------------------------------------------------*/

(function(SP, SPUT) {

    "use strict";

    SP.Game_System.unitTest = { orig: {}, new: {} };
    var _SP = SP.Game_System.new;
    var _GS = SP.Game_System.unitTest.orig, _UT = SP.Game_System.unitTest.new;

    _GS._storeParam = _SP._storeParam;
    _SP._storeParam = function(params, param) { // v1.00a - v1.00a; Extended
        // Added to prevent storing the extended parameter function contents
        if (SPUT.orig.params[param]) return;
        //
        _GS._storeParam.apply(this, arguments);
        // Added to unit test the value validity of all parameter functions
        _UT._storeCfg.call(this, "params", param);
        //
    }; // _SP._storeParam

    _GS._storeCfg = _SP._storeCfg;
    _SP._storeCfg = function(cfgType, cfg) { // v1.00a - v1.00a; Extended
        // Edited to prevent storing the extended cfg/note function contents
        if (SPUT.orig[cfgType][cfg]) return;
        //
        _GS._storeCfg.apply(this, arguments);
        // Added to unit test the value validity of all cfg/note functions
        _UT._storeCfg.call(this, cfgType, cfg);
        //
    }; // _SP._storeCfg

    /**
     * The this pointer is Game_Actor.prototype
     * @param {String} cfgType - The configuration type label
     * @param {String} cfg - The name of the configuration
     * @since v1.00a @version v1.00a
     */
    _UT._storeCfg = function(cfgType, cfg) {
        // This function should be so stable that it shouldn't be changed later
        var checkFunc = SPUT.checkFuncs[SPUT.unitTest[cfgType][cfg]];
        //
        if (!checkFunc) return;
        SPUT.orig[cfgType][cfg] = SP[cfgType][cfg];
        // Using partial application here would erase the function context
        SP[cfgType][cfg] = SPUT.unitTestFunc(cfgType, cfg, checkFunc);
        //
    }; // _UT._storeCfg

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Unit tests all the nontrivial non-tautological class invariants
 *----------------------------------------------------------------------------*/

(function(SP, SPUT) {

    "use strict";

    SP.Game_Actor.unitTest = { orig: {}, new: {} };
    var _SP = SP.Game_Actor.new, $ = Game_Actor.prototype;
    var _GA = SP.Game_Actor.unitTest.orig, _UT = SP.Game_Actor.unitTest.new;

    // Only interfaces will have their argument invariants checked
    Object.keys(_SP._RESULT_FUNCS).concat([
        "onUseGainSkillProgress",
        "onHitGainSkillProgress"
    ]).forEach(function(func) {
        _GA[func] = $[func];
        _UT[func] = $[func] = function(skillId, target, value) {
        // v1.00a - v1.00a; Extended
            var result = _GA[func].apply(this, arguments);
            // Added to check whether the skillId and value arguments are valid
            SPUT.checkFuncs.checkIdSkillArray(
                    [skillId], "_GA." + func + " skillId");
            if (value) SPUT.checkFuncs.checkNum(
                    value, "_GA." + func + " value");
            //
            return result;
        }; // $[func]
    });

    ["current", "can", "is"].forEach(function(f) {
        var func = f + "SkillProgress";
        _GA[func] = $[func];
        _UT[func] = $[func] = function(skillId) { // v1.00a - v1.00a; Extended
            var result = _GA[func].apply(this, arguments);
            // Added to check whether the skillId argument is a valid skill id
            SPUT.checkFuncs.checkIdSkillArray(
                    [skillId], "_GA." + func + " skillId");
            //
            return result;
        }; // $[func]
    });

    _GA.setCurrentSkillProgress = $.setCurrentSkillProgress;
    _UT.setCurrentSkillProgress = $.setCurrentSkillProgress = function(skillId, value) {
     // v1.00a - v1.00a; Extended
        _GA.setCurrentSkillProgress.apply(this, arguments);
        // Added to check whether the skillId and value arguments are valid
        SPUT.checkFuncs.checkIdSkillArray(
                [skillId], "_GA.setCurrentSkillProgress skillId");
        SPUT.checkFuncs.checkNonnegativeNum(
                value, "_GA.setCurrentSkillProgress value");
        //
    }; // $.setCurrentSkillProgress
    //

    _GA._progressSkill = _SP._progressSkill;
    _SP._progressSkill = function(skillId) { // v1.00a - v1.00a; Extended
        _GA._progressSkill.apply(this, arguments);
        // Added to unit test class invariants involving this function
        _UT._checkProgressSkill.call(this, skillId);
        //
    }; // _SP._progressSkill

    /**
     * The this pointer is Game_Actor.prototype
     * No-op
     * @param {Id} skillId - The id of the skill involved
     * @since v1.00a @version v1.00a
     */
    _UT._checkProgressSkill = function(skillId) {
        // It's reasonable to assume that nextSkillProgress won't be random
        var next = this.nextSkillProgress(skillId).filter(function(id) {
            return !this.isLearnedSkill(id);
        }, this);
        //
        if (next.length > 0) SPUT.showFailMsg(JSON.stringify({
            skillId: skillId,
            nextSkillProgress: nextSkillProgress
        }), "_GA._progressSkill", "They should be learnt!");
        // It's reasonable to assume that isKeepSkillProgress won't be random
        var isKeep = this.isKeepSkillProgress(skillId);
        //
        if (isKeep !== this.isLearnedSkill(skillId)) {
            SPUT.showFailMsg(JSON.stringify({
                skillId: skillId,
                isKeepSkillProgress: isKeepSkillProgress
            }), "_GA._progressSkill",
                    isKeep ? "It should be kept" : "It should be forgotten!");
        }
        if (this._skillProgress.isEnded[skillId]) return;
        SPUT.showFailMsg("isEnded", "_GA._progressSkill", "It should be true!");
    }; // _UT._checkProgressSkill

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SkillProgressNotes
 *      - Unit tests the chained note results to ensure proper chainings
 *----------------------------------------------------------------------------*/

 (function(SP, SPUT) {

     "use strict";

     var GSPN = SP.Game_SkillProgressNotes.unitTest = { orig: {}, new: {} };
     var $ = Game_SkillProgressNotes.prototype;
     var _GSPN = GSPN.orig, _UT = GSPN.new;

    // Only interfaces will have their argument invariants checked
    _GSPN.result = $.result;
    _UT.result = $.result = function(note, skillId, target, value) {
    // v1.00a - v1.00a; Extended
        var result = _GSPN.result.apply(this, arguments);
        // Added to check whether the arguments except target are valid
        SPUT.checkFuncs.checkVal(
                note, "_GSPN.result note", SP.Game_SkillProgressCache._NOTES);
        SPUT.checkFuncs.checkIdSkillArray([skillId], "_GSPN.result skillId");
        if (value) SPUT.checkFuncs.checkNum(value, "_GSPN.result value");
        //
        return result;
    }; // $.result

    _GSPN.run = $.run;
    _UT.run = $.run = function(notes, skillId) {
    // v1.00a - v1.00a; Extended
        _GSPN.run.apply(this, arguments);
        // Added to check whether the notes and skillId arguments are valid
        SPUT.checkFuncs.checkArrayVals(
                notes, "_GSPN.run notes", SP.Game_SkillProgressCache._NOTES);
        SPUT.checkFuncs.checkIdSkillArray([skillId], "_GSPN.run skillId");
        //
    }; // $.run
    //

    _GSPN._uncachedResult = $._uncachedResult;
    _UT._uncachedResult = $._uncachedResult = function(note, skillId, target, value) {
    // v1.00a - v1.00a; Extended
        var result = _GSPN._uncachedResult.apply(this, arguments);
        // Added to unit test the chained result of this note type
        _UT._checkUncachedResult.call(
                this, note, skillId, target, value, result);
        //
        return result;
    }; // $._uncachedResult

    /**
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {*} result - The result from all effective notetags involved
     */
    _UT._checkUncachedResult = function(note, skillId, target, value, result) {
        var func = SPUT.checkFuncs[SPUT.unitTest.chainedNoteTypes[note]];
        if (func) func(result, JSON.stringify({
            note: note,
            skillId: skillId,
            target: target ? target.name() : "No target",
            hitDamage: value || "No hit"
        }));
    }; // _UT._checkUncachedResult

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_SkillProgressPairs
 *      - Unit tests all data notetags to pinpoint the data with faulty notes
 *----------------------------------------------------------------------------*/

 (function(SP, SPUT) {

     "use strict";

     var GSPP = SP.Game_SkillProgressPairs.unitTest = { orig: {}, new: {} };
     var $ = Game_SkillProgressPairs.prototype;
     var _GSPP = GSPP.orig, _UT = GSPP.new;

    _GSPP.run = $.run;
    _UT.run = $.run = function(skillId, note, datum, target, value) {
    // v1.00a - v1.00a; Extended
        var results = _GSPP.run.apply(this, arguments);
        // Added to unit test the notetag result of this datum
        _UT._checkRun.call(this, skillId, note, datum, target, value, results);
        //
        return results;
    }; // $.run

    /**
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its contents run
     * @param {{*}} datum - The datum having the note to have its contents run
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {[*]} results - The result of the notetag function involved
     */
    _UT._checkRun = function(skillId, note, datum, target, value, results) {
        var func = SPUT.checkFuncs[SPUT.unitTest.noteTypes[note]];
        if (func) func(results, JSON.stringify({
            skillId: skillId,
            note: note,
            dataId: datum ? datum.id : "No datum",
            dataName: datum ? datum.name : "No datum",
            target: target ? target.name() : "No target",
            hitDamage: value || "No hit"
        }));
    }; // _UT._checkRun

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillProgressStat/Cond/Next
 *      - Unit tests all the interface argument invariants
 *----------------------------------------------------------------------------*/

(function(SP, SPUT) {

    "use strict";

    var classes = {
        Window_SkillProgressStat: Window_SkillProgressStat.prototype,
        Window_SkillProgressCond: Window_SkillProgressCond.prototype,
        Window_SkillProgressNext: Window_SkillProgressNext.prototype
    };
    Object.keys(classes).forEach(function(klass) {

        SP[klass] = { unitTest: { orig: {}, new: {} } };
        var WSP = SP[klass].unitTest, $ = classes[klass];
        var _WSP = WSP.orig, _UT = WSP.new;

        _WSP.setup = $.setup;
        _UT.setup = $.setup = function(skillId) { // v1.00a - v1.00a; Extended
            _WSP.setup.apply(this, arguments);
            // Added to check whether the skillId argument is a valid skill id
            SPUT.checkFuncs.checkIdSkillArray([skillId], klass + ".setup");
            //
        }; // $.setup

    });

})(DoubleX_RMMV.Skill_Progress, DoubleX_RMMV.Skill_Progress_Unit_Test);

/*----------------------------------------------------------------------------*/

} else {
    alert("To use Skill Progress Unit Test, place it below Skill Progress.");
} // if (DoubleX_RMMV["Skill Progress"])

/*============================================================================*/
