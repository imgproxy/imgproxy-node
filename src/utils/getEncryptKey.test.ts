import { describe, expect, it, vi } from "vitest";
import crypto from "crypto";
import getEncryptPair from "./getEncryptPair";

describe("getEncryptKey", () => {
  it("should return undefined if key is not defined", () => {
    const result = getEncryptPair(undefined);

    expect(result).toBe(undefined);
  });

  it("should return object with key and generated iv if key is defined", () => {
    const spy = vi.spyOn(crypto, "randomBytes");
    spy.mockImplementationOnce(() =>
      Buffer.from("e664535f505d3b6ae939fe1169b22e2d", "hex")
    );

    const result = getEncryptPair(
      "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1"
    );

    expect(result).toStrictEqual({
      key: "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
      iv: "e664535f505d3b6ae939fe1169b22e2d",
    });
  });

  it("should return object with key and iv if they are defined", () => {
    const result = getEncryptPair(
      "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
      "e664535f505d3b6ae939fe1169b22e2d"
    );

    expect(result).toStrictEqual({
      key: "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
      iv: "e664535f505d3b6ae939fe1169b22e2d",
    });
  });
});
