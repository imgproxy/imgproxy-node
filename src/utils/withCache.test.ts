import { describe, expect, it, vi } from "vitest";
import withCache from "./withCache";

describe("withCache", () => {
  it("should be called once with the same params", () => {
    const mock = vi.fn((a, b) => a + b.key + b.salt);
    const cachedMock = withCache(mock);
    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("one", { key: "two", salt: "three" });

    expect(cachedMock("one", { key: "two", salt: "three" })).toEqual(
      "onetwothree"
    );
    expect(mock).toHaveBeenCalledTimes(1);

    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("three", { key: "four", salt: "six" });
    cachedMock("three", { key: "four", salt: "six" });

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("should be called twice with different params", () => {
    const mock = vi.fn((a, b) => a + b.key + b.salt);
    const cachedMock = withCache(mock);

    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("one", { key: "two", salt: "three" });
    cachedMock("three", { key: "four", salt: "six" });
    cachedMock("three", { key: "four", salt: "six" });

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
