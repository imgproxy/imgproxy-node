import { ISignPair, ICryptPair } from "../types";

type Cred = ISignPair | ICryptPair;

const getKey = (url: string, cred: Cred): string => {
  if ("iv" in cred) {
    return `${url}${cred.key}${cred.iv}`;
  }

  return `${url}${cred.key}${cred.salt}`;
};

function withCache<T extends Cred>(fn: (url: string, cred: T) => string) {
  const cache = new Map();

  return (url: string, cred: T): string => {
    const key = getKey(url, cred);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(url, cred);

    cache.set(key, result);

    return result;
  };
}

export default withCache;
