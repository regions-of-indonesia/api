import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Village } from "~/database";

const VillagesRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      subdistrict?: string;
    };
  }>("/:subdistrict", async (request, reply) => {
    const { subdistrict } = request.params;

    if (!isTypeofString(subdistrict)) throw reply.badRequest();

    return await Village.filterByCode(subdistrict);
  });
};

export default VillagesRoutes;
