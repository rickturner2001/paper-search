import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import BookSearch from "~/components/BookSearch";
import Navbar from "~/components/Navbar";
import ResultsContainer from "~/components/ResultsContainer";
import Spinner from "~/components/Spinner";
import { Book } from "~/types/Gutendex";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const bookNameRef = useRef<HTMLInputElement>(null);
  const [bookNameStatus, setBookNameStatus] = useState({
    isValid: false,
    name: null as null | string,
  });

  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);

  // URL to get next page of books
  const [nextBatch, setNextBatch] = useState<null | string>(null);
  const {
    mutate,
    data: mutationData,
    isLoading,
  } = api.books.getBooksByUrl.useMutation();

  useEffect(() => {
    if (mutationData) {
      setCurrentBooks((prev) => [...prev, ...mutationData.results]);
    }
  }, [mutationData]);
  const handleSubmission = () => {
    const name = bookNameRef.current?.value;
    if (name && !(name === "")) {
      setIsInvalid(false);
      setCurrentBooks([]);
      setBookNameStatus({ isValid: true, name: name });
      bookNameRef.current.value = "";
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <>
      <Head>
        <title>Paper-search</title>
        <meta
          name="description"
          content="Discover new books and convert them to ePubs for easy reading on any device, anywhere, anytime."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-black/90">
        <Navbar />
        <div className=" mx-auto mt-24 flex w-full flex-col items-center p-12  text-white lg:max-w-5xl lg:p-0">
          <h1 className="mx-auto text-center text-7xl  font-black">
            Search for books and start reading right now!
          </h1>
          <p className="mt-6 text-center text-lg text-gray-300">
            Discover new books and convert them to ePubs for easy reading on any
            device, anywhere, anytime.
          </p>

          <div className="mx-auto mt-12 w-full max-w-2xl">
            <BookSearch bookNameRef={bookNameRef}>
              <>
                <input
                  ref={bookNameRef}
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-500  bg-black p-4 pl-10 text-sm text-white outline-gray-500 focus:border-white focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmission();
                    }
                  }}
                  placeholder="Search Books..."
                  required
                />
                <button
                  onClick={handleSubmission}
                  type="submit"
                  className="absolute bottom-2.5 right-2.5 rounded-lg bg-black   px-4  py-2 text-sm font-medium text-white focus:outline-none "
                >
                  Search
                </button>
              </>
            </BookSearch>
          </div>
          <ResultsContainer
            setNextBatch={setNextBatch}
            bookName={bookNameStatus.name}
            currentBooks={currentBooks}
            setCurrentBooks={setCurrentBooks}
          />
          {currentBooks.length && nextBatch ? (
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
        </div>
      </main>
    </>
  );
};

export default Home;
