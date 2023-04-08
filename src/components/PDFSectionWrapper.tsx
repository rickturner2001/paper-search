import { api } from "~/utils/api";
import { LoadingContainer } from "./ResultsContainer";
import JSONRepr from "./JSONRepr";
import { useContext, useEffect, useState } from "react";
import { GenericBook } from "~/types/misc";
import Spinner from "./Spinner";
import { sectionContext } from "~/context";

const PDFSearchWrapper = ({ bookName }: { bookName: string | null }) => {
  const { data, isLoading, isError } = api.books.getPDFsBySearchQuery.useQuery({
    query: bookName,
  });

  const [collection, setCollection] = useState<PDFBook[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    mutate,
    data: mutationData,
    isLoading: isLoadingMutation,
    isError: isErrorMutation,
  } = api.books.getPdfQueryNextPage.useMutation({
    onSuccess: () => {
      setPageNumber((prev) => prev + 1);
    },
  });

  useEffect(() => {
    if (data) {
      setCollection(data);
    }
    if (mutationData) {
      setCollection((prev) => [...prev, ...mutationData]);
    }
  }, [data, setCollection, collection.length, mutationData]);

  const { activeSection } = useContext(sectionContext);
  return (
    <section className="mx-auto mb-24 w-full max-w-7xl">
      <div className="mt-12 border-b border-b-gray-500 py-4">
        <p className="text-2xl capitalize">
          {(activeSection === "copy-free"
            ? "Copyright-free > "
            : "PDF Search > ") + (bookName ? bookName : "Top Searches")}
        </p>
      </div>
      {isError && isErrorMutation ? (
        <div className="mt-12 w-full rounded-md border  border-red-500 bg-red-500/20 px-5 py-2.5 text-center text-red-500">
          <span>There was an error loading the content </span>
        </div>
      ) : isLoading ? (
        <LoadingContainer />
      ) : data && collection.length ? (
        <div className="flex w-full flex-col">
          <PDFSearchResults collection={collection} />
          {bookName && (
            <div className="flex w-full max-w-7xl items-center justify-center">
              <button
                onClick={() => {
                  if (!isLoadingMutation)
                    mutate({ page: pageNumber + 1, query: bookName });
                }}
                className="flex w-full items-center justify-center rounded-md border border-gray-500 px-4 py-2 text-center"
              >
                {isLoadingMutation ? (
                  <Spinner className="h-6 w-6" />
                ) : (
                  "Load more"
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

type PDFBook = { title: string; cover: string; href: string };
const PDFSearchResults = ({ collection }: { collection: PDFBook[] }) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center gap-8  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collection.map((book) => (
        <>
          <PDFBook bookData={book} key={book.href} />
        </>
      ))}
    </div>
  );
  //   return <JSONRepr title="PDF Results" data={data} />;
};

const PDFBook = ({ bookData }: { bookData: PDFBook }) => {
  return (
    <div className="group relative flex w-full max-w-md flex-col bg-black/20">
      <img
        alt={bookData.title + " Book cover"}
        src={bookData.cover}
        className="lg:h-72"
      />

      <div className="absolute flex h-full w-full flex-col justify-between bg-black/70 p-4   opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <h2 className="mt-4 h-full max-h-10 truncate text-ellipsis text-center font-medium text-white">
            {bookData.title}
          </h2>
        </div>
        <div>
          <a
            href={"https://www.pdfdrive.com" + bookData.href}
            target="_blank"
            className="block w-full rounded-md border border-red-500 bg-red-500/70 px-4 py-2  text-center text-red-100 "
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default PDFSearchWrapper;
