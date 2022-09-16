import Keyv from "keyv";
import Fuse from "fuse.js";

import type { CodeName } from "./@types";

const join = { codes: (values: string[]) => values.join(".") };
const split = { code: (value: string) => value.split(".") };
const slice = { code: (value: string, slicer: number) => join.codes(split.code(value).slice(0, slicer)) };

function asArray(record: Record<string, string>): CodeName[] {
  return Object.entries(record).map(([code, name]) => ({ code, name }));
}

function pickItemMapFnFromFuseResult(result: Fuse.FuseResult<CodeName>) {
  return result.item;
}
function asFuse(list: readonly CodeName[]) {
  const fuse = new Fuse(list, { includeScore: true, keys: ["name"], threshold: 0.2 });

  return {
    search: (text: string) => {
      return fuse.search(text).map(pickItemMapFnFromFuseResult).slice(0, 100);
    },
  };
}

const TTL = 1 * /** hours */ 20 * /** minutes */ 60 * /** seconds */ 1000; /** milliseconds */
const cache = (namespace: string, ttl: number = TTL) => {
  const keyv = new Keyv<any>({ namespace });

  return {
    get: async (key: string) => await keyv.get(key),
    set: async <T extends any>(key: string, value: T) => {
      await keyv.set(key, value, ttl);
      return value;
    },
    size: async () => {
      const set = new Set<string>();
      for await (const [key] of keyv.iterator()) set.add(key);
      return set.size;
    },
  };
};

export { join, split, slice };
export { asArray, asFuse, cache };
