# tsRPG
Implementation Typescript de JavaTextRPG developpé par Fred Diekmann pour codestudent.net

## Implementation du code
### Systems
- [~] System
- [x] Exploration (Destination 🪲) (Interaction Environment?)
- [~] Combat

- [x] GameContext naming null mais cool => PlayerCondition
- [] Remplacer console.log par state
- [x] La value des potions inutilisé 🪲
- [x] ConcreteConsumable target = self pas forcement player 🪲;
- [] Ne pas avoir owner dans Consumable & Skill ?
- [] EquipRestriction no condition yet
- [] La creation du personnage se fera avant le jeu, on injecte donc le personnage dans le jeu
- [] interface IOSystem pour pluger une autre UI


### Characteristic
- [] Attention value & maxValue 🪲
- l'attribution initiale , passage lvl ,recalcul (changement)

### Bugs

- [] Re fight AreaGoblin auto drop
- [] Explore => Enemy die await miss ?