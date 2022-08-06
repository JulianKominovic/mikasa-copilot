"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchEngine_1 = require("../engines/searchEngine");
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fuzzysort_1 = __importDefault(require("fuzzysort"));
const oneLocSnippets = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve("src/assets/1loc.json"), { encoding: "utf-8" }));
async function searchController(fastify) {
    fastify.post("/", async function (_request, reply) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const termToSearch = _request.body;
        const tryLocalSearch = fuzzysort_1.default.go(termToSearch, oneLocSnippets, {
            key: "snippetName",
            threshold: -10,
            limit: 1,
        });
        console.log(tryLocalSearch);
        if (tryLocalSearch.total > 0)
            reply.send(tryLocalSearch === null || tryLocalSearch === void 0 ? void 0 : tryLocalSearch[0].obj.snippet);
        const [w3schools, stackoverflow, geeksforgeeks] = await Promise.allSettled([
            (0, searchEngine_1.searchW3schools)(termToSearch),
            (0, searchEngine_1.searchStackOverflow)(termToSearch),
            (0, searchEngine_1.searchGeeksForGeeks)(termToSearch),
        ]);
        const geeksforgeeksResponse = geeksforgeeks.status === "fulfilled"
            ? new jsdom_1.JSDOM((_d = (_c = (_b = (_a = geeksforgeeks === null || geeksforgeeks === void 0 ? void 0 : geeksforgeeks.value) === null || _a === void 0 ? void 0 : _a.searchResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.frontend_code_snippet).window.document.children[0].textContent ||
                ((_h = (_g = (_f = (_e = geeksforgeeks === null || geeksforgeeks === void 0 ? void 0 : geeksforgeeks.value) === null || _e === void 0 ? void 0 : _e.searchResults) === null || _f === void 0 ? void 0 : _f.results) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.frontend_code_snippet)
            : null;
        const stackoverflowBestResponse = stackoverflow.status === "fulfilled"
            ? new jsdom_1.JSDOM((_m = (_l = (_k = (_j = stackoverflow === null || stackoverflow === void 0 ? void 0 : stackoverflow.value) === null || _j === void 0 ? void 0 : _j.searchResults) === null || _k === void 0 ? void 0 : _k.results) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.top_answer["body"]).window.document.children[0].textContent ||
                ((_r = (_q = (_p = (_o = stackoverflow === null || stackoverflow === void 0 ? void 0 : stackoverflow.value) === null || _o === void 0 ? void 0 : _o.searchResults) === null || _p === void 0 ? void 0 : _p.results) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.top_answer["body"])
            : null;
        console.log(stackoverflow.status === "fulfilled" ? stackoverflow.value : null);
        const w3SchoolsBestResponse = w3schools.status === "fulfilled"
            ? (_v = (_u = (_t = (_s = w3schools === null || w3schools === void 0 ? void 0 : w3schools.value) === null || _s === void 0 ? void 0 : _s.searchResults) === null || _t === void 0 ? void 0 : _t.results) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.frontend_code_snippet
            : null;
        console.log(geeksforgeeksResponse ||
            w3SchoolsBestResponse ||
            stackoverflowBestResponse);
        reply.send(geeksforgeeksResponse ||
            w3SchoolsBestResponse ||
            stackoverflowBestResponse);
    });
}
exports.default = searchController;
//# sourceMappingURL=searchController.js.map