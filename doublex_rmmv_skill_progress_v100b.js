/*============================================================================
 *    ## Plugin Info
 *----------------------------------------------------------------------------
 *    # Plugin Name
 *      DoubleX RMMV Skill Progress
 *----------------------------------------------------------------------------
 *    # Introduction
 *    1. This plugin lets users to set some skills to progress to some other
 *       skills after gaining enough skill experience and meeting some
 *       prerequisites, like progressing from Fire I to Fire II when the
 *       actor's at least level 9 and gained 100 skill experience for Fire I
 *    2. Skill experience's gained from using that skill as well as hitting
 *       targets with that skill
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
 *      2. Little RMMV plugin development proficiency for more advanced uses
 *      3. Some RMMV plugin development proficiency to fully utilize this
 *         plugin in intended ways
 *      4. Decent RMMV plugin development proficiency to fully utilize this
 *         plugin with creative and unintended uses
 *----------------------------------------------------------------------------
 *    # Author Notes
 *      1. DoubleX RMMV Skill Progress aims to give extreme control and
 *         freedom to users by making it as flexible as I can with as little
 *         damage to user-friendliness as I can
 *      2. The configuration region is generally for more advanced uses, as
 *         most ordinary cases should be covered by parameters and notetags
 *      3. (Advanced)You might have to have a basic knowledge on what this
 *         Plugin Implementation does to fully utilize this plugin in intended
 *         ways and solid understanding on how this Plugin Implementation
 *         works to fully utilize this plugin with creative and unintended
 *         uses
 *----------------------------------------------------------------------------
 *    # Links
 *      This plugin:
 *      1. https://pastebin.com/6XdtFJYD
 *      Video:
 *      1. https://www.youtube.com/watch?v=ly6LlNpo8jc
 *      DoubleX RMMV Skill Progress Unit Test:
 *      1. https://pastebin.com/NzQVER8u
 *      DoubleX RMMV Skill Progress Compatibility:
 *      1. https://pastebin.com/PhPhgJry
 *      Mentioned Patreon Supporters:
 *      https://www.patreon.com/posts/71738797
 *----------------------------------------------------------------------------
 *    # Instructions
 *      1. If you want to edit configurations instead of parameters, you must
 *         open this js file to access its configuration region
 *      2. The default plugin file name is doublex_rmmv_skill_progress_v100b
 *         If you want to change that, you must edit the value of
 *         DoubleX_RMMV.Skill_Progress_File, which must be done via opening
 *         this plugin js file directly
 *      3. If you wish to use DoubleX RMMV Skill Progress Unit Test, place it
 *         right below this plugin
 *----------------------------------------------------------------------------
 *    # Author
 *      DoubleX
 *----------------------------------------------------------------------------
 *    # Changelog
 *      v1.00b(GMT 0700 13-May-2020):
 *      1. Improved the parameter organization and extraction performance
 *      v1.00a(GMT 0400 13-Nov-2019):
 *      1. 1st version of this plugin finished
 *----------------------------------------------------------------------------
 *    # Todo
 *      1. Add <skill progress instant suffix1: entry1>, where a falsy result
 *         from entry1 will let players to end progressing the skill at
 *         anytime they choose instead of always immediately
 *============================================================================*/
/*:
 * @plugindesc Lets you to set some skills to progress to some other skills
 * after gaining enough skill experience and meeting some prerequisites
 * @author DoubleX
 *
 * @param isEnabled
 * @type note
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default return true;
 *
 * @param Notetag
 * @text Notetag Settings
 *
 * @param condNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of cond notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param condNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple cond notetags
 * It'll be the contents of a function returning a String
 * @default return "every";
 *
 * @param defaultMax
 * @parent Notetag
 * @type note
 * @desc Sets the default max experience before chaining max notetags
 * It'll be the contents of a function returning a positive Number
 * @default return 10;
 *
 * @param maxNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of max notetags
 * It'll be the contents of a function returning a String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param maxNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple max notetags
 * It'll be the contents of a function returning a String
 * @default return "/";
 *
 * @param defaultUseGain
 * @parent Notetag
 * @type note
 * @desc Sets the default useGain before chaining useGain notetags
 * It'll be the contents of a function returning a Number
 * @default return 2;
 *
 * @param useGainNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of useGain notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param useGainNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple useGain notetags
 * It'll be the contents of a function returning a String
 * @default return "*";
 *
 * @param defaultHitGain
 * @parent Notetag
 * @type note
 * @desc Sets the default hitGain before chaining hitGain notetags
 * It'll be the contents of a function returning a Number
 * @default return 1;
 *
 * @param hitGainNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of hitGain notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param hitGainNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple hitGain notetags
 * It'll be the contents of a function returning a String
 * @default return "*";
 *
 * @param nextNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of next notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["actor", "currentClass"];
 *
 * @param nextNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple next notetags
 * It'll be the contents of a function returning a String
 * @default return "every";
 *
 * @param defaultKeepCurrent
 * @parent Notetag
 * @type note
 * @desc Set default keepCurrent before chaining keepCurrent notetags
 * It'll be the contents of a function returning a Boolean
 * @default return true;
 *
 * @param keepCurrentNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of keepCurrent notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["actor", "currentClass"];
 *
 * @param keepCurrentNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple keepCurrent notetags
 * It'll be the contents of a function returning a String
 * @default return "first";
 *
 * @param willEnd
 * @parent Notetag
 * @type note
 * @desc Sets what will happen right before progressing a skill
 * It'll be the contents of a function with its return value unused
 * @default
 *
 * @param willEndNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of willEnd notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param willEndNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple willEnd notetags
 * It'll be the contents of a function returning a String
 * @default return "every";
 *
 * @param didEnd
 * @parent Notetag
 * @type note
 * @desc Sets what will happen right after progressing a skill
 * It'll be the contents of a function with its return value unused
 * @default $gameTemp.reserveCommonEvent(1);
 *
 * @param didEndNotePriority
 * @parent Notetag
 * @type note
 * @desc Sets the data type priority of didEnd notetags
 * It'll be the contents of a function returning an String Array
 * @default return ["states", "armors", "weapons", "currentClass", "actor"];
 *
 * @param didEndNoteChainingRule
 * @parent Notetag
 * @type note
 * @desc Sets how to use multiple didEnd notetags
 * It'll be the contents of a function returning a String
 * @default return "every";
 *
 * @param CommandWindow
 * @text Command Window Settings
 *
 * @param cmdLineH
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window line height
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.lineHeight.call(this);
 *
 * @param cmdFontSize
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window standard font size
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.standardFontSize.call(this);
 *
 * @param cmdPadding
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window standard padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.standardPadding.call(this);
 *
 * @param cmdTextPadding
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window text padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.textPadding.call(this);
 *
 * @param cmdBackOpacity
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window standard back opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.standardBackOpacity.call(this);
 *
 * @param cmdTranslucentOpacity
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window translucent opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.translucentOpacity.call(this);
 *
 * @param cmdSpacing
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window spacing
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.spacing.call(this);
 *
 * @param cmdWinW
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window width
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.windowWidth.call(this);
 *
 * @param cmdWinH
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window height
 * It'll be the contents of a function returning a Number
 * @default return Window_Command.prototype.windowHeight.call(this);
 *
 * @param cmdWinX
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window x position
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param cmdWinY
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window y position
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param cmdView
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window view progress command text
 * It'll be the contents of a function returning a String
 * @default return "View Progress";
 *
 * @param cmdUse
 * @parent CommandWindow
 * @type note
 * @desc Sets the skill progress command window use skill command text
 * It'll be the contents of a function returning a String
 * @default return "Use";
 *
 * @param StatusWindow
 * @text Status Window Settings
 *
 * @param statLineH
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window line height
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.lineHeight.call(this);
 *
 * @param statFontSize
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window standard font size
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardFontSize.call(this);
 *
 * @param statPadding
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window standard padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardPadding.call(this);
 *
 * @param statTextPadding
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window text padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.textPadding.call(this);
 *
 * @param statBackOpacity
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window standard back opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardBackOpacity.call(this);
 *
 * @param statTranslucentOpacity
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window translucent opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.translucentOpacity.call(this);
 *
 * @param statSpacing
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window spacing
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.spacing.call(this);
 *
 * @param statWinW
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window width
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth;
 *
 * @param statWinH
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window height
 * It'll be the contents of a function returning a Number
 * @default return this.fittingHeight(2);
 *
 * @param statWinX
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window x position
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param statWinY
 * @parent StatusWindow
 * @type note
 * @desc Sets the skill progress stat window y position
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param ConditionWindow
 * @text Condition Window Settings
 *
 * @param condLineH
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window line height
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.lineHeight.call(this);
 *
 * @param condFontSize
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window standard font size
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardFontSize.call(this);
 *
 * @param condPadding
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window standard padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardPadding.call(this);
 *
 * @param condTextPadding
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window text padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.textPadding.call(this);
 *
 * @param condBackOpacity
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window standard back opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardBackOpacity.call(this);
 *
 * @param condTranslucentOpacity
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window translucent opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.translucentOpacity.call(this);
 *
 * @param condSpacing
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window spacing
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.spacing.call(this);
 *
 * @param condWinW
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window width
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth / 2;
 *
 * @param condWinH
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window height
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxHeight - this.fittingHeight(2);
 *
 * @param condWinX
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window x position
 * It'll be the contents of a function returning a Number
 * @default return 0;
 *
 * @param condWinY
 * @parent ConditionWindow
 * @type note
 * @desc Sets the skill progress condition window y position
 * It'll be the contents of a function returning a Number
 * @default return this.fittingHeight(2);
 *
 * @param NextSkillWindow
 * @text Next Skill Window Settings
 *
 * @param nextLineH
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window line height
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.lineHeight.call(this);
 *
 * @param nextFontSize
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window standard font size
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardFontSize.call(this);
 *
 * @param nextPadding
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window standard padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardPadding.call(this);
 *
 * @param nextTextPadding
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window text padding
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.textPadding.call(this);
 *
 * @param nextBackOpacity
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window standard back opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.standardBackOpacity.call(this);
 *
 * @param nextTranslucentOpacity
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window translucent opacity
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.translucentOpacity.call(this);
 *
 * @param nextSpacing
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window spacing
 * It'll be the contents of a function returning a Number
 * @default return Window_Selectable.prototype.spacing.call(this);
 *
 * @param nextWinW
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window width
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth / 2;
 *
 * @param nextWinH
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window height
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxHeight - this.fittingHeight(2);
 *
 * @param nextWinX
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window x position
 * It'll be the contents of a function returning a Number
 * @default return Graphics.boxWidth / 2;
 *
 * @param nextWinY
 * @parent NextSkillWindow
 * @type note
 * @desc Sets the skill progress next skill window y position
 * It'll be the contents of a function returning a Number
 * @default return this.fittingHeight(2);
 *
 * @param varIds
 * @type note
 * @desc Sets the list of ids of game variables used by this plugin
 * It'll be the contents of a function returning a Number Array
 * @default return [];
 *
 * @param switchIds
 * @type note
 * @desc Sets the list of ids of game switches used by this plugin
 * It'll be the contents of a function returning a Number Array
 * @default return [];
 *
 * @help
 *============================================================================
 *    ## Parameter/Configurations Info
 *----------------------------------------------------------------------------
 *    # General
 *      The below points apply to all parameters/configurations unless stated
 *      otherwise:
 *      1. If the value of a parameter's empty, its configuration counterpart
 *         will be used instead(Reference tag: PARAMETERS_CONFIGURATIONS)
 *         - E.g.: Setting the parameter isEnabled as empty means that the
 *                 configuration isEnabled will be used instead
 *      2. (Advanced)The this pointer referring to the actor involved as the
 *         function contexts are Game_Actor.prototype
 *         (Reference tag: THIS_GAME_ACTOR)
 *      3. (Advanced)Don't change the name nor the ordering of any function
 *         arguments unless you really know what you're truly doing
 *      4. (Advanced)The functions supposedly to return a value should be
 *         Nullipotent
 *      5. (Advanced)Returning highly nondeterministic values like random ones
 *         will have to manually invalidate the corresponding cache first or
 *         those values might be ignored due to the cached ones being used
 *    # Function arguments
 *      1. isEnabled
 *         None
 *      2. willEnd
 *      3. didEnd
 *      4. condNotePriority
 *      5. condNoteChainingRule
 *      6. defaultMax
 *      7. maxNotePriority
 *      8. maxNoteChainingRule
 *      9. defaultUseGain
 *      10. useGainNotePriority
 *      11. useGainNoteChainingRule
 *          skillId - The id of the skill involved
 *      12. defaultHitGain
 *          skillId - The id of the skill involved
 *          target - The target hit by the skill involved
 *          value - The damage of the hit involved
 *      13. hitGainNotePriority
 *      14. hitGainNoteChainingRule
 *      15. nextNotePriority
 *      16. nextNoteChainingRule
 *      17. defaultKeepCurrent
 *      18. keepCurrentNotePriority
 *      19. kepCurrentNoteChainingRule
 *      20. willEndNotePriority
 *      21. willEndNoteChainingRule
 *      22. didEndNotePriority
 *      23. didEndNoteChainingRule
 *          skillId - The id of the skill involved
 *      24. cmdLineH
 *      25. cmdFontSize
 *      26. cmdPadding
 *      27. cmdTextPadding
 *      28. cmdBackOpacity
 *      29. cmdTranslucentOpacity
 *      30. cmdSpacing
 *      31. cmdWinW
 *      32. cmdWinH
 *      33. cmdWinX
 *      34. cmdWinY
 *      35. cmdView
 *      36. cmdUse
 *      37. statLineH
 *      38. statFontSize
 *      39. statPadding
 *      40. statTextPadding
 *      41. statBackOpacity
 *      42. statTranslucentOpacity
 *      43. statSpacing
 *      44. statWinW
 *      45. statWinH
 *      46. statWinX
 *      47. statWinY
 *      48. condLineH
 *      49. condFontSize
 *      50. condPadding
 *      51. condTextPadding
 *      52. condBackOpacity
 *      53. condTranslucentOpacity
 *      54. condSpacing
 *      55. condWinW
 *      56. condWinH
 *      57. condWinX
 *      58. condWinY
 *      59. nextLineH
 *      60. nextFontSize
 *      61. nextPadding
 *      62. nextTextPadding
 *      63. nextBackOpacity
 *      64. nextTranslucentOpacity
 *      65. nextSpacing
 *      66. nextWinW
 *      67. nextWinH
 *      68. nextWinX
 *      69. nextWinY
 *      70. varIds
 *      71. switchIds
 *          None
 *    # Valid values
 *      1. isEnabled
 *         Any valid Javascript(It'll always be regarded as truthy/falsy)
 *         It'll only be used as a prerequisite when checking whether the
 *         skill involved can progress
 *      2. willEnd
 *      3. didEnd
 *         Any valid Javascript
 *      4. condNotePriority
 *         Note that skills always have the highest priority
 *         Any valid Javascript returning an Array having the below String:
 *         - "states" States in the States category
 *         - "armors" Armors in the Armors category
 *         - "weapons" Weapons in the Weapons category
 *         - "currentClass" Classes in the Classes category
 *         - "actor" Actors in the Actors category
 *         (Reference tag: NOTE_DATA_TYPES)
 *         The effective notetag priority among data types are sorted
 *         ascendingly in the array
 *         The effective notetag priority among the same data type are the
 *         same as the other priorities among there
 *         Notetags of data belonging types not included in the array won't be
 *         effective
 *      5. condNoteChainingRule
 *         Any valid Javascript returning any of the below String:
 *         - "first"(Only the 1st notetag of the involved skill will be used)
 *         - "every"(All effective notetags must return truthy to be regarded
 *                   as truthy)
 *         - "last"(Only the last effective notetag will be used)
 *         - "some"(All effective notetags must return falsy to be regarded as
 *                 falsy)
 *         All invalid values will be regarded as "first"
 *         (Reference tag: DEFAULT_CHAINING_RULE_FIRST)
 *      6. defaultMax
 *         Any valid Javascript returning a positive Number
 *      7. maxNotePriority
 *         Same as those mentioned in condNotePriority
 *      8. maxNoteChainingRule
 *         Any valid Javascript returning any of the below String:
 *         - "first"(Only the 1st notetag of the involved skill will be used)
 *         - "+"(The results of all effective notetags will be added)
 *         - "-"(The results of all effective notetags will be subtracted)
 *         - "*"(The results of all effective notetags will be multiplied)
 *         - "/"(The results of all effective notetags will be divided)
 *         - "%"(The results of all effective notetags will be remainders)
 *         - (Advanced)"="(The results of effective notetags with higher
 *                         priorities will be replaced by those with lower
 *                         priorities, leading to maximum flexibilities)
 *         - "last"(Only the last effective notetag will be used)
 *         ("=" and "last" are different only for more advanced/creative uses)
 *         (Reference tag: NOTE_OPERATORS)
 *         All invalid values will be regarded as "first"
 *         (Reference tag: DEFAULT_CHAINING_RULE_FIRST)
 *      9. defaultUseGain
 *         Any valid Javascript returning a Number
 *      10. useGainNotePriority
 *          Same as those mentioned in condNotePriority
 *      11. useGainNoteChainingRule
 *          Same as those mentioned in maxNoteChainingRule
 *      12. defaultHitGain
 *          Same as those mentioned in defaultUseGain
 *      13. hitGainNotePriority
 *          Same as those mentioned in condNotePriority
 *      14. hitGainNoteChainingRule
 *          Same as those mentioned in maxNoteChainingRule
 *      15. nextNotePriority
 *          Same as those mentioned in condNotePriority
 *      16. nextNoteChainingRule
 *          Any valid Javascript returning any of the below String:
 *          - "first"(Only the 1st value of the 1st notetag of the involved
 *                    skill will be used)
 *          - "every"(All values of all effective notetags will be used)
 *          - "last"(Only the last value of the last effective notetag will be
 *                   used)
 *          All invalid values will be regarded as "first"
 *          (Reference tag: DEFAULT_CHAINING_RULE_FIRST)
 *      17. defaultKeepCurrent
 *          Any valid Javascript
 *      18. keepCurrentNotePriority
 *          Same as those mentioned in condNotePriority
 *      19. keepCurrentNoteChainingRule
 *          Same as those mentioned in condNoteChainingRule
 *      20. willEndNotePriority
 *          Same as those mentioned in condNotePriority
 *      21. willEndNoteChainingRule
 *          Same as those mentioned in nextNoteChainingRule
 *      22. didEndNotePriority
 *          Same as those mentioned in condNotePriority
 *      23. didEndNoteChainingRule
 *          Same as those mentioned in nextNoteChainingRule
 *      24. cmdLineH
 *      25. cmdFontSize
 *          Any valid Javascript returning a positive Number
 *      26. cmdPadding
 *      27. cmdTextPadding
 *          Any valid Javascript returning a nonnegative Number
 *      28. cmdBackOpacity
 *      29. cmdTranslucentOpacity
 *          Any valid Javascript returning a Number ranging from 0 to 255
 *      30. cmdSpacing
 *          Any valid Javascript returning a nonnegative Number
 *      31. cmdWinW
 *      32. cmdWinH
 *          Any valid Javascript returning a positive Number
 *      33. cmdWinX
 *      34. cmdWinY
 *          Any valid Javascript returning a Number
 *      35. cmdView
 *      36. cmdUse
 *          Any valid Javascript returning a String
 *      37. statLineH
 *      38. statFontSize
 *          Any valid Javascript returning a positive Number
 *      39. statPadding
 *      40. statTextPadding
 *          Any valid Javascript returning a nonnegative Number
 *      41. statBackOpacity
 *      42. statTranslucentOpacity
 *          Any valid Javascript returning a Number ranging from 0 to 255
 *      43. statSpacing
 *          Any valid Javascript returning a nonnegative Number
 *      44. statWinW
 *      45. statWinH
 *          Any valid Javascript returning a positive Number
 *      46. statWinX
 *      47. statWinY
 *          Any valid Javascript returning a Number
 *      48. condLineH
 *      49. condFontSize
 *          Any valid Javascript returning a positive Number
 *      50. condPadding
 *      51. condTextPadding
 *          Any valid Javascript returning a nonnegative Number
 *      52. condBackOpacity
 *      53. condTranslucentOpacity
 *          Any valid Javascript returning a Number ranging from 0 to 255
 *      54. condSpacing
 *          Any valid Javascript returning a nonnegative Number
 *      55. condWinW
 *      56. condWinH
 *          Any valid Javascript returning a positive Number
 *      57. condWinX
 *      58. condWinY
 *          Any valid Javascript returning a Number
 *      59. nextLineH
 *      60. nextFontSize
 *          Any valid Javascript returning a positive Number
 *      61. nextPadding
 *      62. nextTextPadding
 *          Any valid Javascript returning a nonnegative Number
 *      63. nextBackOpacity
 *      64. nextTranslucentOpacity
 *          Any valid Javascript returning a Number ranging from 0 to 255
 *      65. nextSpacing
 *          Any valid Javascript returning a nonnegative Number
 *      66. nextWinW
 *      67. nextWinH
 *          Any valid Javascript returning a positive Number
 *      68. nextWinX
 *      69. nextWinY
 *          Any valid Javascript returning a Number
 *      70. varIds
 *          Any valid Javascript returning an Array of valid game variable ids
 *          Refer to the configuration counterpart for the Object form
 *      71. switchIds
 *          Any valid Javascript returning an Array of valid game switch ids
 *          Refer to the configuration counterpart for the Object form
 *    # Examples
 *      1. isEnabled
 *         Setting isEnabled as return false; will disable this plugin
 *      2. willEnd
 *         Setting willEnd as an empty String will cause nothing extra to be
 *         done right before ending a skill progression
 *      3. didEnd
 *         Setting didEnd as $gameTemp.reserveCommonEvent(1); will reserve the
 *         common event with id 1 right after ending a skill progression(note
 *         that reserving a common event doesn't always cause it to be run
 *         immediately)
 *      4. condNotePriority
 *         Aside from the skills, which always have the highest priority,
 *         setting condNotePriority as
 *         return ["states", "armors", "weapons", "currentClass"];
 *         will cause the cond notetags in the States category to have the
 *         highest priorities, followed by the Armors, Weapons and Classes
 *         categories, whereas no notetags in the Actors categories will be
 *         effective
 *      5. condNoteChainingRule
 *         Setting condNoteChainingRule as return "every"; will cause the
 *         result to be truthy if and only if all effective cond notetags
 *         return truthy
 *      6. defaultMax
 *         Setting defaultMax as return 100; will cause the maximum experience
 *         of skills before chaining any max notetags to be 100
 *      7. maxNotePriority
 *         Same as that of condNotePriority except that the example would be
 *         applied to max notetags/maxNotePriority instead
 *      8. maxNoteChainingRule
 *         Setting maxNoteChainingRule as return "="; will cause the result of
 *         effective notetags with higher priorities to be replaced by those
 *         with lower priorities(this can be useful for more advanced uses
 *         by reusing the cached values of all effective notetags with higher
 *         priorities)
 *      9. defaultUseGain
 *         Setting defaultUseGain as return 1; will cause the experience gain
 *         of the skill to be progressed upon use before chaining any useGain
 *         notetags to be 1
 *      10. useGainNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to useGain notetags/useGainNotePriority instead
 *      11. useGainNoteChainingRule
 *          Same as that of maxNoteChainingRule except that the example would
 *          be applied to useGain notetags/useGainNoteChainingRule instead
 *      12. defaultHitGain
 *          Setting defaultHitGain as return 1; will cause the experience gain
 *          of the skill to be progressed upon hitting a target before
 *          chaining any hitGain notetags to be 1
 *      13. hitGainNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to hitGain notetags/hitGainNotePriority instead
 *      14. hitGainNoteChainingRule
 *          Same as that of maxNoteChainingRule except that the example would
 *          be applied to hitGain notetags/hitGainNoteChainingRule instead
 *      15. nextNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to next notetags/nextNotePriority instead
 *      16. nextNoteChainingRule
 *          Setting nextNoteChainingRule as return "last"; will cause only the
 *          last effective notetag to be used
 *      17. defaultKeepCurrent
 *          Setting defaultKeepCurrent as return true; will cause skill to be
 *          kept after ending progressing before chaining any keepCurrent
 *          notetags
 *      18. keepCurrentNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to keepCurrent notetags/keepCurrentNotePriority instead
 *      19. keepCurrentNoteChainingRule
 *          Same as that of condNoteChainingRule except that the example would
 *          be applied to keepCurrent notetags/keepCurrentNoteChainingRule
 *          instead
 *      20. willEndNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to willEnd notetags/willEndNotePriority instead
 *      21. willEndNoteChainingRule
 *          Setting willEndNoteChainingRule as return "every"; will cause
 *          every effective notetags to be used
 *      22. didEndNotePriority
 *          Same as that of condNotePriority except that the example would be
 *          applied to didEnd notetags/didEndNotePriority instead
 *      23. didEndNoteChainingRule
 *          Same as that of willEndNoteChainingRule except that the example
 *          would be applied to didEnd notetags/didEndNoteChainingRule
 *          instead
 *      24. cmdLineH
 *      25. cmdFontSize
 *      26. cmdPadding
 *      27. cmdTextPadding
 *      28. cmdBackOpacity
 *      29. cmdTranslucentOpacity
 *      30. cmdSpacing
 *      31. cmdWinW
 *      32. cmdWinH
 *          Setting it as returning the corresponding Window_Command.prototype
 *          function results will use the corresponding default value
 *      33. cmdWinX
 *      34. cmdWinY
 *          Setting them as return 0; will place the command window at the
 *          upper right corner if no other plguin's used
 *      35. cmdView
 *          Setting it as return "View Progress"; will describe the view
 *          progress command text as "View Progress"
 *      36. cmdUse
 *          Setting it as return "Use"; will describe the use skill command
 *          stat as "Use"
 *      37. statLineH
 *      38. statFontSize
 *      39. statPadding
 *      40. statTextPadding
 *      41. statBackOpacity
 *      42. statTranslucentOpacity
 *      43. statSpacing
 *      44. statWinW
 *      45. statWinH
 *          Setting it as returning the corresponding
 *          Window_Selectable.prototype function results will use the
 *          corresponding default value
 *      46. statWinX
 *      47. statWinY
 *          Setting them as return 0; will place the command window at the
 *          upper right corner if no other plguin's used
 *      48. condLineH
 *      49. condFontSize
 *      50. condPadding
 *      51. condTextPadding
 *      52. condBackOpacity
 *      53. condTranslucentOpacity
 *      54. condSpacing
 *      55. condWinW
 *      56. condWinH
 *          Setting it as returning the corresponding
 *          Window_Selectable.prototype function results will use the
 *          corresponding default value
 *      57. condWinX
 *          Setting it as return Grapphics.boxWidth / 2; will place the
 *          condition window at the right half if no other plguin's used
 *      58. condWinY
 *          Setting it as return Grapphics.boxHeight / 2; will place the
 *          condition window at the lower half if no other plguin's used
 *      59. nextLineH
 *      60. nextFontSize
 *      61. nextPadding
 *      62. nextTextPadding
 *      63. nextBackOpacity
 *      64. nextTranslucentOpacity
 *      65. nextSpacing
 *      66. nextWinW
 *      67. nextWinH
 *          Setting it as returning the corresponding
 *          Window_Selectable.prototype function results will use the
 *          corresponding default value
 *      68. nextWinX
 *          Setting it as return Grapphics.boxWidth / 2; will place the
 *          condition window at the right half if no other plguin's used
 *      69. nextWinY
 *          Setting it as return Grapphics.boxHeight / 2; will place the
 *          condition window at the lower half if no other plguin's used
 *      70. varIds
 *          Setting it as return [1, 2]; will notify this plugin to update the
 *          cache involving notes using these variables having these ids
 *          whenever their value changes
 *          Refer to the configuration counterpart for an Object form example
 *      71. switchIds
 *          Setting it as return []; will notify this plugin that no game
 *          switches are used by the former
 *          Refer to the configuration counterpart for an Object form example
 *    # Configurations having no parameter counterparts
 *      1. drawStat
 *============================================================================
 *    ## Notetag Info
 *       1. Among all the same notetag types in the same data, all can be
 *          effective(Reference tag: NOTETAG_MULTI)
 *       2. Each line can only have at most 1 notetag
 *          (Reference tag: LINE_MONO)
 *       3. The following is the structure of all notetags in this plugin:
 *          - <doublex rmmv skill progress contents>
 *          - <skill progress contents>
 *          (Reference tag: NOTE_STRUCTURE)
 *          Where contents are in the form of type suffixes: entries
 *          Either of the above can be used, but the 1st one reduce the chance
 *          of causing other plugins to treat the notetags of this plugin as
 *          theirs, while the 2nd one is more user-friendly
 *          - type is one of the following:
 *            cond(related to condNotePriority and condNoteChainingRule)
 *            max(related to maxNotePriority and maxNoteChainingRule)
 *            useGain(related to useGainNotePriority and
 *                    useGainNoteChainingRule)
 *            hitGain(related to hitGainNotePriority and
 *                     hitGainNoteChainingRule)
 *            next(related to nextNotePriority and nextNoteChainingRule)
 *            keepCurrent(related to keepCurrentNotePriority and
 *                        keepCurrentNoteChainingRule)
 *            willEnd(related to willEndNotePriority and
 *                    willEndNoteChainingRule)
 *            didEnd(related to didEndNotePriority and didEndNoteChainingRule)
 *            (Reference tag: NOTE_TYPE)
 *          - suffixes is the list of suffixes in the form of:
 *            suffix1 suffix2 suffix3 ... suffixn
 *            Where each suffix is either of the following:
 *            cfg(The notetag value will be the corresponding NOTEX in the
 *                configuration region, which is inside this plugin js file)
 *            val(The notetag value will be used as-is)
 *            switch(The value of the game switch with id as the notetag value
 *                   will be used)
 *            event(The common event with id as the notetag value will be
 *                  reserved upon using the notetag)
 *            var(The value of the game variable with id as the notetag value
 *                will be used)
 *            (Advanced)script(The value of the game variable with id as the
 *                            notetag value will be used as the contents of
 *                            the functions to be called upon using the
 *                            notetag, so the function arguments are exactly
 *                            the same as the cfg counterpart)
 *            (Reference tag: NOTE_SUFFIX)
 *          - entries is the list of entries in the form of:
 *            entry1, entry2, entry3, ..., entryn
 *            Where entryi must conform with the suffixi specifications
 *          - (Advanced)Each content type has a corresponding eval variant:
 *            <skill progress type>
 *            function content
 *            </skill progress type>
 *            and this counterpart:
 *            <doublex rmmv skill progress type>
 *            function content
 *            </doublex rmmv skill progress type>
 *            The functions arguments are exactly the same as the counterpart
 *            with the cfg suffix
 *            This eval variant only applies to notetags having only 1 suffix
 *       4. (Advanced)The notetag results are cached as follows:
 *          - The effective notetag list's divided into these parts:
 *            Effective actor notetag list
 *            Effective class notetag list
 *            Effective weapon notetag list
 *            Effective armor notetag list
 *            Effective state notetag list
 *            Effective skill notetag list
 *            They'll be sorted according to the corresponding note priority
 *            and their results will be chained according to the corresponding
 *            note chaining rule
 *            (Reference tag: NOTE_LIST_PART)
 *          - Each of the above parts have its own effective notetag list
 *            cache, which will be recached if it's possible that the
 *            effective notetag list might have changed due to changing
 *            weapons/armors/states/etc, which will automatically raise the
 *            coresponding note change factor for the corresponding note
 *            (Reference tag: NOTE_LIST_CACHE)
 *          - Each of the above parts has its own intermediate result cache
 *            based on the result chained from the effective notetags with
 *            higher priorities, and this intermediate result cache will be
 *            recached if the effective notetag list of that part or any of
 *            those having higher priorities have their intermediate result
 *            cache recached, or if the corresponding note priority/chain rule
 *            has changed(this change should raise the priority/chain rule
 *            factor manually)
 *            (Reference tag: NOTE_RESULT_CACHE)
 *          - If the actor's refreshed due to changes other than class,
 *            weapons, armors, states and last used skill, all note change
 *            factors for all notes will be automatically raised
 *            (Reference tag: ACTOR_REFRESH_RECACHE_NOTE)
 *          - If users changes some notetags from some data manually, then
 *            the corresponding note change factor should be raised
 *            immediately afterwards
 *          - If the users are sure that the effective notetag list of a part
 *            remains intact but its intermediate result cache might be
 *            invalid, then the result factor of the corresponding note should
 *            be raised immediately
 *----------------------------------------------------------------------------
 *    # Actor/Class/Weapon/Armor/State/Skill Notetag contents:
 *      1. cond suffix1 suffix2: entry1, entry2
 *         - Sets a prerequisite to be met for the skill to be progressed with
 *           descriptions to be shown
 *         - suffix1 and suffix2 can be cfg, val, switch, var or script
 *         - (Advanced)Please refer to Cond Functions in the configuration
 *           region for using cfg or script suffixes
 *         - The result of entry1 can be anything as it's used as truthy/falsy
 *           to check whether the prerequisite's met
 *         - The result of entry2 can be any String as the condition
 *           descriptions
 *         - If the result of entry2 is falsy, the result of entry1 will also
 *           be treated as falsy
 *           (Reference tag: INVALID_COND_DESC)
 *         - If there's no such effective notetag, the skill involved won't
 *           progress
 *         - E.g.:
 *           <skill progress cond switch var: 1, 2> will set a prerequisite
 *           for the skill to be progressed as the value of the game switch
 *           with id 1, with descriptions to be shown as the value of the game
 *           variable with id 2, provided that that variable stores a String
 *      2. max suffix1: entry1
 *         - Sets the maximum experience of the skill to be progressed
 *         - suffix1 can be cfg, val, var or script
 *         - (Advanced)Please refer to Max Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The result of entry1 can be any positive Number as the maximum
 *           experience
 *         - Having an invalid result is the same as not meeting prerequisites
 *           (Reference tag: INVALID_MAX)
 *         - If the maximum experience of the skill to be progressed's reduced
 *           to become not greater than its current experience, the skill will
 *           be ended progressing immediately
 *           (Reference tag: REDUCED_MAX_END_SKILL_PROGRESS)
 *         - E.g.:
 *           <skill progress max var: 1> will set the maximum experience of
 *           the skill to be progressed as the value of the game variable with
 *           id 1
 *      3. useGain suffix1: entry1
 *         - Sets the experience gain of the skill to be progressed upon using
 *           it
 *         - suffix1 can be cfg, val, var or script
 *         - (Advanced)Please refer to useGain Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The result of entry1 can be any Number as the experience gain
 *         - All invalid results will be regarded as 0
 *           (Reference tag: INVALID_GAIN)
 *         - E.g.:
 *           If the game variable with id 1 is "return this.luk;", then
 *           <skill progress useGain script: 1> will set the experience gain
 *           of the skill to be progressed upon using it as the luk of the
 *           user at that moment
 *      4. hitGain suffix1: entry1
 *         - Sets the experience gain of the skill to be progressed when the
 *           skill hits a target
 *         - suffix1 can be cfg, val, var or script
 *         - (Advanced)Please refer to hitGain Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The result of entry1 can be any Number as the experience gain
 *         - All invalid results will be regarded as 0
 *           (Reference tag: INVALID_GAIN)
 *         - E.g.:
 *           If HG1 in the configuration region is "return this.level;", then
 *           <skill progress hitGain cfg: HG1> will set the experience gain
 *           of the skill to be progressed when the skill hits a target as the
 *           level of the user at that moment
 *      5. next suffix1: entry1
 *         - Sets the skill to learn upon ending progressing the current one
 *         - suffix1 can be cfg, val, var or script
 *         - (Advanced)Please refer to Next Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The result of entry1 can be an Array of any valid id of the skills
 *           to learn
 *         - If the val suffix's used, the skill ids should be concatenated
 *           with the underscore, like 4_5 being skills with id 4 and 5
 *           (Reference tag: NUMBER_ARRAY)
 *         - If the var suffix's used, the variable referred by the entry
 *           should have skill ids concatenated with the underscore, like 4_5
 *           being skills with id 4 and 5
 *           (Reference tag: NUMBER_ARRAY)
 *         - Having an invalid result is the same as not meeting prerequisites
 *           (Reference tag: INVALID_NEXT)
 *         - E.g.:
 *           <skill progress next val: 4_5> will set the skills to learn upon
 *           ending progressing the current one as those with id 4 and 5
 *      6. keepCurrent suffix1: entry1
 *         - Sets whether the current skill will be kept instead of forgotten
 *           when it ends progressing
 *         - suffix1 can be cfg, val, switch, var or script
 *         - (Advanced)Please refer to keepCurrent Functions in the
 *           configuration region for using cfg or script suffixes, or the
 *           eval variant
 *         - The result of entry1 can be anything as it's used as truthy/falsy
 *           to sets whether the current skill will be kept
 *         - E.g.:
 *           <skill progress keepCurrent>
 *           return false;
 *           </skill progress keepCurrent>
 *           will set the current skill to be forgotten
 *      7. willEnd suffix1: entry1
 *         - Runs extra events just before ending progressing the skill
 *         - suffix1 can be cfg, event or script
 *         - (Advanced)Please refer to willEnd Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The entry1 is supposed to cause something to happen instead of
 *           returning anything
 *         - The willEnd parameter counterpart will always be run first
 *           (Reference tag: RUN_DEFAULT_FIRST)
 *         - E.g.:
 *           <skill progress willEnd event: 1> will reserve the common event
 *           with id 1 just after ending progressing the skill
 *      8. didEnd suffix1: entry1
 *         - Runs extra events just after ending progressing the skill
 *         - suffix1 can be cfg, event or script
 *         - (Advanced)Please refer to didEnd Functions in the configuration
 *           region for using cfg or script suffixes, or the eval variant
 *         - The entry1 is supposed to cause something to happen instead of
 *           returning anythinganything
 *         - The didEnd parameter counterpart will always be run first
 *           (Reference tag: RUN_DEFAULT_FIRST)
 *         - E.g.:
 *           If DE1 in the configuration region is unchanged,
 *           <skill progress didEnd cfg: DE1> will close the actor window
 *           when the skill involved ended progressing outside battles
 *           (Please refer to DE1 for details)
 *============================================================================
 *    ## Script Call Info
 *----------------------------------------------------------------------------
 *    # (Advanced)Configuration manipulations
 *      1. $gameSystem.skillProgress.params.param
 *         - Returns the stored value of param listed in the plugin manager or
 *           their configuration counterparts
 *         - E.g.:
 *           $gameSystem.skillProgress.params.isEnabled will return the
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *      2. $gameSystem.skillProgress.params.param = funcContents
 *         - Sets the stored value of param listed in the plugin manager or
 *           their configuration counterpart as funcContents, which is the
 *           contents of a function
 *         - E.g.:
 *           $gameSystem.skillProgress.params.isEnabled = "return false;" will
 *           set the stored value of parameter isEnabled shown on the plugin
 *           manager or its configuration counterpart as "return false;",
 *           causing the corresponding function to always return false, thus
 *           always disabling this plugin
 *         - $gameSystem.skillProgress.params.param changes will be saved
 *         - DoubleX_RMMV.Skill_Progress.params.param = func, where func is
 *           the corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      3. $gameSystem.skillProgress.cfgs.cfg
 *         - Basically the same as $gameSystem.skillProgress.params.param,
 *           except that this script call applies to configurations found in
 *           the configuration region only
 *      4. $gameSystem.skillProgress.cfgs.cfg = funcContents
 *         - Basically the same as
 *           $gameSystem.skillProgress.params.param = funcContents, except that
 *           this script call applies to configurations found in the
 *           configuration region only
 *         - DoubleX_RMMV.Skill_Progress.cfgs.cfg = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *      5. $gameSystem.skillProgress.notes.note
 *         - Basically the same as $gameSystem.skillProgress.params.param,
 *           except that this script call applies to notetag values found in
 *           the configuration region
 *      6. $gameSystem.skillProgress.notes.note = funcContents
 *         - Basically the same as
 *           $gameSystem.skillProgress.params.param = funcContents, except
 *           that this script call applies to notetag values found in the
 *           configuration region
 *         - DoubleX_RMMV.Skill_Progress.notes.note = func, where func is the
 *           corresponding function having funcContents as its contents,
 *           should be explicitly called immediately afterwards
 *    # (Advanced)Actor/Class/Weapon/Armor/State/Skill notetag manipulations
 *      All meta.skillProgress changes can be saved if
 *      DoubleX RMMV Dynamic Data is used
 *      1. meta.skillProgress.note
 *         - note is either of the following:
 *           cond(corresponds to notetag content
 *                cond suffix1 suffix2: entry1, entry2)
 *           max(corresponds to notetag content max suffix1: entry1)
 *           useGain(corresponds to notetag content useGain suffix1: entry1)
 *           hitGain(corresponds to notetag content hitGain suffix1: entry1)
 *           next(corresponds to notetag content next suffix1: entry1)
 *           keepCurrent(corresponds to notetag content
 *                      keepCurrent suffix1: entry1)
 *           willEnd(corresponds to notetag content willEnd suffix1: entry1)
 *           didEnd(corresponds to notetag content didEnd suffix1: entry1)
 *         - Returns the Array of Objects in this form:
 *           { suffixi: suffixi, entryi: entryi }
 *           Which corresponds to <skill progress note suffixi: entryi>
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - E.g.:
 *           $dataWeapons[3].meta.skillProgress.cond will return the Array of
 *           Object
 *           [{ suffix1: "switch", entry1: "1", suffix2: "var", entry2: "2" }]
 *           if the effective notetag of  weapon with id 3 is
 *           <skill progress cond switch var: 1, 2>
 *      2. meta.skillProgress.note = [{ suffixi: suffixi, entryi: entryi }]
 *         (Reference tag: MULTI_SUFFIX_ENTRY)
 *         - note is either of the following:
 *           cond(corresponds to notetag content
 *                cond suffix1 suffix2: entry1, entry2)
 *           max(corresponds to notetag content max suffix1: entry1)
 *           useGain(corresponds to notetag content useGain suffix1: entry1)
 *           hitGain(corresponds to notetag content hitGain suffix1: entry1)
 *           next(corresponds to notetag content next suffix1: entry1)
 *           keepCurrent(corresponds to notetag content
 *                       keepCurrent suffix1: entry1)
 *           willEnd(corresponds to notetag content willEnd suffix1: entry1)
 *           didEnd(corresponds to notetag content didEnd suffix1: entry1)
 *         - Sets the notetag to be the same as
 *           <skill progress note suffixi: entryi>
 *         - E.g.:
 *           $dataArmors[4].meta.skillProgress.cond =
 *           [{ suffix1: "switch", entry1: "1", suffix2: "var", entry2: "2" }]
 *           will set the max notetag of the armor with id 4 to be the same as
 *           <skill progress cond switch var: 1, 2>
 *    # Actor manipulations
 *      1. skillProgressCondDesc(skillId)
 *         - Returns the mapping with the condition descriptions as the keys
 *           and their statuses as the values for the skill with id skillId to
 *           progress for the actor involved
 *         - The mapping being empty means that the skill involved won't
 *           progress due to having no effective cond notetags and is thus
 *           treated as a normal skill
 *           (Reference tag: SKILL_COND_DESCS)
 *         - The mapping having only truthy values means that the prerequisites
 *           are met under the cond notetag chaining rule
 *           (Reference tag: SKILL_COND_DESCS)
 *         - (Advanced)It's supposed to return an Object
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].skillProgressCondDesc(3) will return
 *           the mapping with the condition descriptions as the keys and their
 *           statuses as the values for the skill with id 3 to progress for
 *           the 1st alive party member
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      2. maxSkillProgress(skillId)
 *         - Returns the maximum experience needed to end progressing the
 *           skill with id skillId for the actor involved
 *         - (Advanced)It's supposed to return a positive Number
 *         - E.g.:
 *           If the maximum experience needed to end progressing the skill
 *           with id 3 is 400 for the 1st alive party member, then
 *           $gameParty.aliveMembers()[0].maxSkillProgress(3) will return 400
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      3. useGainSkillProgress(skillId)
 *         - Returns the experience gain of the skill with id skillId to be
 *           progressed upon use for the actor involved
 *         - (Advanced)It's supposed to return a Number
 *         - E.g.:
 *           If the experience gain of the skill with id 4 to be progressed
 *           upon use for the actor with id 1 is 100, then
 *           $gameActors.actor(1).useGainSkillProgress(4) will return 100
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      4. hitGainSkillProgress(skillId, target, value)
 *         - Returns the experience gain of the skill with id skillId to be
 *           progressed upon hitting target target with damage value for the
 *           actor involved
 *         - (Advanced)It's supposed to return a Number
 *         - E.g.:
 *           If the experience gain of the skill with id 5 to be progressed
 *           upon hitting the 1st enemy with 400 damage for the actor with id
 *           2 is 100, then
 *           $gameActors.actor(2).hitGainSkillProgress(
 *           5, $gameTroop.aliveMembers()[0], 400) will return 100
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      5. nextSkillProgress(skillId)
 *         - Returns the list of skill ids to be learned upon ending
 *           progressing that with id skillId for the actor involved
 *         - (Advanced)It's supposed to return a list of valid skill ids
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *           nextSkillProgress(6) will return the list of skill ids to be
 *           learnt upon ending progressing that with id 6 for the last alive
 *           party member
 *         - (Advanced)Using this script call might recache the return value
 *         - (Advanced)It's supposed to be Nullipotent other than possibly
 *           recaching the return value
 *      6. isKeepSkillProgress(skillId)
 *         - Returns whether the skill with id skillId will be kept or
 *           forgotten upon ending its progression for the actor involved
 *         - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[$gameParty.aliveMembers().length - 1].
 *           isKeepSkillProgress(4) will return whether the skill with id 4
 *           will be kept or forgotten upon ending its progression for the
 *           last alive party member
 *      7. currentSkillProgress(skillId)
 *         - Returns the current experience of the skill with id skillId to be
 *           progressed for the actor involved
 *         - (Advanced)It's supposed to return a nonnegative Number that is
 *           not greater than the maximum experience of the same skill
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].currentSkillProgress(3) returns the
 *           current experience of the skill with id 3 to be progressed for
 *           the 1st alive party member
 *         - (Advanced)It's supposed to be Nullipotent
 *      8. setCurrentSkillProgress(skillId, value)
 *         - Sets the current experience of the skill with id skillId to be
 *           progressed for the actor involved as value
 *         - (Advanced)value is supposed to be a nonnegative Number that is
 *           not greater than the maximum experience of the same skill, so
 *           it'll be clamped if it's out of range and discarded if it's not
 *           a Number
 *           (Reference tag: CURRENT_EXP_RANGE)
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].setCurrentSkillProgress(3, 100) sets
 *           the current experience of the skill with id 3 to be progressed
 *           for the 1st alive party member as 100
 *         - (Advanced)It's supposed to be Idempotent
 *      9. (Advanced)raiseAllSkillProgressNoteChangeFactors()
 *         - Applies the script call
 *           raiseSkillProgressNoteChangeFactor(note, factor) to all notes and
 *           factors
 *      10. (Advanced)raiseSkillProgressNoteChangeFactor(note, factor)
 *         - Notifies that the notetag note might need to be recached due to
 *           potential changes in factor factor
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - factor is either of the following:
 *           "states"(Changes in state notetags)
 *           "armors"(Changes in armor notetags)
 *           "weapons"(Changes in weapon notetags)
 *           "currentClass"(Changes in class notetags)
 *           "actor"(Changes in actor notetags)
 *           "priority"(Changes in the corresponding note priorities)
 *           "chainingRule"(Changes in the corresponding note chaining rules)
 *           "result"(Changes in all intermediate results for the note)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].raiseSkillProgressNoteChangeFactor(
 *           "cond", "states") will notify the 1st alive party member that the
 *           cond notetags might need to be recached due to potential changes
 *           in the states or their cond notetags
 *      11. (Advanced)skillProgressNoteResult(note, part)
 *         - Returns the cached intermediate result of part part in note note
 *           for the actor involved
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *         - It's supposed to be Nullipotent other than possible recaching
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].skillProgressNoteResult(
 *           "cond", "states") will return the cached intermediate result of
 *           all effective cond notetags in states for the 1t alive party
 *           member
 *      12. (Advanced)invalidateSkillProgressNoteResult(note, part)
 *         - Invalidates the cached intermediate result of part part in note
 *           note for the actor involved
 *         - note is either of the following:
 *           "cond"(corresponds to notetag content
 *                  cond suffix1 suffix2: entry1 entry2)
 *           "max"(corresponds to notetag content max suffix1: entry1)
 *           "useGain"(corresponds to notetag content useGain suffix1: entry1)
 *           "hitGain"(corresponds to notetag content hitGain suffix1: entry1)
 *           "next"(corresponds to notetag content next suffix1: entry1)
 *           "keepCurrent"(corresponds to notetag content
 *                         keepCurrent suffix1: entry1)
 *           "willEnd"(corresponds to notetag content willEnd suffix1: entry1)
 *           "didEnd"(corresponds to notetag content didEnd suffix1: entry1)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSkillProgressNoteResult(
 *           "cond", "states") will invalidate the cached intermediate result
 *           of all effective cond notetags in states for the 1t alive party
 *           member
 *============================================================================
 *    ## Plugin Command Info
 *       Don't use this plugin command for actors that don't exist yet unless
 *       you really know what you're truly doing
 *----------------------------------------------------------------------------
 *      1. skillProgressCondDesc actorId skillId
 *         - The same as the script call skillProgressCondDesc(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      2. maxSkillProgress actorId skillId
 *         - The same as the script call maxSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      3. useGainSkillProgress actorId skillId
 *         - The same as the script call useGainSkillProgress(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      4. hitGainSkillProgress actorId skillId target value
 *         - The same as the script call
 *           hitGainSkillProgress(skillId, target, value) in Actor
 *           manipulations for the actor with id actorId
 *      5. nextSkillProgress actorId skillId
 *         - The same as the script call nextSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      6. isKeepSkillProgress actorId skillId
 *         - The same as the script call isKeepSkillProgress(skillId) in Actor
 *           manipulations for the actor with id actorId
 *      7. currentSkillProgress actorId skillId
 *         - The same as the script call currentSkillProgress(skillId) in
 *           Actor manipulations for the actor with id actorId
 *      8. setCurrentSkillProgress actorId skillId value
 *         - The same as the script call
 *           setCurrentSkillProgress(skillId, value) in Actor manipulations
 *           for the actor with id actorId
 *      9. (Advanced)raiseAllSkillProgressNoteChangeFactors actorId
 *         - The same as the script call
 *           raiseAllSkillProgressNoteChangeFactors() in Actor manipulations
 *           for the actor with id actorId
 *      10. (Advanced)raiseSkillProgressNoteChangeFactor actorId note factor
 *         - The same as the script call
 *           raiseSkillProgressNoteChangeFactor(note, factor) in Actor
 *           manipulations for the actor with id actorId
 *      11. (Advanced)skillProgressNoteResult actorId note part
 *         - The same as the script call skillProgressNoteResult(note, part)
 *           in Actor manipulations for the actor with id actorId
 *      12. (Advanced)invalidateSkillProgressNoteResult actorId note part
 *         - The same as the script call
 *           invalidateSkillProgressNoteResult(note, part) in Actor
 *           manipulations for the actor with id actorId
 *============================================================================
 */

var DoubleX_RMMV = DoubleX_RMMV || {};
DoubleX_RMMV["Skill Progress"] = "v1.00b";

// The plugin file name must be the same as DoubleX_RMMV.Skill_Progress_File
DoubleX_RMMV.Skill_Progress_File = "doublex_rmmv_skill_progress_v100b";
//

/*============================================================================
 *    ## Plugin Configurations
 *       You only need to edit this part as it's about what this plugin does
 *----------------------------------------------------------------------------*/

DoubleX_RMMV.Skill_Progress = {

/*----------------------------------------------------------------------------
 *    Parameter counterparts
 *    - These configurations will only be used when their counterparts' empty
 *----------------------------------------------------------------------------*/

    params: {

        /**
         * The this pointer refers to the actor involved
         * Sets whether this plugin will be enabled
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Boolean} The check result
         */
        isEnabled: function() { return true; /* Always enable this plugin */ },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective cond notetags among all data types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        condNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // condNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective cond notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        condNoteChainingRule: function(skillId) {
            // All effective notetags must be truthy to have the conditions met
            return "every";
            //
        }, // condNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the default maximum experience of skills to be progressed
         * before chaining any max notetags
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {Number} The requested default maximum experience
         */
        defaultMax: function(skillId) { return 10; },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective max notetags among all data types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        maxNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // maxNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective max notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        maxNoteChainingRule: function(skillId) {
            // The previously chained results are divided by the next notetag
            return "/";
            //
        }, // maxNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the default experience gain of skills to be progressed upon use
         * before chaining any useGain notetags
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {Number} The requested default use gain
         */
        defaultUseGain: function(skillId) { return 2; },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective useGain notetags among all data types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        useGainNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // useGainNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective useGain notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        useGainNoteChainingRule: function(skillId) {
            // The previously chained results are multiplied by the next notetag
            return "*";
            //
        }, // useGainNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the default experience gain of skills to be progressed upon
         * hitting a target with damage before chaining any hitGain notetags
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {Game_Battler} target - The target hit by the skill involved
         * @param {Number} value - The damage of the hit involved
         * @returns {Number} The requested default hit gain
         */
        defaultHitGain: function(skillId, target, value) { return 1; },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective hitGain notetags among all data types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        hitGainNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // hitGainNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective hitGain notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        hitGainNoteChainingRule: function(skillId) {
            // The previously chained results are multiplied by the next notetag
            return "*";
            //
        }, // hitGainNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective next notetags among all data types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        nextNotePriority: function(skillId) {
            // Actors and Classes have the highest and lowest priorities
            return ["actor", "currentClass"];
            //
        }, // nextNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective next notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        nextNoteChainingRule: function(skillId) {
            return "every"; // Only all effective notetags will be used
        }, // nextNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets the default result of whether the skill ending progressing will
         * be kept before chaining any keepCurrent notetags
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {Boolean} The requested default keep current
         */
        defaultKeepCurrent: function(skillId) { return true; },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective keepCurrent notetags among all data
         * types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        keepCurrentNotePriority: function(skillId) {
            // Actors and Classes have the highest and lowest priorities
            return ["actor", "currentClass"];
            //
        }, // keepCurrentNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective keepCurrent notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        keepCurrentNoteChainingRule: function(skillId) {
            return "first"; // Only the 1st effective notetag will be used
        }, // keepCurrentNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets what will happen right before progressing a skill
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         */
        willEnd: function(skillId) { /* Does nothing extra */ },

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective willEnd notetags among all data
         * types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        willEndNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // willEndNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective willEnd notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        willEndNoteChainingRule: function(skillId) {
            return "every"; // All effective notetags will be used
        }, // willEndNoteChainingRule

        /**
         * The this pointer refers to the actor involved
         * Sets what will happen right after progressing a skill
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         */
        didEnd: function(skillId) {
            // Reserves the common event with id 1(its setup might be delayed)
            $gameTemp.reserveCommonEvent(1);
            //
        }, // didEnd

        /**
         * The this pointer refers to the actor involved
         * Note that skills always have the highest priority
         * Sets the priority of effective didEnd notetags among all data
         * types
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {[String]} The requested data type priority queue
         */
        didEndNotePriority: function(skillId) {
            // States and Actors have the highest and lowest priorities
            return [
                "states",
                "armors",
                "weapons",
                "currentClass",
                "actor"
            ];
            //
        }, // didEndNotePriority

        /**
         * The this pointer refers to the actor involved
         * Sets the rule to chain all effective didEnd notetag results
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @returns {String} The requested effective notetag chaining rule
         */
        didEndNoteChainingRule: function(skillId) {
            return "every"; // All effective notetags will be used
        }, // didEndNoteChainingRule

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window line height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window line height
         */
        cmdLineH: function() {
            // Uses the default command window value
            return Window_Command.prototype.lineHeight.call(this);
            //
        }, // cmdLineH

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window standard font size
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard font size
         */
        cmdFontSize: function() {
            // Uses the default command window value
            return Window_Command.prototype.standardFontSize.call(this);
            //
        }, // cmdFontSize

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window standard padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard padding
         */
        cmdPadding: function() {
            // Uses the default command window value
            return Window_Command.prototype.standardPadding.call(this);
            //
        }, // cmdPadding

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window text padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window text padding
         */
        cmdTextPadding: function() {
            // Uses the default command window value
            return Window_Command.prototype.textPadding.call(this);
            //
        }, // cmdTextPadding

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window standard back opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard back opacity
         */
        cmdBackOpacity: function() {
            // Uses the default command window value
            return Window_Command.prototype.standardBackOpacity.call(this);
            //
        }, // cmdBackOpacity

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window translucent opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window translucent opacity
         */
        cmdTranslucentOpacity: function() {
            // Uses the default command window value
            return Window_Command.prototype.translucentOpacity.call(this);
            //
        }, // cmdTranslucentOpacity

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window spacing
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window spacing
         */
        cmdSpacing: function() {
            // Uses the default command window value
            return Window_Command.prototype.spacing.call(this);
            //
        }, // cmdSpacing

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window width
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window width
         */
        cmdWinW: function() {
            // Uses the default command window value
            return Window_Command.prototype.windowWidth.call(this);
            //
        }, // cmdWinW

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window height
         */
        cmdWinH: function() {
            // Uses the default command window value
            return Window_Command.prototype.windowHeight.call(this);
            //
        }, // cmdWinH

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window x position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window x position
         */
        cmdWinX: function() {
            return 0; // Places the window at the leftmost position
        }, // cmdWinX

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window y position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window y position
         */
        cmdWinY: function() {
            return 0; // Places the window at the uppermost position
        }, // cmdWinY

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window view progress command text
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {String} The requested command text
         */
        cmdView: function() { return "View Progress"; },

        /**
         * The this pointer refers to the Window_SkillProgressCmd involved
         * Sets the skill progress command window use skill command text
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {String} The requested command text
         */
        cmdUse: function() { return "Use"; },

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window line height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window line height
         */
        statLineH: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.lineHeight.call(this);
            //
        }, // statLineH

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window standard font size
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard font size
         */
        statFontSize: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardFontSize.call(this);
            //
        }, // statFontSize

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window standard padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard padding
         */
        statPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardPadding.call(this);
            //
        }, // statPadding

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window text padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window text padding
         */
        statTextPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.textPadding.call(this);
            //
        }, // statTextPadding

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window standard back opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard back opacity
         */
        statBackOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardBackOpacity.call(this);
            //
        }, // statBackOpacity

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window translucent opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window translucent opacity
         */
        statTranslucentOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.translucentOpacity.call(this);
            //
        }, // statTranslucentOpacity

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window spacing
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window spacing
         */
        statSpacing: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.spacing.call(this);
            //
        }, // statSpacing

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window width
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window width
         */
        statWinW: function() {
            return Graphics.boxWidth; // Uses the whole screen width
        }, // statWinW

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window height
         */
        statWinH: function() {
            return this.fittingHeight(2); // Uses 2 lines of space
        }, // statWinH

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window x position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window x position
         */
        statWinX: function() {
            return 0; // Places the window at the leftmost position
        }, // statWinX

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * Sets the skill progress stat window y position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window y position
         */
        statWinY: function() {
            return 0; // Places the window at the uppermost position
        }, // statWinY

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window line height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window line height
         */
        condLineH: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.lineHeight.call(this);
            //
        }, // condLineH

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window standard font size
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard font size
         */
        condFontSize: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardFontSize.call(this);
            //
        }, // condFontSize

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window standard padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard padding
         */
        condPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardPadding.call(this);
            //
        }, // condPadding

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window text padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window text padding
         */
        condTextPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.textPadding.call(this);
            //
        }, // condTextPadding

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window standard back opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard back opacity
         */
        condBackOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardBackOpacity.call(this);
            //
        }, // condBackOpacity

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window translucent opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window translucent opacity
         */
        condTranslucentOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.translucentOpacity.call(this);
            //
        }, // condTranslucentOpacity

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window spacing
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window spacing
         */
        condSpacing: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.spacing.call(this);
            //
        }, // condSpacing

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window width
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window width
         */
        condWinW: function() {
            return Graphics.boxWidth / 2; // Uses half of the screen width
        }, // condWinW

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window height
         */
        condWinH: function() {
            // Uses the rest of the screen height
            return Graphics.boxHeight - this.fittingHeight(2);
            //
        }, // condWinH

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window x position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window x position
         */
        condWinX: function() {
            return 0; // Places the window at the leftmost position
        }, // condWinX

        /**
         * The this pointer refers to the Window_SkillProgressCond involved
         * Sets the skill progress condition window y position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window y position
         */
        condWinY: function() {
            // Places it directly below the stat window
            return this.fittingHeight(2);
            //
        }, // condWinY

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window line height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window line height
         */
        nextLineH: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.lineHeight.call(this);
            //
        }, // nextLineH

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window standard font size
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard font size
         */
        nextFontSize: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardFontSize.call(this);
            //
        }, // nextFontSize

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window standard padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard padding
         */
        nextPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardPadding.call(this);
            //
        }, // nextPadding

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window text padding
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window text padding
         */
        nextTextPadding: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.textPadding.call(this);
            //
        }, // nextTextPadding

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window standard back opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window standard back opacity
         */
        nextBackOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.standardBackOpacity.call(this);
            //
        }, // nextBackOpacity

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window translucent opacity
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window translucent opacity
         */
        nextTranslucentOpacity: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.translucentOpacity.call(this);
            //
        }, // nextTranslucentOpacity

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window spacing
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window spacing
         */
        nextSpacing: function() {
            // Uses the default selectable window value
            return Window_Selectable.prototype.spacing.call(this);
            //
        }, // nextSpacing

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window width
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window width
         */
        nextWinW: function() {
            return Graphics.boxWidth / 2; // Uses half of the screen width
        }, // nextWinW

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window height
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window height
         */
        nextWinH: function() {
            // Uses the rest of the screen height
            return Graphics.boxHeight - this.fittingHeight(2);
            //
        }, // nextWinH

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill window x position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window x position
         */
        nextWinX: function() {
            return Graphics.boxWidth / 2; // Places it at the right half
        }, // nextWinX

        /**
         * The this pointer refers to the Window_SkillProgressNext involved
         * Sets the skill progress next skill y position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {Number} The requested window y position
         */
        nextWinY: function() {
            // Places it directly below the stat window
            return this.fittingHeight(2);
            //
        }, // nextWinY

        /**
         * Sets the list of ids of game variables used by this plugin
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {[Number]} The requested list of game variable ids
         */
        varIds: function() {
            // Informs the plugin that no variables are used by this plugin
            return [];
            // Use this Array form or the following Object form instead -
            // (Advanced) Pinpoints the exact notes and factors using each id
            /* General form:
            return {
                varIdi: { notes: [noteij, ...], factors: [factorij, ...] },
                ...
            }
            Example:
            return {
                1: { notes: ["cond", "max"], factors: ["actor", "armors"] },
                2: { notes: ["next", "didEnd"], factors: ["states", "skills"] }
            };
            */
        }, // varIds

        /**
         * Sets the list of ids of game switches used by this plugin
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @returns {[Number]} The requested list of game switch ids
         */
        switchIds: function() {
            // Informs the plugin that no switches are used by this plugin
            return [];
            // Use this Array form or the following Object form instead -
            // (Advanced) Pinpoints the exact notes and factors using each id
            /* General form:
            return {
                switchIdi: { notes: [noteij, ...], factors: [factorij, ...] },
                ...
            }
            Example:
            return {
                1: { notes: ["cond", "max"], factors: ["actor", "armors"] },
                2: { notes: ["next", "didEnd"], factors: ["states", "skills"] }
            };
            */
        } // switchIds

    }, // params

/*----------------------------------------------------------------------------
 *    Configurations
 *    - These configurations don't have any parameter counterparts
 *----------------------------------------------------------------------------*/

    cfgs: {

        /**
         * The this pointer refers to the Window_SkillProgressStat involved
         * This configuration has no parameter counterparts
         * Sets the skill progress stat window y position
         * Hotspot/Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Number} current - The current skill progress status
         * @param {Number} max - The maximum skill progress status
         * @param {Number} isKeep - If the skill will be kept upon progress
         */
        drawStat: function(current, max, isKeep) {
            var line1Rect = this.itemRectForText(0);
            var line2Rect = this.itemRectForText(1);
            var line1Text = "Progress: " + current + "/" + max;
            var line2Text = "Is Kept After Progress: " + isKeep;
            this.drawText(line1Text, line1Rect.x, line1Rect.y, line1Rect.width);
            this.drawText(line2Text, line2Rect.x, line2Rect.y, line2Rect.width);
        }, // drawStat

    }, // cfgs

/*----------------------------------------------------------------------------
 *    Notetag values
 *    - These functions are used by notetags using function name as values
 *----------------------------------------------------------------------------*/

    notes: {

        /*--------------------------------------------------------------------
         *    Cond Functions
         *    - Setups CX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* CX names can only use alphanumeric characters
         * The 1st character of CX can't be a number
         * The below CX are examples added to help you set your CX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        C1: function(skillId, datum) { return true; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        C2: function(skillId, datum) { return false; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        C3: function(skillId, datum) {
            // Returns the value in the game switch with id x
            return $gameSwitches.value(x);
            //
        }, // C3

        // Adds new CX here


        /*--------------------------------------------------------------------
         *    Max Functions
         *    - Setups MX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* MX names can only use alphanumeric characters
         * The 1st character of MX can't be a number
         * The below MX are examples added to help you set your MX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The maximum experience of the skill to be
         *                   progressed(Which should be positive) for the actor
         *                   involved
         */
        M1: function(skillId, datum) { return 400; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The maximum experience of the skill to be
         *                   progressed(Which should be positive) for the actor
         *                   involved
         */
        M2: function(skillId, datum) { return this.level; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The maximum experience of the skill to be
         *                   progressed(Which should be positive) for the actor
         *                   involved
         */
        M3: function(skillId, datum) {
            // Returns the value in the game variable with id x
            return $gameVariables.value(x);
            //
        }, // M3

        // Adds new MX here


        /*--------------------------------------------------------------------
         *    useGain Functions
         *    - Setups UGX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* UGX names can only use alphanumeric characters
         * The 1st character of UGX can't be a number
         * The below UGX are examples added to help you set your UGX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon use for the actor involved
         */
        UG1: function(skillId, datum) { return 100; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon use for the actor involved
         */
        UG2: function(skillId, datum) { return this.luk; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon use for the actor involved
         */
        UG3: function(skillId, datum) {
            // Returns the value in the game variable with id x
            return $gameVariables.value(x);
            //
        }, // UG3

        // Adds new UGX here


        /*--------------------------------------------------------------------
         *    hitGain Functions
         *    - Setups HGX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* HGX names can only use alphanumeric characters
         * The 1st character of HGX can't be a number
         * The below HGX are examples added to help you set your HGX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @param {Game_Battler} target - The target hit by the skill involved
         * @param {Number} value - The damage of the hit involved
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon hitting the target involved with the damage
         *                   involved for the actor involved
         */
        HG1: function(skillId, datum, target, value) { return value; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @param {Game_Battler} target - The target hit by the skill involved
         * @param {Number} value - The damage of the hit involved
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon hitting the target involved with the damage
         *                   involved for the actor involved
         */
        HG2: function(skillId, datum, target, value) {
            return this.luk - target.luk;
        }, // HG2

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @param {Game_Battler} target - The target hit by the skill involved
         * @param {Number} value - The damage of the hit involved
         * @returns {Number} The experience gain of the skill to be progressed
         *                   upon hitting the target involved with the damage
         *                   involved for the actor involved
         */
        HG3: function(skillId, datum, target, value) {
            // Returns the value in the game variable with id x
            return $gameVariables.value(x);
            //
        }, // HG3

        // Adds new HGX here


        /*--------------------------------------------------------------------
         *    Next Functions
         *    - Setups NX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* NX names can only use alphanumeric characters
         * The 1st character of NX can't be a number
         * The below NX are examples added to help you set your NX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {[Id]} The list of ids of skills to be learnt upon ending
         *                 progressing the current one for the actor involved
         */
        N1: function(skillId, datum) {
            return [3]; /* Only the skill with id 3 will be learnt */
        }, // N1

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {[Id]} The list of ids of skills to be learnt upon ending
         *                 progressing the current one for the actor involved
         */
        N2: function(skillId, datum) {
            return [4, 5]; /* Only the skills with id 4 and 5 will be learnt */
        }, // N2

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {[Id]} The list of ids of skills to be learnt upon ending
         *                 progressing the current one for the actor involved
         */
        N3: function(skillId, datum) {
            // Returns the value in the game variable with id x
            return $gameVariables.value(x);
            //
        }, // N3

        // Adds new NX here


        /*--------------------------------------------------------------------
         *    keepCurrent Functions
         *    - Setups KCX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* KCX names can only use alphanumeric characters
         * The 1st character of KCX can't be a number
         * The below KCX are examples added to help you set your KCX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        KC1: function(skillId, datum) { return true; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        KC2: function(skillId, datum) { return false; },

        /**
         * The this pointer refers to the actor involved
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         * @returns {Boolean} The check result
         */
        KC3: function(skillId, datum) {
            // Returns the value in the game switch with id x
            return $gameSwitches.value(x);
            //
        }, // KC3

        // Adds new KCX here


        /*--------------------------------------------------------------------
         *    willEnd Functions
         *    - Setups WEX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* WEX names can only use alphanumeric characters
         * The 1st character of WEX can't be a number
         * The below WEX are examples added to help you set your WEX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        WE1: function(skillId, datum) { /* Does nothing extra */ },

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        WE2: function(skillId, datum) {
            // Reserves the common event with id x(its setup might be delayed)
            $gameTemp.reserveCommonEvent(x);
            //
        }, // WE2

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        WE3: function(skillId, datum) {
            // Shows that the actor has learnt new skills in battle
            if (!BattleManager._phase) return;
            var logWindow = SceneManager._scene._logWindow, name = this.name();
            this.nextSkillProgress(skillId).map(function(id) {
                return $dataSkills[id].name;
            }).forEach(function(n) {
                logWindow.push('addText', name + " has learnt " + n + "!");
                logWindow.push('wait');
                logWindow.push('clear');
            });
            //
        }, // WE3

        // Adds new WEX here


        /*--------------------------------------------------------------------
         *    didEnd Functions
         *    - Setups DEX used by this plugin's notetags
         *--------------------------------------------------------------------*/
        /* DEX names can only use alphanumeric characters
         * The 1st character of DEX can't be a number
         * The below DEX are examples added to help you set your DEX
         * You can freely use, rewrite and/or delete these examples
         */

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        DE1: function(skillId, datum) {
            // Otherwise the actor might suddenly use another skill
            if (!BattleManager._phase) SceneManager._scene.onActorCancel();
            //
        },

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        DE2: function(skillId, datum) {
            // Reserves the common event with id x(its setup might be delayed)
            $gameTemp.reserveCommonEvent(x);
            //
        }, // DE2

        /**
         * The this pointer refers to the actor involved
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {{*}} datum - The datum having this notetag
         */
        DE3: function(skillId, datum) {
            // Adds 400 experience to the actor involved
            this.changeExp(400, true);
            //
        } // DE3

        // Adds new DEX here


    } // notes

}; // DoubleX_RMMV.Skill_Progress

/*============================================================================
 *    ## Plugin Implementations
 *       You need not edit this part as it's about how this plugin works
 *----------------------------------------------------------------------------
 *    # Plugin Support Info:
 *      1. Prerequisites
 *         - Decent RMMV plugin development proficiency to fully comprehend
 *           this plugin
 *      2. All reference tags are to have clear references between the
 *         Plugin Info and Plugin Implementations by searching them
 *      3. All intentionally hidden script calls can be found by searching
 *         ADVANCED_SCRIPT_CALLS_ONLY
 *----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
 *    # New classes:
 *      - Implements the note result/running helper and UIs for skill progress
 *----------------------------------------------------------------------------*/

function Game_SkillProgressNotes() { this.initialize.apply(this, arguments); };

// These classes should be private and used by Game_SkillProgressNotes only
function Game_SkillProgressCache() { this.initialize.apply(this, arguments); };

function Game_SkillProgressPairs() { this.initialize.apply(this, arguments); };

function Game_SkillProgressRules() { this.initialize.apply(this, arguments); };
//

function Window_SkillProgressCmd() { this.initialize.apply(this, arguments); };

function Window_SkillProgressStat() { this.initialize.apply(this, arguments) };

function Window_SkillProgressCond() { this.initialize.apply(this, arguments) };

function Window_SkillProgressNext() { this.initialize.apply(this, arguments) };

/*----------------------------------------------------------------------------
 *    # Edit class: DataManager
 *      - Reads all notetags for progressing skills
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.DataManager = { orig: {}, new: {} };
    var _DM = SP.DataManager.orig, _SP = SP.DataManager.new;
    // Refer to reference tag NOTE_STRUCTURE
    _SP._REG_EXP_ID = " *(?:doublex +rmmv +)?skill +progress +(\\w+)";
    _SP._REG_EXPS = {
        // It's too nasty to validate the notetags here so it's not done here
        base: new RegExp("<" + _SP._REG_EXP_ID +
                " +(\\w+(?: +\\w+)*) *: +(\\w+(?: *, +\\w+)*) *>", "gmi"),
        evalStart: new RegExp("<" + _SP._REG_EXP_ID + " *>", "gmi"),
        evalEnd: new RegExp("< *\/" + _SP._REG_EXP_ID + " *>", "gmi")
        //
    };
    //
    _SP._areAllNotesLoaded = false;

    _DM.isDatabaseLoaded = DataManager.isDatabaseLoaded;
    _SP.isDatabaseLoaded = DataManager.isDatabaseLoaded = function() {
    // v1.00a - v1.00a; Extended
        // Edited to read all notetags of this plugin as well
        return _DM.isDatabaseLoaded.apply(this, arguments) &&
                _SP._isDatabaseLoaded.call(this);
        //
    }; // DataManager.isDatabaseLoaded

    _DM.saveGame = DataManager.saveGame;
    _SP.saveGame = DataManager.saveGame = function(contents) {
    // v1.00a - v1.00a; Extended
        // Added to clear all actor effective notetags to simplify saving
        $gameParty.clearSkillProgressNotes();
        //
        var success = _DM.saveGame.apply(this, arguments);
        // Added to restores all actor effective notetags
        $gameParty.initSkillProgressNotes();
        //
        return success;
    }; // DataManager.saveGame

    _DM.extractSaveContents = DataManager.extractSaveContents;
    _SP.extractSaveContents = DataManager.extractSaveContents = function(contents) {
    // v1.00a - v1.00a; Extended
        _DM.extractSaveContents.apply(this, arguments);
        // Added to use the stored function contents
        _SP._extractSaveContents.call(this);
        //
    }; // DataManager.extractSaveContents

    /**
     * The this pointer is DataManager
     * DataManager.isDatabaseLoaded was Nullipotent but is now Idempotent
     * Idempotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The database loaded flag
     * @todo: Make this function Nullipotent to preserve the contract integrity
     */
    _SP._isDatabaseLoaded = function() {
        // Ensures the notetags will only be read exactly once upon game start
        if (_SP._areAllNotesLoaded) return true;
        _SP._loadAllNotes.call(this);
        _SP._areAllNotesLoaded = true;
        return _SP._areAllNotesLoaded;
        //
    }; // _SP._isDatabaseLoaded

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._loadAllNotes = function() {
        _SP._data.call(this).forEach(_SP._loadNote, this);
    }; // _SP._loadAllNotes

    /**
     * The this pointer is DataManager
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {[{*}]} The list of data to have notetags loaded
     */
    _SP._data = function() {
        // The function's easy, simple and small enough to be inlined
        return [
            $dataActors,
            $dataClasses,
            $dataWeapons,
            $dataArmors,
            $dataStates,
            $dataSkills
        ].reduce(function(allData, data) {
            return allData.concat(data.filter(function(d) { return d; }));
        }, []);
        //
    }; // _SP._data

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{*}} datum - The datum to have notetags loaded
     */
    _SP._loadNote = function(datum) {
        // Script call/plugin command
        var lines = datum.note.split(/[\r\n]+/);
        _SP._loadEvalNote.call(this, datum.meta.skillProgress = {}, lines);
        lines.forEach(_SP._loadBaseNote.bind(this, datum.meta.skillProgress));
        //
    }; // _SP._loadNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{{String}}} skillProgress - The loaded note values
     * @param {[String]} lines - The list of lines being scanned for notetags
     *                           to be loaded
     */
    _SP._loadEvalNote = function(skillProgress, lines) {
        // It's tolerable and more performant than any declarative counterpart
        var isEval = false, type = "", funcLines = [];
        lines.forEach(function(line) {
            if (line.match(_SP._REG_EXPS.evalStart)) {
                isEval = true;
                type = RegExp.$1;
            } else if (line.match(_SP._REG_EXPS.evalEnd)) {
                isEval = false;
                // Refer to reference tag NOTETAG_MULTI
                if (type !== RegExp.$1) return;
                skillProgress[type] = (skillProgress[type] || []).concat(_SP.
                        _notePairs.call(this, ["eval"], [funcLines.join("\n")]));
                //
            } else if (isEval) {
                funcLines.push(line);
            }
        }, this);
        //
    }; //  _SP._loadEvalNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{{String}}} skillProgress - The loaded note values
     * @param {String} line - The line being scanned for notetags to be loaded
     */
    _SP._loadBaseNote = function(skillProgress, line) {
        // Refer to reference tag NOTETAG_MULTI and LINE_MONO
        if (!line.match(_SP._REG_EXPS.base)) return;
        var type = RegExp.$1, suffixes = RegExp.$2, entries = RegExp.$3;
        skillProgress[type] = (skillProgress[type] || []).concat(_SP._notePairs.
                call(this, suffixes.split(/ +/), entries.split(/ *, +/)));
        //
    }; // _SP._loadBaseNote

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {[String]} suffixes - The list of suffixes in the notetag
     * @param {[String]} entries - The list of entries in the notetag
     * @returns {{String}} The suffix-entry pair mapping
     */
    _SP._notePairs = function(suffixes, entries) {
        // So those excessive suffixes/entries will be discarded right here
        var l = Math.min(suffixes.length, entries.length);
        //
        // It's tolerable and more performant than any declarative counterpart
        for (var i = 0, pairs = {}; i < l; i++) {
            // Refer to reference tag MULTI_SUFFIX_ENTRY
            var count = i + 1;
            pairs["suffix" + count] = suffixes[i];
            pairs["entry" + count] = entries[i];
            //
        }
        return pairs;
        //
    }; // _SP._notePairs

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._extractSaveContents = function() {
        _SP._extractFuncContents.call(this, "params");
        _SP._extractFuncContents.call(this, "cfgs");
        _SP._extractFuncContents.call(this, "notes");
        $gameParty.initSkillProgressNotes();
    }; // _SP._extractSaveContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} funcType - The params/notes label
     */
    _SP._extractFuncContents = function(funcType) {
        Object.keys($gameSystem.skillProgress[funcType]).forEach(
                _SP._extractFuncContent.bind(this, funcType));
    }; // _SP._extractFuncContents

    /**
     * The this pointer is DataManager
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} funcType - The params/notes label
     * @param {String} funcName - The name of the stored function content
     */
    _SP._extractFuncContent = function(funcType, funcName) {
        SP[funcType][funcName] = $gameSystem.skillProgressFunc(funcType,
                funcName, $gameSystem.skillProgress[funcType][funcName]);
    }; // _SP._extractFuncContent

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_System
 *      - Stores all params/configurations for progressing skills
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Game_System = { orig: {}, new: {} };
    var _GS = SP.Game_System.orig, _SP = SP.Game_System.new;
    var $ = Game_System.prototype;
    _SP._FUNCS = {
        params: function(funcName, content) {
            // This arg list covers rest cases so unused args' the only problem
            return new Function("skillId", "target", "value", content);
            //
        },
        cfgs: function(funcName, content) {
            return new Function("current", "max", "isKeep", content);
        },
        notes: function(funcName, content) {
            // This arg list covers all cases so unused args' the only problem
            return new Function("skillId", "datum", "target", "value", content);
            //
        }
    };

    _GS.initialize = $.initialize;
    _SP.initialize = $.initialize = function() { // v1.00a - v1.00a; Extended
        _GS.initialize.apply(this, arguments);
        _SP._init.call(this); // Added to setup parameters/notetags
    }; // $.initialize

    /*------------------------------------------------------------------------
     *    New public instance variables
     *------------------------------------------------------------------------*/
    // {{{*}}} skillProgress: The container of all other new variables
    //         {{*}} params: The container of all parameter/configuration values
    //         {{*}} notes: The container of all notetag function contents

    /**
     * Pure function
     * @interface @since v1.00a @version v1.00a
     * @param {String} funcType - The params/notes label
     * @param {String} funcName - The name of the stored function content
     * @param {String} funcContent - The stored function content
     * @returns {()} The requested function with the stored content
     */
    $.skillProgressFunc = function(funcType, funcName, content) {
        return _SP._FUNCS[funcType](funcName, content);
    }; // $.skillProgressFunc

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._init = function() {
        _SP._initContainers.call(this);
        _SP._storeParams.call(this);
        _SP._storeCfgNotes.call(this);
    }; // _SP._init

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._initContainers = function() {
        this.skillProgress = { params: {}, cfgs: {}, notes: {} };
    }; // _SP._initContainers

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._storeParams = function() {
        var params = _SP._rawParams.call(this);
        Object.keys(params).forEach(_SP._storeParam.bind(this, params));
    }; // _SP._storeParams

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v1.00a @version v1.00b
     * @returns {{String}} The requested name-value mapping
     */
    _SP._rawParams = function() {
        // There's no need to cache it as _rawParams should only be called once
        var params = PluginManager.parameters(DoubleX_RMMV.Skill_Progress_File);
        Object.keys(params).forEach(function(param) {
            // All parent parameters are removed from the raw parameters
            var first = param[0];
            if (first.toLowerCase() !== first) return delete params[param];
            //
            params[param] = _SP._rawParam.call(this, param, params[param]);
        });
        return params;
        //
    }; // _SP._rawParams

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v1.00b @version v1.00b
     * @param {String} param - The parameter name
     * @param {String} val - The raw parameter value string
     * @returns {String} The requested normalized parameter value string
     */
    _SP._rawParam = function(param, val) {
        if (!val) return val;
        try {
            return JSON.parse(val);
        } catch (err) {
            console.warn([
              "The value of the parameter " + param + " is",
              val,
              "Which should be entered via note rather than text",
              err.stack
            ].join("\n"));
            return val;
        }
    }; // _SP._rawParam

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The parameter name-value map
     * @param {String} param - The parameter name
     */
    _SP._storeParam = function(params, param) {
        this.skillProgress.params[param] = _SP._param.call(this, params, param);
        SP.params[param] = this.skillProgressFunc("params", param,
                this.skillProgress.params[param]);
    }; // _SP._storeParam

    /**
     * The this pointer is Game_System.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {{String}} params - The parameter name-value map
     * @param {String} param - The parameter name
     * @retruns {String} The requested function contents as parameter values
     */
    _SP._param = function(params, param) {
        // Refer to reference tag PARAMETERS_CONFIGURATIONS
        return params[param] || _SP._funcContent.call(this, SP.params[param]);
        //
    }; // _SP._param

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._storeCfgNotes = function() {
        Object.keys(SP.cfgs).forEach(_SP._storeCfgNote.bind(this, "cfgs"));
        Object.keys(SP.notes).forEach(_SP._storeCfgNote.bind(this, "notes"));
    }; // _SP._storeCfgNotes

    /**
     * The this pointer is Game_System.prototype
     * Idempotent
     * @param {String} type - The configuration type label
     * @param {String} name - The name of the configuration/note
     * @since v1.00a @version v1.00a
     */
    _SP._storeCfgNote = function(type, name) {
        this.skillProgress[type][name] =
                _SP._funcContent.call(this, SP[type][name]);
    }; // _SP._storeCfgNote

    /**
     * The this pointer is Game_System.prototype
     * Pure function
     * @since v1.00a @version v1.00a
     * @param {()} func - The function as the value of the configuration
     * @returns {String} The requested parameters in the configuration region
     */
    _SP._funcContent = function(func) {
        // Only the function contents are stored in save files
        return func.toString().
                replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
        //
    }; // _SP._funcContent

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Switches/Game_Variables
 *      - Raises the note change factors linked to the game switches/variables
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var classes = {
        Game_Switches: { proto: Game_Switches.prototype, param: "switchIds" },
        Game_Variables: { proto: Game_Variables.prototype, param: "varIds" }
    };
    Object.keys(classes).forEach(function(klass) {

        SP[klass] = { orig: {}, new: {} };
        var _GSV = SP[klass].orig, _SP = SP[klass].new;
        var $ = classes[klass].proto, param = classes[klass].param;

        _GSV.setValue = $.setValue;
        _SP.setValue = $.setValue = function(id, val) {
        // v1.00a - v1.00a; Extended
            _GSV.setValue.apply(this, arguments);
            // Added to raise the change factors involving this id
            _SP._raiseChangeFactors.call(this, id);
            //
        }; // $.setValue

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v1.00a @version v1.00a
         * @param {Id} id - The id to have its involved change factors raised
         */
        _SP._raiseChangeFactors = function(id) {
            var ids = SP.params[param]();
            // Emphasizes the differences between the Array and Object forms
            if (Array.isArray(ids)) {
                return _SP._raiseAllChangeFactors.call(this, id, ids);
            }
            _SP._raiseNoteChangeFactors.call(this, ids[id]);
            //
        }; // _SP._raiseChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v1.00a @version v1.00a
         * @param {Id} id - The id to have its involved change factors raised
         * @param {[Id]} ids - The list of ids used by this plugin
         */
        _SP._raiseAllChangeFactors = function(id, ids) {
            if (ids.indexOf(id) >= 0) $gameParty.members().forEach(function(m) {
                m.raiseAllSkillProgressNoteChangeFactors();
            });
        }; // _SP._raiseAllChangeFactors

        /**
         * The this pointer is klass.prototype
         * Idempotent
         * @since v1.00a @version v1.00a
         * @param {{[String], [String]}} noteFactors - The notes and factors to
         *                                             be raised by this id
         */
        _SP._raiseNoteChangeFactors = function(noteFactors) {
            if (noteFactors) $gameParty.members().forEach(function(mem) {
                noteFactors.notes.forEach(function(note) {
                    noteFactors.factors.forEach(mem.
                            raiseSkillProgressNoteChangeFactor.bind(mem, note));
                });
            });
        }; // _SP._raiseNoteChangeFactors

    });

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Action
 *      - Lets actors to progress skills when the skill hits targets
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Game_Action = { orig: {}, new: {} };
    var _GA = SP.Game_Action.orig, _SP = SP.Game_Action.new;
    var $ = Game_Action.prototype;

    _GA.executeDamage = $.executeDamage;
    _SP.executeDamage = $.executeDamage = function(target, value) {
    // v1.00a - v1.00a; Extended
        _GA.executeDamage.apply(this, arguments);
        // Added to progress the skill used when it hit targets for actors
        _SP._executeDamage.call(this, target, value);
        //
    }; // $.executeDamage

    /**
     * The this pointer is Game_Action.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Game_Battler} target - The target hit by the skill involved
     * @param {Number} value - The damage of the hit involved
     */
    _SP._executeDamage = function(target, value) {
        var subject = this.subject();
        if (!subject.isActor()) return;
        subject.onHitGainSkillProgress(this.item().id, target, value);
    }; // _SP._executeDamage

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Actor
 *      - Implements all actor script calls and skill progressions
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Game_Actor = { orig: {}, new: {} };
    var _GA = SP.Game_Actor.orig, _SP = SP.Game_Actor.new;
    var $ = Game_Actor.prototype;
    var $$ = Game_Battler.prototype, $$$ = Game_BattlerBase.prototype;
    // All these functions are actor script calls
    _SP._FORWARDED_FUNCS = {
        raiseAllSkillProgressNoteChangeFactors: "raiseAllChangeFactors",
        raiseSkillProgressNoteChangeFactor: "raiseChangeFactor",
        skillProgressNoteResult: "cachedPartResult",
        invalidateSkillProgressNoteResult: "invalidateResultCache"
    };
    _SP._RESULT_FUNCS = {
        /** @returns {[String?]} The mapping of condition description statuses */
        skillProgressCondDesc: "cond",
        //
        /** @returns {Number} The maximum experience of the skill involved */
        maxSkillProgress: "max",
        //
        /** @returns {Number} The exp gain of the skill involved upon use */
        useGainSkillProgress: "useGain",
        //
        /** @returns {Number} The exp gain of the skill involved upon hit */
        hitGainSkillProgress: "hitGain",
        //
        /** @returns {[Id]} - List of id of skills to be learnt upon progress */
        nextSkillProgress: "next",
        //
        /** @returns {Boolean} The check result */
        isKeepSkillProgress: "keepCurrent"
        //
    };
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _skillProgress: The container of all other new variables
    //       {Game_SkillProgressNotes} notes: The notetag results
    //       {{Boolean}} isEnded: Marks whether the skill has ended progress
    //       {{Number}} exps: The skill progress experience container

    // It's to avoid overwriting paySkillCost in Game_Actor/Battler from plugins
    _GA.paySkillCost = $.paySkillCost || $$.paySkillCost || $$$.paySkillCost;
    //
    _SP.paySkillCost = $.paySkillCost = function(skill) {
    // v1.00a - v1.00a; Extended
        // Added to trigger the skill progress upon using the skill
        _SP._onUseSkill.call(this, skill.id);
        //
        _GA.paySkillCost.apply(this, arguments);
    }; // $.paySkillCost

    ["addState", "removeState"].forEach(function(func) {
        // It's to avoid overwriting func in Game_Actor from other plugins
        _GA[func] = $[func] || $$[func];
        //
        _SP[func] = $[func] = function(stateId) { // v1.00a - v1.00a; Extended
            // Added to mark that state notetags might have changed
            this._skillProgress.notes.markChangeFactors(["states"]);
            //
            _GA[func].apply(this, arguments);
        }; // $[func]
    });

    _GA.initialize = $.initialize;
    _SP.initialize = $.initialize = function(actorId) {
    // v1.00a - v1.00a; Extended
        _SP._init.call(this); // Added to initialize all skill progress vars
        _GA.initialize.apply(this, arguments);
    }; // $.initialize

    _GA.refresh = $.refresh;
    _SP.refresh = $.refresh = function() { // v1.00a - v1.00a; Extended
        _GA.refresh.apply(this, arguments);
        // Added to refreshes all skill progress notetags lists/results
        _SP._refresh.call(this);
        //
    }; // $.refresh

    ["initEquips", "changeEquip", "forceChangeEquip"].forEach(function(func) {
        _GA[func] = $[func];
        // It's ok to skip the arguments in the signature as there's arguments
        _SP[func] = $[func] = function() { // v1.00a - v1.00a; Extended
            // Added to mark that weapon/armor notetags might have changed
            this._skillProgress.notes.markChangeFactors(["weapons", "armors"]);
            //
            _GA[func].apply(this, arguments);
        }; // $[func]
        //
    });

    _GA.changeClass = $.changeClass;
    _SP.changeClass = $.changeClass = function(classId, keepExp) {
    // v1.00a - v1.00a; Extended
        // Added to mark that class notetags might have changed
        this._skillProgress.notes.markChangeFactors(["currentClass"]);
        //
        _GA.changeClass.apply(this, arguments);
    }; // $.changeClass

    // Refer to _SP._RESULT_FUNCS and Game_SkillProgressNotes for signatures
    Object.keys(_SP._RESULT_FUNCS).forEach(function(func) {
        var note = _SP._RESULT_FUNCS[func];
        // It's ok to list unused arguments as long as they're consistent
        $[func] = function(skillId, target, value) {
            return this._skillProgress.notes.result(
                    note, skillId, target, value);
        }; // $[func]
        //
    });

    /**
     * Script Call/Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Number} The current experience of the skill involved
     */
    $.currentSkillProgress = function(skillId) {
        // Clamping exp here would cause excessively unnecessary max exp queries
        return this._skillProgress.exps[skillId] || 0;
        //
    }; // $.currentSkillProgress

    /**
     * Script Call/Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {Number} value - The new experience of the skill involved
     */
    $.setCurrentSkillProgress = function(skillId, value) {
        // Refer to reference tag CURRENT_EXP_RANGE and INVALID_GAIN
        if (isNaN(value) || this._skillProgress.isEnded[skillId]) return;
        //
        var max = this.maxSkillProgress(skillId);
        // Refer to reference tag CURRENT_EXP_RANGE and INVALID_GAIN
        this._skillProgress.exps[skillId] = value.clamp(0, max);
        //
        // Making isMaxSkillProgress would only cause unnecessary max exp query
        if (this.currentSkillProgress(skillId) < max) return;
        //
        _SP._onSkillProgress.call(this, skillId);
    }; // $.setCurrentSkillProgress

    // Refer to the Game_SkillProgressNotes counterparts
    Object.keys(_SP._FORWARDED_FUNCS).forEach(function(func) {
        var f = _SP._FORWARDED_FUNCS[func];
        // It's ok to skip the arguments in the signature as there's arguments
        $[func] = function() {
            return this._skillProgress.notes[f].apply(
                    this._skillProgress.notes, arguments);
        }; // $[func]
        //
    });
    //

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.initSkillProgressNotes = function() {
        this._skillProgress.notes = new Game_SkillProgressNotes(this);
    }; // $.initSkillProgressNotes

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.clearSkillProgressNotes = function() {
        // Avoids memory leaks
        this._skillProgress.notes.clear();
        delete this._skillProgress.notes;
        //
    }; // $.clearSkillProgressNotes

    ["Use", "Hit"].forEach(function(f) {
        // It's possible for the function itself to be extended/edited later
        var func = "_" + f.toLowerCase() + "GainSkillProgress";
        //
        /**
         * @interface @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {Game_Battler?} target - The target hit by the skill involved
         * @param {Number?} value - The damage of the hit involved
         */
        $["on" + f + "GainSkillProgress"] = function(skillId, target, value) {
            _SP._onCurrentSkillProgress.call(this, skillId,
                    _SP[func].call(this, skillId, target, value));
        }; // $["on" + f + "GainSkillProgress"]
    });

    /**
     * Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Boolean} The check result
     */
    $.canSkillProgress = function(skillId) {
        // An ended progressing skill should still be treated as progress
        return _SP._canSkillProgress.call(this, skillId) && _SP._isValidMax.
                call(this, skillId) && _SP._isValidNext.call(this, skillId);
        //
    }; // $.canSkillProgress

    /**
     * Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Boolean} The check result
     */
    $.isSkillProgress = function(skillId) {
        if (!SP.params.isEnabled.call(this)) return false;
        // Refer to reference tag SKILL_COND_DESCS
        return Object.keys(this.skillProgressCondDesc(skillId)).length > 0;
        //
    }; // $.isSkillProgress

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    _SP._onUseSkill = function(skillId) {
        // It'd be too demanding to ask advanced users to raise this manually
        this._skillProgress.notes.raisePartChangeFactors(["skills"], skillId);
        //
        this.onUseGainSkillProgress(skillId);
    }; // _SP._onUseSkill

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._init = function() {
        // The master container must be ready first before adding anything else
        this._skillProgress = { isEnded: {}, exps: {} };
        this.initSkillProgressNotes();
        //
    }; // _SP._init

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._refresh = function() {
        // Refer to reference tag ACTOR_REFRESH_RECACHE_NOTE
        this._skillProgress.notes.raiseMarkedChangeFactors();
        //
        // Refer to reference tag REDUCED_MAX_END_SKILL_PROGRESS
        _SP._checkUpdatedMaxSkillProgresses.call(this);
        //
    }; // _SP._refresh

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._checkUpdatedMaxSkillProgresses = function() {
        // The function's easy, simple and small enough to be inlined
        this.skills().map(function(skill) { return skill.id; }).forEach(
                _SP._checkUpdatedMaxSkillProgress, this);
        //
    }; // _SP._checkUpdatedMaxSkillProgresses

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    _SP._checkUpdatedMaxSkillProgress = function(skillId) {
        // It's possible for the current exp to be corrupted so it's checked too
        _SP._onCurrentSkillProgress.call(
                this, skillId, this.currentSkillProgress(skillId));
        //
    }; // _SP._checkUpdatedMaxSkillProgress

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {Number} value - The new experience of the skill involved
     */
    _SP._onCurrentSkillProgress = function(skillId, value) {
        if (!this.canSkillProgress(skillId)) return;
        this.setCurrentSkillProgress(skillId, value);
    }; // _SP._onCurrentSkillProgress

    ["useGainSkillProgress", "hitGainSkillProgress"].forEach(function(func) {
        /**
         * The this pointer is Game_Actor.prototype
         * Nullipotent
         * @since v1.00a @version v1.00a
         * @param {Id} skillId - The id of the skill involved
         * @param {Game_Battler?} target - The target hit by the skill involved
         * @param {Number?} value - The damage of the hit involved
         * @returns {Number} The new experience of the skill involved
         */
        _SP["_" + func] = function(skillId, target, value) {
            return this.currentSkillProgress(skillId) +
                    this[func](skillId, target, value);
        }; // _SP["_" + func]
    });

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    _SP._onSkillProgress = function(skillId) {
        this._skillProgress.notes.run(["willEnd"], skillId);
        _SP._progressSkill.call(this, skillId);
        this._skillProgress.notes.run(["didEnd"], skillId);
    }; // _SP._onSkillProgress

    /**
     * The this pointer is Game_Actor.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    _SP._progressSkill = function(skillId) {
        this.nextSkillProgress(skillId).forEach(this.learnSkill, this);
        if (!this.isKeepSkillProgress(skillId)) this.forgetSkill(skillId);
        // Otherwise increasing max might accidentally progress skill repeatedly
        this._skillProgress.isEnded[skillId] = true;
        //
    }; // _SP._progressSkill

    /**
     * The this pointer is Game_Actor.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Boolean} The check result
     */
    _SP._canSkillProgress = function(skillId) {
        // Not using isSkillProgress is to handle nondeterministic descs
        var descs = this.skillProgressCondDesc(skillId);
        //
        var keys = Object.keys(descs);
        // Refer to reference tag SKILL_COND_DESCS
        return keys.length > 0 && keys.every(function(desc) {
            return descs[desc];
        });
        //
    }; // _SP._canSkillProgress

    /**
     * The this pointer is Game_Actor.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Boolean} The check result
     */
    _SP._isValidMax = function(skillId) {
        // Refer to reference tag INVALID_MAX
        var max = this.maxSkillProgress(skillId);
        return !isNaN(max) && max > 0;
        //
    }; // _SP._isValidMax

    /**
     * The this pointer is Game_Actor.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @returns {Boolean} The check result
     */
    _SP._isValidNext = function(skillId) {
        // Refer to reference tag INVALID_NEXT
        var next = this.nextSkillProgress(skillId);
        if (!Array.isArray(next) || next.length <= 0) return false;
        return next.every(function(skillId) { return $dataSkills[skillId]; });
        //
    }; // _SP._isValidNext

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Party
 *      - Clears actor notetag before save and inits them afterwards/upon load
 *----------------------------------------------------------------------------*/

(function() {

    "use strict";

    var $ = Game_Party.prototype;

    ["initSkillProgressNotes", "clearSkillProgressNotes"].forEach(function(f) {
        /**
         * Idempotent
         * @interface @since v1.00a @version v1.00a
         */
        $[f] = function() { this.members().forEach(function(m) { m[f](); }); };
    });

})();

/*----------------------------------------------------------------------------
 *    # New class: Game_SkillProgressNotes
 *      - Calculates the results from/Runs the effective notetag list
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var $ = Game_SkillProgressNotes.prototype;
    var _SP = SP.Game_SkillProgressNotes = {};
    // Refer to reference tag DEFAULT_CHAINING_RULE_FIRST
    _SP._DEFAULT_CHAINING_RULE = "first";
    //
    _SP._IS_VALID_RESULT = function(result) {
        return result !== null && result !== undefined;
    }; // _SP._IS_VALID_RESULT

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Actor} _actor: The actor owning the effective notetag list
    // {Game_SkillProgressCache} _cache: The helper caching notetag list/result
    // {Game_SkillProgressPairs} _pairs: The helper checking/returning note pair
    // {Game_SkillProgressRules} _rules: The helper using the rule to chain note

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $.initialize = function(actor) {
        this._init(actor);
        this.raiseAllChangeFactors();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.clear = function() {
        // Avoids memory leaks
        delete this._actor;
        this._pairs.clear(); // It's idempotent so it doesn't hurt to play safe
        this._rules.clear();
        //
    }; // $.clear

    [
        "markChangeFactors",
        "raiseMarkedChangeFactors",
        "raiseAllChangeFactors",
        "raisePartChangeFactors",
        "raiseChangeFactor",
        "cachedPartResult",
        "invalidateResultCache"
    ].forEach(function(f) {
        // Refer to the Game_SkillProgressCache counterparts
        $[f] = function() {
            return this._cache[f].apply(this._cache, arguments);
        }; // $[f]
        //
    });

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.result = function(note, skillId, target, value) {
        // It's infeasible to cache target so value's not used here to miss it
        var cache = this._cache.result(note, skillId);
        //
        // It's possible for a cached result to be intentionally false
        if (_SP._IS_VALID_RESULT(cache)) return cache;
        //
        // It's better to return an invalid result than to spoil the cache
        if (!skillId) return this._pairs.default(note, skillId, target, value);
        return this._updatedResult(note, skillId, target, value);
        //
    }; // $.result

    /**
     * @interface @since v1.00a @version v1.00a
     * @param {[String]} notes - The list of notes to have their contents run
     * @param {Id} skillId - The id of the skill involved
     */
    $.run = function(notes, skillId) {
        notes.forEach(this._run.bind(this, skillId));
    }; // $.run

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $._init = function(actor) {
        this._actor = actor;
        // Not making these as explicit dependecies' to simplify its uses
        this._cache = new Game_SkillProgressCache();
        this._pairs = new Game_SkillProgressPairs(actor);
        this._rules = new Game_SkillProgressRules(this._pairs);
        //
    }; // $._init

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._updatedResult = function(note, skillId, target, value) {
        // Refer to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedResult(note, skillId, target, value);
        this._cache.updateResultCaches(skillId, target, value, note, result);
        return result;
        //
    }; // $._updatedResult

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._uncachedResult = function(note, skillId, target, value) {
        var chainingRule = this._chainingRule(skillId, note);
        return this[this._updatedResultFunc(chainingRule)](
                note, skillId, target, value, chainingRule);
    }; // $._uncachedResult

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @returns {String} The requested name of the function to be used
     */
    $._updatedResultFunc = function(chainingRule) {
        return this._rules.isAssociative(chainingRule) ?
                "_associativeResult" : "_nonAssociativeResult";
    }; // $._updatedResultFunc

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainRule - The effective notetag result chaining rule
     * @returns {*} The requested result from all effective notetags involved
     */
    $._associativeResult = function(note, skillId, target, value, chainRule) {
        var partResults =
                this._partResults(note, skillId, target, value, chainRule);
        var defaultResult = this._pairs.default(note, skillId, target, value);
        return this._chainedResult(partResults, skillId, note, target, value,
                chainRule, "parts", defaultResult);
    }; // $._associativeResult

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainRule - The effective notetag result chaining rule
     * @returns {[[]]*} The requested results of all effective notetags parts
     */
    $._partResults = function(note, skillId, target, value, chainRule) {
        // Refer to reference tag NOTE_LIST_PART
        var partResults = this._priority(skillId, note).map(this._partResult.
                bind(this, note, skillId, target, value, chainRule));
        //
        return partResults.filter(_SP._IS_VALID_RESULT);
    }; // $._partResults

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} chainingRule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._partResult = function(note, skillId, target, value, chainingRule, part) {
        var cache = this._cache.partResult(note, part);
        // It's possible for a cached result to be intentionally false
        if (_SP._IS_VALID_RESULT(cache)) return cache;
        //
        return this._updatedPartResult(
                note, skillId, target, value, chainingRule, part);
    }; // $._partResult

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._updatedPartResult = function(note, skillId, target, value, rule, part) {
        // Refer to reference tag NOTE_RESULT_CACHE
        var result = this._uncachedPartResult(note, skillId, target, value,
                rule, part);
        this._cache.updatePartResultCaches(note, skillId, part, result);
        return result;
        //
    }; // $._updatedPartResult

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $._uncachedPartResult = function(note, skillId, target, value, rule, part) {
        var list = this._listPart(skillId, note, part);
        // The 1st datum in the part list must be the initial value of the part
        return list.length <= 0 ? undefined : this._chainedResult(
                list, skillId, note, target, value, rule, "list");
        //
    }; // $._uncachedPartResult

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} rule - The effective notetag result chaining rule
     * @returns {*} The requested result from all effective notetags involved
     */
    $._nonAssociativeResult = function(note, skillId, target, value, rule) {
        var defaultResult = this._pairs.default(note, skillId, target, value);
        return this._chainedResult(this._list(skillId, note), skillId, note,
                target, value, rule, "list", defaultResult);
    }; // $._nonAssociativeResult

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {[{*}]} list - The effective notetag list to be chained
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its end result retrieved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} r - The effective notetag result chaining rule
     * @param {String} t - The type of the list to be chained(list/parts)
     * @param {*?} i - The initial result to chain the notetag list
     * @returns {*} The requested result from all effective notetags involved
     */
    $._chainedResult = function(list, skillId, note, target, value, r, t, i) {
        return this._rules.chainResultFunc(note, r, t)(
                list, skillId, note, target, value, i);
    }; // $._chainedResult

    /**
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its contents run
     */
    $._run = function(skillId, note) {
        // Refer to reference tag RUN_DEFAULT_FIRST
        this._pairs.default(note, skillId);
        //
        if (!skillId) return; // It's better to be no-op than to spoil the cache
        var list = this._rules.chainedRunListFunc(
                this._chainingRule(skillId, note))(this._list(skillId, note));
        // Binding run here would cause target and value to be index and list
        list.forEach(function(d) { this._pairs.run(skillId, note, d); }, this);
        //
    }; // $._run

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {String} The requested effective notetag chaining rule
     */
    $._chainingRule = function(skillId, note) {
        // Refer to reference tag THIS_GAME_ACTOR
        return SP.params[note + "NoteChainingRule"].call(
                this._actor, skillId) || _SP._DEFAULT_CHAINING_RULE;
        //
    }; // $._chainingRule

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._list = function(skillId, note) {
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.list(skillId, note) ||
                this._updatedList(skillId, note);
        //
    }; // $._list

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedList = function(skillId, note) {
        // Refer to reference tag NOTE_LIST_CACHE
        var list = this._uncachedList(skillId, note);
        this._cache.updateListCaches(skillId, note, list);
        return list;
        //
    }; // $._updatedList

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedList = function(skillId, note) {
        // Refer to reference tag NOTE_LIST_PART
        return this._priority(skillId, note).reduce(function(list, part) {
            // The function's easy, simple and small enough to be inlined
            return list.concat(this._listPart(skillId, note, part));
            //
        }.bind(this), []);
        //
    }; // $._uncachedList

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[String]} The requested data type priority queue
     */
    $._priority = function(skillId, note) {
        // Refer to reference tag NOTE_DATA_TYPES and THIS_GAME_ACTOR
        return ["skills"].concat(
                SP.params[note + "NotePriority"].call(this._actor, skillId));
        //
    }; // $._priority

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._listPart = function(skillId, note, part) {
        // A valid cache must be an Array so a falsy cache must be discarded
        return this._cache.listPart(note, part) ||
                this._updatedListPart(skillId, note, part);
        //
    }; // $._listPart

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._updatedListPart = function(skillId, note, part) {
        // Refer to reference tag NOTE_LIST_CACHE
        var list = this._uncachedListPart(skillId, note, part);
        this._cache.updatePartListCaches(skillId, note, part, list);
        return list;
        //
    }; // $._updatedListPart

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._uncachedListPart = function(skillId, note, part) {
        return this._partList(skillId, part).map(
                this._pairs.validData.bind(this._pairs, note)).filter(
                this._pairs.hasPairs.bind(this._pairs, note));
    }; // $._uncachedListPart

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $._partList = function(skillId, part) {
        var list = part === "skills" ?
                [$dataSkills[skillId]] : this._actor[part]();
        return Array.isArray(list) ? list : [list];
    }; // $._partList

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SkillProgressCache
 *      - Caches the effective notetag lists and their end results
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var $ = Game_SkillProgressCache.prototype;
    var _SP = SP.Game_SkillProgressCache = {};
    // Otherwise the skill part might be mixed up by different skill ids
    _SP._FACTOR_PART_KEY = function(skillId, fp) {
        return skillId && fp === "skills" ? fp + skillId : fp;
    }; // _SP._FACTOR_PART_KEY
    //
    // Refer to reference tag NOTE_DATA_TYPES
    _SP._FACTORS = [
        "actor",
        "currentClass",
        "weapons",
        "armors",
        "skills",
        "states",
        "priority",
        "chainingRule",
        "result"
    ];
    //
    // Refer to reference tag NOTE_TYPE
    _SP._NOTES = [
        "cond",
        "max",
        "useGain",
        "hitGain",
        "next",
        "keepCurrent",
        "willEnd",
        "didEnd"
    ];
    //

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{{*}}} _cachedLists: The mapping from a note to its notetag list
    // {{{*}}} _cachedResults: The mapping from a note to its cached result
    // {{{Boolean}}} _changeFactorMarks: The map of all change factor marks
    // {{{Boolean}}} _changeFactors: The map of all change factors for all notes
    // {{{Boolean}}} _isSameLists: The map of whether the list cache's valid
    // {{{Boolean}}} _isSameResults: The map of whether the result cache's valid
    // {{{*}}} _partLists: The mapping from a note to its notetag list parts
    // {{{*}}} _partResults: The mapping from a note to its cached result parts
    // (Advanced){Boolean} _hasUnknownChangeFactor: ADVANCED_SCRIPT_CALLS_ONLY

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     */
    $.initialize = function() {
        this._init();
        this.raiseAllChangeFactors();
    }; // $.initialize

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {[String]} factors - The change factors to be marked for all notes
     */
    $.markChangeFactors = function(factors) {
        factors.forEach(this._markChangeFactor, this);
    }; // $.markChangeFactors

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.raiseMarkedChangeFactors = function() {
        // Not using raiseAllChangeFactors is to be flexible with creative uses
        _SP._NOTES.forEach(this._raiseMarkedNoteChangeFactors, this);
        //
    }; // $.raiseMarkedChangeFactors

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.raiseAllChangeFactors = function() {
        // They use separate containers so it must be called multiple times
        this._changeFactorMarks = this._allEmptyContainers();
        this._changeFactors = this._allRaisedChangeFactors();
        this._isSameLists = this._allEmptyContainers();
        this._isSameResults = this._allEmptyContainers();
        //
    }; // $.raiseAllChangeFactors

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {[String]} factors - The list of change factors to be raised
     * @param {Id?} skillId - The id of the skill involved
     */
    $.raisePartChangeFactors = function(factors, skillId) {
        // The function's easy, simple and small enough to be inlined
        _SP._NOTES.forEach(function(note) {
            factors.forEach(function(factor) {
                // The argument list must be in this order as it's script call
                this.raiseChangeFactor(note, factor, skillId);
                //
            }, this);
        }, this);
        //
    }; // $.raisePartChangeFactors

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its change factor raised
     * @param {String} factor - The change factor to be raised for the note
     * @param {Id?} skillId - The id of the skill involved
     */
    $.raiseChangeFactor = function(note, factor, skillId) {
        var key = _SP._FACTOR_PART_KEY(skillId, factor);
        this._changeFactors[note][key] = true;
        this._changeFactorMarks[note][key] = false;
        // The cache validity flags should be erased upon any factor change
        this._isSameLists[note] = {};
        this._isSameResults[note] = {};
        //
    }; // $.raiseChangeFactor

    /**
     * Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to having its part result caches
     * @param {String} part - The note part to have its part result cache
     * @returns {*} The requested effective notetag list part result cache
     */
    $.cachedPartResult = function(note, part) {
        return this._partResults[note][part];
    }; // $.cachedPartResult

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its part result cache invalidated
     * @param {String} part - The note part to have its result cache invalidated
     */
    $.invalidateResultCache = function(note, part) {
        delete this._partResults[note][part];
        // The cache validity flags should be erased upon any factor change
        this._isSameResults[note] = {};
        //
    }; // $.invalidateResultCache

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.result = function(note, skillId) {
        // It's infeasible to cache target so value's not used here to miss it
        if (!this._isSameResults[note][skillId]) return undefined;
        return this._cachedResults[note][skillId];
        //
    }; // $.result

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {String} part - The note part to have its part result retrieved
     * @returns {*} The requested result from all effective notetags involved
     */
    $.partResult = function(note, part) {
        // The skill change factor's raised upon changing skills so it's ok here
        if (this._changeFactors[note][part]) return undefined;
        return this.cachedPartResult(note, part);
        //
    }; // $.partResult

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its end result retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {String} part - The note part to have its part result retrieved
     * @param {*} result - The effective notetag list part result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updatePartResultCaches = function(note, skillId, part, result) {
        var key = _SP._FACTOR_PART_KEY(skillId, part);
        this._partResults[note][key] = result;
        this._changeFactors[note][key] = false;
    }; // $.updatePartResultCaches

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @param {String} note - The note to have its end result retrieved
     * @param {*} result - The effective notetag list result to be cached
     * @returns {*} The requested result from all effective notetags involved
     */
    $.updateResultCaches = function(skillId, target, value, note, result) {
        // It's infeasible to cache target so value's used here to miss it later
        var key = target ?
                JSON.stringify({ skillId: skillId, value: value }) : skillId;
        this._cachedResults[note][key] = result;
        //
        this._isSameResults[note][skillId] = true;
    }; // $.updateResultCaches

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $.list = function(skillId, note) {
        // A valid list must be truthy so this shorthand can be used
        return this._isSameLists[note][skillId]
                && this._cachedLists[note][skillId];
        //
    }; // $.list

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @returns {[{*}]} The list of data having the effective notetags involved
     */
    $.listPart = function(note, part) {
        // The skill change factor's raised upon changing skills so it's ok here
        return !this._changeFactors[note][part] && this._partLists[note][part];
        //
    }; // $.listPart

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {String} part - The note part to have its effective list returned
     * @param {[{*}]} partList The list of data having the notetags involved
     */
    $.updatePartListCaches = function(skillId, note, part, partList) {
        var key = _SP._FACTOR_PART_KEY(skillId, part);
        // partList's supposed to be immutable so it's safe here
        this._partLists[note][key] = partList; // partList.clone();
        //
        this._changeFactors[note][key] = false;
    }; // $.updatePartListCaches

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its effective list returned
     * @param {[{*}]} list - The list of data having the notetags involved
     */
    $.updateListCaches = function(skillId, note, list) {
        // list's supposed to be immutable so it's safe here
        this._cachedLists[note][skillId] = list; // list.clone();
        //
        this._isSameLists[note][skillId] = true;
    }; // $.updateListCaches

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._init = function() {
        // They use separate containers so it must be called multiple times
        this._cachedLists = this._allEmptyContainers();
        this._cachedResults = this._allEmptyContainers();
        this._partLists = this._allEmptyContainers();
        this._partResults = this._allEmptyContainers();
        //
        // Set it as false only if you're sure this plugin's all change factors
        this._hasUnknownChangeFactor = true;
        //
    }; // $._init

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @returns {{{*}}} The requested mapping from a note to its container
     */
    $._allEmptyContainers = function() {
        // The function's easy, simple and small enough to be inlined
        return this._allNoteContainers(function() { return {}; });
        //
    }; // $._allEmptyContainers

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @returns {{{Boolean}}} The mapping of all change factors for all notes
     */
    $._allRaisedChangeFactors = function() {
        return this._allNoteContainers(this._raisedChangeFactors.bind(this));
    }; // $._allRaisedChangeFactors

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @returns {{Boolean}} The mapping of all change factors for all notes
     */
    $._raisedChangeFactors = function() {
        // The function's easy, simple and small enough to be inlined
        return _SP._FACTORS.reduce(function(factors, factor) {
            factors[factor] = true;
            return factors;
        }, {});
        //
    }; // $._raisedChangeFactors

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {()} noteContainerFunc - The function returning a container
     * @returns {{{*}}} The mapping of each note to its container
     */
    $._allNoteContainers = function(noteContainerFunc) {
        // The function's easy, simple and small enough to be inlined
        return _SP._NOTES.reduce(function(containers, note) {
            // The container must be created here to ensure its independence
            containers[note] = noteContainerFunc();
            //
            return containers;
        }, {});
        //
    }; // $._allNoteContainers

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} factor - The change factor to be marked for all notes
     */
    $._markChangeFactor = function(factor) {
        _SP._NOTES.forEach(this._markNoteChangeFactor.bind(this, factor));
    }; // $._markChangeFactor

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} factor - The change factor to be marked for the note
     * @param {String} note - The note to have its change factor marked
     */
    $._markNoteChangeFactor = function(factor, note) {
        this._changeFactorMarks[note][factor] = true;
    }; // $._markNoteChangeFactor

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its marked change factors raised
     */
    $._raiseMarkedNoteChangeFactors = function(note) {
        this._raisedNoteChangeFactors(note).forEach(
                this.raiseChangeFactor.bind(this, note));
        //
    }; // $._raiseMarkedNoteChangeFactors

    /**
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its marked change factors raised
     */
    $._raisedNoteChangeFactors = function(note) {
        var marks = this._changeFactorMarks[note];
        var factors = this._markedNoteChangeFactors(marks);
        // Falsy this._hasUnknownChangeFactor might reduce redundant recaches
        if (!this._hasUnknownChangeFactor || factors.length > 0) return factors;
        //
        // Raises all factors if none's marked to avoid missing possible changes
        return Object.keys(marks);
        //
    }; // $._raisedNoteChangeFactors

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {{Boolean}} marks - The map of all the note change factor marks
     */
    $._markedNoteChangeFactors = function(marks) {
        // The function's easy, simple and small enough to be inlined
        return Object.keys(marks).filter(function(f) { return marks[f]; });
        //
    }; // $._markedNoteChangeFactors

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SkillProgressPairs
 *      - Converts the effective notetag pairs to the referred functions
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var $ = Game_SkillProgressPairs.prototype;
    var _SP = SP.Game_SkillProgressPairs = {};
    // Refer to reference tag NOTE_SUFFIX
    _SP._FUNCS = {
        cfg: function(type, entry) { return SP.notes[entry]; },
        val: function(type, entry) {
            var func = _SP._RESULTS[type];
            return func ? func.bind(_SP, entry) : function() { return entry; };
        },
        switch: function(type, entry) {
            return $gameSwitches.value.bind($gameSwitches, +entry);
        },
        event: function(type, entry) {
            return $gameTemp.reserveCommonEvent.bind($gameTemp, +entry);
        },
        var: function(type, entry) {
            var f = _SP._RESULTS[type];
            if (!f) return $gameVariables.value.bind($gameVariables, +entry);
            return function() { return f($gameVariables.value(+entry)); };
        },
        // Function contents' not supposed to change frequently so it's ok here
        script: function(type, entry) {
            return new Function("skillId", "datum", "target", "value",
                    $gameVariables.value(+entry));
        },
        eval: function(type, entry) {
            return new Function("skillId", "datum", "target", "value", entry);
        }
        //
    };
    //
    _SP._RESULTS = {
        boolean: function(result) { return result.toLowerCase() === "true"; },
        number: function(result) { return +result; },
        numberArray: function(result) {
            // Refer to reference tag NUMBER_ARRAY
            return result.split("_").map(function(r) { return +r; });
            //
        }
    };
    // Refer to reference tag NOTE_SUFFIX
    _SP._SUFFIXES = {
        run: ["cfg", "event", "script", "eval"],
        result: ["cfg", "val", "switch", "var", "script", "eval"]
    };
    //
    _SP._NUMBER_RESULT_NOTES = {
        hasPair: "_hasPair",
        pairFunc: "_pairFunc",
        result: "number",
        suffixes: _SP._SUFFIXES.result
    };
    _SP._BASE_RUN_NOTES = {
        hasPair: "_hasPair",
        pairFunc: "_pairFunc",
        suffixes: _SP._SUFFIXES.run
    };
    // Refer to reference tag NOTE_TYPE
    _SP._NOTES = {
        cond: {
            hasPair: "_hasCondPair",
            pairFunc: "_condPairFunc",
            suffixes: _SP._SUFFIXES.result
        },
        max: _SP._NUMBER_RESULT_NOTES,
        useGain: _SP._NUMBER_RESULT_NOTES,
        hitGain: _SP._NUMBER_RESULT_NOTES,
        next: {
            hasPair: "_hasPair",
            pairFunc: "_pairFunc",
            result: "numberArray",
            suffixes: _SP._SUFFIXES.result
        },
        keepCurrent: {
            hasPair: "_hasPair",
            pairFunc: "_pairFunc",
            result: "boolean",
            suffixes: _SP._SUFFIXES.result
        },
        willEnd: _SP._BASE_RUN_NOTES,
        didEnd: _SP._BASE_RUN_NOTES
    };
    //
    // Refer to reference tag NOTE_DEFAULT_RESULTS
    _SP._DEFAULT_RESULTS = {
        // Using {} would cause inconsistent mixObject result argument type
        cond: function() { return [] },
        //
        next: function() { return [] }
    };
    //

    var notes = {
        max: "defaultMax",
        useGain: "defaultUseGain",
        hitGain: "defaultHitGain",
        keepCurrent: "defaultKeepCurrent",
        willEnd: "willEnd",
        didEnd: "didEnd"
    };
    Object.keys(notes).forEach(function(note) {
        var param = notes[note];
        // The this pointer is Game_SkillProgressPairs.prototype
        _SP._DEFAULT_RESULTS[note] = function(skillId, target, value) {
            // It's possible that SP.params[param] changes midway
            return SP.params[param].call(this._actor, skillId, target, value);
            //
        };
        //
    });

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {Game_Actor} _actor: The actor owning the effective notetag list

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor owning the effective notetag list
     */
    $.initialize = function(actor) { this._actor = actor; };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.clear = function() { delete this._actor; /* Avoids memory leaks */ };

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {Id} skillId - The id of the skill involved
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {*} The default result of the note
     */
    $.default = function(note, skillId, target, value) {
        return _SP._DEFAULT_RESULTS[note].call(this, skillId, target, value);
    }; // $.default

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {{*}?} The datum having the notetag involved
     */
    $.validData = function(note, datum) {
        if (!datum) return datum;
        var skillProgress = datum.meta.skillProgress;
        var pairs = skillProgress[note];
        skillProgress[note] = pairs && pairs.filter(
                this[_SP._NOTES[note].hasPair].bind(this, note));
        return datum;
    }; // $.validData

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {Boolean} The check result
     */
    $.hasPairs = function(note, datum) {
        var pairs = this._pairs(note, datum);
        return pairs && pairs.length > 0;
    }; // $.hasPairs

    /**
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     * @param {String} note - The note to have its contents run
     * @param {{*}} datum - The datum having the note to have its contents run
     * @param {Game_Battler?} target - The target hit by the skill involved
     * @param {Number?} value - The damage of the hit involved
     * @returns {[*]} The result of the notetag function involved
     */
    $.run = function(skillId, note, datum, target, value) {
        var results = this.pairs(note, datum).map(function(func) {
            return func(skillId, datum, target, value);
        });
        if (_SP._NOTES[note].result !== "numberArray") return results;
        return results.reduce(function(list, result) {
            return list.concat(result);
        }, []);
    }; // $.run

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {[(Id, {*}, Game_Battler?, Number?) -> *]} The functions referred
     *                                                    by the notetag pairs
     */
    $.pairs = function(note, datum) {
        var pairs = this._pairs(note, datum);
        return pairs ? pairs.map(
                this[_SP._NOTES[note].pairFunc].bind(this, note)) : [];
    }; // $.pairs

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}?} pair - The suffix-entry pair of the note involved
     * @returns {Boolean} The check result
     */
    $._hasCondPair = function(note, pair) {
        if (!pair || !pair.entry1 || !pair.entry2) return false;
        return [pair.suffix1, pair.suffix2].every(
                this._isValidSuffix.bind(this, note));
    }; // $._hasCondPair

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}?} pair - The suffix-entry pairs of the note involved
     * @returns {Boolean} The check result
     */
    $._hasPair = function(note, pair) {
        return pair && pair.entry1 && this._isValidSuffix(note, pair.suffix1);
    }; // $._hasPair

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {String} suffix - The notetag suffix to be checked against
     * @returns {Boolean} The check result
     */
    $._isValidSuffix = function(note, suffix) {
        return _SP._NOTES[note].suffixes.indexOf(suffix) >= 0;
    }; // $._isValidSuffix

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have their contents run
     * @param {{*}?} datum - The datum having the notetag involved
     * @returns {[{String}?]} The suffix-entry pairs of the note involved
     */
    $._pairs = function(note, datum) {
        // Refer to reference tag NOTETAG_MULTI
        return datum && datum.meta.skillProgress[note];
        //
    }; // $._pairs

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}} pair - The suffix-entry pair of the note involved
     * @returns {(Id, {*}, ) -> String} The function referred by the cond pairs
     */
    $._condPairFunc = function(note, pair) {
        var descFunc = _SP._FUNCS[pair.suffix2]("string", pair.entry2);
        var condFunc = _SP._FUNCS[pair.suffix1]("boolean", pair.entry1);
        return function(skillId, datum) {
            // Refer to reference tag THIS_GAME_ACTOR
            var result = {}, desc = descFunc.call(this._actor, skillId, datum);
            //
            // Refer to reference tag INVALID_COND_DESC and THIS_GAME_ACTOR
            if (desc) result[desc] = condFunc.call(this._actor, skillId, datum);
            //
            return result;
        }.bind(this);
    }; // $._condPairFunc

    /**
     * Pure Function
     * @since v1.00a @version v1.00a
     * @param {String} note - The note to have its pairs retrieved
     * @param {{String}} pairs - The suffix-entry pairsof the note involved
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function referred
     *                                                  by the notetag pairs
     */
    $._pairFunc = function(note, pair) {
        // Refer to reference tag THIS_GAME_ACTOR
        return _SP._FUNCS[pair.suffix1](
                _SP._NOTES[note].result, pair.entry1).bind(this._actor);
        //
    }; // $._pairFunc

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New private class: Game_SkillProgressRules
 *      - Chains the effective notetag list into its results using the rules
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var $ = Game_SkillProgressRules.prototype;
    var _SP = SP.Game_SkillProgressRules = {};
    _SP._CHAINED_RESULT_FUNC = {
        // The control coupling's to simplify the use of these functions
        concat: function(isSome) {
            return new Function("chainedResult", "result", isSome ? [
                "var cr = chainedResult.concat(result);",
                /** @todo Makes this much more effective and efficient */
                "return cr.every(function(r) { return r; }) ? ",
                "        cr : cr.map(function() { return null; });"
                //
            ].join("\n") : "return chainedResult.concat(result);");
        },
        mixObject: function(isSome) {
            return new Function("chainedResult", "result", isSome ? [
                "if (!result) return chainedResult;",
                "result.forEach(function(r) {",
                "    var key = Object.keys(r)[0];",
                "    if (key) chainedResult[key] = r[key];",
                "});",
                "var keys = Object.keys(chainedResult);",
                /** @todo Makes this much more effective and efficient */
                "if (keys.some(function(k) { return !chainedResult[k]; })) {",
                "    keys.forEach(function(k) { chainedResult[k] = null; });",
                "}",
                //
                "return chainedResult;"
            ].join("\n") : [
                "if (result) result.forEach(function(r) {",
                "    var key = Object.keys(r)[0];",
                "    if (key) chainedResult[key] = r[key];",
                "});",
                "return chainedResult;"
            ].join("\n"));
        },
        //
        operator: function(operator) {
            return new Function("chainedResult", "result", [
                "return chainedResult " + operator + " result.reduce(function(cr, r) {",
                "    return cr " + operator + "r;",
                "});"
            ].join("\n"));
        }
    };
    _SP._CHAINED_RESULT_FUNCS = {
        every: {
            concat: _SP._CHAINED_RESULT_FUNC.concat(false),
            mixObject: _SP._CHAINED_RESULT_FUNC.mixObject(false),
            operator: _SP._CHAINED_RESULT_FUNC.operator("&&")
        },
        some: {
            concat: _SP._CHAINED_RESULT_FUNC.concat(true),
            mixObject: _SP._CHAINED_RESULT_FUNC.mixObject(true),
            operator: _SP._CHAINED_RESULT_FUNC.operator("||")
        }
    };
    // Refer to reference tag NOTE_OPERATORS
    ["+", "*", "-", "/", "%", "="].forEach(function(operator) {
        _SP._CHAINED_RESULT_FUNCS[operator] = {
            operator: _SP._CHAINED_RESULT_FUNC.operator(operator)
        };
    });
    //
    // The this pointer is Game_SkillProgressRules.prototype
    _SP._FIRST_LIST_MONO_FUNC = function(list, skillId, note) {
        if (list.length <= 0) return this._pairs.default(note, skillId);
        return this._pairs.run(skillId, note, list[0])[0];
    };
    _SP._LAST_LIST_MONO_FUNC = function(list, skillId, note) {
        if (list.length <= 0) return this._pairs.default(note, skillId);
        var pairs = this._pairs.run(skillId, note, list[list.length - 1]);
        return pairs[pairs.length - 1];
    };
    //
    // Refer to reference tag NOTE_TYPE
    _SP._NOTES = {
        cond: "mixObject",
        max: "operator",
        useGain: "operator",
        hitGain: "operator",
        next: "concat",
        keepCurrent: "operator"
    };
    //
    _SP._RESULT_CHAINING_RULE_FUNC = function(list, note, func, initialResult) {
        if (initialResult === null || initialResult === undefined) {
            // The initial value of concat must be an Array
            if (_SP._NOTES[note] === "concat") return list.reduce(func, []);
            //
            return list.reduce(func);
        }
        return list.reduce(func, initialResult);
    };
    _SP._RESULT_CHAINING_RULE_FUNCS = function(rule, type) {
        var func = _SP._CHAINED_RESULT_FUNCS[rule][type];
        return {
            // The this pointer is Game_SkillProgressRules.prototype
            list: function(list, skillId, note, target, value, initialResult) {
                // The only important invariant is the pair execution order
                return _SP._RESULT_CHAINING_RULE_FUNC(list.map(function(datum) {
                    return this._pairs.run(skillId, note, datum, target, value);
                }, this), note, func, initialResult);
                //
            },
            //
            // The function signature must be consistent to keep the API sane
            parts: function(list, skillId, note, target, value, initialResult) {
                return _SP._RESULT_CHAINING_RULE_FUNC(
                        list, note, func, initialResult);
            }
            //
        }
    };
    _SP._MONO_RESULT_CHAINING_RULES = function(func) {
        var listParts = { list: func, parts: func };
        return { concat: listParts, mixObject: listParts, operator: listParts };
    };
    _SP._RESULT_CHAINING_RULES = {
        every: {
            concat: _SP._RESULT_CHAINING_RULE_FUNCS("every", "concat"),
            isAssociative: true,
            mixObject: _SP._RESULT_CHAINING_RULE_FUNCS("every", "mixObject"),
            operator: _SP._RESULT_CHAINING_RULE_FUNCS("every", "operator")
        },
        some: {
            concat: _SP._RESULT_CHAINING_RULE_FUNCS("some", "concat"),
            isAssociative: true,
            mixObject: _SP._RESULT_CHAINING_RULE_FUNCS("some", "mixObject"),
            operator: _SP._RESULT_CHAINING_RULE_FUNCS("some", "operator")
        },
        "+": {
            isAssociative: true,
            operator: _SP._RESULT_CHAINING_RULE_FUNCS("+", "operator")
        },
        "*": {
            isAssociative: true,
            operator: _SP._RESULT_CHAINING_RULE_FUNCS("*", "operator")
        },
        "-": { operator: _SP._RESULT_CHAINING_RULE_FUNCS("-", "operator") },
        "/": { operator: _SP._RESULT_CHAINING_RULE_FUNCS("/", "operator") },
        "%": { operator: _SP._RESULT_CHAINING_RULE_FUNCS("%", "operator") },
        // = is intended for unintended uses so it shouldn't be associative
        "=": { operator: _SP._RESULT_CHAINING_RULE_FUNCS("=", "operator") },
        //
        // Conforms with the chaining rule interface
        first: _SP._MONO_RESULT_CHAINING_RULES(_SP._FIRST_LIST_MONO_FUNC),
        last: _SP._MONO_RESULT_CHAINING_RULES(_SP._LAST_LIST_MONO_FUNC),
        //
    };
    _SP._RUN_CHAINING_RULES = {
        every: function(list) { return list; },
        first: function(list) { return [list[0]]; },
        last: function(list) { return [list[list.length - 1]]; }
    };

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Game_SkillProgressPairs} _pairs: The helper checking/returning note pair

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_SkillProgressPairs} pairs - The note pair checker/user
     */
    $.initialize = function(pairs) { this._pairs = pairs; };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.clear = function() { this._pairs.clear(); /* Avoids memory leaks */ };

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} chainingRule - The rule to chain effective notetag list
     * @returns {Boolean} The check result
     */
    $.isAssociative = function(chainingRule) {
        // It's understood that associativity means nothing when running a list
        return _SP._RESULT_CHAINING_RULES[chainingRule].isAssociative;
        //
    }; // $.isAssociative

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} note - The note to have its effective results chained
     * @param {String} rule - The rule to chain the effective notetag list
     * @param {String} type - The type of the list to be chained(list/parts)
     * @returns {(Id, {*}, Game_Battler?, Number?) -> *} The function chaining
     *                                                  the notetag list
     */
    $.chainResultFunc = function(note, rule, type) {
        return _SP._RESULT_CHAINING_RULES[rule][_SP._NOTES[note]][type].
                bind(this);
    }; // $.chainResultFunc

    /**
     * Pure Function
     * @interface @since v1.00a @version v1.00a
     * @param {String} rule - The rule to chain the effective notetag list
     * @returns {([{*}]) -> [{*}]} The function returning chained notetag list
     */
    $.chainedRunListFunc = function(rule) {
        return _SP._RUN_CHAINING_RULES[rule];
    }; // $.chainedRunListFunc

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Game_Interpreter
 *      - Intercepts plugin command coming from this plugin as script calls
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Game_Interpreter = { orig: {}, new: {} };
    var _GI = SP.Game_Interpreter.orig, $ = Game_Interpreter.prototype;
    var _SP = SP.Game_Interpreter.new;
    _SP._CMDS = [
        "skillProgressCondDesc",
        "maxSkillProgress",
        "useGainSkillProgress",
        "hitGainSkillProgress",
        "nextSkillProgress",
        "isKeepSkillProgress",
        "currentSkillProgress",
        "setCurrentSkillProgress",
        "raiseAllSkillProgressNoteChangeFactors",
        "raiseSkillProgressNoteChangeFactor",
        "skillProgressNoteResult",
        "invalidateSkillProgressNoteResult"
    ];

    _GI.pluginCommand = $.pluginCommand;
    _SP.pluginCommand = $.pluginCommand = function(command, args) {
    // v1.00a - v1.00a; Extended
        _GI.pluginCommand.apply(this, arguments);
        // Added to invoke the plugin command from this plugin
        _SP._pluginCmd.call(this, command, args);
        //
    }; // $.pluginCommand

    /**
     * The this pointer is Game_Interpreter.prototype
     * @since v1.00a @version v1.00a
     * @param {String} cmd - The plugin command name
     * @param {[*]} args - The plugin command arguments
     */
    _SP._pluginCmd = function(cmd, args) {
        _SP._isPluginCmd.call(this, cmd) && _SP._usePluginCmd.call(this, args);
    }; // _SP._pluginCmd

    /**
     * The this pointer is Game_Interpreter.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {String} cmd - The plugin command name
     * @returns {Boolean} The check result
     */
    _SP._isPluginCmd = function(cmd) { return _SP._CMDS.indexOf(cmd) >= 0; };

    /**
     * Script call's just another way of using plugin commands
     * The this pointer is Game_Interpreter.prototype
     * @since v1.00a @version v1.00a
     * @param {String} cmd - The plugin command name
     * @param {[*]} args - The plugin command arguments
     */
    _SP._usePluginCmd = function(cmd, args) {
        // The 1st argument must always be the id of the actor involved
        $gameActors.actor(+args.shift())[cmd].apply(this, args);
        //
    }; // _SP._usePluginCmd

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Window_SkillList
 *      - Shows the progress of skills to be progressed for the actor involved
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Window_SkillList = { orig: {}, new: {} };
    var _WS = SP.Window_SkillList.orig, $ = Window_SkillList.prototype;
    var _SP = SP.Window_SkillList.new;

    _WS.isEnabled = $.isEnabled;
    _SP.isEnabled = $.isEnabled = function(item) { // v1.00a - v1.00a; Extended
        // Added to show the progress of skills to be progressed for the actor
        if (_SP._isSkillProgress.call(this, item)) return true;
        //
        return _WS.isEnabled.apply(this, arguments);
    }; // $.isEnabled

    /**
     * The this pointer is Window_SkillList.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {{*}} item - The skill to be selected by the actor
     * @returns {Boolean} The check result
     */
    _SP._isSkillProgress = function(item) {
        return this._actor.isSkillProgress(item.id);
    }; // _SP._isSkillProgress

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillProgressCmd
 *      - Lets players choose to use the skill or view its progresses
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    var $ = Window_SkillProgressCmd.prototype =
            Object.create(Window_Command.prototype);
    $.constructor = Window_SkillProgressCmd;

    /*------------------------------------------------------------------------
     *    New private instance variable
     *------------------------------------------------------------------------*/
    // {Game_Actor} _actor: The actor owning this window

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor using this window
     */
    $.initialize = function(actor) {
        // This must be run first or _makeCmdList would use a null actor
        this._actor = actor;
        //
        Window_Command.prototype.initialize.call(
                this, this.windowX(), this.windowY());
        this.openness = 0; // This must be run here or the game would crash
        // This must be run last or the parent would activate the window again
        this.deactivate();
        //
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window line height
     */
    $.lineHeight = function() { return SP.params.cmdLineH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard font size
     */
    $.standardFontSize = function() {
        return SP.params.cmdFontSize.call(this);
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard padding
     */
    $.standardPadding = function() { return SP.params.cmdPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window text padding
     */
    $.textPadding = function() { return SP.params.cmdTextPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard back opacity
     */
    $.standardBackOpacity = function() {
        return SP.params.cmdBackOpacity.call(this);
    }; // $.standardBackOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window translucent opacity
     */
    $.translucentOpacity = function() {
        return SP.params.cmdTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window spacing
     */
    $.spacing = function() { return SP.params.cmdSpacing.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window width
     */
    $.windowWidth = function() { return SP.params.cmdWinW.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window height
     */
    $.windowHeight = function() { return SP.params.cmdWinH.call(this); };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.makeCommandList = function() {
        // It's just to play safe
        Window_Command.prototype.makeCommandList.call(this);
        //
        this._makeCmdList();
    }; // $.makeCommandList

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     */
    $.setup = function() {
        this.refresh();
        this.select(0);
        this.activate();
        this.open();
        this.show();
    }; // $.setup

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window x position
     */
    $.windowX = function() { return SP.params.cmdWinX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window y position
     */
    $.windowY = function() { return SP.params.cmdWinY.call(this); };

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._makeCmdList = function() {
        // These commands must be available or this window wouldn't be setup
        this.addCommand(SP.params.cmdView.call(this), "viewSkillProgress");
        //
        // This window wouldn't open if the skill isn't usable to begin with
        this.addCommand(SP.params.cmdUse.call(this), "use");
        //
    }; // $._makeCmdList

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillProgressStat
 *      - Shows the skill current over max progression and keep current status
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    Window_SkillProgressStat.prototype =
            Object.create(Window_Selectable.prototype);
    var $ = Window_SkillProgressStat.prototype;
    $.constructor = Window_SkillProgressStat;

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor using this window
     */
    $.initialize = function(actor) {
        this._actor = actor;
        Window_Selectable.prototype.initialize.call(this, this.windowX(),
                this.windowY(), this.windowWidth(), this.windowHeight());
        this.openness = 0; // This must be run here or the game would crash
        // This must be run last or the parent would activate the window again
        this.deactivate();
        //
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window line height
     */
    $.lineHeight = function() { return SP.params.statLineH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard font size
     */
    $.standardFontSize = function() {
        return SP.params.statFontSize.call(this);
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard padding
     */
    $.standardPadding = function() { return SP.params.statPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window text padding
     */
    $.textPadding = function() { return SP.params.statTextPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard back opacity
     */
    $.standardBackOpacity = function() {
        return SP.params.statBackOpacity.call(this);
    }; // $.standardBackOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window translucent opacity
     */
    $.translucentOpacity = function() {
        return SP.params.statTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window spacing
     */
    $.spacing = function() { return SP.params.statSpacing.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window width
     */
    $.windowWidth = function() { return SP.params.statWinW.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window height
     */
    $.windowHeight = function() { return SP.params.statWinH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window x position
     */
    $.windowX = function() { return SP.params.statWinX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window y position
     */
    $.windowY = function() { return SP.params.statWinY.call(this); };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $.setup = function(skillId) { if (this.contents) this._setup(skillId); };

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $._setup = function(skillId) {
        this.contents.clear();
        this._drawStat(skillId);
        this._appear();
    }; // $._setup

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $._drawStat = function(skillId) {
        var current = this._actor.currentSkillProgress(skillId);
        var max = this._actor.maxSkillProgress(skillId);
        var isKeep = this._actor.isKeepSkillProgress(skillId);
        SP.cfgs.drawStat.call(this, current, max, isKeep);
    }; // $._drawStat

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._appear = function() {
        this.show();
        this.activate();
        this.open();
    }; // $._appear

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillProgressCond
 *      - Shows the list of prerequisites to be met for progressing the skill
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    Window_SkillProgressCond.prototype =
            Object.create(Window_Selectable.prototype);
    var $ = Window_SkillProgressCond.prototype;
    $.constructor = Window_SkillProgressCond;

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor using this window
     */
    $.initialize = function(actor) {
        this._actor = actor;
        Window_Selectable.prototype.initialize.call(this, this.windowX(),
                this.windowY(), this.windowWidth(), this.windowHeight());
        this.openness = 0; // This must be run here or the game would crash
        // This must be run last or the parent would activate the window again
        this.deactivate();
        //
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window line height
     */
    $.lineHeight = function() { return SP.params.condLineH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard font size
     */
    $.standardFontSize = function() {
        return SP.params.condFontSize.call(this);
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard padding
     */
    $.standardPadding = function() { return SP.params.condPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window text padding
     */
    $.textPadding = function() { return SP.params.condTextPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard back opacity
     */
    $.standardBackOpacity = function() {
        return SP.params.condBackOpacity.call(this);
    }; // $.standardBackOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window translucent opacity
     */
    $.translucentOpacity = function() {
        return SP.params.condTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window spacing
     */
    $.spacing = function() { return SP.params.condSpacing.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window width
     */
    $.windowWidth = function() { return SP.params.condWinW.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window height
     */
    $.windowHeight = function() { return SP.params.condWinH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window x position
     */
    $.windowX = function() { return SP.params.condWinX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window y position
     */
    $.windowY = function() { return SP.params.condWinY.call(this); };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $.setup = function(skillId) { if (this.contents) this._setup(skillId); };

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $._setup = function(skillId) {
        this.contents.clear();
        var descs = this._actor.skillProgressCondDesc(skillId);
        Object.keys(descs).forEach(function(desc, i) {
            this._drawDesc(desc, descs[desc], i);
        }, this);
        this._appear();
    }; // $._setup

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} desc - The condition description
     * @param {Boolean} isMet - The condition status
     * @param {Number} i - The index of the description in the list involved
     */
    $._drawDesc = function(desc, isMet, i) {
        this.changePaintOpacity(isMet);
        var rect = this.itemRect(i);
        this.drawText(desc, rect.x, rect.y, rect.width);
    }; // $._drawDesc

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._appear = function() {
        this.show();
        this.activate();
        this.open();
    }; // $._appear

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # New class: Window_SkillProgressNext
 *      - Shows the list of skills to be learnt upon progressing the current
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    Window_SkillProgressNext.prototype =
            Object.create(Window_Selectable.prototype);
    var $ = Window_SkillProgressNext.prototype, $$ = Window_SkillList.prototype;
    $.constructor = Window_SkillProgressNext;

    /**
     * Idempotent
     * @constructor @since v1.00a @version v1.00a
     * @param {Game_Actor} actor - The actor using this window
     */
    $.initialize = function(actor) {
        this._actor = actor;
        Window_Selectable.prototype.initialize.call(this, this.windowX(),
                this.windowY(), this.windowWidth(), this.windowHeight());
        this.openness = 0; // This must be run here or the game would crash
        // This must be run last or the parent would activate the window again
        this.deactivate();
        //
    }; // $.initialize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window line height
     */
    $.lineHeight = function() { return SP.params.nextLineH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard font size
     */
    $.standardFontSize = function() {
        return SP.params.nextFontSize.call(this);
    }; // $.standardFontSize

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard padding
     */
    $.standardPadding = function() { return SP.params.nextPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window text padding
     */
    $.textPadding = function() { return SP.params.nextTextPadding.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window standard back opacity
     */
    $.standardBackOpacity = function() {
        return SP.params.nextBackOpacity.call(this);
    }; // $.standardBackOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window translucent opacity
     */
    $.translucentOpacity = function() {
        return SP.params.nextTranslucentOpacity.call(this);
    }; // $.translucentOpacity

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window spacing
     */
    $.spacing = function() { return SP.params.nextSpacing.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window width
     */
    $.windowWidth = function() { return SP.params.nextWinW.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window height
     */
    $.windowHeight = function() { return SP.params.nextWinH.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window x position
     */
    $.windowX = function() { return SP.params.nextWinX.call(this); };

    /**
     * Hotspot/Nullipotent
     * @interface @since v1.00a @version v1.00a
     * @returns {Number} The requested window y position
     */
    $.windowY = function() { return SP.params.nextWinY.call(this); };

    /**
     * Idempotent
     * @interface @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $.setup = function(skillId) { if (this.contents) this._setup(skillId); };

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {Id} skillId - The id of the skill involved
     */
    $._setup = function(skillId) {
        this.contents.clear();
        this._data = this._actor.nextSkillProgress(skillId).map(function(ids) {
            return $dataSkills[ids];
        });
        this._data.forEach(this._drawNext, this);
        this._appear();
    }; // $._setup

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {{}} skill - The data of the skill involved
     * @param {Number} i - The index of the id of the skill in the list involved
     */
    $._drawNext = function(skill, i) { $$.drawItem.call(this, i); };

    // Reuses the Window_SkillList one so it should be treated as private
    $.costWidth = function() { return $$.costWidth.call(this); };

    // Reuses the Window_SkillList one so it should be treated as private
    $.isEnabled = function(skill) { return $$.isEnabled.call(this, skill); };

    // Reuses the Window_SkillList one so it should be treated as private
    $.drawSkillCost = function(skill, x, y, width) {
        $$.drawSkillCost.call(this, skill, x, y, width);
    }; // $.drawSkillCost

    /**
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    $._appear = function() {
        this.show();
        this.activate();
        this.open();
    }; // $._appear

})(DoubleX_RMMV.Skill_Progress);

/*----------------------------------------------------------------------------
 *    # Edit class: Scene_Skill
 *      - Shows the progress of skills to be progressed for the actor involved
 *----------------------------------------------------------------------------*/

(function(SP) {

    "use strict";

    SP.Scene_Skill = { orig: {}, new: {} };
    var _SS = SP.Scene_Skill.orig, _SP = SP.Scene_Skill.new;
    var _WS = SP.Window_SkillList.orig, $ = Scene_Skill.prototype;

    /*------------------------------------------------------------------------
     *    New private instance variables
     *------------------------------------------------------------------------*/
    // {{*}} _skillProgress: The container of all other new variables
    //       {Window_SkillProgressCmd} cmdWin: The skill progress command window
    //       {Window_SkillProgressCond} cmdWin: The skill progress cond window
    //       {Window_SkillProgressNext} cmdWin: The skill progress next window

    _SS.create = $.create;
    _SP.create = $.create = function() { // v1.00a - v1.00a; Extended
        _SS.create.apply(this, arguments);
        _SP._createWins.call(this); // Added to create the progress windows
    }; // $.create

    _SS.onItemOk = $.onItemOk;
    _SP.onItemOk = $.onItemOk = function() { // v1.00a - v1.00a; Extended
        // Edited to show the progress of the skill to be progressed or use it
        var enabled = _WS.isEnabled.call(this._itemWindow, this.item());
        var progress = _SP._isSkillProgress.call(this);
        if (enabled && progress) return this._skillProgress.cmdWin.setup();
        if (enabled && !progress) return _SS.onItemOk.apply(this, arguments);
        if (!enabled && progress) _SP._showSkillProgress.call(this);
        //
    }; // $.onItemOk

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._createWins = function() {
        this._skillProgress = {};
        ["cmdWin", "statWin", "condWin", "nextWin"].forEach(
                _SP._createWin, this);
    }; // _SP._createWins

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} win - The name of the window to be created
     */
    _SP._createWin = function(win) {
        this._skillProgress[win] = _SP["_" + win].call(this);
        this.addWindow(this._skillProgress[win]);
    }; // _SP._createWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Window_SkillProgressCmd} The requested progress command window
     */
    _SP._cmdWin = function() {
        var win = new Window_SkillProgressCmd(this.user());
        win.setHandler("viewSkillProgress", _SP._showSkillProgress.bind(this));
        win.setHandler("use", _SP._onUse.bind(this));
        win.setHandler("cancel", _SP._onWinCancel.bind(this, "cmdWin"));
        win.deselect();
        return win;
    }; // _SP._cmdWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Window_SkillProgressStat} The requested progress stat window
     */
    _SP._statWin = function() {
        return _SP._statCondNextWin.call(this, Window_SkillProgressStat);
    }; // _SP._statWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Window_SkillProgressCond} The requested progress cond window
     */
    _SP._condWin = function() {
        return _SP._statCondNextWin.call(this, Window_SkillProgressCond);
    }; // _SP._condWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Window_SkillProgressNext} The requested progress next window
     */
    _SP._nextWin = function() {
        return _SP._statCondNextWin.call(this, Window_SkillProgressNext);
    }; // _SP._nextWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @param {Window_Selectable} Win - The progress cond/next win constructor
     * @returns {Window_Selectable} The requested progress cond/next window
     */
    _SP._statCondNextWin = function(Win) {
        var win = new Win(this.user());
        win.setHandler("cancel", _SP._onStatCondNextWinCancel.bind(this));
        win.deselect();
        return win;
    }; // _SP._statCondNextWin

    /**
     * The this pointer is Scene_Skill.prototype
     * Nullipotent
     * @since v1.00a @version v1.00a
     * @returns {Boolean} The check result
     */
    _SP._isSkillProgress = function() {
        return this.actor().isSkillProgress(this.item().id);
    }; // _SP._isSkillProgress

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._showSkillProgress = function() {
        _SP._onWinCancel.call(this, "cmdWin");
        var skillId = this.item().id;
        ["statWin", "condWin", "nextWin"].forEach(function(win) {
            this._skillProgress[win].setup(skillId);
        }, this);
        // Otherwise the item window would handle the cancel button instead
        this._itemWindow.deactivate();
        //
    }; // _SP._showSkillProgress

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._onUse = function() {
        _SP._onWinCancel.call(this, "cmdWin");
        // Otherwise the item window would be active when calling determineItem
        this._itemWindow.deactivate();
        //
        _SS.onItemOk.call(this);
    }; // _SP._onUse

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     */
    _SP._onStatCondNextWinCancel = function() {
        ["statWin", "condWin", "nextWin"].forEach(_SP._onWinCancel, this);
    }; // _SP._onStatCondNextWinCancel

    /**
     * The this pointer is Scene_Skill.prototype
     * Idempotent
     * @since v1.00a @version v1.00a
     * @param {String} win - The name of the window to be closed
     */
    _SP._onWinCancel = function(win) {
        this.hideSubWindow(this._skillProgress[win]);
        this._skillProgress[win].close();
    }; // _SP._onWinCancel

})(DoubleX_RMMV.Skill_Progress);

/*============================================================================*/
