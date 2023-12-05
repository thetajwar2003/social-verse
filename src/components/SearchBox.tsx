import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({}) {
  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    // TODO: search logic
    console.log(search);
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border-2 rounded-md overflow-hidden"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="px-4 w-full text-black"
      />
      <button type="submit" className=" px-4 py-2 hover:bg-gray-300">
        <FaSearch />
      </button>
    </form>
  );
}
