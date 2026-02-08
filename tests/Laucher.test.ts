// Launcher.test.ts
import { describe, it, beforeEach, expect, vi } from "vitest";
import { Launcher } from "../src/systems/Launcher.js";

// Mock TerminalSystem
vi.mock("./TerminalSystem.js", () => {
  return {
    TerminalSystem: vi.fn().mockImplementation(() => {
      return {
        ask: vi.fn(),
        readString: vi.fn(),
        readInt: vi.fn(),
        close: vi.fn()
      };
    })
  };
});

describe("Launcher", () => {
  let launcher: Launcher;
  let mockIOSystem: any;

  beforeEach(() => {
    launcher = new Launcher([1, 2]); // use a short sequence for testing
    mockIOSystem = launcher.state.iosystem;
  });

  it("should initialize properly", () => {
    expect(launcher.player.characteristic.health.value).toBe(30);
    expect(launcher.turn).toBe(0);
    expect(launcher.running).toBe(true);
    expect(launcher.initArea).toBeDefined();
  });

//   it("runSequence calls action for each sequence element", async () => {
//     // Mock ask to return 1 for any prompts
//     mockIOSystem.ask.mockResolvedValue(1);

//     await launcher.runSequence();

//     // It should call ask for each sequence element that requires it
//     expect(mockIOSystem.ask).toHaveBeenCalled();
//     // Sequence length is 2
//     expect(launcher.turn).toBeGreaterThanOrEqual(2); // turn increments inside action
//     expect(mockIOSystem.close).toHaveBeenCalled();
//   });

//   it("run stops when running is false", async () => {
//     // Simulate user choosing action 2 (stop) immediately
//     mockIOSystem.ask.mockResolvedValueOnce(2);

//     await launcher.run();

//     expect(launcher.running).toBe(false);
//     expect(mockIOSystem.close).toHaveBeenCalled();
//   });

//   it("action 1 triggers encounter prompt", async () => {
//     // Give player an area with one mock encounter
//     const mockEncounter = { name: "TestEncounter", execute: vi.fn() };
//     launcher.player.area.encounters = [mockEncounter];

//     mockIOSystem.ask.mockResolvedValueOnce(1); // choose encounter

//     await launcher.action(1);

//     expect(mockIOSystem.ask).toHaveBeenCalledWith(
//       ["TestEncounter"],
//       "Where do you wanna go ?"
//     );
//     expect(mockEncounter.execute).toHaveBeenCalledWith(launcher.state);
//   });

  it("action 2 sets running to false", async () => {
    await launcher.action(2);
    expect(launcher.running).toBe(false);
  });
});
