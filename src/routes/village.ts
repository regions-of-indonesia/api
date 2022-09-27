import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Village } from "~/database";

const VillageRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/:code", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Village.findByCode(code);

    if (!result) throw reply.notFound();

    return result;
  });
};

export default VillageRoutes;
