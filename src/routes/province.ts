import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Province, District } from "~/database";

const ProvinceRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      districts?: string;
    };
  }>("/:code", async (request, reply) => {
    const { code } = request.params;
    const { districts } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Province.findByCode(code);

    if (!result) throw reply.notFound();

    if (districts === "true") {
      return {
        ...result,
        districts: await District.filterByCode(code),
      };
    }

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/:code/districts", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    return await District.filterByCode(code);
  });
};

export default ProvinceRoutes;
