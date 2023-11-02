import { describe, expect, it } from "vitest";
import finalizePath from "./finalizePath";

describe("finalizePath", () => {
  it("should return a signed url with options if salt and key are provided", () => {
    const result = finalizePath({
      options:
        "/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg",
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(
      "/wBn_dnH124irD6jiEEJ9IMd5xzYZLTCThsapoJMvbwk/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg"
    );
  });

  it("should return a insecure url with options if salt and key are not provided", () => {
    const result = finalizePath({
      options:
        "/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg",
    });

    expect(result).toBe(
      "/insecure/ar:t/cb:clear/ex:t/f:webp/g:noea:10:10/sa:10/w:300/plain/https://example.com/image.jpg"
    );
  });
});
