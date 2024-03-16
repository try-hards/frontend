import { getCurrentLocation } from '@/services/geolocation';
import { Box } from '@mui/material';
import tt from '@tomtom-international/web-sdk-maps';
import { useEffect, useState } from 'react';

export default function MapPage() {
  const [map, setMap] = useState<tt.Map>();

  useEffect(() => {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: 'map',
      center: [0, 0],
      zoom: 1,
    });
    setMap(map);

    const fetchLocation = async () => {
      const loc = await getCurrentLocation();
      map.setCenter([loc.longitude, loc.latitude]);
      map.setZoom(14);

      new tt.Marker()
        .setLngLat({
          lng: loc.longitude,
          lat: loc.latitude,
        })
        .addTo(map);
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
