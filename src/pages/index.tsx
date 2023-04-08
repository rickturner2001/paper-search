import { sectionContext } from "~/context";
import { type NextPage } from "next";
import Head from "next/head";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import BookSearch from "~/components/BookSearch";
import Navbar from "~/components/Navbar";
import type { Book } from "~/types/Gutendex";
import { api } from "~/utils/api";
import type { GenericBook, MenuSections } from "~/types/misc";
import PDFSearchWrapper from "~/components/PDFSectionWrapper";
import CopyFreeSectionWrapper from "~/components/ CopyFreeSectionWrapper";
import Link from "next/link";

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = useState<MenuSections>("copy-free");
  const [collection, setCollection] = useState<Book[] | GenericBook[]>([]);
  // URL to get next page of books

  const bookNameRef = useRef<HTMLInputElement>(null);

  const [isInvalid, setIsInvalid] = useState(false);
  const [bookName, setBookName] = useState<string | null>(null);

  const handleSubmission = () => {
    const name = bookNameRef.current?.value;
    if (name && !(name === "")) {
      setIsInvalid(false);
      setCollection([]);
      setBookName(name);
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
      <sectionContext.Provider value={{ activeSection }}>
        <main className="min-h-screen bg-black">
          <Navbar />
          <div className=" mx-auto mt-12 flex w-full flex-col items-center p-12 text-white  md:mt-24 lg:max-w-5xl lg:p-0">
            <h1 className="mx-auto text-center text-5xl  font-black md:text-7xl">
              Search for books and start reading right now!
            </h1>
            <p className="mt-6 text-center text-base text-gray-300 md:text-lg">
              Discover new books and convert them to ePubs for easy reading on
              any device, anywhere, anytime.
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

            <div className="mx-auto mt-24 flex w-full max-w-2xl flex-col items-center   justify-center gap-4 md:flex-row md:gap-8">
              <button
                onClick={() => {
                  setActiveSection("copy-free");
                  setBookName(null);
                }}
                className={` w-full rounded-md bg-white px-5 py-2.5 font-medium text-black transition-colors duration-300
              `}
              >
                Copyright-free
              </button>
              <button
                onClick={() => {
                  setActiveSection("pdf");
                  setBookName(null);
                }}
                className={` relative z-20 w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] font-medium transition-colors duration-300 after:absolute after:inset-0 after:z-10 after:w-full after:bg-gradient-to-r after:from-pink-500 after:via-red-500 after:to-yellow-500 after:p-4 after:blur-3xl after:content-[''] 
              `}
              >
                <span
                  className={` relative z-40 block rounded-md  bg-black px-4 py-2`}
                >
                  PDF Files
                </span>
              </button>
            </div>
            {activeSection === "copy-free" ? (
              <CopyFreeSectionWrapper
                bookName={bookName}
                collection={collection as Book[]}
                setCollection={
                  setCollection as Dispatch<SetStateAction<Book[]>>
                }
              />
            ) : (
              <PDFSearchWrapper bookName={bookName} />
            )}
          </div>
        </main>
      </sectionContext.Provider>
    </>
  );
};

export default Home;
