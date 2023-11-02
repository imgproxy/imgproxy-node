import { createHmac } from "crypto";
import type { IPair } from "../types";
import withCache from "./withCache";

const hexDecode = (hex: string): Buffer => Buffer.from(hex, "hex");

const sign = (target: string, signPair: IPair): string => {
  const hmac = createHmac("sha256", hexDecode(signPair.key));
  hmac.update(hexDecode(signPair.salt));
  hmac.update(target);

  return hmac.digest("base64url");
};

const getSignedUrl = (path: string, pair: IPair): string => {
  const signature = sign(path, pair);
  return `/${signature}${path}`;
};

const withCacheGetSignedUrl = withCache(getSignedUrl);

export default withCacheGetSignedUrl;
export { getSignedUrl };
