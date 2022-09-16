import { Villages } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asFuse, cache } from "./@utilities";

const ARRAY = asArray(Villages);
const FUSE = asFuse(ARRAY);

const VillageCache = cache("village");
const VillagesCache = cache("villages");
const SearchVillagesCache = cache("search-villages");

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

    if (cached) {
      return cached;
    }

    return await SearchVillagesCache.set(text, FUSE.search(text));
  },
};

export { Village };
