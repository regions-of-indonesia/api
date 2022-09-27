import type { FastifyInstance } from "fastify";

import { Province } from "~/database";

const ProvincesRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return await Province.all();
  });
};

export default ProvincesRoutes;
