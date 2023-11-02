import type { IPair, IMaybePair } from "../types";

const SALT = process.env.IMGPROXY_SALT;
const KEY = process.env.IMGPROXY_KEY;

type MaybePair = [string | undefined, string | undefined];

const isPair = (arr: MaybePair): arr is [string, string] => arr.every(Boolean);

const getSignedPair = (pair: IMaybePair): IPair | undefined => {
  let wipPair: MaybePair = [pair.key, pair.salt];

  if (!isPair(wipPair)) {
    wipPair = [KEY, SALT];
    if (!isPair(wipPair)) return undefined;
  }

  return {
    salt: wipPair[1].split(",")[0].trim(),
    key: wipPair[0].split(",")[0].trim(),
  };
};

export default getSignedPair;
