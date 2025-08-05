/*============================================================================
 *    ## Plugin Info                                                          
 *----------------------------------------------------------------------------
 *    # Plugin Name                                                           
 *      DoubleX RMMV Skill Hotkeys Unit Test                                  
 *----------------------------------------------------------------------------
 *    # Introduction                                                          
 *    1. This plugin performs some rudimetary invariants checking for the     
 *       implementations of DoubleX RMMV Skill Hotkeys, and some elementary   
 *       value validity checking for the parameters/configurations/notetags of
 *       DoubleX RMMV Skill Hotkeys                                           
 *    2. When a unit test failed, its error messages along with the stack     
 *       trace leading to the failed test will be displayed as errors in the  
 *       console                                                              
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
 *      1. DoubleX RMMV Skill Hotkeys                                         
 *      Abilities:                                                            
 *      1. Nothing special for most ordinary cases                            
 *      2. Little RMMV plugin development proficiency to fully utilize this   
 *----------------------------------------------------------------------------
 *    # Author Notes                                                          
 *      1. Using this plugin might lead to noticeable performance penalties   
 *----------------------------------------------------------------------------
 *    # Links                                                                 
 *      DoubleX RMMV Skill Hotkeys:                                           
 *      1. https://pastebin.com/iEfRMhf3                                      
 *      This plugin:                                                          
 *      1. https://pastebin.com/iHh5frL3                                      
 *----------------------------------------------------------------------------
 *    # Instructions                                                          
 *      1. Place this plugin right below DoubleX RMMV Skill Hotkeys           
 *      2. The default plugin file name is                                    
 *         DoubleX RMMV Skill Hotkeys Unit Test v100a                         
 *         If you want to change that, you must edit the value of             
 *         DoubleX_RMMV.Skill_Hotkeys_Unit_Test_File, which must be done via  
 *         opening this plugin js file directly                               
 *----------------------------------------------------------------------------
 *    # Author                                                                
 *      DoubleX                                                               
 *----------------------------------------------------------------------------
 *    # Changelog                                                             
 *      v1.00a(GMT 1000 8-9-2017):                                            
 *      1. 1st version of this plugin finished                                
 *============================================================================*/
/*:
 * @plugindesc Lets you run some unit tests for DoubleX RMMV Skill Hotkeys
 * This plugin's entirely optional and is mainly for debuggers/developers     
 * @author DoubleX
 *
 * @param isAlert
 * @desc Sets whether the alert dialog will be shown when a unit test failed
 * @default false
 *
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Hotkeys Unit Test"] = "v1.00a";

// The plugin file name must be the same as
// DoubleX_RMMV.Skill_Hotkeys_Unit_Test_File
DoubleX_RMMV.Skill_Hotkeys_Unit_Test_File = 
        "DoubleX RMMV Skill Hotkeys Unit Test v100a";
//

/*============================================================================
 *    ## Plugin Implementations                                               
 *       You need not edit this part as it's about how this plugin works      
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:                                                  
 *      1. Prerequisites                                                      
 *         - Basic knowledge on what unit tests do                            
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *----------------------------------------------------------------------------*/

if (DoubleX_RMMV["Skill Hotkeys"]) {

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor                                                
 *      - Uses all parameters/configurations/notetags to run plugin functions 
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Skill_Hotkeys_Unit_Test = {

    // Stores all the original parameter/configuration/notetag functions
    orig: { params: {}, cfgs: {}, notes: {} },
    //

    // Stores all the parameter/configuration/notetag function unit tests
    unitTest: {

        // Stores all the parameter function unit tests
        params: {

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            isEnabled: function(result) {
                // There's no need to test this parameter as it returns Boolean
                //
            },

            /**
             * Potential Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            bindNotePriority: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkArrayString.call(this, result, "bindNotePriority");
            }, // bindNotePriority

            /**
             * Potential Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            useNotePriority: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkArrayString.call(this, result, "useNotePriority");
            }, // useNotePriority

            /**
             * Potential Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            bindNoteChainingRule: function(result) {
                // There's no need to test this parameter as it's always valid
                //
            }, // bindNoteChainingRule

            /**
             * Potential Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            useNoteChainingRule: function(result) {
                // There's no need to test this parameter as it's always valid
                //
            }, // useNoteChainingRule

            /**
             * No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            bindHotkeyText: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkString.call(this, result, "bindHotkeyText");
            }, // bindHotkeyText

            /**
             * No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            useSkillText: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkString.call(this, result, "useSkillText");
            }, // useSkillText

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            unusableSkillCoverIconPath: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkAtLeastString.call(
                        this, result, "unusableSkillCoverIconPath");
           }, // unusableSkillCoverIconPath

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            unusableSkillCoverIconName: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkAtLeastString.call(
                        this, result, "unusableSkillCoverIconName");
            }, // unusableSkillCoverIconName

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            unusableSkillCoverIconHue: function(result) {
                var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params.unusableSkillCoverIconHue\nresult: " + result;
                var isFailed = false;
                if (isNaN(result)) {
                    isFailed = true;
                    msg += "\nFailed! unusableSkillCoverIconHue should return a Number!";
                } else if (result < -360 || result > 360) {
                    isFailed = true;
                    msg += "\nFailed! unusableSkillCoverIconHue should return a Number ranging from -360 to 360!";
                }
                if (!isFailed) return;
                console.error(msg);
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.
                        call(this);
            }, // unusableSkillCoverIconName

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            unusableSkillCoverIconSmooth: function(result) {
                // There's no need to test this parameter as it's always valid
                //
            }, // unusableSkillCoverIconSmooth

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdWindowW: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(this, result, "hotkeyCmdWindowW");
            }, // hotkeyCmdWindowW

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdWindowH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(this, result, "hotkeyCmdWindowH");
            }, // hotkeyCmdWindowH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdWindowX: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdWindowX");
            }, // hotkeyCmdWindowX

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdWindowY: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdWindowY");
            }, // hotkeyCmdWindowY

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdLineH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(this, result, "hotkeyCmdLineH");
            }, // hotkeyCmdLineH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdFontSize: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyCmdFontSize");
            }, // hotkeyCmdFontSize

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdPadding");
            }, // hotkeyCmdPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdTextPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdTextPadding");
            }, // hotkeyCmdTextPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdBackOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyCmdBackOpacity");
            }, // hotkeyCmdBackOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdTranslucentOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyCmdTranslucentOpacity");
            }, // hotkeyCmdTranslucentOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdSpacing: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdSpacing");
            }, // hotkeyCmdSpacing

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListWindowW: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyListWindowW");
            }, // hotkeyListWindowW

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListWindowH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyListWindowH");
            }, // hotkeyListWindowH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListWindowX: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyListWindowX");
            }, // hotkeyListWindowX

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListWindowY: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyListWindowY");
            }, // hotkeyListWindowY

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListLineH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(this, result, "hotkeyListLineH");
            }, // hotkeyListLineH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListFontSize: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyListFontSize");
            }, // hotkeyListFontSize

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyListPadding");
            }, // hotkeyListPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListTextPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyListTextPadding");
            }, // hotkeyListTextPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListBackOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyListBackOpacity");
            }, // hotkeyListBackOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListTranslucentOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyListTranslucentOpacity");
            }, // hotkeyListTranslucentOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyListSpacing: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyListSpacing");
            }, // hotkeyListSpacing

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListWindowW: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyCmdListWindowW");
            }, // hotkeyCmdListWindowW

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListWindowH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyCmdListWindowH");
            }, // hotkeyCmdListWindowH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListWindowX: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdListWindowX");
            }, // hotkeyCmdListWindowX

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListWindowY: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdListWindowY");
            }, // hotkeyCmdListWindowY

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListLineH: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyCmdListLineH");
            }, // hotkeyCmdListLineH

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListFontSize: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkPositiveNum.call(
                        this, result, "hotkeyCmdListFontSize");
            }, // hotkeyCmdListFontSize

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdListPadding");
            }, // hotkeyCmdListPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListTextPadding: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdListTextPadding");
            }, // hotkeyCmdListTextPadding

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListBackOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyCmdListBackOpacity");
            }, // hotkeyCmdListBackOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListTranslucentOpacity: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkOpacityNum.call(
                        this, result, "hotkeyCmdListTranslucentOpacity");
            }, // hotkeyCmdListTranslucentOpacity

            /**
             * Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyCmdListSpacing: function(result) {
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.checkFuncs.
                        checkNonNegativeNum.call(
                        this, result, "hotkeyCmdListSpacing");
            } // hotkeyCmdListSpacing

        }, // params
        //

        // Stores all the configuration function unit tests
        cfgs: {

            /**
             * Potential Hotspot/No-op
             * @author DoubleX
             * @param {} result - The result returned by the original function
             * @since v1.00a
             * @version v1.00a
             */
            hotkeyNames: function(result) {
                var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params.hotkeyNames";
                msg += "\nresult: " + result;
                var isFailed = false;
                if (result !== Object(result)) {
                    isFailed = true;
                    msg += "\nFailed! hotkeyNames should return an Object!";
                } else {
                    var hotkeys = Object.keys(result), length = hotkeys.length;
                    for (var index = 0; index < length; index++) {
                        var val = result[hotkeys[index]];
                        if (typeof val === 'string' || val instanceof String) {
                            continue;
                        }
                        isFailed = true;
                        msg += "\nFailed! The name " + val + 
                                " whose key having index " + index + 
                                " should be a String!";
                    }
                }
                if (!isFailed) return;
                console.error(msg);
                DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.
                        call(this);
            } // hotkeyNames

        }, // cfgs
        //

        notes: {} // Stores all the notetag function unit tests

    }, // unitTest
    //

    checkFuncs: {

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkArrayString: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            var isFailed = false;
            if (!Array.isArray(result)) {
                isFailed = true;
                msg += "\nFailed! " + funcName + " should return an Array!";
            } else {
                var length = result.length;
                var validVals = [
                    "states",
                    "armors",
                    "weapons",
                    "classes",
                    "actors"
                ];
                msg += "\nvalidVals: " + validVals;
                for (var index = 0; index < length; index++) {
                    var val = result[index];
                    if (validVals.indexOf(val) >= 0) continue;
                    isFailed = true;
                    msg += "\nFailed! The element " + val + " having index " + 
                            index + " should be within validVals!";
                }
            }
            if (!isFailed) return;
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        }, // checkArrayString

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkString: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            if (typeof result === 'string' || result instanceof String) return;
            msg += "\nFailed! " + funcName + " should return a String!";
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        }, // checkString

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkAtLeastString: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            if (typeof result === 'string' || result instanceof String) return;
            msg += "\nFailed! " + funcName + 
                    " should at least return a String!";
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        }, // checkAtLeastString

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkPositiveNum: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            var isFailed = false;
            if (isNaN(result)) {
                isFailed = true;
                msg += "\nFailed! " + funcName + " should return a Number!";
            } else if (result <= 0) {
                isFailed = true;
                msg += "\nFailed! " + funcName + 
                        " should return a positive Number!";
            }
            if (!isFailed) return;
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        }, // checkPositiveNum

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkNonNegativeNum: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            var isFailed = false;
            if (isNaN(result)) {
                isFailed = true;
                msg += "\nFailed! " + funcName + " should return a Number!";
            } else if (result < 0) {
                isFailed = true;
                msg += "\nFailed! " + funcName + 
                        " should return a nonnegative Number!";
            }
            if (!isFailed) return;
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        }, // checkNonNegativeNum

        /**
         * Hotspot/No-op
         * @author DoubleX
         * @param {} result - The result returned by the original function
         * @param {String} funcName - The name of the original function
         * @since v1.00a
         * @version v1.00a
         */
        checkOpacityNum: function(result, funcName) {
            var msg = "DoubleX_RMMV.Skill_Hotkeys_Unit_Test.unitTest.params." + 
                    funcName + "\nresult: " + result;
            var isFailed = false;
            if (isNaN(result)) {
                isFailed = true;
                msg += "\nFailed! " + funcName + " should return a Number!";
            } else if (result < 0 || result > 255) {
                    isFailed = true;
                    msg += "\nFailed! " + funcName + 
                            " should return a Number ranging from 0 to 255!";
                }
            if (!isFailed) return;
            console.error(msg);
            DoubleX_RMMV.Skill_Hotkeys_Unit_Test.printFailedTestStackTrace.call(
                    this);
        } // checkOpacityNum

    }, // checkFuncs

    /**
     * Pure function
     * @author DoubleX
     * @param {String} type - The parameter/configuration/notetag indicator
     * @param {String} name - The parameter/configuration/notetag name
     * @returns {Function(Number/Nullable, Object/Nullable)} The function with
     *                                                      unit tests
     * @since v1.00a
     * @version v1.00a
     */
    unitTestFunc: function(type, name) {
        /**
         * Nullipotent
         * @author DoubleX
         * @returns {} The requested result
         * @since v1.00a
         * @version v1.00a
         */
        return function() { // v1.00a - v1.00a; Extended
            var SHUT = DoubleX_RMMV.Skill_Hotkeys_Unit_Test;
            var result = SHUT.orig[type][name].apply(this, arguments);
            // Added to test the parameter/configuration/notetag value validity
            SHUT.unitTest[type][name].call(this, result);
            return result;
            //
        };
    }, // unitTestFunc

    /**
     * No-op
     * @author DoubleX
     * @since v1.00a
     * @version v1.00a
     */
    printFailedTestStackTrace: function() {
        // Deliberately make an error that's catched to get the stack trace
        try {
            x;
        } catch (err) {
            console.error("The stacktrace leading to this failed test:");
            console.error(err);
            if (DoubleX_RMMV.Skill_Hotkeys_Unit_Test.isAlert.call(this)) {
                alert("A unit test in DoubleX RMMV Skill Hotkeys has failed. Please check the console for details.");
            }
        }
        //
    }, // printFailedTestStackTrace

    /**
     * Nullipotent
     * @author DoubleX
     * @returns {Boolean} The check result
     * @since v1.00a
     * @version v1.00a
     */
    isAlert: function() {
        return PluginManager.parameters(DoubleX_RMMV.Skill_Hotkeys_File).
                isAlert === "true";
    } // isAlert

}; // DoubleX_RMMV.Skill_Hotkeys_Unit_Test

(function(SH, SHUT) {

    "use strict";

    // There's no need to test this parameter as it's always valid
    var notes = SHUT.unitTest.notes, checkFunc = new Function("result", "");
    //
    Object.keys(SH.notes).forEach(function(note) { notes[note] = checkFunc; });

})(DoubleX_RMMV.Skill_Hotkeys, DoubleX_RMMV.Skill_Hotkeys_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager                                               
 *      - Extends all parameter/configuration/notetag functions upon load game
 *----------------------------------------------------------------------------*/

(function(SH, SHUT) {

    "use strict";

    SH.DataManager.unitTest = { orig: {}, new: {} };
    var _SH = SH.DataManager.new;
    var _DM = SH.DataManager.unitTest.orig, _UT = SH.DataManager.unitTest.new;

    /**
     * The this pointer is DataManager
     * Idempotent
     * @author DoubleX
     * @param {String} funcType - The parameter/configuration/notetag label
     * @param {String} content - The name of the stored function content
     * @since v1.00a
     * @version v1.00a
     */
    _DM._extractFuncContent = _SH._extractFuncContent;
    _SH._extractFuncContent = function(funcType, content) {
    // v1.00a - v1.00a; Extended
        _DM._extractFuncContent.apply(this, arguments);
        // Added to unit test the value validity of param/cfg/note functions
        _UT._extractFuncContent.call(this, funcType, content);
        //
    }; // _SH._extractFuncContent

    /**
     * The this pointer is DataManager
     * @author DoubleX
     * @param {String} funcType - The parameter/configuration/notetag label
     * @param {String} content - The name of the stored function content
     * @since v1.00a
     * @version v1.00a
     */
    _UT._extractFuncContent = function(funcType, content) {
        SHUT.orig[funcType][content] = SH[funcType][content];
        SH[funcType][content] = SHUT.unitTestFunc.call(this, funcType, content);
    }; // _UT._extractFuncContent

})(DoubleX_RMMV.Skill_Hotkeys, DoubleX_RMMV.Skill_Hotkeys_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System                                               
 *      - Extends all parameter/configuration/notetag functions upon load game
 *----------------------------------------------------------------------------*/

(function(SH, SHUT) {

    "use strict";

    SH.Game_System.unitTest = { orig: {}, new: {} };
    var _SH = SH.Game_System.new;
    var _GS = SH.Game_System.unitTest.orig, _UT = SH.Game_System.unitTest.new;

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @param {Object[String, String]} params - The params/cfgs name-value map
     * @param {String} param - The name of the parameter/configuration
     * @since v1.00a
     * @version v1.00a
     */
    _GS._storeParam = _SH._storeParam;
    _SH._storeParam = function(params, param) { // v1.00a - v1.00a; Extended
        // Added to prevent storing the extended parameter function contents
        if (SHUT.orig.params[param]) return;
        //
        _GS._storeParam.apply(this, arguments);
        // Added to unit test the value validity of all parameter functions
        _UT._storeParam.call(this, param);
        //
    }; // _SH._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @author DoubleX
     * @param {String} cfgType - The configuration type label
     * @param {String} cfg - The name of the configuration
     * @since v1.00a
     * @version v1.00a
     */
    _GS._storeCfg = _SH._storeCfg;
    _SH._storeCfg = function(cfgType, cfg) {
        // Edited to prevent storing the extended cfg/note function contents
        if (SHUT.orig[cfgType][cfg]) return;
        //
        _GS._storeCfg.apply(this, arguments);
        // Added to unit test the value validity of all cfg/note functions
        _UT._storeCfg.call(this, cfgType, cfg);
        //
    }; // _SH._storeCfg

    /**
     * The this pointer is Game_Actor.prototype
     * @author DoubleX
     * @param {String} param - The name of the parameter/configuration
     * @since v1.00a
     * @version v1.00a
     */
    _UT._storeParam = function(param) {
        _UT._storeCfg.call(this, "params", param);
    }; // _UT._storeParam

    /**
     * The this pointer is Game_Actor.prototype
     * @author DoubleX
     * @param {String} cfgType - The configuration type label
     * @param {String} cfg - The name of the configuration
     * @since v1.00a
     * @version v1.00a
     */
    _UT._storeCfg = function(cfgType, cfg) {
        SHUT.orig[cfgType][cfg] = SH[cfgType][cfg];
        SH[cfgType][cfg] = SHUT.unitTestFunc.call(this, cfgType, cfg);
    }; // _UT._storeCfg

})(DoubleX_RMMV.Skill_Hotkeys, DoubleX_RMMV.Skill_Hotkeys_Unit_Test);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor                                                
 *      - Unit tests all the nontrivial non-tautological class invariants     
 *----------------------------------------------------------------------------*/

(function(SH, SHUT) {

    "use strict";

    SH.Game_Actor.unitTest = { orig: {}, new: {} };
    var _SH = SH.Game_Actor.new;
    var _GA = SH.Game_Actor.unitTest.orig, _UT = SH.Game_Actor.unitTest.new;

    _GA.bindSkillHotkey = _SH._bind;
    _SH._bind = function(skillId, hotkey) { // v1.00a - v1.00a; Extended
        _GA.bindSkillHotkey.apply(this, arguments);
        // Added to unit test class invariants involving this function
        _UT._bind.call(this, skillId, hotkey);
        //
    }; // _SH._bind

    /**
     * The this pointer is Game_Actor.prototype
     * No-op
     * @author DoubleX
     * @param {Number} skillId - The id of the skill to have its hotkey bound
     * @param {String} hotkey - The symbol of the hotkey to be bound
     * @since v1.00a
     * @version v1.00a
     */
    _UT._bind = function(skillId, hotkey) {
        var isBound = this.isSkillHotkeysBound(skillId);
        if (isBound) return;
        var msg = "DoubleX_RMMV.Skill_Hotkeys.Game_Actor.unitTest.new._bind";
        msg += "\nskillId: " + skillId + "\nhotkey: " + hotkey;
        msg += "\nisBound: " + isBound + "\nFailed! isBound should be truthy!";
        console.error(msg);
        SHUT.printFailedTestStackTrace.call(this);
    }; // _UT._bind

})(DoubleX_RMMV.Skill_Hotkeys, DoubleX_RMMV.Skill_Hotkeys_Unit_Test);

/*----------------------------------------------------------------------------*/

} else {
    alert("To use Skill Hotkeys Unit Test, place it below Skill Hotkeys.");
} // if (DoubleX_RMMV["Skill Hotkeys"])

/*============================================================================*/