import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Subdistrict, Village } from "~/database";

const SubdistrictRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      villages?: string;
    };
  }>("/:code", async (request, reply) => {
    const { code } = request.params;
    const { villages } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Subdistrict.findByCode(code);

    if (!result) throw reply.notFound();

    if (villages === "true") {
      return {
        ...result,
        villages: await Village.filterByCode(code),
      };
    }

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/:code/villages", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    return await Village.filterByCode(code);
  });
};

export default SubdistrictRoutes;
