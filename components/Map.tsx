import React, { useRef, useEffect } from 'react';
import type { GeoJson } from '../types';

// Use a global L object from the Leaflet CDN script
declare const L: any;

interface MapProps {
  geoJsonData: GeoJson | null;
}

const Map: React.FC<MapProps> = ({ geoJsonData }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const geoJsonLayerRef = useRef<any | null>(null);

  // Effect to initialize the map
  useEffect(() => {
    if (mapInstanceRef.current || !mapContainerRef.current) return;

    // Initialize map and set initial view to the center of the US
    const map = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    mapInstanceRef.current = map;

    // Cleanup on unmount
    return () => {
        mapInstanceRef.current?.remove();
        mapInstanceRef.current = null;
    }

  }, []);

  // Effect to update the GeoJSON layer when data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove the previous GeoJSON layer if it exists
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    if (geoJsonData) {
      const geoJsonLayer = L.geoJSON(geoJsonData, {
        style: () => ({
          color: '#0052D4', // A primary blue color
          weight: 2,
          opacity: 0.8,
          fillColor: '#0052D4',
          fillOpacity: 0.2
        })
      }).addTo(map);

      // Fit map to the bounds of the new layer
      map.fitBounds(geoJsonLayer.getBounds());
      
      geoJsonLayerRef.current = geoJsonLayer;
    } else {
        // Reset view if no data is present
        map.setView([39.8283, -98.5795], 4);
    }

  }, [geoJsonData]);


  return (
    <div className="w-full mx-auto bg-base-200 rounded-lg shadow-inner">
      <div ref={mapContainerRef} className="z-0"></div>
    </div>
  );
};

export default Map;