import type { FastifyInstance } from "fastify";

import MemoryRoutes from "./memory";
import ProvinceRoutes from "./province";
import ProvincesRoutes from "./provinces";
import DistrictRoutes from "./district";
import DistrictsRoutes from "./districts";
import SubdistrictsRoutes from "./subdistricts";
import SubdistrictRoutes from "./subdistrict";
import VillagesRoutes from "./villages";
import VillageRoutes from "./village";
import SearchRoutes from "./search";
import StatsRoutes from "./stats";
import RegionRoutes from "./region";

const RootRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (_request, reply) => {
    reply.cacheControl("max-age", "1d");
  });

  fastify.get("/", async () => {
    return {
      [`_________name`]: "Regions of Indonesia",
      [`_______author`]: "flamrdevs",
      [`________thank`]: "you",
    };
  });

  fastify.register(MemoryRoutes, { prefix: "/memory" });
  fastify.register(ProvincesRoutes, { prefix: "/provinces" });
  fastify.register(ProvinceRoutes, { prefix: "/province" });
  fastify.register(DistrictsRoutes, { prefix: "/districts" });
  fastify.register(DistrictRoutes, { prefix: "/district" });
  fastify.register(SubdistrictsRoutes, { prefix: "/subdistricts" });
  fastify.register(SubdistrictRoutes, { prefix: "/subdistrict" });
  fastify.register(VillagesRoutes, { prefix: "/villages" });
  fastify.register(VillageRoutes, { prefix: "/village" });
  fastify.register(RegionRoutes, { prefix: "/region" });
  fastify.register(SearchRoutes, { prefix: "/search" });
  fastify.register(StatsRoutes, { prefix: "/stats" });

  fastify.get("/*", async (_request, reply) => {
    throw reply.notFound("Route Not Found");
  });
};

export default RootRoutes;
