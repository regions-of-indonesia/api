import { Districts } from "@regions-of-indonesia/data";

import type { CodeName } from "./@types";
import { slice, split, asArray, asFuse, cache } from "./@utilities";

const ARRAY = asArray(Districts);
const FUSE = asFuse(ARRAY);

const DistrictCache = cache("district");
const DistrictsCache = cache("districts");
const SearchDistrictsCache = cache("search-districts");

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

    if (cached) {
      return cached;
    }

    return await SearchDistrictsCache.set(text, FUSE.search(text));
  },
};

export { District };
