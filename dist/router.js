"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = __importDefault(require("./controller/indexController"));
const scrappingController_1 = __importDefault(require("./controller/scrappingController"));
const searchController_1 = __importDefault(require("./controller/searchController"));
async function router(fastify) {
    fastify.register(indexController_1.default, { prefix: "/" });
    fastify.register(scrappingController_1.default, { prefix: "/scrapping" });
    fastify.register(searchController_1.default, { prefix: "/search" });
}
exports.default = router;
//# sourceMappingURL=router.js.map