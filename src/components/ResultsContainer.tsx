import { api } from "~/utils/api";
import { type Book } from "~/types/Gutendex";
import GutendexBook from "./Book/GutendexBook";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

interface ResultsContainerProps {
  currentBooks: Book[];
  setCurrentBooks: Dispatch<SetStateAction<Book[]>>;
  bookName: string | null;
  setNextBatch: Dispatch<SetStateAction<null | string>>;
}

const ResultsContainer = ({
  currentBooks,
  setCurrentBooks,
  bookName,
  setNextBatch,
}: ResultsContainerProps) => {
  const { data, isError, isLoading } = api.books.getBook.useQuery({ bookName });

  useEffect(() => {
    if (data) {
      setCurrentBooks((prev) => [...prev, ...data.results]);
      if (data.next) {
        setNextBatch(data.next);
      }
    }
  }, [data, setCurrentBooks, setNextBatch]);

  return (
    <section id="results" className="mx-auto mt-24 w-full max-w-7xl text-white">
      {isError ? (
        <ErrorContainer />
      ) : isLoading ? (
        <LoadingContainer />
      ) : currentBooks && currentBooks.length ? (
        <BookResults data={currentBooks} bookName={bookName} />
      ) : (
        <></>
      )}
    </section>
  );
};

const BookResults = ({
  data,
  bookName,
}: {
  data: Book[];
  bookName: string | null;
}) => {
  return (
    <>
      <div className="flex  w-full items-center  justify-between border-b border-b-gray-500 py-4">
        <h2 className="text-2xl font-bold">
          {bookName ? bookName : "Trending Books"}
        </h2>
        {data.length ? (
          <span className="px-2 font-medium">{data.length}</span>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-12 flex flex-col items-center justify-center gap-8  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((book) => (
          <GutendexBook bookData={book} key={book.id} />
        ))}
      </div>
    </>
  );
  //   return <JSONRepr data={data} title="books Result" />;
};

const LoadingContainer = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4  p-8">
      <div className="animate-pulse rounded-md bg-black/40 p-6"></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6"></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6 "></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6 "></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6 "></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6 "></div>
      <div className="animate-pulse rounded-md bg-black/40 p-6 "></div>
    </div>
  );
};

const ErrorContainer = () => {
  return <div>error</div>;
};
export default ResultsContainer;
