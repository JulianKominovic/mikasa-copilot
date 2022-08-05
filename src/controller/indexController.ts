import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function indexController(fastify: FastifyInstance) {
  fastify.post(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      reply.send({ STATUS: "OK" });
    }
  );
}
