
import React from 'react';
import { RichLibrary } from '../types';
import { getStatusBadgeClass } from '../utils';

interface LibraryCardProps {
  library: RichLibrary;
  onSelect: (library: RichLibrary) => void;
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
        {/* Academic library IPED info: show all fields */}
        {library.type?.toLowerCase() === 'academic' && library.iped && (
          <div className="mt-4 p-2 bg-base-200 rounded">
            <h3 className="font-semibold text-sm mb-1">Academic Institution Info (IPED)</h3>
            <div className="text-xs text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {Object.entries(library.iped).map(([key, value]) => (
                <div key={key} className="flex flex-col mb-1">
                  <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryCard;
