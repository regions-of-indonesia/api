import fp from "fastify-plugin";

import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyCaching from "@fastify/caching";

const fastifyCorsPlugin = fp(async (fastify) => {
  await fastify.register(fastifyCors);
});

const fastifyHelmetPlugin = fp(async (fastify) => {
  await fastify.register(fastifyHelmet);
});

const fastifyCachingPlugin = fp(async (fastify) => {
  await fastify.register(fastifyCaching, { expiresIn: 24 * 60 * 60 });
});

export { fastifyCorsPlugin, fastifyHelmetPlugin, fastifyCachingPlugin };
