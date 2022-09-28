import fastify from "fastify";

import { fastifySetupDatabasePlugin, fastifyCorsPlugin, fastifyHelmetPlugin, fastifySensiblePlugin } from "~/plugins";

import RootRoutes from "~/routes";

const app = fastify();

app.register(fastifySetupDatabasePlugin);
app.register(fastifyCorsPlugin);
app.register(fastifyHelmetPlugin);
app.register(fastifySensiblePlugin);
app.register(RootRoutes);

export { app };
