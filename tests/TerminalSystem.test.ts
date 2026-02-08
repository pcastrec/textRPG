// TerminalSystem.test.ts
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { TerminalSystem } from "../src/systems/TerminalSystem.js";
import readline from "readline";

// Mock readline
vi.mock("readline");

describe("TerminalSystem", () => {
  let ts: TerminalSystem;
  let rlMock: any;

  beforeEach(() => {
    rlMock = {
      question: vi.fn(),
      close: vi.fn()
    };
    (readline.createInterface as any).mockReturnValue(rlMock);
    ts = new TerminalSystem();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("readString returns user input", async () => {
    rlMock.question.mockImplementationOnce((_prompt: string, cb: (ans: string) => void) => cb(" Hello "));
    const result = await ts.readString("Enter something");
    expect(result).toBe("Hello");
    expect(rlMock.question).toHaveBeenCalledWith("Enter something\n> ", expect.any(Function));
  });

  it("readInt returns parsed integer within bounds", async () => {
    rlMock.question
      .mockImplementationOnce((_p: string, cb: any) => cb("not a number"))
      .mockImplementationOnce((_p: string, cb: any) => cb("15"));
    const result = await ts.readInt("Enter number", 10, 20);
    expect(result).toBe(15);
  });

  it("readInt keeps asking until valid input is given", async () => {
    const answers = ["5", "25", "12"]; // 5 < 10, 25 > 20, 12 valid
    let callCount = 0;
    rlMock.question.mockImplementation((_p: string, cb: any) => cb(answers[callCount++]));
    const result = await ts.readInt("Enter number", 10, 20);
    expect(result).toBe(12);
    expect(rlMock.question).toHaveBeenCalledTimes(3);
  });

  it("ask returns the correct choice index", async () => {
    rlMock.question.mockImplementationOnce((_p: string, cb: any) => cb("2"));
    const result = await ts.ask(["One", "Two", "Three"]);
    expect(result).toBe(2);
  });

  it("ask keeps asking until valid choice is given", async () => {
    const answers = ["0", "4", "3"];
    let callCount = 0;
    rlMock.question.mockImplementation((_p: string, cb: any) => cb(answers[callCount++]));
    const result = await ts.ask(["A", "B", "C"]);
    expect(result).toBe(3);
    expect(rlMock.question).toHaveBeenCalledTimes(3);
  });

  it("close closes the readline interface", () => {
    ts.close();
    expect(rlMock.close).toHaveBeenCalled();
  });
});
