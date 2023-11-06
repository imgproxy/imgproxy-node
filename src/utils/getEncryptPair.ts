import crypto from "crypto";
import type { ICryptPair } from "../types";

const KEY = process.env.IMGPROXY_SOURCE_URL_ENCRYPTION_KEY;

const getEncryptPair = (
  key: string | undefined,
  genIv?: string | undefined
): ICryptPair | undefined => {
  const k = key || KEY;

  if (!k) return undefined;

  return {
    key: k,
    iv: genIv ? genIv : crypto.randomBytes(16).toString("hex"),
  };
};

export default getEncryptPair;
