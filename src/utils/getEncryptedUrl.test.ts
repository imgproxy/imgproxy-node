import { describe, expect, it, vi } from "vitest";
import crypto from "crypto";
import getEncryptedUrl from "./getEncryptedUrl";

describe("getEncryptedUrl", () => {
  it("should return a valid encrypted URL", () => {
    const mock = vi.fn().mockImplementation(crypto.randomBytes);
    mock.mockImplementationOnce(() => "b1 a0 e2 f2 b4 8b 32 c2");

    const result = getEncryptedUrl(
      "https://example.com/image.jpg",
      Buffer.from(
        "1eb5b0e971ad7f45324c1bb15c947cb207c43152fa5c6c7f35c4f36e0c18e0f1",
        "hex"
      )
    );

    expect(result).toBe(
      "cIitazvm9Xb6PCng4ZqG-s98wATciZ58YpADKTPpxK7XWKnnMDSoYrcwx7lk7vGu"
    );
  });
});
