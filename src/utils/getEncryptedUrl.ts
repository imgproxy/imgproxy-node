import crypto from "crypto";
import { ICryptPair } from "../types.js";
import bufferToBase64 from "./bufferToBase64.js";

const getEncryptedUrl = (url: string, pair: ICryptPair): string => {
  const bufferKey = Buffer.from(pair.key, "hex");
  const iv = Buffer.from(pair.iv, "hex");
  const data = Buffer.from(url).toString("binary");
  const cipher = crypto.createCipheriv("aes-256-cbc", bufferKey, iv);

  const encrypted = Buffer.from(
    cipher.update(data, "utf8", "binary") + cipher.final("binary"),
    "binary"
  );

  return bufferToBase64(Buffer.concat([iv, encrypted]));
};

export default getEncryptedUrl;
