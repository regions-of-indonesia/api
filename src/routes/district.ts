import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { District, Subdistrict } from "~/database";

const DistrictRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      subdistricts?: string;
    };
  }>("/:code", async (request, reply) => {
    const { code } = request.params;
    const { subdistricts } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await District.findByCode(code);

    if (!result) throw reply.notFound();

    if (subdistricts === "true") {
      return {
        ...result,
        subdistricts: await Subdistrict.filterByCode(code),
      };
    }

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/:code/subdistricts", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    return await Subdistrict.filterByCode(code);
  });
};

export default DistrictRoutes;
