// ExplorationSystem.test.ts
import { describe, it, beforeEach, expect, vi } from "vitest";
import { ExplorationSystem } from "../src/systems/ExplorationSystem.js";
import { PlayerCondition } from "../src/entities/Restriction.js";

describe("ExplorationSystem", () => {
  let stateMock: any;
  let pathMock: any;
  let areaMock: any;
  let encounterMock: any;
  let directionMock: any;

  beforeEach(() => {
    areaMock = {
      getStringPosition: vi.fn().mockReturnValue("Area(0,0)")
    };

    pathMock = {
      from: areaMock,
      to: { getStringPosition: vi.fn().mockReturnValue("Area(1,0)") },
      encounters: []
    };

    encounterMock = {
      execute: vi.fn().mockResolvedValue(undefined)
    };

    directionMock = "NORTH"; // can be anything since move is mocked

    stateMock = {
      player: {
        move: vi.fn().mockReturnValue(pathMock),
        isAlive: vi.fn().mockReturnValue(true),
        distance: 0,
        area: areaMock
      },
      condition: null
    };
  });

  it("explore sets condition before and after, moves player, and executes encounters", async () => {
    // Add one mock encounter
    pathMock.encounters = [encounterMock];

    const result = await ExplorationSystem.explore(stateMock, directionMock);

    // Path returned correctly
    expect(result).toBe(pathMock.to);

    // Check player.move called with direction
    expect(stateMock.player.move).toHaveBeenCalledWith(directionMock);

    // Encounter executed
    expect(encounterMock.execute).toHaveBeenCalledWith(stateMock);

    // Before/After conditions
    expect(stateMock.condition).toBe(PlayerCondition.VILLAGE);

    // Player updated
    expect(stateMock.player.area).toBe(pathMock.to);
    expect(stateMock.player.distance).toBe(1);
  });

  it("does not call after if player is dead after encounters", async () => {
    stateMock.player.isAlive.mockReturnValue(false);
    pathMock.encounters = [encounterMock];

    const result = await ExplorationSystem.explore(stateMock, directionMock);

    expect(result).toBe(pathMock.to);
    expect(stateMock.condition).toBe(PlayerCondition.EXPLORATION); // before called
    expect(stateMock.player.area).toBe(areaMock); // area not updated
    expect(stateMock.player.distance).toBe(0); // distance not updated
  });

  it("explore with no encounters still updates state", async () => {
    pathMock.encounters = [];

    const result = await ExplorationSystem.explore(stateMock, directionMock);

    expect(result).toBe(pathMock.to);
    expect(stateMock.condition).toBe(PlayerCondition.VILLAGE);
    expect(stateMock.player.area).toBe(pathMock.to);
    expect(stateMock.player.distance).toBe(1);
  });
});
