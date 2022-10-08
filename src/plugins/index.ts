import fp from "fastify-plugin";

import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyCompress from "@fastify/compress";
import fastifySensible from "@fastify/sensible";

const fastifyCorsPlugin = fp(
  async (fastify) => {
    await fastify.register(fastifyCors, { origin: "*" });
  },
  { name: "app/cors" }
);

const fastifyHelmetPlugin = fp(
  async (fastify) => {
    await fastify.register(fastifyHelmet);
  },
  { name: "app/helmet" }
);

const fastifyCompressPlugin = fp(
  async (fastify) => {
    await fastify.register(fastifyCompress);
  },
  { name: "app/compress" }
);

const fastifySensiblePlugin = fp(
  async (fastify) => {
    await fastify.register(fastifySensible);
  },
  { name: "app/sensible" }
);

export { fastifyCorsPlugin, fastifyHelmetPlugin, fastifyCompressPlugin, fastifySensiblePlugin };
