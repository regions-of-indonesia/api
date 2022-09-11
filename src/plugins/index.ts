import fp from "fastify-plugin";

import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";

const fastifyCorsPlugin = fp(async (fastify) => {
  await fastify.register(fastifyCors);
});

const fastifyHelmetPlugin = fp(async (fastify) => {
  await fastify.register(fastifyHelmet);
});

export { fastifyCorsPlugin, fastifyHelmetPlugin };
