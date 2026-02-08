// Area.test.ts
import { describe, it, expect } from "vitest";
import { BattleEncounter, ExploreEncounter } from "../src/entities/Encounter.js";
import { Goblin } from "../src/entities/Enemy.js";
import { Area, Direction } from "../src/entities/Area.js";

describe("Area", () => {

  it("initializes with correct position and default encounters", () => {
    const area = new Area({ x: 0, y: 0 });
    
    expect(area.position).toEqual({ x: 0, y: 0 });
    expect(area.visited).toBe(false);
    expect(area.encounters.length).toBe(5);

    // Check that the first 4 encounters are ExploreEncounter
    for (let i = 0; i < 4; i++) {
      expect(area.encounters[i]).toBeInstanceOf(ExploreEncounter);
    }
    expect(area.encounters[4]).toBeInstanceOf(BattleEncounter);
  });

  it("can change encounters via setter and getter", () => {
    const area = new Area({ x: 0, y: 0 });
    const newEncounters = [new BattleEncounter(new Goblin("TestGoblin"))];
    area.encounters = newEncounters;
    expect(area.encounters).toEqual(newEncounters);
  });

  it("direction returns a new Area with correct coordinates", () => {
    const area = new Area({ x: 0, y: 0 });

    const north = area.direction(Direction.NORTH);
    expect(north.position).toEqual({ x: 0, y: 1 });

    const south = area.direction(Direction.SOUTH);
    expect(south.position).toEqual({ x: 0, y: -1 });

    const east = area.direction(Direction.EAST);
    expect(east.position).toEqual({ x: 1, y: 0 });

    const west = area.direction(Direction.WEST);
    expect(west.position).toEqual({ x: -1, y: 0 });

    // Ensure it returns a new instance
    expect(north).not.toBe(area);
  });

  it("getStringPosition returns the correct string", () => {
    const area = new Area({ x: 3, y: 7 });
    expect(area.getStringPosition()).toBe("[3, 7]");
  });

  it("getEncounters returns extra generated encounters", () => {
    const area = new Area({ x: 0, y: 0 });
    const generated = area.getEncounters();
    expect(generated.length).toBe(2);
    expect(generated[0]).toBeInstanceOf(BattleEncounter);
    expect(generated[1]).toBeInstanceOf(BattleEncounter);
  });
});
