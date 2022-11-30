import Keyv from "keyv";
import Fuse from "fuse.js";

import { isTypeofString } from "javascript-yesterday";

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
      return fuse.search(text).map(pickItemMapFnFromFuseResult).slice(0, 25);
    },
  };
}

const TTL = 7 * 60 * 1000; /** seven minutes */
type MemoryCacheOptions = {
  permanentKeys?: string[];
};
function memoryCache(namespace: string, options: MemoryCacheOptions = {}) {
  const keyv = new Keyv<any>({ namespace });

  const { permanentKeys = [] } = options;

  return {
    async get(key: string) {
      return await keyv.get(key);
    },
    async set<T extends any>(key: string, value: T) {
      await keyv.set(key, value, permanentKeys.includes(key) ? undefined : TTL);

      return value;
    },
    async keys() {
      let list: string[] = [];
      for await (const [key] of keyv.iterator()) {
        if (isTypeofString(key)) list.push(key);
      }
      return list;
    },
  };
}

export { join, split, slice };
export { asArray, asFuse, memoryCache };
