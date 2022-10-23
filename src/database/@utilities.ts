import Keyv from "keyv";
import { create, insertBatch, search } from "@lyrasearch/lyra";
import type { RetrievedDoc } from "@lyrasearch/lyra";

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

type TypeToSchema<T extends { [key: string]: string | number | boolean }> = {
  [K in keyof T]: T[K] extends string ? "string" : T[K] extends number ? "number" : T[K] extends boolean ? "boolean" : never;
};
function pickHitsMapFnFromLyraHitsResult<T extends TypeToSchema<CodeName>>({ code, name }: RetrievedDoc<T>) {
  return { code, name };
}
function asLyra(list: readonly CodeName[]) {
  const db = create({ schema: { code: "string", name: "string" } });

  return {
    async setup() {
      await insertBatch(db, list.slice());
    },
    search(text: string): CodeName[] {
      return search(db, { term: text, properties: ["name"] }).hits.map(pickHitsMapFnFromLyraHitsResult);
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
export { asArray, asLyra, memoryCache };
