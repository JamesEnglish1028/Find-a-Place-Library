export interface Library {
  name: string;
  fscs_id: string;
  city: string;
  state: string;
  status: string;
  cm_url: string;
  type?: string;
}

export interface LibraryLocation {
  fscs_id: string;
  state: string; // Full state name
  stabbr: string; // State abbreviation
  city: string;
  zip: string;
  county: string;
  type?: string;
}

import type { IPED } from './types/IPED';

export interface RichLibrary extends Library, LibraryLocation {
  iped?: IPED | null;
}

// Basic GeoJSON types for rendering the map
export interface GeoJsonFeature {
  type: 'Feature';
  properties: { [key: string]: any };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

export interface GeoJson {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}
