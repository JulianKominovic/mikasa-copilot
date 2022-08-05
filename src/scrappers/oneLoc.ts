import { JSDOM } from "jsdom";
import axios, { AxiosResponse } from "axios";
import { Snippet } from "src/models/Snippet";
import { writeFileSync } from "fs";
import path from "path";

const scrappingCodeblocks = async (href = "") => {
  console.log("https://1loc.dev" + href);
  return await axios
    .get("https://1loc.dev" + href)

    .then((res) => {
      const localDom = new JSDOM(res.data);
      const doc = localDom.window.document;
      const snippetName = doc.querySelector(
        "#__next > div > div > div.page-snippet__content > div.block-hero > h1"
      )?.textContent;

      const js = doc.querySelector(
        "#__next > div > div > div.page-snippet__content > div:nth-child(3) > pre"
      )?.textContent;
      const ts = doc.querySelector(
        "#__next > div > div > div.page-snippet__content > div:nth-child(5) > pre"
      )?.textContent;

      const jsSnippet: Snippet = {
        snippetName: "Javascript " + snippetName,
        snippet: js || "",
      };
      const tsSnippet: Snippet = {
        snippetName: "Javascript " + snippetName,
        snippet: ts || "",
      };
      return { jsSnippet, tsSnippet };
    });
};

const startOneLocScrapper = async () => {
  const response = await axios
    .get("https://1loc.dev/")
    .then((res: AxiosResponse) => res.data);
  const dom = new JSDOM(response);
  const document = dom.window.document;
  const scrapped: any = [];
  document.querySelectorAll("a.block-snippet").forEach((item) => {
    const href = item.getAttribute("href");
    if (!href) return;

    scrapped.push(scrappingCodeblocks(href));
  });

  const promise = await Promise.allSettled(scrapped);

  const res: Snippet[] = [];
  promise.forEach((item) => {
    if (item.status !== "fulfilled") return;
    res.push(item?.value.jsSnippet);
    res.push(item?.value.tsSnippet);
  });

  writeFileSync(path.resolve("src/assets/1loc.json"), JSON.stringify(res), {
    encoding: "utf-8",
  });
  return scrapped;
};
export default startOneLocScrapper;
