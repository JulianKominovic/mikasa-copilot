import axios from "axios";
import { JSDOM } from "jsdom";
const RESPONSE_SIZE = 1;

export const searchW3schools = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=w3schools&fields=frontend_title%2Cfrontend_code_snippet%2Cfrontend_text&version=4&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      const body = res.data?.searchResults?.results?.[0];
      return (
        body?.frontend_title +
        "\n" +
        body?.frontend_text +
        "\n" +
        body?.frontend_code_snippet
      );
    });
};

export const searchStackOverflow = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=stackoverflow&version=2&query=${term}&size=${RESPONSE_SIZE}&service=generic_stackoverflow&filters=%5B%5D`
    )
    .then((res) => {
      return (
        new JSDOM(res.data?.searchResults?.results?.[0]?.top_answer["body"])
          .window.document.children[0].textContent ||
        res.data?.searchResults?.results?.[0]?.top_answer["body"]
      );
    });
};

export const searchGeeksForGeeks = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=geeksforgeeks&fields=frontend_title%2Cfrontend_code_snippet&version=8&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      const body = res.data?.searchResults?.results?.[0];

      return (
        body?.frontend_title +
        "\n" +
        ((new JSDOM(body?.frontend_code_snippet).window.document.children[0]
          .textContent as string) || body?.frontend_code_snippet)
      );
    });
};

export const searchMozilla = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=mdn&fields=frontend_title%2Cfrontend_code_snippet%2Cfrontend_text&version=2&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      const body = res.data?.searchResults?.results?.[0];
      return (
        body?.frontend_title +
        "\n" +
        body?.frontend_text +
        "\n" +
        body?.frontend_code_snippet
      );
    });
};
