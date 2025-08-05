/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Action Input Timer
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
 *      Abilities:
 *      1. Nothing special for most ordinary cases
 *         (No capability on Javascript ES5 experience but can still make
 *         reasonable guesses on readable novice codes up to 100 LoC scale)
 *      2. Little RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *         (Elementary Javascript ES5 exposures being able to write beginner
 *         codes up to 300LoC scale )
 *----------------------------------------------------------------------------
 *    # Links
 *      Video:
 *      1. https://www.youtube.com/watch?v=-dY6H1fbh8c
 *      This Plugin:
 *      1. https://pastebin.com/desAQfAP
 *      Posts:
 *      1. https://forums.rpgmakerweb.com/index.php?threads/doublex-rmmv-action-input-timer.126840/
 *      2. https://www.rpgmakercentral.com/topic/42579-doublex-rmmv-action-input-timer/
 *      3. https://rpgmaker.net/scripts/792/
 *      4. https://www.save-point.org/thread-8161-post-52646.html
 *      5. https://gdu.one/forums/topic/13632-doublex-rmmv-action-input-timer/
 *      6. http://www.hbgames.org/forums/viewtopic.php?f=332&t=80315
 *      8. https://forum.chaos-project.com/index.php/topic,16074.new.html
 *      9. https://www.patreon.com/posts/41296187
 *      10. https://www.makerdevs.com/plugin/doublex-rmmv-action-input-timer
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. The default plugin parameters file name is
 *         doublex rmmv action input timer v100a
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Action_Input_Timer_File, which must be done via
 *         opening this plugin js file directly
 *----------------------------------------------------------------------------
 *    # Contributors
 *      Authors:
 *      1. DoubleX
 *      Plugin Development Collaborators:
 *      - None So Far
 *      Bug Reporters:
 *      - None So Far
 *      Compatibility Issue Raisers:
 *      - None So Far
 *      Feature Requesters:
 *      - None So Far
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 0500 6-Sep-2020):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc (v1.00a)Lets you sets a timer that will cause all actors not
 * inputted actions yet to have their turns skipped in turn based battles
 * @author DoubleX
 *
 * @param timerLimit
 * @type number
 * @desc Sets the number of seconds the players are allowed to input
 * all actions of all inputable actors
 * @default 20
 *
 * @param timerWinX
 * @type number
 * @desc Sets the x position of the action input timer window
 * The smaller the number the more left the window is
 * @default 0
 *
 * @param timerWinY
 * @type number
 * @desc Sets the y position of the action input timer window
 * The smaller the number the more upper the window is
 * @default 0
 *
 * @param timerWinW
 * @type number
 * @desc Sets the width of the action input timer window
 * You've to test this yourselves to find a suitable value
 * @default 240
 *
 * @param timerWinDesc
 * @type string
 * @desc Sets the action input timer window description text
 * %1 is the number of seconds remaining of the input timer
 * @default %1s input time
 *
 * @help
 *============================================================================
 *    ## (Advanced)Script Call Info
 *----------------------------------------------------------------------------
 *    # Battle manipulations
 *      1. BattleManager.setActionInputTimer(timerLimit)
 *         - Sets the current action input timer in battle as timerLimit
 *           seconds
 *         - The script call has no meaning outside battles
 *         - The script call's supposed to be Idempotent
 *    # Parameter manipulations
 *      1. $gameSystem.actionInputTimerParam(param)
 *         - Returns the value of specified parameter stored in game save
 *           files
 *         - param can be either of the following:
 *           timerLimit
 *           timerWinX
 *           timerWinY
 *           timerWinW
 *           timerWinDesc
 *         - The script call's supposed to be Nullipotent
 *      2. $gameSystem.setActionInputTimerParam(param, val)
 *         - Sets the value of the specified parameter stored in game save
 *           files as val
 *         - param can be either of the following:
 *           timerLimit
 *           timerWinX
 *           timerWinY
 *           timerWinW
 *           timerWinDesc
 *         - For any parameter other than timerWinDesc, the script call will
 *           be ignored if val isn't a Number
 *         - The script call's supposed to be Idempotent
 *         - The new value of the specified parameter will be stored in game
 *           save files
 *----------------------------------------------------------------------------
 *    ## (Advanced)Plugin Command Info
 *----------------------------------------------------------------------------
 *      1. setActionInputTimer timerLimit
 *         - Applies the script call
 *           BattleManager.setActionInputTimer(timerLimit)
 *      2. setActionInputTimerParam param val
 *         - Applies the script call
 *           $gameSystem.setActionInputTimerParam(param, val)
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Action Input Timer"] = "v1.00a";

// The plugin file name must be the same as DoubleX_RMMV.Action_Input_Timer_File
DoubleX_RMMV.Action_Input_Timer_File = "doublex rmmv action input timer v100a";
//

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Some RMMV plugin development proficiency to fully comprehend this
 *           plugin
 *           (Basic knowledge on what RMMV plugin development does in general
 *           with several easy, simple and small plugins written without
 *           nontrivial bugs up to 1000 LoC scale but still being
 *           inexperienced)
 *      2. Parameter/Return value of type * means it might be of any type
 *      3. Function signature with (**) means it might take any number of
 *         parameters of any type
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Action_Input_Timer = {};

/*----------------------------------------------------------------------------
 *    # New class: Window_ActionInputTimer
 *      - Implements the action input timer window
 *----------------------------------------------------------------------------*/

function Window_ActionInputTimer() {
    "use strict";
    this.initialize.apply(this, arguments);
} // Window_ActionInputTimer

/*----------------------------------------------------------------------------
 *    # Edit class: BattleManager
 *      - Implements the timer that skips all actors not finished inputs
 *----------------------------------------------------------------------------*/

(function(AIT) {

    "use strict";

    AIT.BattleManager = { orig: {}, new: {} };
    var _BM = AIT.BattleManager.orig, _AIT = AIT.BattleManager.new;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _actionInputTimer: The container of all other new variables
    //       {Number} timerLimit: The action input timer limit in seconds

    _BM.initMembers = BattleManager.initMembers;
    _AIT.initMembers = BattleManager.initMembers = function() {
    // v1.00a - v1.00a; Extended
        _BM.initMembers.apply(this, arguments);
        // Added to initialize timer that skips all actors not finished inputs
        _AIT._endTimer.call(this);
        //
    }; // BattleManager.initMembers

    _BM.startInput = BattleManager.startInput;
    _AIT.startInput = BattleManager.startInput = function() {
    // v1.00a - v1.00a; Extended
        _BM.startInput.apply(this, arguments);
        // Added to start the timer that skips all actors not finished inputs
        _AIT._startTimer.call(this);
        //
    }; // BattleManager.startInput

    _BM.startTurn = BattleManager.startTurn;
    _AIT.startTurn = BattleManager.startTurn = function() {
    // v1.00a - v1.00a; Extended
        _BM.startTurn.apply(this, arguments);
        // Added to end the timer that skips all actors not finished inputs
        _AIT._endTimer.call(this);
        //
    }; // BattleManager.startTurn

    /**
     * Script Call/Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Number} timerLimit - The action input timer in seconds
     */
    BattleManager.setActionInputTimer = function(timerLimit) {
        var actionInputTimer = this._actionInputTimer;
        if (actionInputTimer) actionInputTimer.timerLimit = timerLimit;
    }; // BattleManager.setActionInputTimer

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    BattleManager.updateActionInputTimer = function() {
        var actionInputTimer = this._actionInputTimer;
        if (actionInputTimer.timerLimit <= 0) return;
        actionInputTimer.timerLimit -= SceneManager._deltaTime;
    }; // BattleManager.updateActionInputTimer

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The action input timer in seconds
     */
    BattleManager.actionInputTimer = function() {
        return this._actionInputTimer.timerLimit;
    }; // BattleManager.actionInputTimer

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._startTimer = function() {
        var timerLimit = $gameSystem.actionInputTimerParam("timerLimit");
        this._actionInputTimer.timerLimit = timerLimit;
    }; // _AIT._startTimer

    /**
     * The this pointer is BattleManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._endTimer = function() { this._actionInputTimer = { timerLimit: 0 }; };

})(DoubleX_RMMV.Action_Input_Timer); // BattleManager

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores all parameters of this plugin into save game files
 *----------------------------------------------------------------------------*/

(function(AIT) {

    "use strict";

    AIT.Game_System = { orig: {}, new: {} };
    var $ = Game_System.prototype;
    var _GS = AIT.Game_System.orig, _AIT = AIT.Game_System.new;

    _GS._NUM_PARAMS = ["timerLimit", "timerWinX", "timerWinY", "timerWinW"];

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _actionInputTimer: The container of all other new variables
    //       {Number} timerLimit: The stored real timerLimit parameter value

    _GS.initialize = $.initialize;
    _AIT.initialize = $.initialize = function() { // v1.00a - v1.00a; Extended
        _GS.initialize.apply(this, arguments);
        // Added to store all parameters of this plugin as well
        _AIT._init.call(this);
        //
    }; // $.initialize

    /**
     * Script Call/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @enum @param {String} param - The name of the parameter to have its value
     * @returns {*} The value of specified parameter stored in game save file
     */
    $.actionInputTimerParam = function(param) {
        return this._actionInputTimer[param];
    }; // $.actionInputTimerParam

    /**
     * Script Call/Idempotent
     * @interface @since v1.00a @version v1.00a
     * @enum @param {String} param - The name of the parameter to have its value
     * @param {*} val - Value of specified parameter stored in game save file
     */
    $.setActionInputTimerParam = function(param, val) {
        if (_GS._NUM_PARAMS.contains(param) && isNaN(val)) return;
        this._actionInputTimer[param] = val;
    }; // $.setActionInputTimerParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._init = function() {
        this._actionInputTimer = {};
        var pluginName = DoubleX_RMMV.Action_Input_Timer_File;
        var params = PluginManager.parameters(pluginName);
        this.setActionInputTimerParam("timerLimit", +params.timerLimit);
        this.setActionInputTimerParam("timerWinX", +params.timerWinX);
        this.setActionInputTimerParam("timerWinY", +params.timerWinY);
        this.setActionInputTimerParam("timerWinW", +params.timerWinW);
        this.setActionInputTimerParam("timerWinDesc", params.timerWinDesc);
    }; // _AIT._init

})(DoubleX_RMMV.Action_Input_Timer); // Game_System

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Implements all plugin commands of this plugin
 *----------------------------------------------------------------------------*/

(function(AIT) {

    "use strict";

    AIT.Game_Interpreter = { orig: {}, new: {} };
    var $ = Game_Interpreter.prototype;
    var _GI = AIT.Game_Interpreter.orig, _AIT = AIT.Game_Interpreter.new;

    _AIT._GAME_SYS_PLUGIN_CMDS = {
        timerLimit: function(args) {
            var secs = +args[0];
            if (isNaN(secs)) return;
            $gameSystem.setActionInputTimerParam("timerLimit", secs);
        }, // timerLimit
        timerWinX: function(args) {
            var x = +args[0];
            if (isNaN(x)) return;
            $gameSystem.setActionInputTimerParam("timerWinX", x);
        }, // timerWinX
        timerWinY: function(args) {
            var y = +args[0];
            if (isNaN(y)) return;
            $gameSystem.setActionInputTimerParam("timerWinY", y);
        }, // timerWinY
        timerWinW: function(args) {
            var w = +args[0];
            if (isNaN(w)) return;
            $gameSystem.setActionInputTimerParam("timerWinW", w);
        }, // timerWinW
        timerWinDesc: function(args) {
            $gameSystem.setActionInputTimerParam("timerWinDesc", args[0]);
        } // timerWinDesc
    }; // _AIT._GAME_SYS_PLUGIN_CMDS

    _AIT._RUN_GAME_SYS_PLUGIN_CMD = function(args) {
        var pluginCmdFunc = _AIT._GAME_SYS_PLUGIN_CMDS[args.shift()];
        if (pluginCmdFunc) pluginCmdFunc(args);
    }; // _AIT._RUN_PLUGIN_CMD

    _AIT._RUN_PLUGIN_CMD = function(cmd, args) {
        if (cmd === "setActionInputTimer") {
            return BattleManager.setActionInputTimer(+args[0]);
        } else if (cmd !== "setActionInputTimerParam") return;
        _AIT._RUN_GAME_SYS_PLUGIN_CMD(args);
    }; // _AIT._RUN_PLUGIN_CMD

    _GI.pluginCommand = $.pluginCommand;
    _AIT.pluginCommand = $.pluginCommand = function(command, args) {
    // v1.00a - v1.00a; Extended
        _GI.pluginCommand.apply(this, arguments);
        // Added to run all plugin commands of this plugin as well
        _AIT._RUN_PLUGIN_CMD(command, args);
        //
    }; // $.pluginCommand

})(DoubleX_RMMV.Action_Input_Timer); // Game_Interpreter

/*----------------------------------------------------------------------------
 *    # New class: Window_ActionInputTimer
 *      - Implements the action input timer window
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $$ = Window_Base.prototype;

    Window_ActionInputTimer.prototype = Object.create($$);

    var $ = Window_ActionInputTimer.prototype;

    $.constructor = Window_ActionInputTimer;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {Number} _timerLimit: The action input timer limit in seconds
    // {Integer} _shownTimerLimit: The shown action input timer limit in seconds

    /**
     * Idempotent
     * @constructor @since v1.00a @since v1.00a
     */
    $.initialize = function() {
        var x = $gameSystem.actionInputTimerParam("timerWinX");
        var y = $gameSystem.actionInputTimerParam("timerWinY");
        var w = $gameSystem.actionInputTimerParam("timerWinW");
        $$.initialize.call(this, x, y, w, this.fittingHeight(1));
        this._timerLimit = this._shownTimerLimit = 0;
    }; // $.initialize

    /**
     * Idempotent
     * @interface @override @since v1.00a @since v1.00a
     */
    $.update = function() {
        $$.update.call(this);
        this.visible = this._timerLimit > 0;
        if (this.visible) this._redrawTimerLimit();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Number} timerLimit - The action input timer in seconds
     */
    $.setTimerLimit = function(timerLimit) { this._timerLimit = timerLimit; };

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._redrawTimerLimit = function() {
        var shownTimerLimit = Math.ceil(this._timerLimit);
        if (shownTimerLimit === this._shownTimerLimit) return;
        this._shownTimerLimit = shownTimerLimit;
        this.contents.clear();
        var timerWinDesc = $gameSystem.actionInputTimerParam("timerWinDesc");
        var text = timerWinDesc.replace("%1", shownTimerLimit);
        this.drawText(text, 0, 0, this.textWidth(text), "center");
    }; // $._redrawTimerLimit

})(); // $.prototype

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Battle
 *      - Implements the timer that skips all actors not finished inputs
 *----------------------------------------------------------------------------*/

(function(AIT) {

    "use strict";

    AIT.Scene_Battle = { orig: {}, new: {} };
    var $ = Scene_Battle.prototype;
    var _SB = AIT.Scene_Battle.orig, _AIT = AIT.Scene_Battle.new;

    /*------------------------------------------------------------------------
     *    New private variables
     *------------------------------------------------------------------------*/
    // {{*}} _actionInputTimer: The container of all other new variables
    //       {Window_ActionInputTimer} timerWin: The action input timer window

    _SB.update = $.update;
    _AIT.update = $.update = function() { // v1.00a - v1.00a; Extended
        _SB.update.apply(this, arguments);
        // Added to update the timer that skips all actors not finished inputs
        _AIT._update.call(this);
        //
    }; // $.update

    _SB.createAllWindows = $.createAllWindows;
    _AIT.createAllWindows = $.createAllWindows = function() {
    // v1.00a - v1.00a; Extended
        _SB.createAllWindows.apply(this, arguments);
        // Added to store all parameters of this plugin as well
        _AIT._createTimerWin.call(this);
        //
    }; // $.createAllWindows

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._update = function() {
        BattleManager.updateActionInputTimer();
        var timerLimit = BattleManager.actionInputTimer();
        this._actionInputTimer.timerWin.setTimerLimit(timerLimit);
        if (timerLimit < 0) _AIT._startTurn.call(this);
    }; // _AIT._update

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._createTimerWin = function() {
        this._actionInputTimer = {
            timerWin: new Window_ActionInputTimer()
        };
        this.addWindow(this._actionInputTimer.timerWin);
    }; // _AIT._createTimerWin

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._startTurn = function() {
        _AIT._endInputs.call(this);
        BattleManager.startTurn();
    }; // _AIT._startTurn

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _AIT._endInputs = function() {
        [
            this._actorWindow,
            this._enemyWindow,
            this._skillWindow,
            this._itemWindow
        ].forEach(_AIT._endSelectWinInput, this);
        this.endCommandSelection();
        this._actorCommandWindow.deactivate();
        this._partyCommandWindow.deactivate();
    }; // _AIT._endInputs

    /**
     * The this pointer is Scene_Battle.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Window_Selectable} win - The skill/item/actor/enemy select window
     */
    _AIT._endSelectWinInput = function(win) {
        // Deactivate must be called before hide to void the current selection
        win.deactivate();
        win.hide();
        //
    }; // _AIT._endSelectWinInput

})(DoubleX_RMMV.Action_Input_Timer); // Scene_Battle
