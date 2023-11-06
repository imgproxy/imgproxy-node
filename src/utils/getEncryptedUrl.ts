import crypto from "crypto";
import { ICryptPair } from "../types.js";
import withCache from "./withCache.js";

const getEncryptedUrl = (url: string, pair: ICryptPair): string => {
  const bufferKey = Buffer.from(pair.key, "hex");
  const iv = Buffer.from(pair.iv, "hex");
  const data = Buffer.from(url).toString("binary");
  const cipher = crypto.createCipheriv("aes-256-cbc", bufferKey, iv);

  const encrypted = Buffer.from(
    cipher.update(data, "utf8", "binary") + cipher.final("binary"),
    "binary"
  );

  return Buffer.concat([iv, encrypted])
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const withCacheGetEncryptedUrl = withCache(getEncryptedUrl);

export default withCacheGetEncryptedUrl;
export { getEncryptedUrl };
