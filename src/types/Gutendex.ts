export type BookQueryResults = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  translators: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: {
    "application/epub+zip": string | undefined;
    "application/octet-stream": string | undefined;
    "application/rdf+xml": string | undefined;
    "application/x-mobipocket-ebook": string | undefined;
    "text/html": string | undefined;
    "text/plain": string | undefined;
    "text/plain; charset=us-ascii": string | undefined;
    // Cover
    "image/jpeg": string;
  };

  download_count: number;
};

type Author = {
  name: string;
  birth_year: number;
  death_year: number | null;
};
