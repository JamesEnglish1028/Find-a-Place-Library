
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Name, FSCS ID, State, Status..."
          className="input input-bordered input-primary w-full"
          disabled={isLoading}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner"></span> : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
