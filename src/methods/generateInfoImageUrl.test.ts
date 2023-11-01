import { describe, expect, it } from "vitest";
import generateInfoImageUrl from "./generateInfoImageUrl";
import { OptionsImageInfo } from "@imgproxy/imgproxy-js-core";

describe("generateInfoImageUrl", () => {
  it("should generate a valid URL", () => {
    const options: OptionsImageInfo = {
      average: { average: 1, ignore_transparent: "f" },
      detect_objects: true,
      dominant_colors: { dominant_colors: 1, build_missed: 1 },
      iptc: 1,
      palette: 6,
    };

    const result = generateInfoImageUrl({
      baseUrl: "https://imgproxy.example.com/",
      url: {
        value:
          "hLhDnxN9acjq3LDooARQ3t6OU1UwAG1IeXsM2b7qxOyMP4DF+GsbBdnG1K9B0+bz",
        type: "encoded",
      },
      options,
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    const expectedUrl =
      "https://imgproxy.example.com/info/LC2MsT-Va0MQfUmVCbyP3Fp8sQX98gu3ADtXVfW3lgU/avg:t:f/do:t/dc:t:t/iptc:t/p:6/enc/hLhDnxN9acjq3LDooARQ3t6OU1UwAG1IeXsM2b7qxOyMP4DF+GsbBdnG1K9B0+bz";

    expect(result).toBe(expectedUrl);
  });

  it("should generate a valid URL withouth salt and key", () => {
    const options: OptionsImageInfo = {
      format: 1,
      blurhash: { x_components: 4, y_components: 3 },
      dimensions: false,
      xmp: false,
    };

    const result = generateInfoImageUrl({
      baseUrl: "https://imgproxy.example.com/",
      url: { value: "https://example.com/image.jpg", type: "plain" },
      options,
    });

    const expectedUrl =
      "https://imgproxy.example.com/info/insecure/bh:4:3/d:f/f:t/xmp:f/plain/https://example.com/image.jpg";

    expect(result).toBe(expectedUrl);
  });
});
