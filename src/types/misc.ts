import { type Book } from "./Gutendex";

export type MenuSections = "copy-free" | "pdf";
export type GenericBook = Pick<Book, "title" | "download_count"> & {
  cover: string;
};

export type BooksCollection<T extends Book | GenericBook> = {
  t: T extends Book ? "gutendex" : "generic";
  collection: T[];
};
