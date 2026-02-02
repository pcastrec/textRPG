# tsRPG
Implementation Typescript de JavaTextRPG developpé par Fred Diekmann pour codestudent.net
Par Pierre et Gaetan


## Mangement du projet 
lancer un contener node en it sur bash pour lancer :
- test via vitest : npm test
- lancer l'app : npx tsx main.ts
- a noter que la config du launcher determine le mode de lancement (random ou readline)
 pour le moment uniquement readline execute la sequence qu'on lui donne.


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

### Character

- bug on distance 


### Characteristic
- [] Attention value & maxValue 🪲
- l'attribution initiale , passage lvl ,recalcul (changement)