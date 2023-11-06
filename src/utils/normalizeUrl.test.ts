import { describe, expect, it } from "vitest";
import normalizeUrl from "./normalizeUrl";

describe("normalizeUrl", () => {
  it("should return a throw error if resultType is 'encrypted' and encryptKey is not provided", () => {
    expect(() =>
      normalizeUrl({
        url: {
          value: "https://example.com/image.jpg",
          resultType: "encrypted",
        },
      })
    ).toThrowError(
      "You should provide encryptKey if you want to use encrypted url type"
    );
  });

  it("should return a changed url type if encryptKey is provided", () => {
    const result = normalizeUrl({
      url: { value: "https://example.com/image.jpg", resultType: "encrypted" },
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result.type).toBe("encrypted");
  });

  it("should return a url type without changes if encryptKey and noEcroption are provided", () => {
    const result = normalizeUrl({
      url: { value: "https://example.com/image.jpg", resultType: "plain" },
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
      noEncription: true,
    });

    expect(result.type).toBe("plain");
  });

  it("should return a url type is 'base64' if url is string", () => {
    const result = normalizeUrl({
      url: "https://example.com/image.jpg",
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result.type).toBe("base64");
  });

  it("should return a url type is 'base64' if url is object without url.resultType", () => {
    const result = normalizeUrl({
      url: {
        value: "https://example.com/image.jpg",
      },
    });

    expect(result.type).toBe("base64");
  });

  it("should return a url type is 'plain' if url is object with url.resultType === 'plain'", () => {
    const result = normalizeUrl({
      url: {
        value: "https://example.com/image.jpg",
        resultType: "plain",
      },
    });

    expect(result.type).toBe("plain");
  });
});
