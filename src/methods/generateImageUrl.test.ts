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
      "https://imgproxy.example.com/OISSn9zHS-E-xpsQPcsvKaTLVJePQgHG3MvDBbvk5lU/el:t/f:png/g:no/h:300/rt:fit/w:300/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc="
    );
  });

  it("should generate a valid base64 when url in string type URL withouth salt and key", () => {
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
      "https://imgproxy.example.com/insecure/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc="
    );
  });

  it("should generate a valid URL withouth options", () => {
    const result = generateImageUrl({
      endpoint: "https://imgproxy.example.com/",
      url: { value: "https://example.com/image.jpg" },
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(
      "https://imgproxy.example.com/S27LCUL9UqVzUUEh4PuP2fMuoszQetA6qj5T07tlmZ4/aHR0cHM6Ly9leGFtcGxlLmNvbS9pbWFnZS5qcGc="
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
});
