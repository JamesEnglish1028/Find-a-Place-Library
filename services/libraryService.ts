import { Library, GeoJson } from '../types';

// Mock data based on the provided Notion table.
const mockLibraries: Library[] = [
  { name: 'ALASKA STATE LIBRARY', fscs_id: 'AK0001', city: 'JUNEAU', state: 'AK', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AK0001' },
  { name: 'ANCHORAGE PUBLIC LIBRARY', fscs_id: 'AK0003', city: 'ANCHORAGE', state: 'AK', status: 'Testing', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AK0003' },
  { name: 'FAIRBANKS NORTH STAR BOROUGH PUBLIC LIBRARY', fscs_id: 'AK0009', city: 'FAIRBANKS', state: 'AK', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AK0009' },
  { name: 'JUNEAU PUBLIC LIBRARIES', fscs_id: 'AK0011', city: 'JUNEAU', state: 'AK', status: 'Onboarding', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AK0011' },
  { name: 'ARIZONA STATE LIBR, ARCHIVES AND PUBLIC RECORDS', fscs_id: 'AZ0001', city: 'PHOENIX', state: 'AZ', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AZ0001' },
  { name: 'PHOENIX PUBLIC LIBRARY', fscs_id: 'AZ0032', city: 'PHOENIX', state: 'AZ', status: 'Cancelled', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/AZ0032' },
  { name: 'LOS ANGELES PUBLIC LIBRARY', fscs_id: 'CA0037', city: 'LOS ANGELES', state: 'CA', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/CA0037' },
  { name: 'SAN FRANCISCO PUBLIC LIBRARY', fscs_id: 'CA0061', city: 'SAN FRANCISCO', state: 'CA', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/CA0061' },
  { name: 'DENVER PUBLIC LIBRARY', fscs_id: 'CO0013', city: 'DENVER', state: 'CO', status: 'Testing', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/CO0013' },
  { name: 'MIAMI-DADE PUBLIC LIBRARY SYSTEM', fscs_id: 'FL0031', city: 'MIAMI', state: 'FL', status: 'Live', cm_url: 'https://admin.thepalaceproject.org/alam/libraries/library/FL0031' },
];

export const searchLibraries = async (query: string): Promise<Library[]> => {
  console.log(`Searching for: ${query}`);
  const lowercasedQuery = query.toLowerCase();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      const results = mockLibraries.filter(lib =>
        lib.name.toLowerCase().includes(lowercasedQuery) ||
        lib.fscs_id.toLowerCase().includes(lowercasedQuery) ||
        lib.state.toLowerCase().includes(lowercasedQuery) ||
        lib.city.toLowerCase().includes(lowercasedQuery) ||
        (lib.status && lib.status.toLowerCase().includes(lowercasedQuery))
      );
      resolve(results);
    }, 500); // Simulate network delay
  });
};

export const fetchCityBoundary = async (city: string, state: string): Promise<GeoJson> => {
  const stateAbbr = state.toLowerCase();
  const cityFormatted = city.toLowerCase().replace(/ /g, '-');

  // This new URL structure is based on a different path in the same repository
  // and has been found to be more reliable for cases like Juneau, AK.
  const url = `https://raw.githubusercontent.com/generalpiston/geojson-us-city-boundaries/master/cities/${stateAbbr}/${cityFormatted}.json`;
  
  console.log(`Fetching GeoJSON from: ${url}`);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Could not fetch boundary for ${city}, ${state}. The data may not be available.`);
  }

  return response.json();
};