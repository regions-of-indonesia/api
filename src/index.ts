import App from "./App";

const app = new App({ host: "0.0.0.0", port: Number(process.env.PORT || 3000) });

app
  .start()
  .then((address) => {
    console.log(`[@regions-of-indonesia/api]:${address}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
