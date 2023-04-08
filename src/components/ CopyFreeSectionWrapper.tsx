import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import type { Book } from "~/types/Gutendex";
import { api } from "~/utils/api";
import Spinner from "./Spinner";
import GutendexResults from "./ResultsContainer";

interface CopyFreeSectionWrapperProps {
  collection: Book[];
  setCollection: Dispatch<SetStateAction<Book[]>>;
  bookName: string | null;
}

const CopyFreeSectionWrapper = ({
  collection,
  setCollection,
  bookName,
}: CopyFreeSectionWrapperProps) => {
  const {
    mutate,
    data: mutationData,
    isLoading,
  } = api.books.getBooksByUrl.useMutation();

  const [nextBatch, setNextBatch] = useState<null | string>(null);

  useEffect(() => {
    if (mutationData) {
      setCollection((prev) => [...prev, ...mutationData.results]);
    }
  }, [mutationData, setCollection]);

  return (
    <>
      <GutendexResults
        setNextBatch={setNextBatch}
        bookName={bookName}
        collection={collection}
        setCollection={setCollection}
      />
      {collection.length && nextBatch ? (
        <div className="my-8 flex w-full justify-center gap-4">
          <button
            onClick={() => {
              if (!isLoading && nextBatch) {
                mutate({ url: nextBatch });
              }
            }}
            className="flex w-full flex-col items-center justify-center rounded-md border border-white px-4 py-2 text-center "
          >
            {isLoading ? <Spinner className="h-6 w-6" /> : "Load more"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CopyFreeSectionWrapper;
