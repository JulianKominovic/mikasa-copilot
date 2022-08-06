"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function indexController(fastify) {
    fastify.post("/", async function (_request, reply) {
        reply.send({ STATUS: "OK" });
    });
}
exports.default = indexController;
//# sourceMappingURL=indexController.js.map