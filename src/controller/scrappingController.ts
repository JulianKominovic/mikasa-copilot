import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import startOneLocScrapper from "../scrappers/oneLoc";

export default async function scrappingController(fastify: FastifyInstance) {
  fastify.get(
    "/1loc",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      const dom = await startOneLocScrapper();

      reply.send(dom);
    }
  );
}
