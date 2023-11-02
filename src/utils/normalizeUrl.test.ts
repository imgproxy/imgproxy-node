import { describe, expect, it } from "vitest";
import normalizeUrl from "./normalizeUrl";

describe("normalizeUrl", () => {
  it("should return a changed url type if encryptKey is provided", () => {
    const result = normalizeUrl({
      url: { value: "https://example.com/image.jpg", type: "plain" },
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result.type).toBe("encoded");
  });

  it("should return a url type without changes if encryptKey and noEcroption are provided", () => {
    const result = normalizeUrl({
      url: { value: "https://example.com/image.jpg", type: "plain" },
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
      noEncription: true,
    });

    expect(result.type).toBe("plain");
  });

  it("should return a url type without changes if url.type is not 'plain'", () => {
    const result = normalizeUrl({
      url: {
        value: "aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS53ZWJw",
        type: "base64",
      },
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result.type).toBe("base64");
  });
});
