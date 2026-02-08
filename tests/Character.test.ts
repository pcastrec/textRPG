// Character.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Character, type Characteristics } from "../src/entities/Character.js";
import { Inventory } from "../src/entities/Inventory.js";
import { Stuff } from "../src/entities/Stuff.js";
import { coupPoingt } from "../src/entities/Skill.js";

// Minimal subclass for testing
class TestCharacter extends Character {
  constructor(name: string) {
    super(name);
  }
}

describe("Character", () => {
  let char: TestCharacter;

  beforeEach(() => {
    char = new TestCharacter("Hero");
  });

  // it("initializes correctly", () => {
  //   expect(char.name).toBe("Hero");
  //   expect(char.level).toBe(0);
  //   expect(char.xp).toBe(0);
  //   expect(char.money).toBe(0);

  //   // Check characteristics
  //   const c: Characteristics = char.characteristic;
  //   expect(c.health.value).toBe(c.strength.value + c.constitution.value);
  //   expect(c.mana.value).toBe(c.intelligence.value + c.wisdom.value);
  //   expect(c.energy.value).toBe(c.dexterity.value + c.charisma.value);
  //   expect(c.health.maxValue).toBe(c.health.value);
  //   expect(c.mana.maxValue).toBe(c.mana.value);
  //   expect(c.energy.maxValue).toBe(c.energy.value);
  // });

  it("has default skills", () => {
    expect(char.skills.length).toBeGreaterThan(0);
    expect(char.skills[0]).toBeInstanceOf(coupPoingt);
  });

  it("has default inventory and stuff", () => {
    expect(char.inventory).toBeInstanceOf(Inventory);
    expect(char.stuff).toBeInstanceOf(Stuff);
  });

  it("can add items to inventory", () => {
    const item = { name: "Sword", owner: null } as any;
    char.addToInventory(item);
    expect(item.owner).toBe(char);
    expect(char.inventory.items.includes(item)).toBe(true);
  });

  it("isAlive returns true if health > 0", () => {
    const c = char.characteristic;
    c.health.value = 10;
    expect(char.isAlive()).toBe(true);

    c.health.value = 0;
    expect(char.isAlive()).toBe(false);

    c.health.value = -5;
    expect(char.isAlive()).toBe(false);
  });

  it("xp, money, and level setters/getters work", () => {
    char.xp = 100;
    char.money = 50;
    char.level = 3;

    expect(char.xp).toBe(100);
    expect(char.money).toBe(50);
    expect(char.level).toBe(3);
  });

  it("has correct action lists", () => {
    expect(char.exploreActions).toEqual(["explore", "leave"]);
    expect(char.battleActions).toEqual(["Attaque", "Objets", "Fuir"]);
  });
});
