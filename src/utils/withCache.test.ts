import { describe, expect, it, vi } from "vitest";
import withCache from "./withCache";

describe("withCache", () => {
  it("should be called once with the same params", () => {
    const mock = vi.fn((a, b) => a + b);
    const cachedMock = withCache(mock);
    cachedMock("one", "two");
    cachedMock("one", "two");
    cachedMock("one", "two");

    expect(cachedMock("one", "two")).toEqual("onetwo");
    expect(mock).toHaveBeenCalledTimes(1);

    cachedMock("one", "two");
    cachedMock("one", "two");
    cachedMock("three", "four");
    cachedMock("three", "four");

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("should be called twice with different params", () => {
    const mock = vi.fn((a, b) => a + b);
    const cachedMock = withCache(mock);

    cachedMock("one", "two");
    cachedMock("one", "two");
    cachedMock("three", "four");
    cachedMock("three", "four");

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
