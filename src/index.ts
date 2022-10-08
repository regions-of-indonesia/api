import fastify from "fastify";

import {
  fastifyCorsPlugin,
  fastifyHelmetPlugin,
  // fastifyCompressPlugin,
  fastifySensiblePlugin,
} from "~/plugins";

import RootRoutes from "~/routes";

const app = fastify();

app.register(fastifyCorsPlugin);
app.register(fastifyHelmetPlugin);
// app.register(fastifyCompressPlugin);
app.register(fastifySensiblePlugin);
app.register(RootRoutes);

export { app };
