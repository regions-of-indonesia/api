import { Subdistricts } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asFuse, memoryCache } from "./@utilities";
import { permanentSearchKeys } from "./@shared";

const ARRAY = asArray(Subdistricts);
const FUSE = asFuse(ARRAY);

const SubdistrictCache = memoryCache("subdistrict");
const SubdistrictsCache = memoryCache("subdistricts");
const SearchSubdistrictsCache = memoryCache("search-subdistricts", { permanentKeys: permanentSearchKeys });

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

    return await SearchSubdistrictsCache.set(text, FUSE.search(text));
  },

  async length(): Promise<number> {
    return ARRAY.length;
  },
};

export { Subdistrict };
