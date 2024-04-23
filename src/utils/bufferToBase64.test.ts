import { describe, expect, it } from "vitest";
import bufferToBase64 from "./bufferToBase64";

describe("bufferToBase64", () => {
  it("should return a base64 string", () => {
    const result = bufferToBase64(Buffer.from("Hello, World!"));

    expect(result).toBe("SGVsbG8sIFdvcmxkIQ");
  });

  it("should return a base64 string without padding", () => {
    const result = bufferToBase64(Buffer.from("Hello, World!"));

    expect(result).not.toContain("=");
  });

  it("should return a base64 string with - instead of +", () => {
    const result = bufferToBase64(Buffer.from("Hello World!"));

    expect(result).not.toContain("+");
  });

  it("should return a base64 string with _ instead of /", () => {
    const result = bufferToBase64(Buffer.from("attached/attachment.jpg"));

    expect(result).not.toContain("/");
  });
});
