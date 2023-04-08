import type { Book, BookQueryResults } from "./types/Gutendex";
import { Element, load } from "cheerio";
import { GenericBook } from "./types/misc";

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

// PDF Drive
export const getPdfsByQuery = async (
  query: string | null,
  isPagination = false,
  page: null | number = null
) => {
  let formattedQuery: string | null = null;
  if (query) {
    formattedQuery = query.replaceAll(" ", "+");
    if (isPagination) {
    } else {
      formattedQuery = query.replaceAll(" ", "-");
    }
  }

  console.log("query: ", query);
  console.log("formatted query: ", formattedQuery);
  const res = await fetch(
    isPagination && page && formattedQuery
      ? `https://www.pdfdrive.com/search?q=${formattedQuery}&pagecount=&pubyear=&searchin=&page=${page}`
      : formattedQuery
      ? `https://www.pdfdrive.com/${formattedQuery + "-books"}.html`
      : "https://www.pdfdrive.com/"
  );

  const html = await res.text();

  const $ = load(html);

  const books = $("div.col-sm ");

  const booksData = { titles: [], covers: [], href: [] } as {
    titles: string[];
    covers: string[];
    href: string[];
  };
  for (const book of books) {
    const bookHeader = $(book).find("a");
    const href = bookHeader.attr("href");
    const cover = $(book).find("img").attr("src");

    if (bookHeader && href && cover) {
      booksData.titles.push(bookHeader.text().trim());
      booksData.href.push(href);
      booksData.covers.push(cover);
    }
  }

  if (
    booksData.covers.length !== booksData.href.length ||
    booksData.covers.length !== booksData.titles.length
  ) {
    throw new Error("Invalid Book search");
  }

  return booksData.titles.map((title, index) => ({
    title: title,
    cover: booksData.covers[index] as string,
    href: booksData.href[index] as string,
  }));
};

// Utils
export const generalizeBook = (book: Book): GenericBook => {
  return {
    cover: book.formats["image/jpeg"],
    download_count: book.download_count,
    title: book.title,
  };
};
