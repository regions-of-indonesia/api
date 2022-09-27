import Keyv from "keyv";
import Fuse from "fuse.js";

import type { CodeName } from "./@types";

const join = {
  codes: (values: string[]) => values.join("."),
};
const split = {
  code: (value: string) => value.split("."),
};
const slice = {
  codes: (values: string[], end: number) => values.slice(0, end),
  code: (value: string, end: number) => join.codes(split.code(value).slice(0, end)),
};

function asArray(record: Record<string, string>): CodeName[] {
  return Object.entries(record).map(([code, name]) => ({ code, name }));
}

function pickItemMapFnFromFuseResult(result: Fuse.FuseResult<CodeName>) {
  return result.item;
}
function asFuse(list: readonly CodeName[]) {
  const fuse = new Fuse(list, { includeScore: true, keys: ["name"], threshold: 0.2 });

  return {
    search(text: string) {
      return fuse.search(text).map(pickItemMapFnFromFuseResult).slice(0, 100);
    },
  };
}

const TTL = 60 * 1000; /** one minutes */
const memoryCache = (namespace: string, ttl: number = TTL) => {
  const keyv = new Keyv<any>({ namespace });

  return {
    async get(key: string) {
      return await keyv.get(key);
    },
    async set<T extends any>(key: string, value: T) {
      await keyv.set(key, value, ttl);
      return value;
    },
  };
};

export { join, split, slice };
export { asArray, asFuse, memoryCache };
