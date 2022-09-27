import type { FastifyInstance } from "fastify";

import { isTypeofString } from "javascript-yesterday";

import { Province, District, Subdistrict, Village } from "~/database";

const SearchRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/", async (request, reply) => {
    const { text } = request.query;
    if (!isTypeofString(text)) throw reply.badRequest();
    return {
      provinces: await Province.search(text),
      districts: await District.search(text),
      subdistricts: await Subdistrict.search(text),
      villages: await Village.search(text),
    };
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/provinces", async (request, reply) => {
    const { text } = request.query;
    if (!isTypeofString(text)) throw reply.badRequest();
    return await Province.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/districts", async (request, reply) => {
    const { text } = request.query;
    if (!isTypeofString(text)) throw reply.badRequest();
    return await District.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/subdistricts", async (request, reply) => {
    const { text } = request.query;
    if (!isTypeofString(text)) throw reply.badRequest();
    return await Subdistrict.search(text);
  });

  fastify.get<{
    Querystring: {
      text?: string;
    };
  }>("/villages", async (request, reply) => {
    const { text } = request.query;
    if (!isTypeofString(text)) throw reply.badRequest();
    return await Village.search(text);
  });
};

export default SearchRoutes;
