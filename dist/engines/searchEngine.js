"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGeeksForGeeks = exports.searchStackOverflow = exports.searchW3schools = void 0;
const axios_1 = __importDefault(require("axios"));
const RESPONSE_SIZE = 1;
const searchW3schools = (term = "") => {
    return axios_1.default
        .get(`https://you.com/api/generic?source=w3schools&fields=frontend_code_snippet&version=4&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`)
        .then((res) => {
        console.log(res.data);
        return res.data;
    });
};
exports.searchW3schools = searchW3schools;
const searchStackOverflow = (term = "") => {
    return axios_1.default
        .get(`https://you.com/api/generic?source=stackoverflow&version=2&query=${term}&size=${RESPONSE_SIZE}&service=generic_stackoverflow&filters=%5B%5D`)
        .then((res) => {
        console.log(res.data);
        return res.data;
    });
};
exports.searchStackOverflow = searchStackOverflow;
const searchGeeksForGeeks = (term = "") => {
    return axios_1.default
        .get(`https://you.com/api/generic?source=geeksforgeeks&fields=frontend_code_snippet&version=8&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`)
        .then((res) => {
        console.log(res.data);
        return res.data;
    });
};
exports.searchGeeksForGeeks = searchGeeksForGeeks;
//# sourceMappingURL=searchEngine.js.map