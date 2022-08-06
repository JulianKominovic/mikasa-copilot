"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var searchEngine_1 = require("../engines/searchEngine");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var fuzzysort_1 = __importDefault(require("fuzzysort"));
var oneLocSnippets = JSON.parse(fs_1["default"].readFileSync(path_1["default"].resolve("src/assets/1loc.json"), { encoding: "utf-8" }));
function searchController(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fastify.post("/", function (_request, reply) {
                return __awaiter(this, void 0, void 0, function () {
                    var termToSearch, tryLocalSearch, _a, w3schools, stackoverflow, geeksforgeeks, mozilla, geeksforgeeksResponse, stackoverflowBestResponse, w3SchoolsBestResponse, mozillaBestResponse;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                termToSearch = _request.body;
                                tryLocalSearch = fuzzysort_1["default"].go(termToSearch, oneLocSnippets, {
                                    key: "snippetName",
                                    threshold: -10,
                                    limit: 1
                                });
                                console.log(tryLocalSearch);
                                if (tryLocalSearch.total > 0)
                                    reply.send(tryLocalSearch === null || tryLocalSearch === void 0 ? void 0 : tryLocalSearch[0].obj.snippet);
                                return [4 /*yield*/, Promise.allSettled([
                                        (0, searchEngine_1.searchW3schools)(termToSearch),
                                        (0, searchEngine_1.searchStackOverflow)(termToSearch),
                                        (0, searchEngine_1.searchGeeksForGeeks)(termToSearch),
                                        (0, searchEngine_1.searchMozilla)(termToSearch),
                                    ])];
                            case 1:
                                _a = _b.sent(), w3schools = _a[0], stackoverflow = _a[1], geeksforgeeks = _a[2], mozilla = _a[3];
                                geeksforgeeksResponse = geeksforgeeks.status === "fulfilled" ? geeksforgeeks.value : null;
                                stackoverflowBestResponse = stackoverflow.status === "fulfilled" ? stackoverflow.value : null;
                                w3SchoolsBestResponse = w3schools.status === "fulfilled" ? w3schools.value : null;
                                mozillaBestResponse = mozilla.status === "fulfilled" ? mozilla.value : null;
                                console.log("geeksforgeeks");
                                console.log(geeksforgeeksResponse);
                                console.log("stackoverflow");
                                console.log(stackoverflowBestResponse);
                                console.log("w3schools");
                                console.log(w3SchoolsBestResponse);
                                console.log("mozilla");
                                console.log(mozillaBestResponse);
                                reply.send(w3SchoolsBestResponse ||
                                    mozillaBestResponse ||
                                    geeksforgeeksResponse ||
                                    stackoverflowBestResponse);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
exports["default"] = searchController;
//# sourceMappingURL=searchController.js.map