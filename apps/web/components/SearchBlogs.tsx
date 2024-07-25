"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

interface Blog {
  id: string;
  title: string;
}

export default function SearchBlogs() {
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<Blog[] | null>(null);

  async function handleBlogSearch(e: FormEvent) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const searchTerm = target.search.value;

    if (searchTerm.length < 4) {
      setSearchError("Please enter at least 4 characters to search...");
      setSearchResults(null);
      return;
    }

    const searches = await fetch(`/api/search?blog=${searchTerm}`);

    if (!searches.ok) {
      const errorResponse = await searches.json();
      setSearchError(errorResponse.msg || "Entered blog cannot be found!");
      setSearchResults(null);
      return;
    }

    const response: Blog[] = await searches.json();
    setSearchResults(response);
    setSearchError("");
  }

  return (
    <div className="max-w-2xl mx-auto my-5 p-5">
      <form onSubmit={handleBlogSearch}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            name="search"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
      {searchResults && (
        <div className="bg-gray-600 p-4 my-1 rounded-2xl">
          {searchResults.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="hover:bg-base-100 cursor-pointer transition-all duration-300 p-2 rounded">
                <h2>{blog.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
      {searchError && (
        <div className="bg-gray-600 py-5 px-4 my-1 rounded-2xl">
          {searchError}
        </div>
      )}
    </div>
  );
}
