import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ categories = [], onSearch, onCategoryChange }) {  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);  
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);  
  };

  return (
    <header className='sticky top-0 z-10 mx-auto bg-white/75 backdrop-blur-lg dark:bg-zinc-950/75'>
      <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0'>
        <div className='flex'>
          <FontAwesomeIcon
            className='size-10'
            icon={faCanadianMapleLeaf}
            id='logo'
          />
          <Link to={`/`} className='italic text-indigo-300 text-3xl font-bold decoration-blue-50 hover:decoration-blue-50'>
          Palette Earth
          </Link>
        </div>
        <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">
        Discover, Savor, Create.
        </span>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="mr-4 flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0">
        <div className=" flex space-x-4">
          {categories && categories.length > 0 ? (  
            categories.map((category, index) => (
              <button
                key={index}
                className="text-indigo-600 dark:text-indigo-300 hover:underline"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))
          ) : (
            <p>No categories available</p>  
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
