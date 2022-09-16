import fastify from "fastify";
import type { FastifyInstance } from "fastify";

import { fastifyCorsPlugin, fastifyHelmetPlugin, fastifySensiblePlugin } from "~/plugins";

import RootRoutes from "./routes";

class App {
  #instance: FastifyInstance;

  #host: string;
  #port: number;

  constructor({ host, port }: { host: string; port: number }) {
    this.#instance = fastify();

    this.#host = host;
    this.#port = port;

    this.setup();
  }

  private setup() {
    this.#instance.register(fastifyCorsPlugin);
    this.#instance.register(fastifyHelmetPlugin);
    this.#instance.register(fastifySensiblePlugin);

    this.#instance.register(RootRoutes);
  }

  public async start() {
    return await this.#instance.listen({
      host: this.#host,
      port: this.#port,
    });
  }
}

export default App;
