"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.searchMozilla = exports.searchGeeksForGeeks = exports.searchStackOverflow = exports.searchW3schools = void 0;
var axios_1 = __importDefault(require("axios"));
var jsdom_1 = require("jsdom");
var RESPONSE_SIZE = 1;
var searchW3schools = function (term) {
    if (term === void 0) { term = ""; }
    return axios_1["default"]
        .get("https://you.com/api/generic?source=w3schools&fields=frontend_title%2Cfrontend_code_snippet%2Cfrontend_text&version=4&query=".concat(term, "&size=").concat(RESPONSE_SIZE, "&service=generic_code&filters=%5B%5D"))
        .then(function (res) {
        var _a, _b, _c;
        var body = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.searchResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c[0];
        var responseText = "";
        if (body === null || body === void 0 ? void 0 : body.frontend_title)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_title);
        if (body === null || body === void 0 ? void 0 : body.frontend_text)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_text);
        if (body === null || body === void 0 ? void 0 : body.frontend_code_snippet)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_code_snippet);
        return responseText;
    });
};
exports.searchW3schools = searchW3schools;
var searchStackOverflow = function (term) {
    if (term === void 0) { term = ""; }
    return axios_1["default"]
        .get("https://you.com/api/generic?source=stackoverflow&version=2&query=".concat(term, "&size=").concat(RESPONSE_SIZE, "&service=generic_stackoverflow&filters=%5B%5D"))
        .then(function (res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (new jsdom_1.JSDOM((_d = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.searchResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.top_answer["body"])
            .window.document.children[0].textContent ||
            ((_h = (_g = (_f = (_e = res.data) === null || _e === void 0 ? void 0 : _e.searchResults) === null || _f === void 0 ? void 0 : _f.results) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.top_answer["body"]));
    });
};
exports.searchStackOverflow = searchStackOverflow;
var searchGeeksForGeeks = function (term) {
    if (term === void 0) { term = ""; }
    return axios_1["default"]
        .get("https://you.com/api/generic?source=geeksforgeeks&fields=frontend_title%2Cfrontend_code_snippet&version=8&query=".concat(term, "&size=").concat(RESPONSE_SIZE, "&service=generic_code&filters=%5B%5D"))
        .then(function (res) {
        var _a, _b, _c;
        var body = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.searchResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c[0];
        var responseText = "";
        if (body === null || body === void 0 ? void 0 : body.frontend_title)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_title);
        if (body === null || body === void 0 ? void 0 : body.frontend_code_snippet)
            responseText +=
                "\n" +
                    (new jsdom_1.JSDOM(body === null || body === void 0 ? void 0 : body.frontend_code_snippet).window.document.children[0]
                        .textContent || (body === null || body === void 0 ? void 0 : body.frontend_code_snippet));
        return responseText;
    });
};
exports.searchGeeksForGeeks = searchGeeksForGeeks;
var searchMozilla = function (term) {
    if (term === void 0) { term = ""; }
    return axios_1["default"]
        .get("https://you.com/api/generic?source=mdn&fields=frontend_title%2Cfrontend_code_snippet%2Cfrontend_text&version=2&query=".concat(term, "&size=").concat(RESPONSE_SIZE, "&service=generic_code&filters=%5B%5D"))
        .then(function (res) {
        var _a, _b, _c;
        var body = (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.searchResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c[0];
        var responseText = "";
        if (body === null || body === void 0 ? void 0 : body.frontend_title)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_title);
        if (body === null || body === void 0 ? void 0 : body.frontend_text)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_text);
        if (body === null || body === void 0 ? void 0 : body.frontend_code_snippet)
            responseText += "\n" + (body === null || body === void 0 ? void 0 : body.frontend_code_snippet);
        return responseText;
    });
};
exports.searchMozilla = searchMozilla;
//# sourceMappingURL=searchEngine.js.map