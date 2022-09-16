import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Province, District, Subdistrict, Village } from "~/database";

const RootRoutes = async (fastify: FastifyInstance) => {
  // HOOK

  fastify.addHook("preHandler", async (_request, reply) => {
    reply.cacheControl("max-age", "1d");
  });

  // INDEX

  fastify.get("/", async () => {
    return {
      [`_________name`]: "Regions of Indonesia",
      [`_______author`]: "flamrdevs",
      [`________thank`]: "you",
    };
  });

  fastify.get("/memory", async () => {
    const { arrayBuffers, external, heapTotal, heapUsed, rss } = process.memoryUsage();

    const megabyte = (value: number) => `${value / 1000000}MB`;

    return {
      arrayBuffers: megabyte(arrayBuffers),
      external: megabyte(external),
      heapTotal: megabyte(heapTotal),
      heapUsed: megabyte(heapUsed),
      rss: megabyte(rss),
    };
  });

  // PROVINCES

  fastify.get("/provinces", async () => {
    const result = await Province.all();

    return result;
  });

  // PROVINCE

  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      districts?: string;
    };
  }>("/province/:code", async (request, reply) => {
    const { code } = request.params;
    const { districts } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Province.findByCode(code);

    if (!result) throw reply.notFound();

    if (districts === "true") {
      return {
        ...result,
        districts: await District.filterByCode(code),
      };
    }

    return result;
  });

  // DISTRICTS

  fastify.get<{
    Params: {
      province?: string;
    };
  }>("/districts/:province", async (request, reply) => {
    const { province } = request.params;

    if (!isTypeofString(province)) throw reply.badRequest();

    const result = await District.filterByCode(province);

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/province/:code/districts", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await District.filterByCode(code);

    return result;
  });

  // DISTRICT

  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      subdistricts?: string;
    };
  }>("/district/:code", async (request, reply) => {
    const { code } = request.params;
    const { subdistricts } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await District.findByCode(code);

    if (!result) throw reply.notFound();

    if (subdistricts === "true") {
      return {
        ...result,
        subdistricts: await Subdistrict.filterByCode(code),
      };
    }

    return result;
  });

  // SUBDISTRICTS

  fastify.get<{
    Params: {
      district?: string;
    };
  }>("/subdistricts/:district", async (request, reply) => {
    const { district } = request.params;

    if (!isTypeofString(district)) throw reply.badRequest();

    const result = await Subdistrict.filterByCode(district);

    return result;
  });

  // SUBDISTRICT

  fastify.get<{
    Params: {
      code?: string;
    };
    Querystring: {
      villages?: string;
    };
  }>("/subdistrict/:code", async (request, reply) => {
    const { code } = request.params;
    const { villages } = request.query;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Subdistrict.findByCode(code);

    if (!result) throw reply.notFound();

    if (villages === "true") {
      return {
        ...result,
        villages: await Village.filterByCode(code),
      };
    }

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/district/:code/subdistricts", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Subdistrict.filterByCode(code);

    return result;
  });

  // VILLAGES

  fastify.get<{
    Params: {
      subdistrict?: string;
    };
  }>("/villages/:subdistrict", async (request, reply) => {
    const { subdistrict } = request.params;

    if (!isTypeofString(subdistrict)) throw reply.badRequest();

    const result = await Village.filterByCode(subdistrict);

    return result;
  });

  // VILLAGE

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/village/:code", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Village.findByCode(code);

    if (!result) throw reply.notFound();

    return result;
  });

  fastify.get<{
    Params: {
      code?: string;
    };
  }>("/subdistrict/:code/villages", async (request, reply) => {
    const { code } = request.params;

    if (!isTypeofString(code)) throw reply.badRequest();

    const result = await Village.filterByCode(code);

    return result;
  });

  // SEARCH

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/search", async (request, reply) => {
    const { text } = request.query;

    if (!isTypeofString(text)) throw reply.badRequest();

    return {
      provinces: await Province.search(text),
      districts: await District.search(text),
      subdistricts: await Subdistrict.search(text),
      village: await Village.search(text),
    };
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/search/provinces", async (request, reply) => {
    const { text } = request.query;

    if (!isTypeofString(text)) throw reply.badRequest();

    return await Province.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/search/districts", async (request, reply) => {
    const { text } = request.query;

    if (!isTypeofString(text)) throw reply.badRequest();

    return await District.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/search/subdistricts", async (request, reply) => {
    const { text } = request.query;

    if (!isTypeofString(text)) throw reply.badRequest();

    return await Subdistrict.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/search/villages", async (request, reply) => {
    const { text } = request.query;

    if (!isTypeofString(text)) throw reply.badRequest();

    return await Village.search(text);
  });
};

export default RootRoutes;
