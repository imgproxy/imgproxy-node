import { describe, expect, it, vi } from "vitest";
import crypto from "crypto";
import getEncryptedUrl from "./getEncryptedUrl";

describe("getEncryptedUrl", () => {
  it("should return a valid encrypted URL", () => {
    const spy = vi.spyOn(crypto, "randomBytes");
    spy.mockImplementationOnce(() =>
      Buffer.from("e664535f505d3b6ae939fe1169b22e2d", "hex")
    );

    const result = getEncryptedUrl(
      "https://example.com/image.jpg",
      Buffer.from(
        "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
        "hex"
      )
    );

    expect(result).toBe(
      "5mRTX1BdO2rpOf4RabIuLRo5XHgNeEqAfturvYUVzVXfh75f8b5ulIvbh2JawTzP"
    );
  });
});
