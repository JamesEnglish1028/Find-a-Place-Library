import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import LibraryCard from './components/LibraryCard';
import SelectedLibraryCard from './components/SelectedLibraryCard';
import Map from './components/Map';
import ThemeToggle from './components/ThemeToggle';
import PalaceLogo from './components/PalaceLogo';
import { searchLibraries, fetchCityBoundary, enrichLibrary } from './services/libraryService';
import { RichLibrary, GeoJson } from './types';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [libraries, setLibraries] = useState<any[]>([]); // Library[]
  const [selectedLibrary, setSelectedLibrary] = useState<any | null>(null); // RichLibrary | null
  const [geoJsonData, setGeoJsonData] = useState<GeoJson | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = useCallback(async (query: string, field: string) => {
    if (!query) {
      setLibraries([]);
      setSelectedLibrary(null);
      setGeoJsonData(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchLibraries(query, field);
      setLibraries(results);
      if (results.length === 0) {
        setError("No libraries found for your search.");
      }
    } catch (err) {
      setError('Failed to fetch libraries. Please try again.');
      setLibraries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectLibrary = useCallback(async (library: any) => {
    if (selectedLibrary?.fscs_id === library.fscs_id) {
      setSelectedLibrary(null);
      setGeoJsonData(null);
      return;
    }
    setIsMapLoading(true);
    setError(null);
    setGeoJsonData(null);
    try {
      // Enrich the selected library
      const enriched = await enrichLibrary(library);
      setSelectedLibrary(enriched);
      // Try to fetch overlay
      try {
        const geoData = await fetchCityBoundary(enriched.city, enriched.stabbr, enriched.type);
        setGeoJsonData(geoData);
      } catch (overlayErr) {
        setGeoJsonData(null); // No overlay, but still show card
        if (overlayErr instanceof Error) {
          setError(`No map overlay for ${enriched.city || enriched.stabbr}: ${overlayErr.message}`);
        } else {
          setError(`No map overlay for ${enriched.city || enriched.stabbr}.`);
        }
      }
    } catch (err) {
      setSelectedLibrary(null);
      setGeoJsonData(null);
      if (err instanceof Error) {
        setError(`Failed to enrich library: ${err.message}`);
      } else {
        setError(`Failed to enrich library.`);
      }
    } finally {
      setIsMapLoading(false);
    }
  }, [selectedLibrary]);

  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-md sticky top-0 z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <PalaceLogo />
            <a href="/" className="btn btn-ghost normal-case text-xl">Palace Library Locator</a>
          </div>
        </div>
        <div className="flex-none">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Find a Library</h1>
            <p className="text-lg mt-2">Search for libraries by name, FSCS ID, state, or status.</p>
        </div>

  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {error && <div className="alert alert-error mt-4">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Search Results Column (1/4 width) */}
          <div className="lg:col-span-1 flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {!isLoading && libraries.length > 0 && libraries.map(lib => (
              <LibraryCard
                key={lib.fscs_id}
                library={{ ...lib, iped: null }}
                onSelect={handleSelectLibrary}
                isSelected={selectedLibrary?.fscs_id === lib.fscs_id}
              />
            ))}
            {isLoading && (
                 <div className="flex justify-center items-center h-full">
                    <span className="loading loading-lg loading-spinner text-primary"></span>
                 </div>
            )}
            {!isLoading && libraries.length === 0 && !error && (
                <div className="text-center p-8 bg-base-100 rounded-lg">
                    <p>Enter a search term to find libraries.</p>
                </div>
            )}
          </div>

          {/* Selected Library Card Column (1/4 width) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-start h-[70vh] w-full">
            {selectedLibrary ? (
              <div className="w-full max-w-xl">
                <SelectedLibraryCard library={selectedLibrary} />
              </div>
            ) : (
              <div className="w-full max-w-xl text-center p-8 bg-base-100 rounded-lg text-gray-500">Select a library to view details.</div>
            )}
          </div>

          {/* Map Column (1/2 width) */}
          <div className="lg:col-span-2 relative h-[70vh] w-full rounded-lg overflow-hidden shadow-lg">
            {isMapLoading && (
              <div className="absolute inset-0 bg-base-200 bg-opacity-75 flex justify-center items-center z-10">
                <span className="loading loading-lg loading-spinner text-primary"></span>
              </div>
            )}
            <Map geoJsonData={geoJsonData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;