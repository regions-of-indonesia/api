import type { FastifyInstance } from "fastify";

import { Province, District, Subdistrict, Village } from "~/database";

const StatsRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return {
      count: {
        provinces: await Province.length(),
        districts: await District.length(),
        subdistricts: await Subdistrict.length(),
        villages: await Village.length(),
      },
    };
  });
};

export default StatsRoutes;
