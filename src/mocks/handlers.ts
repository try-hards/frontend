import { HttpResponse, http } from 'msw';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
  http.get(`${baseUrl}/events`, () => {
    return HttpResponse.json({
      events: [
        {
          title: 'Event 1',
          description: 'Description 1',
          latitude: 50.048763,
          longitude: 19.965647,
        },
        {
          title: 'Event 2',
          description: 'Description 2',
          latitude: 50.052756,
          longitude: 19.967993,
        },
        {
          title: 'Event 3',
          description: 'Description 3',
          latitude: 50.048689,
          longitude: 19.95839,
        },
      ],
    });
  }),
];
