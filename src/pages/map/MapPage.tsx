import { Box } from '@mui/material';
import tt from '@tomtom-international/web-sdk-maps';
import { useEffect } from 'react';

export default function MapPage() {
  useEffect(() => {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: 'map',
      center: [0, 0],
      zoom: 1,
    });

    return () => {
      map.remove();
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
