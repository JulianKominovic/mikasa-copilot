import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  searchGeeksForGeeks,
  searchStackOverflow,
  searchW3schools,
} from "../engines/searchEngine";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import fuzzySearch from "fuzzysort";

const oneLocSnippets = JSON.parse(
  fs.readFileSync(path.resolve("src/assets/1loc.json"), { encoding: "utf-8" })
);

export default async function searchController(fastify: FastifyInstance) {
  fastify.post(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      const termToSearch = _request.body as string;

      const tryLocalSearch = fuzzySearch.go(
        termToSearch as string,
        oneLocSnippets,
        {
          key: "snippetName",
          threshold: -10,
          limit: 1, // don't return more results than you need!
        }
      );

      console.log(tryLocalSearch);

      if (tryLocalSearch.total > 0)
        reply.send((tryLocalSearch as any)?.[0].obj.snippet);

      const [w3schools, stackoverflow, geeksforgeeks] =
        await Promise.allSettled([
          searchW3schools(termToSearch),
          searchStackOverflow(termToSearch),
          searchGeeksForGeeks(termToSearch),
        ]);

      const geeksforgeeksResponse =
        geeksforgeeks.status === "fulfilled"
          ? (new JSDOM(
              geeksforgeeks?.value?.searchResults?.results?.[0]?.frontend_code_snippet
            ).window.document.children[0].textContent as string) ||
            geeksforgeeks?.value?.searchResults?.results?.[0]
              ?.frontend_code_snippet
          : null;

      const stackoverflowBestResponse =
        stackoverflow.status === "fulfilled"
          ? (new JSDOM(
              stackoverflow?.value?.searchResults?.results?.[0]?.top_answer[
                "body"
              ]
            ).window.document.children[0].textContent as string) ||
            stackoverflow?.value?.searchResults?.results?.[0]?.top_answer[
              "body"
            ]
          : null;
      console.log(
        stackoverflow.status === "fulfilled" ? stackoverflow.value : null
      );
      const w3SchoolsBestResponse =
        w3schools.status === "fulfilled"
          ? w3schools?.value?.searchResults?.results?.[0]?.frontend_code_snippet
          : null;
      console.log(
        geeksforgeeksResponse ||
          w3SchoolsBestResponse ||
          stackoverflowBestResponse
      );
      reply.send(
        geeksforgeeksResponse ||
          w3SchoolsBestResponse ||
          stackoverflowBestResponse
      );
    }
  );
}
