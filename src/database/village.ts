import { Villages } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asLyra, memoryCache } from "./@utilities";
import { permanentSearchKeys } from "./@shared";

const ARRAY = asArray(Villages);
// const FUSE = asFuse(ARRAY);
const LYRA = asLyra(ARRAY);

const VillageCache = memoryCache("village");
const VillagesCache = memoryCache("villages");
const SearchVillagesCache = memoryCache("search-villages", { permanentKeys: permanentSearchKeys });

async function setupSearchVillage() {
  await LYRA.setup();
}

const Village = {
  async findByCode(code: string): Promise<CodeName | undefined> {
    return (
      (await VillageCache.get(code)) ??
      (await VillageCache.set(
        code,
        ARRAY.find((item) => item.code === code)
      ))
    );
  },

  async filterByCode(code: string): Promise<CodeName[]> {
    const slicer = split.code(code).length;
    return (
      (await VillagesCache.get(code)) ??
      (await VillagesCache.set(
        code,
        ARRAY.filter((item) => slice.code(item.code, slicer) === code)
      ))
    );
  },

  async search(text: string): Promise<CodeName[]> {
    const cached = await SearchVillagesCache.get(text);
    if (cached) return cached;

    return await SearchVillagesCache.set(text, LYRA.search(text));
  },

  async length(): Promise<number> {
    return ARRAY.length;
  },

  cache: {
    async searchVillagesKeys() {
      return await SearchVillagesCache.keys();
    },
  },
};

export { setupSearchVillage };
export { Village };
