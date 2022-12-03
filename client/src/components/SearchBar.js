import React from 'react'

const SearchBar = ({ search, setSearch }) => {
  return (
    
        <form className='search'>
            <label><i className="fa-solid fa-magnifying-glass"/></label>
            <input
            type="text"
            id="search"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </form>
   
  )
}

export default SearchBar