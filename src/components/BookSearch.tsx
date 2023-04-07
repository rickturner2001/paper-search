import { type RefObject } from "react";

const BookSearch = ({
  bookNameRef,
  children,
}: {
  bookNameRef: RefObject<HTMLInputElement>;
  children: JSX.Element;
}) => {
  return (
    <div>
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-white "
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        {children}
      </div>
    </div>
  );
};

export default BookSearch;
