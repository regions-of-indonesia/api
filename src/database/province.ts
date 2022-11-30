import { Provinces } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { asArray, asFuse, memoryCache } from "./@utilities";
import { permanentSearchKeys } from "./@shared";

const ARRAY = asArray(Provinces);
const FUSE = asFuse(ARRAY);

const ProvinceCache = memoryCache("province");
const SearchProvincesCache = memoryCache("search-provinces", { permanentKeys: permanentSearchKeys });

const Province = {
  async all(): Promise<CodeName[]> {
    return ARRAY;
  },

  async findByCode(code: string): Promise<CodeName | undefined> {
    return (
      (await ProvinceCache.get(code)) ??
      (await ProvinceCache.set(
        code,
        ARRAY.find((item) => item.code === code)
      ))
    );
  },

  async search(text: string): Promise<CodeName[]> {
    const cached = await SearchProvincesCache.get(text);
    if (cached) return cached;

    return await SearchProvincesCache.set(text, FUSE.search(text));
  },

  async length(): Promise<number> {
    return ARRAY.length;
  },

  cache: {
    async searchProvincesKeys() {
      return await SearchProvincesCache.keys();
    },
  },
};

export { Province };
