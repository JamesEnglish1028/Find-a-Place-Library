
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, field: string) => void;
  isLoading: boolean;
}

const SEARCH_FIELDS = [
  { label: 'Name', value: 'name' },
  { label: 'FSCS ID', value: 'fscs_id' },
  { label: 'State', value: 'state' },
  { label: 'Status', value: 'status' },
  { label: 'Type', value: 'type' },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('name');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, field);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {SEARCH_FIELDS.map(f => (
            <label key={f.value} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="searchField"
                value={f.value}
                checked={field === f.value}
                onChange={() => setField(f.value)}
                className="radio radio-primary"
                disabled={isLoading}
              />
              <span className="text-sm">{f.label}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by ${SEARCH_FIELDS.find(f => f.value === field)?.label || 'Name'}...`}
            className="input input-bordered input-primary w-full"
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
