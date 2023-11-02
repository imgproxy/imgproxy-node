import { IPair } from "../types";

type Cred = string | IPair;

const getKey = (url: string, cred: Cred): string => {
  if (typeof cred === "string") {
    return `${url}${cred}`;
  }

  return `${url}${cred.key}${cred.salt}`;
};

function withCache<T extends Cred>(fn: (url: string, cred: T) => string) {
  const cache = new Map();

  return (url: string, cred: T) => {
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
