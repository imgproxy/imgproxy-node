import { createHmac } from "crypto";

const SALT = process.env.IMGPROXY_SALT;
const KEY = process.env.IMGPROXY_KEY;

const hexDecode = (hex: string): Buffer => Buffer.from(hex, "hex");

const sign = (salt: string, target: string, secret: string): string => {
  const hmac = createHmac("sha256", hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);

  return hmac.digest("base64url");
};

const getSignedUrl = (path: string, salt?: string, key?: string): string => {
  let argSalt: string | undefined = salt || SALT;
  let argKey: string | undefined = key || KEY;

  if (!argSalt) {
    throw new Error(
      "Salt is not defined. You have to pass it as an argument or define it in .env file as IMGPROXY_SALT"
    );
  }
  if (!argKey) {
    throw new Error(
      "Key is not defined. You have to pass it as an argument or define it in .env file as IMGPROXY_KEY"
    );
  }
  if (argSalt.includes(",") && !argKey.includes(",")) {
    throw new Error(
      "If you pass multiple salts, you have to pass multiple keys as well"
    );
  }
  if (!argSalt.includes(",") && argKey.includes(",")) {
    throw new Error(
      "If you pass multiple keys, you have to pass multiple salts as well"
    );
  }

  if (argSalt.includes(",") && argKey.includes(",")) {
    argSalt = argSalt.split(",")[0];
    argKey = argKey.split(",")[0];
  }

  const signature = sign(argSalt, path, argKey);
  return `/${signature}${path}`;
};

export default getSignedUrl;
