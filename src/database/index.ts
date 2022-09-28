import { Province } from "./province";
import { District } from "./district";
import { Subdistrict } from "./subdistrict";
import { Village } from "./village";

import { permanentSearchKeys } from "./@shared";

async function preSearchResult() {
  for await (const key of permanentSearchKeys) {
    await Province.search(key);
    await District.search(key);
    await Subdistrict.search(key);
    await Village.search(key);
  }
}

async function setupDatabase() {
  await preSearchResult();
}

export { Province, District, Subdistrict, Village };
export { setupDatabase };
