import { FastifyInstance } from "fastify";
import indexController from "./controller/indexController";
import scrappingController from "./controller/scrappingController";
import searchController from "./controller/searchController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(indexController, { prefix: "/" });
  fastify.register(scrappingController, { prefix: "/scrapping" });
  fastify.register(searchController, { prefix: "/search" });
}
