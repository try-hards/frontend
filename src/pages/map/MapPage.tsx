import { getCurrentCoords, getLastKnownCoords } from '@/services/geolocation';
import { EventDto } from '@/types/EventDto';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchEvents = async () => {
  const { data } = await axios.get<{ events: EventDto[] }>('/events');
  return data;
};

export default function MapPage() {
  const [map, setMap] = useState<tt.Map>();

  const {
    data: eventsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  useEffect(() => {
    const coords = getLastKnownCoords();
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: 'map',
      center: coords ? [coords.lng, coords.lat] : [0, 0],
      zoom: 14,
    });
    setMap(map);

    if (map) {
      const fetchLocation = async () => {
        const { lat, lng } = await getCurrentCoords();
        map.setCenter([lng, lat]);

        const markerElement = document.createElement('div');
        markerElement.innerHTML = '<div class="marker"/>';

        const userMarker = new tt.Marker({
          element: markerElement,
        })
          .setLngLat({ lng, lat })
          .addTo(map);
      };

      fetchLocation();
    }

    return () => {
      map.remove();
      setMap(undefined);
    };
  }, []);

  useEffect(() => {
    if (map && eventsData) {
      eventsData.events.forEach((e) => {
        const marker = new tt.Marker()
          .setLngLat([e.longitude, e.latitude])
          .addTo(map);
        const popup = new tt.Popup({ offset: 30, anchor: 'bottom' })
          .setHTML(`<h3>${e.title}</h3><p>${e.description}</p>`)
          .addTo(map);
        marker.setPopup(popup);
      });
    }
  }, [map, eventsData]);

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
