import { Book } from "~/types/Gutendex";
import type { GenericBook } from "~/types/misc";

const GutendexBook = ({ bookData }: { bookData: Book }) => {
  return (
    <div className="group relative flex min-h-[10rem] w-full max-w-md flex-col bg-black/20">
      <img
        alt={bookData.title + " Book cover"}
        src={bookData.formats["image/jpeg"]}
        className="lg:h-72"
      />

      <div className="justify-betweenduration-300 absolute flex h-full w-full flex-col bg-black/70   p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <div>
          <h2 className="mt-4 h-full max-h-10 truncate text-ellipsis text-center font-medium text-white">
            {bookData.title}
          </h2>
          <p className="mt-4 text-center text-gray-400">
            {bookData.authors.map((author) => author.name).join("")}
          </p>
        </div>

        <div className="mt-auto flex w-full justify-center gap-4 p-4">
          <a
            href={bookData.formats["application/epub+zip"]}
            className="w-full rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-center text-xs uppercase"
          >
            Epub
          </a>
          <a
            href={bookData.formats["text/html"]}
            className="w-full rounded-md border border-red-500 bg-red-500 px-2 py-1 text-center text-xs uppercase"
          >
            html
          </a>
          <a
            href={bookData.formats["text/plain"]}
            className="w-full rounded-md border border-emerald-500 bg-emerald-500 px-2 py-1 text-center text-xs uppercase"
          >
            Text
          </a>
        </div>
      </div>
    </div>
  );
};

export default GutendexBook;
