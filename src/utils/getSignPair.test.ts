import { describe, expect, it } from "vitest";
import getSignPair from "./getSignPair";

describe("setSignPair", () => {
  it("should return undefined if no salt and key are provided", () => {
    const result = getSignPair({ salt: undefined, key: undefined });

    expect(result).toBe(undefined);
  });

  it("should return undefined if no salt is provided", () => {
    const result = getSignPair({
      salt: undefined,
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toBe(undefined);
  });

  it("should return undefined if no key is provided", () => {
    const result = getSignPair({
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: undefined,
    });

    expect(result).toBe(undefined);
  });

  it("should return a valid pair if salt and key are provided", () => {
    const result = getSignPair({
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toStrictEqual({
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });
  });

  it("should return a valid pair if salt and key are provided with some variant from comma", () => {
    const result = getSignPair({
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5,ZGFkdWpqMTIxMmpqamFzZDg3NmFTMjMxRENG, YWR5Zy1YR1gwLWF4c3hoamdnR1lHYTYzMy1zamhqaF9zYWQ=",
      key: "YXNkaGo5YXNkamotc2RqaF9hamRqaGhHSkdnYXNkNzIzODBfampqYWQtc0Q=, 943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
    });

    expect(result).toStrictEqual({
      salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
      key: "YXNkaGo5YXNkamotc2RqaF9hamRqaGhHSkdnYXNkNzIzODBfampqYWQtc0Q=",
    });
  });
});
