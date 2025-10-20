import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import LibraryCard from './components/LibraryCard';
import Map from './components/Map';
import ThemeToggle from './components/ThemeToggle';
import PalaceLogo from './components/PalaceLogo';
import { searchLibraries, fetchCityBoundary } from './services/libraryService';
import { RichLibrary, GeoJson } from './types';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [libraries, setLibraries] = useState<RichLibrary[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<RichLibrary | null>(null);
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

  const handleSelectLibrary = useCallback(async (library: RichLibrary) => {
    if (selectedLibrary?.fscs_id === library.fscs_id) {
      // Deselect if clicking the same card again
      setSelectedLibrary(null);
      setGeoJsonData(null);
      return;
    }

    setSelectedLibrary(library);
    setIsMapLoading(true);
    setError(null);
    setGeoJsonData(null); // Clear previous map data

    try {
      // Use stabbr (state abbreviation) and type for correct overlay
      const geoData = await fetchCityBoundary(library.city, library.stabbr, library.type);
      setGeoJsonData(geoData);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to load map data for ${library.city}: ${err.message}`);
      } else {
        setError(`Failed to load map data for ${library.city}.`);
      }
      setGeoJsonData(null);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Library Results Column */}
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {!isLoading && libraries.length > 0 && libraries.map(lib => (
              <LibraryCard
                key={lib.fscs_id}
                library={lib}
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
          
          {/* Map Column */}
          <div className="relative h-[70vh] w-full rounded-lg overflow-hidden shadow-lg">
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