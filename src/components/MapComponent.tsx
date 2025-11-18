import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom marker icons
const createMarkerIcon = (color: string) => {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export interface MapMarker {
  name: string;
  latitude: number;
  longitude: number;
  distance?: string;
  eta?: string;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple';
}

interface MapComponentProps {
  // Single marker mode (legacy support)
  hospitalName?: string;
  latitude?: number;
  longitude?: number;
  distance?: string;
  eta?: string;
  
  // Multi-marker mode
  markers?: MapMarker[];
  showRoute?: boolean;
  
  // Common props
  height?: string;
  showInfo?: boolean;
  zoom?: number;
}

const MapView = ({ markers, zoom = 13 }: { markers: MapMarker[]; zoom: number }) => {
  const map = useMapEvents({
    load() {
      if (markers.length === 1) {
        map.setView([markers[0].latitude, markers[0].longitude], zoom);
      } else if (markers.length > 1) {
        const bounds = L.latLngBounds(
          markers.map(m => [m.latitude, m.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    },
  });
  return null;
};

export default function MapComponent({
  hospitalName = "Location",
  latitude,
  longitude,
  distance,
  eta,
  markers,
  showRoute = false,
  height = "400px",
  showInfo = true,
  zoom = 13,
}: MapComponentProps) {
  const mapRef = useRef(null);

  // Convert single marker mode to multi-marker mode
  const displayMarkers: MapMarker[] = markers || (
    latitude !== undefined && longitude !== undefined
      ? [{
          name: hospitalName,
          latitude,
          longitude,
          distance,
          eta,
          color: 'red',
        }]
      : []
  );

  // If showRoute is true and we have 2+ markers, create a polyline
  const routeCoordinates = showRoute && displayMarkers.length > 1
    ? displayMarkers.map(m => [m.latitude, m.longitude] as [number, number])
    : null;

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <MapContainer
        style={{ height, width: '100%' }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapView markers={displayMarkers} zoom={zoom} />
        
        {/* Route polyline */}
        {routeCoordinates && (
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: '#ef4444',
              weight: 3,
              opacity: 0.7,
              dashArray: '5, 5',
            }}
          />
        )}
        
        {/* Markers */}
        {displayMarkers.map((marker, idx) => (
          <Marker
            key={`${marker.name}-${idx}`}
            position={[marker.latitude, marker.longitude]}
          >
            {showInfo && (
              <Popup>
                <div className="font-semibold text-foreground">{marker.name}</div>
                {marker.distance && marker.eta && (
                  <div className="text-sm text-muted-foreground">
                    {marker.distance} away • {marker.eta}
                  </div>
                )}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
