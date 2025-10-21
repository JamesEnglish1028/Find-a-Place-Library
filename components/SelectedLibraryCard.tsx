import React from 'react';
import { RichLibrary } from '../types';
import { getStatusBadgeClass } from '../utils';

interface SelectedLibraryCardProps {
  library: RichLibrary;
}

const SelectedLibraryCard: React.FC<SelectedLibraryCardProps> = ({ library }) => {
  return (
    <div className="card bg-base-100 shadow-md border-primary border-2">
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
        {/* Public library enriched info */}
        {library.type?.toLowerCase() === 'public' && (
          <div className="mt-4 p-2 bg-base-200 rounded">
            <h3 className="font-semibold text-sm mb-1">Public Library Info</h3>
            <div className="text-xs text-gray-700">
              {library.cm_url && (
                <div><strong>CM URL:</strong> <a href={library.cm_url} target="_blank" rel="noopener noreferrer" className="link link-primary">{library.cm_url}</a></div>
              )}
              {library.type?.toLowerCase() === 'public' && library.fscs_id && (
                <div><strong>IMLS Link:</strong> <a href={`https://www.imls.gov/LibraryDetails?FFYear=2022&FSCSKey=${library.fscs_id}`} target="_blank" rel="noopener noreferrer" className="link link-primary">IMLS Record</a></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedLibraryCard;
