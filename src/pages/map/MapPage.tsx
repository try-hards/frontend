import { getCurrentCoords, getLastKnownCoords } from '@/services/geolocation';
import { Box } from '@mui/material';
import tt from '@tomtom-international/web-sdk-maps';
import { useEffect, useState } from 'react';

export default function MapPage() {
  const [map, setMap] = useState<tt.Map>();

  useEffect(() => {
    const coords = getLastKnownCoords();
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: 'map',
      center: coords ? [coords.lng, coords.lat] : [0, 0],
      zoom: 14,
    });
    setMap(map);

    const fetchLocation = async () => {
      const { lat, lng } = await getCurrentCoords();
      map.setCenter([lng, lat]);

      const marker = new tt.Marker()
        .setLngLat({
          lng,
          lat,
        })
        .addTo(map);

      const popup = new tt.Popup({ offset: 30 })
        .setHTML('You are here')
        .addTo(map);

      marker.setPopup(popup);
    };
    fetchLocation();

    return () => {
      map.remove();
      setMap(undefined);
    };
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          p: 2,
        }}
      >
        <Box id='map' sx={{ width: '100%', height: '100%', bgcolor: 'black' }}>
          {/* MAP */}
        </Box>
      </Box>
    </Box>
  );
}
