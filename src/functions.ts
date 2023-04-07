import type { BookQueryResults } from "./types/Gutendex";
// import * as cheerio from "cheerio";

export const getBooksByName = async (name: string | null) => {
  if (name) {
    const formattedName = name.replace(" ", "%20");
    const res = await fetch(
      `https://gutendex.com/books/?search=${formattedName}`
    );
    return (await res.json()) as BookQueryResults;
  }
  const res = await fetch(`https://gutendex.com/books`);
  return (await res.json()) as BookQueryResults;
};

export const getBooksByUrl = async (url: string) => {
  const res = await fetch(url);
  return (await res.json()) as BookQueryResults;
};
