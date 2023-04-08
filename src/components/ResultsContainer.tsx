import { api } from "~/utils/api";
import { type Book } from "~/types/Gutendex";
import GutendexBook from "./Book/GutendexBook";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useContext,
} from "react";
import { sectionContext } from "~/context";

interface ResultsContainerProps {
  collection: Book[];
  setCollection: Dispatch<SetStateAction<Book[]>>;
  bookName: string | null;
  setNextBatch: Dispatch<SetStateAction<null | string>>;
}

const GutendexResults = ({
  bookName,
  collection,
  setCollection,
  setNextBatch,
}: ResultsContainerProps) => {
  const { data, isError, isLoading } = api.books.getBook.useQuery({ bookName });

  useEffect(() => {
    if (data) {
      setCollection((prev) => [...prev, ...data.results]);
      if (data.next) {
        setNextBatch(data.next);
      }
    }
  }, [data, setCollection, setNextBatch]);

  return (
    <section id="results" className="mx-auto mt-24 w-full max-w-7xl text-white">
      {isError ? (
        <ErrorContainer />
      ) : isLoading ? (
        <LoadingContainer />
      ) : collection && collection.length ? (
        <BookResults collection={collection} bookName={bookName} />
      ) : (
        <></>
      )}
    </section>
  );
};

interface BookResultsProps {
  collection: Book[];
  bookName: string | null;
}
const BookResults = ({ collection, bookName }: BookResultsProps) => {
  const { activeSection } = useContext(sectionContext);
  return (
    <>
      <div className="flex  w-full items-center  justify-between border-b border-b-gray-500 py-4">
        <h2 className="text-2xl ">
          {(activeSection === "copy-free"
            ? "Copyright-free > "
            : "PDF Search > ") + (bookName ? bookName : "Trending Books")}
        </h2>
        {collection.length ? (
          <span className="px-2 font-medium">{collection.length}</span>
        ) : (
          <></>
        )}
      </div>
      <GutendexCollection collection={collection} />
    </>
  );
  //   return <JSONRepr data={data} title="books Result" />;
};

const GutendexCollection = ({ collection }: { collection: Book[] }) => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-12  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collection.map((book) => (
        <GutendexBook bookData={book} key={book.id} />
      ))}
    </div>
  );
};

export const LoadingContainer = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4  p-8">
      <div className="animate-pulse rounded-md bg-white/20 p-6"></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6"></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6 "></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6 "></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6 "></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6 "></div>
      <div className="animate-pulse rounded-md bg-white/20 p-6 "></div>
    </div>
  );
};

const ErrorContainer = () => {
  return <div>error</div>;
};
export default GutendexResults;
