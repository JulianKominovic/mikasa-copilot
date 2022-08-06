import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  searchGeeksForGeeks,
  searchMozilla,
  searchStackOverflow,
  searchW3schools,
} from "../engines/searchEngine";
import fs from "fs";
import path from "path";

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

      const [w3schools, stackoverflow, geeksforgeeks, mozilla] =
        await Promise.allSettled([
          searchW3schools(termToSearch),
          searchStackOverflow(termToSearch),
          searchGeeksForGeeks(termToSearch),
          searchMozilla(termToSearch),
        ]);

      const geeksforgeeksResponse =
        geeksforgeeks.status === "fulfilled" ? geeksforgeeks.value : null;

      const stackoverflowBestResponse =
        stackoverflow.status === "fulfilled" ? stackoverflow.value : null;

      const w3SchoolsBestResponse =
        w3schools.status === "fulfilled" ? w3schools.value : null;
      const mozillaBestResponse =
        mozilla.status === "fulfilled" ? mozilla.value : null;

      console.log("geeksforgeeks");
      console.log(geeksforgeeksResponse);
      console.log("stackoverflow");
      console.log(stackoverflowBestResponse);
      console.log("w3schools");
      console.log(w3SchoolsBestResponse);
      console.log("mozilla");
      console.log(mozillaBestResponse);

      reply.send(
        w3SchoolsBestResponse ||
          mozillaBestResponse ||
          geeksforgeeksResponse ||
          stackoverflowBestResponse
      );
    }
  );
}
