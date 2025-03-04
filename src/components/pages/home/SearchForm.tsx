"use client";

import { useHomeStore } from '@/store/home';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';

export default function SearchForm() {
  const { setUsername, searchUsername, loadingUsername } = useHomeStore();
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(query);
    searchUsername();
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter Username"
        className='border border-gray-400 px-4 py-2 mb-3 w-full text-sm bg-gray-50'
      />
      <button disabled={loadingUsername} type="submit" className='bg-sky-600 hover:bg-sky-700 cursor-pointer px-4 py-2 text-white w-full flex items-center justify-center'>
        {!loadingUsername && "Search"}
        {loadingUsername && <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />}
      </button>
    </form>
  );
}