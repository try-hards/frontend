import { EventDto } from '@/types/EventDto';
import { addHours } from 'date-fns';
import { HttpResponse, http } from 'msw';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const photoUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ludovic_and_Lauren_%288425515069%29.jpg/640px-Ludovic_and_Lauren_%288425515069%29.jpg';

export const handlers = [
  http.get(`${baseUrl}/cats`, () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Luna' },
        { id: 2, name: 'Simba' },
        { id: 3, name: 'Pixel' },
      ],
    });
  }),
  http.get(`${baseUrl}/api/events/get_events`, () => {
    return HttpResponse.json<EventDto[]>([
      {
        name: 'Event 1',
        description: 'Description 1',
        start_time: Date.now().toString(),
        end_time: addHours(Date.now(), 2).toString(),
        place: 'Place 1',
        photo: photoUrl,
        participantsCount: 10,
        participantsMax: 20,
        latitude: 50.048763,
        longitude: 19.965647,
      },
      {
        name: 'Event 2',
        description: 'Description 2',
        start_time: Date.now().toString(),
        end_time: addHours(Date.now(), 2).toString(),
        place: 'Place 1',
        photo: photoUrl,
        participantsCount: 10,
        participantsMax: 20,
        latitude: 50.052756,
        longitude: 19.967993,
      },
      {
        name: 'Event 3',
        description: 'Description 3',
        start_time: Date.now().toString(),
        end_time: addHours(Date.now(), 2).toString(),
        place: 'Place 1',
        photo: photoUrl,
        participantsCount: 10,
        participantsMax: 20,
        latitude: 50.048689,
        longitude: 19.95839,
      },
    ]);
  }),
];
