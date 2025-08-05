/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Death Records
 *----------------------------------------------------------------------------
 *    # Terms Of Use
 *      1. Commercial use's always allowed and crediting me's always optional.
 *      2. You shall keep this plugin's Plugin Info part's contents intact.
 *      3. You shalln't claim that this plugin's written by anyone other than
 *         DoubleX or my aliases. I always reserve the right to deny you from
 *         using any of my plugins anymore if you've violated this.
 *      4. CC BY 4.0, except those conflicting with any of the above, applies
 *         to this plugin, unless you've my permissions to not to follow so.
 *      5. I always reserve the right to deny you from using this plugin
 *         anymore if you've violated any of the above.
 *----------------------------------------------------------------------------
 *    # Prerequisites
 *      Abilities:
 *      1. Little Javascript coding proficiency to fully utilize this plugin
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. http://pastebin.com/5Vb2Uh17
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00a(GMT 1400 19-2-2016):
 *      1. 1st version of this plugin finished
 *============================================================================*/
/*:
 * @plugindesc Lets users mark the actors/enemies' death times via their ids
 * @author DoubleX
 *
 * @help
 * Initializing a battler will raise its death record flag and set its death
 * record as 0
 *============================================================================
 *    ## Plugin Call Info
 *----------------------------------------------------------------------------
 *    # Party manipulations
 *      1. markActorDeathRecords[actorId] = boolean
 *         - Sets whether each death of actor with id actorId will be marked
 *      2. markEnemyDeathRecords[enemyId] = boolean
 *         - Sets whether each death of enemy with id actorId will be marked
 *      3. actorDeathRecords[actorId]
 *         - Returns the marked number of deaths of actor with id actorId
 *      4. enemyDeathRecords[enemyId]
 *         - Returns the marked number of deaths of enemy with id actorId
 *============================================================================
 */

"use strict";
var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Death Records"] = "v1.00a";

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Little Javascript coding proficiency to fully comprehend this
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

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *----------------------------------------------------------------------------*/

Game_Actor.prototype.initMembersDeathRecords = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    this.initMembersDeathRecords();
    this.initDeathRecords(); // Added
}; // Game_Actor.prototype.initMembers

Game_Actor.prototype.initDeathRecords = function() { // New
    $gameParty.markActorDeathRecords[this.actorId()] = true;
    $gameParty.actorDeathRecords[this.actorId()] = 0;
}; // Game_Actor.prototype.initDeathRecords

Game_Actor.prototype.die = function() { // New
    Game_BattlerBase.prototype.die.call(this);
    this.updateDeathRecords();
}; // Game_Actor.prototype.die

Game_Actor.prototype.updateDeathRecords = function() { // New
    var actorId = this.actorId();
    if (!$gameParty.markActorDeathRecords[actorId]) { return; }
    if (!$gameParty.actorDeathRecords[actorId]) { // It's just to play safe
        return $gameParty.actorDeathRecords[actorId] = 1;
    }
    $gameParty.actorDeathRecords[actorId] += 1;
}; // Game_Actor.prototype.updateDeathRecords

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Enemy
 *----------------------------------------------------------------------------*/

Game_Enemy.prototype.initMembersDeathRecords = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
    this.initMembersDeathRecords();
    this.initDeathRecords(); // Added
}; // Game_Enemy.prototype.initMembers

Game_Enemy.prototype.initDeathRecords = function() { // New
    $gameParty.markEnemyDeathRecords[this.enemyId()] = true;
    $gameParty.enemyDeathRecords[this.enemyId()] = 0;
}; // Game_Enemy.prototype.initDeathRecords

Game_Enemy.prototype.die = function() { // New
    Game_BattlerBase.prototype.die.call(this);
    this.updateDeathRecords();
}; // Game_Enemy.prototype.die

Game_Enemy.prototype.updateDeathRecords = function() { // New
    var enemyId = this.enemyId();
    if (!$gameParty.markEnemyDeathRecords[enemyId]) { return; }
    if (!$gameParty.enemyDeathRecords[enemyId]) { // It's just to play safe
        return $gameParty.enemyDeathRecords[enemyId] = 1;
    }
    $gameParty.enemyDeathRecords[enemyId] += 1;
}; // Game_Enemy.prototype.updateDeathRecords

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Party
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    New public instance variables
 *----------------------------------------------------------------------------*/
Object.defineProperties(Game_Party.prototype, {
    markActorDeathRecords: { // The actor death number recording flag
        get: function() { return this._markActorDeathRecords; },
        configurable: true
    },
    actorDeathRecords: { // The records of the number of deaths of actors
        get: function() { return this._actorDeathRecords; },
        configurable: true
    },
    markEnemyDeathRecords: { // The enemy death number recording flag
        get: function() { return this._markEnemyDeathRecords; },
        configurable: true
    },
    enemyDeathRecords: { // The records of the number of deaths of enemies
        get: function() { return this._enemyDeathRecords; },
        configurable: true
    }
});

Game_Party.prototype.initAllItemsDeathRecords =
Game_Party.prototype.initAllItems;
Game_Party.prototype.initAllItems = function() {
    this.initAllItemsDeathRecords();
    this.initDeathRecords(); // Added
}; // Game_Party.prototype.initAllItems

Game_Party.prototype.initDeathRecords = function() { // New
    this._markActorDeathRecords = {};
    this._actorDeathRecords = {};
    this._markEnemyDeathRecords = {};
    this._enemyDeathRecords = {};
}; // Game_Party.prototype.initDeathRecords

/*============================================================================*/
