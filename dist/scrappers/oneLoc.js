"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const scrappingCodeblocks = async (href = "") => {
    console.log("https://1loc.dev" + href);
    return await axios_1.default
        .get("https://1loc.dev" + href)
        .then((res) => {
        var _a, _b, _c;
        const localDom = new jsdom_1.JSDOM(res.data);
        const doc = localDom.window.document;
        const snippetName = (_a = doc.querySelector("#__next > div > div > div.page-snippet__content > div.block-hero > h1")) === null || _a === void 0 ? void 0 : _a.textContent;
        const js = (_b = doc.querySelector("#__next > div > div > div.page-snippet__content > div:nth-child(3) > pre")) === null || _b === void 0 ? void 0 : _b.textContent;
        const ts = (_c = doc.querySelector("#__next > div > div > div.page-snippet__content > div:nth-child(5) > pre")) === null || _c === void 0 ? void 0 : _c.textContent;
        const jsSnippet = {
            snippetName: "Javascript " + snippetName,
            snippet: js || "",
        };
        const tsSnippet = {
            snippetName: "Javascript " + snippetName,
            snippet: ts || "",
        };
        return { jsSnippet, tsSnippet };
    });
};
const startOneLocScrapper = async () => {
    const response = await axios_1.default
        .get("https://1loc.dev/")
        .then((res) => res.data);
    const dom = new jsdom_1.JSDOM(response);
    const document = dom.window.document;
    const scrapped = [];
    document.querySelectorAll("a.block-snippet").forEach((item) => {
        const href = item.getAttribute("href");
        if (!href)
            return;
        scrapped.push(scrappingCodeblocks(href));
    });
    const promise = await Promise.allSettled(scrapped);
    const res = [];
    promise.forEach((item) => {
        if (item.status !== "fulfilled")
            return;
        res.push(item === null || item === void 0 ? void 0 : item.value.jsSnippet);
        res.push(item === null || item === void 0 ? void 0 : item.value.tsSnippet);
    });
    (0, fs_1.writeFileSync)(path_1.default.resolve("src/assets/1loc.json"), JSON.stringify(res), {
        encoding: "utf-8",
    });
    return scrapped;
};
exports.default = startOneLocScrapper;
//# sourceMappingURL=oneLoc.js.map