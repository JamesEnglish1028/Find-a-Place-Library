
import React from 'react';
import { Library } from '../types';
import { getStatusBadgeClass } from '../utils';

interface LibraryCardProps {
  library: Library;
  onSelect: (library: Library) => void;
  isSelected: boolean;
}

const LibraryCard: React.FC<LibraryCardProps> = ({ library, onSelect, isSelected }) => {
  return (
    <div 
      className={`card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
      onClick={() => onSelect(library)}
    >
      <div className="card-body p-4">
        <h2 className="card-title text-base">{library.name}</h2>
        <p className="text-sm text-gray-500">{library.city}, {library.state}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="badge badge-outline">{library.fscs_id}</div>
          {library.status && <div className={`badge ${getStatusBadgeClass(library.status)}`}>{library.status}</div>}
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
