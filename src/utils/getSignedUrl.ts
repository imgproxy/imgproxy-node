import crypto from "crypto";
import type { ISignPair } from "../types";

const hexDecode = (hex: string): Buffer => Buffer.from(hex, "hex");

const sign = (target: string, signPair: ISignPair): string => {
  const hmac = crypto.createHmac("sha256", hexDecode(signPair.key));
  hmac.update(hexDecode(signPair.salt));
  hmac.update(target);

  return hmac.digest("base64url");
};

const getSignedUrl = (path: string, pair: ISignPair): string => {
  const signature = sign(path, pair);
  return `/${signature}${path}`;
};

export default getSignedUrl;
