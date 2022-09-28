import { Districts } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asFuse, memoryCache } from "./@utilities";
import { permanentSearchKeys } from "./@shared";

const ARRAY = asArray(Districts);
const FUSE = asFuse(ARRAY);

const DistrictCache = memoryCache("district");
const DistrictsCache = memoryCache("districts");
const SearchDistrictsCache = memoryCache("search-districts", { permanentKeys: permanentSearchKeys });

const District = {
  async findByCode(code: string): Promise<CodeName | undefined> {
    return (
      (await DistrictCache.get(code)) ??
      (await DistrictCache.set(
        code,
        ARRAY.find((item) => item.code === code)
      ))
    );
  },

  async filterByCode(code: string): Promise<CodeName[]> {
    const slicer = split.code(code).length;
    return (
      (await DistrictsCache.get(code)) ??
      (await DistrictsCache.set(
        code,
        ARRAY.filter((item) => slice.code(item.code, slicer) === code)
      ))
    );
  },

  async search(text: string): Promise<CodeName[]> {
    const cached = await SearchDistrictsCache.get(text);
    if (cached) return cached;

    return await SearchDistrictsCache.set(text, FUSE.search(text));
  },

  async length(): Promise<number> {
    return ARRAY.length;
  },
};

export { District };
