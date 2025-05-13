import { describe, expect, it } from "vitest";
import getSignedUrl from "./getSignedUrl";

describe("getSignedUrl", () => {
  it("should return a signed url with options if salt and key are provided", () => {
    const result = getSignedUrl(
      "/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg",
      {
        salt: "6c28d7a545acc92d688d5f1d3e21087a",
        key: "4aca92a7c3c68440f2c1db980c856f39",
      }
    );

    expect(result).toBe(
      "/-1bXMFE3qm-pOAgAomSBHIoNeIC9vYR6TZV5s3vkvLk/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg"
    );
  });

  it("should return a insecure url with options if salt and key are not provided", () => {
    const result = getSignedUrl(
      "/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg",
      {
        salt: "bdfbf3df94315d0c2bc7a2ef691f5d99",
        key: "db66ae1b1b73fe2851ad789a673d1698",
      }
    );

    expect(result).toBe(
      "/K-7vJsYBybwq33VIfpgm9uWUBB48BX6Y5ygsxP9hCY8/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg"
    );
  });
});
