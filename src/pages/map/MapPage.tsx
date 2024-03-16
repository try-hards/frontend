import { getCurrentCoords, getLastKnownCoords } from '@/services/geolocation';
import { EventDto } from '@/types/EventDto';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventDetailsModal from './EventDetailsModal';

const fetchEvents = async () => {
  const { data } = await axios.get<EventDto[]>('/api/events/get_events');
  return data;
};

export default function MapPage() {
  const [map, setMap] = useState<tt.Map>();
  const [event, setEvent] = useState<EventDto | null>(null);

  const {
    data: events,
    // isLoading,
    // isError,
    // error,
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

        userMarker.getElement().style.zIndex = '100';
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

        const fillPercent = Math.round(
          (e.participantsCount / e.participantsMax) * 100,
        );

        const color =
          fillPercent > 80 ? 'red' : fillPercent > 50 ? 'orange' : 'green';

        const popup = new tt.Popup({
          offset: 30,
          anchor: 'bottom',
          closeOnClick: false,
        })
          .setHTML(
            `<h4 style="margin: 0 0 8px 0; word-wrap: break-word; width: 100px;">${e.name}</h4>
            <img style="width: 100px; height: 100px; object-fit: cover" src="${e.photo}" alt="${e.name}"/>
            <div class="outer-bar">
              <div class="inner-bar" style="width: ${fillPercent}%; background: ${color}">
              </div>
            </div>
            `,
          )
          .addTo(map);

        marker.setPopup(popup);

        popup.getElement().addEventListener('click', function () {
          setEvent(e);
        });
      });
    }
  }, [map, events]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box id='map' sx={{ width: '100%', height: '100%', bgcolor: 'black' }} />
      {/* {events && <EventListDrawer events={events} />} */}
      <EventDetailsModal event={event} unsetEvent={() => setEvent(null)} />
    </Box>
  );
}
