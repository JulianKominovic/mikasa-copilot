"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oneLoc_1 = __importDefault(require("../scrappers/oneLoc"));
async function scrappingController(fastify) {
    fastify.get("/1loc", async function (_request, reply) {
        const dom = await (0, oneLoc_1.default)();
        reply.send(dom);
    });
}
exports.default = scrappingController;
//# sourceMappingURL=scrappingController.js.map