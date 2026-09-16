import { describe, expect, it } from "vitest";
import generateImageUrl from "./generateImageUrl";
import { Options } from "@imgproxy/imgproxy-js-core";

describe("generateImageUrl", () => {
  it("should generate a valid URL", () => {
    const options: Options = {
      resizing_type: "fit",
      width: 300,
      height: 300,
      gravity: { type: "no" },
      enlarge: 1,
      format: "png",
    };

    const result = generateImageUrl({
      endpoint: "https://imgproxy.example.com",
      url: { value: "https://example.com/image.jpg", displayAs: "base64" },
      options,
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(
      "https://imgproxy.example.com/zsdsCjFCqcAniKFCygMBToRh6l5jVZbL0bhrnnUGK58/el:t/f:png/g:no/h:300/rt:fit/w:300/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc"
    );
  });

  it("should generate a valid base64 when url in string type URL without salt and key", () => {
    const options: Options = {
      saturation: 10,
      auto_rotate: true,
      cachebuster: "clear",
      width: 300,
      gravity: { type: "noea", x_offset: 10, y_offset: 10 },
      extend: { extend: 1 },
      format: "webp",
    };

    const result = generateImageUrl({
      endpoint: "https://imgproxy.example.com/",
      url: "https://example.com/image.jpg",
      options,
    });

    expect(result).toBe(
      "https://imgproxy.example.com/insecure/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc"
    );
  });

  it("should generate a valid URL without options", () => {
    const result = generateImageUrl({
      endpoint: "https://imgproxy.example.com/",
      url: { value: "https://example.com/image.jpg" },
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(
      "https://imgproxy.example.com/xOner18d7-LJwkl4bifXGbC1_4kZXxsPLnuuvsMtcWo/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc"
    );
  });

  it("should generate a valid encrypted URL with encryption", () => {
    const options: Options = {
      resizing_type: "fit",
      width: 300,
      gravity: { type: "no" },
      enlarge: 1,
    };

    const result = generateImageUrl({
      endpoint: "https://imgproxy.example.com/",
      url: { value: "https://example.com/image.jpg", displayAs: "encrypted" },
      options,
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result).toContain("/enc/");
  });

  it("should return base64 url with SEO friendly filename", () => {
    expect(
      generateImageUrl({
        endpoint: "https://imgproxy.example.com/",
        url: {
          value: "https://example.com/image/pic.png",
          displayAs: "base64",
          filename: "pic.png",
        },
        salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
        key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
      })
    ).toBe(
      "https://imgproxy.example.com/6jqmVGBdkd7oDxSrQRBaeIK49YT2dsI5pxxMzgGVB4k/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS9waWMucG5n/pic.png"
    );
  });

  it("should return encrypted url with SEO friendly filename", () => {
    expect(
      generateImageUrl({
        endpoint: "https://imgproxy.example.com/",
        url: {
          value: "https://example.com/image.jpg",
          displayAs: "encrypted",
          filename: "pic.png",
        },
        salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
        key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
        encryptKey:
          "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
      })
    ).toMatch(/\/pic.png$/);
  });

  it("should throw an error if url.filename is set on a plain url", () => {
    expect(() =>
      generateImageUrl({
        endpoint: "https://imgproxy.example.com/",
        url: {
          value: "https://example.com/image.jpg",
          displayAs: "plain",
          filename: "pic.png",
        },
        salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
        key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
      })
    ).toThrow("url.filename is only valid for base64 or encrypted url");
  });
});
