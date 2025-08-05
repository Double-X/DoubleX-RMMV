/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Reverse Input
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
 *      1. http://pastebin.com/FLyVjEcJ
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00c(GMT 1200 30-1-2016):
 *      1. Fixed reading meta from null equip bug
 *      2. Fixed only reading state notetags bug
 *      3. Changed from using klass to using prototypes
 *      v1.00b(GMT 1300 24-1-2016):
 *      1. Fixed undefined lines in DataManager.loadReverseInputNotes bug
 *      v1.00a(GMT 1300 30-12-2015):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users set some actors reversing the assigned window inputs
 * @author DoubleX
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Equip/State Notetags:
 *      State notetags take the highest priority, followed by weapon, armor,
 *      class and actor
 *      1. <reverse input: proto, downUp, rightLeft, pagedownPageup, okCancel>
 *         - This notetag only works for windows assigned to 1 actor at a time
 *           The below prototypes in default RMMV setting meet the condition:
 *           Window_SkillType.prototype
 *           Window_SkillList.prototype
 *           Window_EquipSlot.prototype
 *           Window_EquipItem.prototype
 *           Window_Status.prototype
 *           Window_ActorCommand.prototype
 *         - This notetag will work for windows belonging to proto or having
 *           proto in its prototype chain
 *           Both the Window_ and .prototype part doesn't need to be included
 *           in proto
 *           For example: Status stands for Window_Status.prototype
 *           proto only accepts prototypes starting with Window_
 *         - The inputs corresponding to down and up selection commands will
 *           be reversed if downUp is t
 *         - The inputs corresponding to right and left selection commands
 *           will be reversed if rightLeft is t
 *         - The inputs corresponding to pagedown and pageup selection
 *           commands will be reversed if pagedownPageup is t
 *         - The inputs corresponding to ok and cancel selection commands will
 *           be reversed if okCancel is t
 *         - Only the working notetag with the highest priority will be used
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Actor/Class/Equip/State manipulations
 *      1. meta.reverseInput
 *         - Returns the reverse input flags in the form of {
 * 	             proto: proto,
 *               downUp: b,
 *               rightLeft: b,
 *               pagedownPageup: b,
 *               okCancel: b
 *           } with proto and b being the window prototype and booleans
 *      2. meta.reverseInput = {
 * 	             proto: proto,
 *               downUp: b,
 *               rightLeft: b,
 *               pagedownPageup: b,
 *               okCancel: b
 *           }
 *         - Sets the reverse input flags in the form of {
 * 	             proto: proto,
 *               downUp: b,
 *               rightLeft: b,
 *               pagedownPageup: b,
 *               okCancel: b
 *           } with proto and b being the window prototype and booleans
 *         - All meta.reverseInput changes can be saved if
 *           DoubleX RMMV Dynamic Data is used
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Reverse Input"] = "v1.00c";

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
 * functionName = function(arguments) { // Version X+; New/Rewrite; Hotspot
 *     // Added/Removed/Rewritten to do something/How this function works
 *     functionContents
 *     //
 * } // functionName
 *----------------------------------------------------------------------------*/

DataManager.isDatabaseLoadedReverseInput = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    // Rewritten
    if (!this.isDatabaseLoadedReverseInput.apply(this, arguments)) {
        return false;
    }
    this.loadAllReverseInputNotes();
    return true;
    //
}; // DataManager.isDatabaseLoaded

DataManager.loadAllReverseInputNotes = function() { // New
    var ts = [$dataActors, $dataClasses, $dataWeapons, $dataArmors, $dataStates];
    ts.forEach(function(type) {
        type.forEach(function(data) {
            if (data) { this.loadReverseInputNotes(data); }
        }, this);
    }, this);
}; // DataManager.loadAllReverseInputNotes

// data: The data to have its notetags read
DataManager.loadReverseInputNotes = function(data) { // New
    data.meta.reverseInput = {};
    var rI = data.meta.reverseInput;
    var regex =
    /< *reverse +input *: *(\w+) *, *(\w+) *, *(\w+) *, *(\w+) *, *(\w+) *>/i;
    data.note.split(/[\r\n]+/).forEach(function(line) {
        if (!line.match(regex)) { return; }
        rI.proto = "Window_" + RegExp.$1 + ".prototype";
        rI.downUp = RegExp.$2 === "t";
        rI.rightLeft = RegExp.$3 === "t";
        rI.pagedownPageup = RegExp.$4 === "t";
        rI.okCancel = RegExp.$5 === "t";
    });
}; // DataManager.loadReverseInputNotes

/* window: The window used by the actor to check if the input's reversed
 * command: The command to check if the correseponding input's reversed
 */
Game_Actor.prototype.isReverseInput = function(window, command) {
// New; Potential Hotspot
    var equips = this.equips().filter(function(equip) { return equip; }), proto;
    var types = [this.states(), equips, [this.currentClass()], [this.actor()]];
    for (var index = 0, length = types.length; index < length; index++) {
        for (var data = types[index], i = 0, l = data.length; i < l; i++) {
            proto = eval(data[i].meta.reverseInput.proto);
            if (!proto || !proto.isPrototypeOf(window)) { continue; }
            return data[i].meta.reverseInput[command];
        }
    }
    return false;
}; // Game_Actor.prototype.isReverseInput

Window_Selectable.prototype.cursorDownReverseInput =
Window_Selectable.prototype.cursorDown;
Window_Selectable.prototype.cursorUpReverseInput =
Window_Selectable.prototype.cursorUp;
Window_Selectable.prototype.cursorRightReverseInput =
Window_Selectable.prototype.cursorRight;
Window_Selectable.prototype.cursorLeftReverseInput =
Window_Selectable.prototype.cursorLeft;
Window_Selectable.prototype.cursorPagedownReverseInput =
Window_Selectable.prototype.cursorPagedown;
Window_Selectable.prototype.cursorPageupReverseInput =
Window_Selectable.prototype.cursorPageup;
Window_Selectable.prototype.processPagedownReverseInput =
Window_Selectable.prototype.processPagedown;
Window_Selectable.prototype.processPageupReverseInput =
Window_Selectable.prototype.processPageup;
Window_Selectable.prototype.processOkReverseInput =
Window_Selectable.prototype.processOk;
Window_Selectable.prototype.processCancelReverseInput =
Window_Selectable.prototype.processCancel;

Window_Selectable.prototype.cursorDown = function(wrap) { // Potential Hotspot
    // Added
    if (this._actor && this._actor.isReverseInput(this, "downUp")) {
        return this.cursorUpReverseInput(wrap);
    }
    //
    return this.cursorDownReverseInput(wrap);
}; // Window_Selectable.prototype.cursorDown

Window_Selectable.prototype.cursorUp = function(wrap) { // Potential Hotspot
    // Added
    if (this._actor && this._actor.isReverseInput(this, "downUp")) {
        return this.cursorDownReverseInput(wrap);
    }
    //
    return this.cursorUpReverseInput(wrap);
}; // Window_Selectable.prototype.cursorUp

Window_Selectable.prototype.cursorRight = function(wrap) { // Potential Hotspot
    // Added
    if (this._actor && this._actor.isReverseInput(this, "rightLeft")) {
        return this.cursorLeftReverseInput(wrap);
    }
    //
    return this.cursorRightReverseInput(wrap);
}; // Window_Selectable.prototype.cursorRight

Window_Selectable.prototype.cursorLeft = function(wrap) { // Potential Hotspot
    // Added
    if (this._actor && this._actor.isReverseInput(this, "rightLeft")) {
        return this.cursorRightReverseInput(wrap);
    }
    //
    return this.cursorLeftReverseInput(wrap);
}; // Window_Selectable.prototype.cursorLeft

Window_Selectable.prototype.cursorPagedown = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "pagedownPageup")) {
        return this.cursorPageupReverseInput();
    }
    //
    return this.cursorPagedownReverseInput();
}; // Window_Selectable.prototype.cursorPagedown

Window_Selectable.prototype.cursorPageup = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "pagedownPageup")) {
        return this.cursorPagedownReverseInput();
    }
    //
    return this.cursorPageupReverseInput();
}; // Window_Selectable.prototype.cursorPageup

Window_Selectable.prototype.processPageup = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "pagedownPageup")) {
        return this.processPagedownReverseInput();
    }
    //
    return this.processPageupReverseInput();
}; // Window_Selectable.prototype.processPageup

Window_Selectable.prototype.processPagedown = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "pagedownPageup")) {
        return this.processPageupReverseInput();
    }
    //
    return this.processPagedownReverseInput();
}; // Window_Selectable.prototype.processPagedown

Window_Selectable.prototype.processOk = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "okCancel")) {
        return this.processCancelReverseInput();
    }
    //
    return this.processOkReverseInput();
}; // Window_Selectable.prototype.processOk

Window_Selectable.prototype.processCancel = function() {
    // Added
    if (this._actor && this._actor.isReverseInput(this, "okCancel")) {
        return this.processOkReverseInput();
    }
    //
    return this.processCancelReverseInput();
}; // Window_Selectable.prototype.processCancel

/*============================================================================*/
