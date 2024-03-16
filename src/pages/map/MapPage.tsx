import { getCurrentCoords, getLastKnownCoords } from '@/services/geolocation';
import { EventDto } from '@/types/EventDto';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchEvents = async () => {
  const { data } = await axios.get<EventDto[]>('/api/events/get_events');
  return data;
};

export default function MapPage() {
  const [map, setMap] = useState<tt.Map>();

  const {
    data: events,
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

        new tt.Marker({
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
    if (map && events) {
      events.forEach((e) => {
        const marker = new tt.Marker()
          .setLngLat([e.longitude, e.latitude])
          .addTo(map);
        const popup = new tt.Popup({
          offset: 30,
          anchor: 'bottom',
          closeOnClick: false,
        })
          .setHTML(
            `<h3 style="margin: 0 0 8px 0">${e.name}</h3><img style="width: 80px; height: 80px; object-fit: cover" src="${e.photo}" alt="${e.name}"/>`,
          )
          .addTo(map);
        marker.setPopup(popup);
      });
    }
  }, [map, events]);

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
