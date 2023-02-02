# Islands in the Void <!-- omit from toc -->

## Game concept document <!-- omit from toc -->

### Table of Contents <!-- omit from toc -->

- [Section I - Game Overview](#section-i---game-overview)
  - [Game Concept](#game-concept)
  - [Feature Set](#feature-set)
  - [Genre](#genre)
  - [Target Audience](#target-audience)
  - [Game Flow Summary](#game-flow-summary)
  - [Look and Feel](#look-and-feel)
  - [Project Scope](#project-scope)
- [Section II - Gameplay and Mechanics](#section-ii---gameplay-and-mechanics)
  - [Gameplay](#gameplay)
  - [Game Progression](#game-progression)
  - [Mechanics](#mechanics)
  - [Screen Flow](#screen-flow)
  - [Game Options](#game-options)
  - [Replaying and Saving](#replaying-and-saving)
  - [Cheats and Easter Eggs](#cheats-and-easter-eggs)
- [Section III – Story, Setting and Character](#section-iii--story-setting-and-character)
  - [Story and Narrative](#story-and-narrative)
  - [Game World](#game-world)
  - [Characters](#characters)
- [Section V - Interface](#section-v---interface)
  - [Visual System](#visual-system)
  - [Control System](#control-system)
  - [Audio](#audio)
  - [Help System](#help-system)
- [Section VII – Technical](#section-vii--technical)
  - [Target Hardware](#target-hardware)
  - [Development hardware and software](#development-hardware-and-software)
  - [Development procedures and standards](#development-procedures-and-standards)
  - [Game Engine](#game-engine)
  - [Network](#network)
  - [Scripting Language](#scripting-language)
- [Appendix A. Links](#appendix-a-links)

## Section I - Game Overview

### Game Concept

Zeppelins flying through space from planet to planet. There are some pirates and rebels in the universe. Maybe some monsters (dragons, giant insects, birds??? Last one requires the explanation of any kind of “projectile weapon”). Players need to develop their own base and outposts to explore more and enhance their vehicles and abilities.

**Keywords:** steampunk, zeppelins, idler, open universe, sandbox

### Feature Set

1. Sandbox (open world). World gives to the player mechanics (rules set) and allows them to create everything within these rules. No fixed finals, no better or worse ways.
1. Steampunk. Good steampunk setting. Zeppelins, alchemy, astrology. Based on the “Hermethicon” series by Vadim Panov.
1. Strategy. Player needs to plan their development, build factories, etc,

### Genre

Sandbox / Strategy / Idler / Role-Playing

### Target Audience

Adults are the primary audience. To keep these time-to-time players should have a good storyline and short missions should be available. Most game processes should be available in AFK (away from keyboard) mode, or even offline.

### Game Flow Summary

Game starts in the Home World - planetary system with default player’s base. This is the vault for the player. It can’t be accessible by others, it is available offline. But it gives minimal resources.

Using the Stellar Beacon player can go to the Core - online multiplayer area. Core is an absolutely safe area. Core is surrounded by the corporate territories, and there is wilderness behind it. Players may travel between systems. Each system has a main planet (with interstellar beacon) and several satellites, accessible only from inside the system. Interstellar jumps are allowed only from a main planet and only to a main planet. It is available to build outposts on distant planets and even factories and other producing buildings may be out of the main base. Players may build some kind of Police Station to change the security level of the system.

Battle is available with any kind of distant weapon: guns, rockets, lasers, etc. The battle is the step-by-step calculation, like turn based games, but without specially marked turns.

### Look and Feel

**Analogues and inspiration:** EVE Online, RAID, AFK Arena

What is the basic look and feel of the game? What is the visual style?

### Project Scope

Number of locations: a lot of generated planets (9 sizes, 6 terrain types). At least 8 planets in the home world. Planets combined into the star systems. On the planets there are three types of location (scenes): terrain (hex-grid), building (port) and observation point (place for jumps to other planets or stars). So, the locations (scenes) are:

1. Building (hangar)
1. Terrain
1. Battle
1. Observation point
1. Maybe the StarMap can be implemented as the separate scene.

There are no particular levels in this game.

Number of NPC’s: Minimum of Five
Number of weapons: Estimated Three to Five
Etc.

#### **Project tiers** <!-- omit from toc -->

To reduce “time-to-market” value the project will be divided on tiers.\

- Local roguelike game. Saved in the client’s browser, single player mode, and so on. With all attributes of genre, but with attempts to bring the elements of the declared styles such as idler and sandbox.
- Roguelike game with central (server) storage. And also leaderboard and other stuff. It should be a step to the network game with checking all necessary concepts. Main feature is the _Arena_ - the approach to PvP combats.
- True network multiplayer game. The main ambitious goal is to build a sandbox comparable with the EVE Online.

#### **Roguelike game** <!-- omit from toc -->

TBD

#### **Network multiplayer game** <!-- omit from toc -->

TDB

## Section II - Gameplay and Mechanics

### Gameplay

### Game Progression

#### Mission/challenge Structure <!-- omit from toc -->

#### Puzzle Structure <!-- omit from toc -->

#### Objectives <!-- omit from toc -->

What are the objectives of the game?

#### Play Flow <!-- omit from toc -->

How does the game flow for the game player

### Mechanics

What are the rules to the game, both implicit and explicit. This is the model of the universe that the game works under. Think of it as a simulation of a world, how do all the pieces interact? This actually can be a very large section.

#### Physics <!-- omit from toc -->

How does the physical universe work?

#### Movement <!-- omit from toc -->

General Movement
Other Movement

#### Objects <!-- omit from toc -->

Picking Up Objects
Moving Objects

#### Actions <!-- omit from toc -->

Switches and Buttons
Picking Up, Carrying and Dropping
Talking
Reading

#### Combat <!-- omit from toc -->

If there is combat or even conflict, how is this specifically modeled?

#### Economy <!-- omit from toc -->

What is the economy of the game? How does it work?

### Screen Flow

Screen Flow Chart
A graphical description of how each screen is related to every other
Screen Descriptions
What is the purpose of each screen?
Main Menu Screen
Options Screen

### Game Options

What are the options and how do they affect gameplay and mechanics?

### Replaying and Saving

### Cheats and Easter Eggs

## Section III – Story, Setting and Character

### Story and Narrative

Specific details like scripts and cut scenes may not be in this document but be in the Story Bible.

#### Back story <!-- omit from toc -->

#### Plot Elements <!-- omit from toc -->

#### Game Progression <!-- omit from toc -->

### Game World

General look and feel of world

### Characters

## Section V - Interface

### Visual System

#### HUD - What controls <!-- omit from toc -->

#### Menus <!-- omit from toc -->

#### Rendering System <!-- omit from toc -->

#### Camera <!-- omit from toc -->

#### Lighting Models <!-- omit from toc -->

### Control System

How does the game player control the game? What are the specific commands?

### Audio

#### Music <!-- omit from toc -->

#### Sound Effects <!-- omit from toc -->

### Help System

## Section VII – Technical

This may be abbreviated with most in the Technical Bible.

### Target Hardware

### Development hardware and software

### Development procedures and standards

### Game Engine

### Network

### Scripting Language

## Appendix A. Links

1. https://eve-damagecontrol.web.app example of vehicles classes and damage calculator for EVE. Good reference.
1. https://wiki.eveuniversity.org/Turret_mechanics mechanics of the weapons.
1. https://www.redblobgames.com/grids/hexagons/ tips and tricks for hexagonal grid (cosmos zones).
1. https://www.redblobgames.com/x/1640-hexagon-tiling-of-sphere/ tips and tricks on spheres in hex grid (useful for planets)
1. https://github.com/collections/javascript-game-engines list of the free game engines for JS/HTML5
1. ✅ https://phaser.io good candidate to the framework (accepted)
1. https://github.com/search?q=phaser+ui UI kits for Phaser
1. https://wiki.eveuniversity.org/Missions reference to missions in EVE Online
1. https://www.eveonline.com/eve-academy/careers/enforcer EVE Online PvE Guide as missions reference
