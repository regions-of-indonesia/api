import { Subdistricts } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asLyra, memoryCache } from "./@utilities";
import { permanentSearchKeys } from "./@shared";

const ARRAY = asArray(Subdistricts);
// const FUSE = asFuse(ARRAY);
const LYRA = asLyra(ARRAY);

const SubdistrictCache = memoryCache("subdistrict");
const SubdistrictsCache = memoryCache("subdistricts");
const SearchSubdistrictsCache = memoryCache("search-subdistricts", { permanentKeys: permanentSearchKeys });

async function setupSearchSubdistrict() {
  await LYRA.setup();
}

const Subdistrict = {
  async findByCode(code: string): Promise<CodeName | undefined> {
    return (
      (await SubdistrictCache.get(code)) ??
      (await SubdistrictCache.set(
        code,
        ARRAY.find((item) => item.code === code)
      ))
    );
  },

  async filterByCode(code: string): Promise<CodeName[]> {
    const slicer = split.code(code).length;
    return (
      (await SubdistrictsCache.get(code)) ??
      (await SubdistrictsCache.set(
        code,
        ARRAY.filter((item) => slice.code(item.code, slicer) === code)
      ))
    );
  },

  async search(text: string): Promise<CodeName[]> {
    const cached = await SearchSubdistrictsCache.get(text);
    if (cached) return cached;

    return await SearchSubdistrictsCache.set(text, LYRA.search(text));
  },

  async length(): Promise<number> {
    return ARRAY.length;
  },

  cache: {
    async searchSubdistrictsKeys() {
      return await SearchSubdistrictsCache.keys();
    },
  },
};

export { setupSearchSubdistrict };
export { Subdistrict };
