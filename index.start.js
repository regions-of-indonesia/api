require("./dist");

async function start() {
  return await regionsofindonesia.app.listen({
    host: "0.0.0.0",
    port: Number(process.env.PORT || 3000),
  });
}

start()
  .then((address) => {
    console.log(`[@regions-of-indonesia/api]:${address}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
