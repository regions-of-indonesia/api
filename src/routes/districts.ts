import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { District } from "~/database";

const DistrictsRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      province?: string;
    };
  }>("/:province", async (request, reply) => {
    const { province } = request.params;

    if (!isTypeofString(province)) throw reply.badRequest();

    return await District.filterByCode(province);
  });
};

export default DistrictsRoutes;
