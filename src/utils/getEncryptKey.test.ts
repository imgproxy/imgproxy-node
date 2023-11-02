import { describe, expect, it } from "vitest";
import getEncryptKey from "./getEncryptKey";

describe("getEncryptKey", () => {
  it("should return undefined if key is not defined", () => {
    const result = getEncryptKey(undefined);

    expect(result).toBe(undefined);
  });

  it("should return String if key is defined", () => {
    const result = getEncryptKey(
      "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1"
    );

    expect(result).toBeInstanceOf(String);
  });
});
