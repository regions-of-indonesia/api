import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Subdistrict } from "~/database";

const SubdistrictsRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      district?: string;
    };
  }>("/:district", async (request, reply) => {
    const { district } = request.params;

    if (!isTypeofString(district)) throw reply.badRequest();

    return await Subdistrict.filterByCode(district);
  });
};

export default SubdistrictsRoutes;
