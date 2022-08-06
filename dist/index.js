"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 5000;
app_1.default.listen({ port: FASTIFY_PORT });
console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
//# sourceMappingURL=index.js.map