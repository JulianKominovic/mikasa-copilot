"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var router_1 = __importDefault(require("./router"));
var server = (0, fastify_1["default"])({
    // Logger only for production
    logger: !!(process.env.NODE_ENV !== "development")
});
// Middleware: Router
server.register(router_1["default"]);
exports["default"] = server;
//# sourceMappingURL=app.js.map