import { describe, expect, it } from "vitest";
import { OptionsImageInfo } from "@imgproxy/imgproxy-js-core";
import generateImageInfoUrl from "./generateImageInfoUrl";

describe("generateImageInfourl", () => {
  it("should generate a valid URL", () => {
    const options: OptionsImageInfo = {
      average: { average: 1, ignore_transparent: "f" },
      detect_objects: true,
      dominant_colors: { dominant_colors: 1, build_missed: 1 },
      iptc: 1,
      palette: 6,
    };

    const result = generateImageInfoUrl({
      endpoint: "https://imgproxy.example.com/",
      url: {
        value: "https://example.com/image.jpg",
        displayAs: "encrypted",
      },
      options,
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
      encryptKey:
        "52dd01d54fcbd79ff247fcff1d2f200ce6b95546f960b084faa1d269fb95d600",
    });

    expect(result).toContain("/enc/");
  });

  it("should generate a valid encoded URL withouth salt and key", () => {
    const options: OptionsImageInfo = {
      format: 1,
      blurhash: { x_components: 4, y_components: 3 },
      dimensions: false,
      xmp: false,
    };

    const result = generateImageInfoUrl({
      endpoint: "https://imgproxy.example.com",
      url: { value: "https://example.com/image.jpg" },
      options,
    });

    expect(result).toBe(
      "https://imgproxy.example.com/info/insecure/bh:4:3/d:f/f:t/xmp:f/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc="
    );
  });

  it("should generate a valid encoded URL withouth options", () => {
    const result = generateImageInfoUrl({
      endpoint: "https://imgproxy.example.com/",
      url: "https://example.com/image.jpg",
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(
      "https://imgproxy.example.com/info/S27LCUL9UqVzUUEh4PuP2fMuoszQetA6qj5T07tlmZ4/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc="
    );
  });

  it("should generate a valid plain insecure URL", () => {
    const options: OptionsImageInfo = {
      format: 1,
      blurhash: { x_components: 4, y_components: 3 },
      dimensions: false,
      xmp: false,
    };

    const result = generateImageInfoUrl({
      endpoint: "https://imgproxy.example.com/",
      url: { value: "https://example.com/image.jpg", displayAs: "plain" },
      options,
    });

    expect(result).toBe(
      "https://imgproxy.example.com/info/insecure/bh:4:3/d:f/f:t/xmp:f/plain/https://example.com/image.jpg"
    );
  });
});
