import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Province, District, Subdistrict, Village } from "~/database";
import { join, split, slice } from "~/database/@utilities";

async function getResultByCodes(codes: string[]) {
  if (codes.length === 1) return await Province.findByCode(join.codes(slice.codes(codes, 1)));
  if (codes.length === 2) return await District.findByCode(join.codes(slice.codes(codes, 2)));
  if (codes.length === 3) return await Subdistrict.findByCode(join.codes(slice.codes(codes, 3)));
  if (codes.length === 4) return await Village.findByCode(join.codes(slice.codes(codes, 4)));
  return undefined;
}

const RegionRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/:code", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    let result = await getResultByCodes(split.code(code));

    if (!result) throw reply.notFound();

    return result;
  });
};

export default RegionRoutes;
