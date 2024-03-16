import { HttpResponse, http } from 'msw';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  /*
  http.get(`${baseUrl}/accounts/authenticated`, () => {
    return HttpResponse.json({
      data: [
        {
          "isAuthenticated": "success",
          "user": "Konrad"
        }
      ],
    });
  }),
  http.post(`${baseUrl}/accounts/register`, () => {
    return HttpResponse.json({
    });
  }),
  */
];
