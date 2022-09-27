import type { FastifyInstance } from "fastify";

const mb = (value: number) => `${value / 1000000}MB`;

const MemoryRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    const { arrayBuffers, external, heapTotal, heapUsed, rss } = process.memoryUsage();

    return {
      arrayBuffers: mb(arrayBuffers),
      external: mb(external),
      heapTotal: mb(heapTotal),
      heapUsed: mb(heapUsed),
      rss: mb(rss),
    };
  });
};

export default MemoryRoutes;
