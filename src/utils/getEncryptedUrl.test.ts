import { describe, expect, it } from "vitest";
import getEncryptedUrl from "./getEncryptedUrl";

describe("getEncryptedUrl", () => {
  it("should return a valid encrypted URL", () => {
    const result = getEncryptedUrl("https://example.com/image.jpg", {
      key: "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
      iv: "e664535f505d3b6ae939fe1169b22e2d",
    });

    expect(result).toBe(
      "5mRTX1BdO2rpOf4RabIuLRo5XHgNeEqAfturvYUVzVXfh75f8b5ulIvbh2JawTzP"
    );
  });
});
