import fastify from "fastify";

import { fastifyCorsPlugin, fastifyHelmetPlugin } from "./plugins";

const app = fastify();

app.register(fastifyCorsPlugin);
app.register(fastifyHelmetPlugin);

app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

function createData(length: number) {
  return Array(length)
    .fill(0)
    .map((_null, index) => ({
      code: `CODE ${index}`,
      name: `NAME ${index}`,
    }));
}
const data = createData(10);

app.get<{ Params: { length?: string } }>("/data/:length", async (request) => {
  let length = Number(request.params.length);
  if (isNaN(length)) length = 10;
  return { data: createData(length) };
});

app.get("/data", async () => {
  return { data: data };
});

const start = async () => {
  try {
    const address = await app.listen({
      port: Number(process.env.PORT || 3000),
      host: "0.0.0.0",
    });
    console.log(`[@regions-of-indonesia/api]:${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
