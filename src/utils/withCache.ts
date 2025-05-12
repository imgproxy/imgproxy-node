import { ISignPair, ICryptPair } from "../types";
import { LRUCache } from "lru-cache";

type Cred = ISignPair | ICryptPair;

const getKey = (url: string, cred: Cred): string => {
  if ("iv" in cred) {
    return `${url}${cred.key}${cred.iv}`;
  }

  return `${url}${cred.key}${cred.salt}`;
};

function withCache<T extends Cred>(fn: (url: string, cred: T) => string) {
  const cache = new LRUCache<string, string>({
    maxSize: 1024 * 1024 * 10, // 10 MB
    sizeCalculation: (value, key) => key.length + value.length,
  });

  return (url: string, cred: T): string => {
    const key = getKey(url, cred);

    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    const result = fn(url, cred);

    cache.set(key, result);

    return result;
  };
}

export default withCache;
