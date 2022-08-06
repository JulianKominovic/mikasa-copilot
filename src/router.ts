import { FastifyInstance } from "fastify";
import indexController from "./controller/indexController";
import searchController from "./controller/searchController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(indexController, { prefix: "/" });
  fastify.register(searchController, { prefix: "/search" });
}
