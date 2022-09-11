import fastify from "fastify";

const app = fastify();

app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    const address = await app.listen({
      port: Number(process.env.PORT || 3000),
      host: "0.0.0.0",
    });
    console.log(String(address));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
