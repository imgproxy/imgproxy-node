import type { IPair, IUnknownPair } from "../types";

const SALT = process.env.IMGPROXY_SALT;
const KEY = process.env.IMGPROXY_KEY;

const getSignedPair = (pair: IUnknownPair): IPair | undefined => {
  const salt = pair.salt || SALT;
  const key = pair.key || KEY;

  if (!salt || !key) {
    return undefined;
  }

  return { salt: salt.split(",")[0].trim(), key: key.split(",")[0].trim() };
};

export default getSignedPair;
