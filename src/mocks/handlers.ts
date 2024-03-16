import { EventDto } from '@/types/EventDto';
import { HttpResponse, http } from 'msw';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/accounts/authenticated`, () => {
    return HttpResponse.json({
      data: [
        {
          isAuthenticated: 'success',
          user: 'Konrad',
        },
      ],
    });
  }),
  http.get(`${baseUrl}/api/events/get_events`, () => {
    return HttpResponse.json<EventDto[]>([
      {
        name: 'Festiwal Kultury Krakowskiej',
        description:
          'Przyjdź i uczestnicz w jednym z największych festiwali kultury w Krakowie, pełnym koncertów, wystaw, warsztatów i wydarzeń dla całej rodziny!',
        start_time: '2024-05-05T12:00:00',
        end_time: '2024-05-10T22:00:00',
        place: 'Rynek Główny, Kraków',
        photo: 'https://media.krakow.travel/photos/62832/xl.jpg',
        participantsCount: 200,
        participantsMax: 500,
        latitude: 50.061434 - 0.0125,
        longitude: 19.936583 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Pokaz Ognia i Świateł',
        description:
          'Zapraszamy na widowisko z udziałem pokazu ognia, świateł i efektów specjalnych. Niezapomniane wrażenia gwarantowane!',
        start_time: '2024-06-15T21:00:00',
        end_time: '2024-06-15T23:00:00',
        place: 'Bulwar Czerwieński, Kraków',
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/AnnanStaff2.jpg/1200px-AnnanStaff2.jpg',
        participantsCount: 100,
        participantsMax: 200,
        latitude: 50.051318 - 0.0125,
        longitude: 19.937285 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Maraton Kraków 2024',
        description:
          'Dołącz do setek biegaczy na maratonie Kraków 2024. Wspaniała okazja do poprawienia swojego rekordu osobistego!',
        start_time: '2024-07-20T08:00:00',
        end_time: '2024-07-20T14:00:00',
        place: 'Park Jordana, Kraków',
        photo: 'https://bieganie.pl/wp-content/uploads/2023/08/M73kqyK_.jpeg',
        participantsCount: 300,
        participantsMax: 1000,
        latitude: 50.060605 - 0.0125,
        longitude: 19.941054 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Koncert Rockowy na Wawelu',
        description:
          'Przeżyj niezapomniany wieczór przy dźwiękach najlepszych utworów rockowych na tle pięknych widoków Wawelu!',
        start_time: '2024-08-10T19:30:00',
        end_time: '2024-08-10T23:00:00',
        place: 'Wzgórze Wawelskie, Kraków',
        photo:
          'https://img.freepik.com/premium-zdjecie/koncert-rockowy-na-duzym-obszarze-z-wieloma-goscmi_212944-31508.jpg',
        participantsCount: 150,
        participantsMax: 300,
        latitude: 50.054456 - 0.0125,
        longitude: 19.935188 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Pokaz Sztucznych ogni nad Wisłą',
        description:
          'Oglądaj niezapomniany pokaz sztucznych ogni nad brzegiem Wisły. Idealne wydarzenie na letni wieczór!',
        start_time: '2024-08-25T22:00:00',
        end_time: '2024-08-25T22:30:00',
        place: 'Bulwar Krakowski, Kraków',
        photo:
          'https://cdn.pkt.pl/f-6632-co-warto-wiedziec-organizujac-pokaz-sztucznych-ogni.jpg',
        participantsCount: 80,
        participantsMax: 150,
        latitude: 50.051042 - 0.0125,
        longitude: 19.942797 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Warsztaty Kulinarno-Artystyczne',
        description:
          'Doświadcz kreatywności poprzez połączenie sztuki i kuchni na warsztatach kulinarno-artystycznych!',
        start_time: '2024-09-05T16:00:00',
        end_time: '2024-09-05T19:00:00',
        place: 'ul. Stolarska 6, Kraków',
        photo:
          'https://www.wilanow-palac.pl/image.php/32409/warsztaty_kuchnia_staropolska_7_marcin_mastykarz_przyciety.jpg',
        participantsCount: 40,
        participantsMax: 80,
        latitude: 50.063644 - 0.0125,
        longitude: 19.937988 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Festiwal Tańca Nowoczesnego',
        description:
          'Przyłącz się do festiwalu tańca, gdzie będziesz mógł podziwiać profesjonalne występy i wziąć udział w warsztatach tanecznych!',
        start_time: '2024-09-20T18:00:00',
        end_time: '2024-09-22T22:00:00',
        place: 'Teatr Bagatela, Kraków',
        photo:
          'https://cdn.galleries.smcloud.net/t/galleries/gf-FHXt-26UD-SDcr_taniec-nowoczesny-definicja-historia-rodzaje-kroki-1920x1080-nocrop.jpg',
        participantsCount: 60,
        participantsMax: 120,
        latitude: 50.052974 - 0.0125,
        longitude: 19.945338 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Spotkanie Networkingowe dla Przedsiębiorców',
        description:
          'Stwórz nowe kontakty biznesowe i wymień doświadczenia na spotkaniu networkingowym dla przedsiębiorców!',
        start_time: '2024-10-10T17:30:00',
        end_time: '2024-10-10T20:30:00',
        place: 'ul. Św. Jana 16, Kraków',
        photo:
          'https://uploads-ssl.webflow.com/57cd85f2e3b870ec01d0e9c2/590065b6c9ae265380166c9a_Spotkania%20biznesowe%20w%20salach.jpg',
        participantsCount: 70,
        participantsMax: 100,
        latitude: 50.063319 - 0.0125,
        longitude: 19.936901 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Konferencja IT Trends 2024',
        description:
          'Dowiedz się o najnowszych trendach w dziedzinie technologii informacyjnych na konferencji IT Trends 2024!',
        start_time: '2024-11-15T09:00:00',
        end_time: '2024-11-15T17:00:00',
        place: 'ICE Kraków Congress Centre, Kraków',
        photo:
          'https://crn.pl/wp-content/uploads/2022/08/otwarcie-relacja-IT-Manager.jpg',
        participantsCount: 120,
        participantsMax: 200,
        latitude: 50.065611 - 0.0125,
        longitude: 19.947004 + 0.025,
        creator: 'John Doe Corporation',
      },
      {
        name: 'Turniej Szachowy Kraków Open',
        description:
          'Zawody szachowe dla zawodników w każdym wieku i na każdym poziomie umiejętności. Zgłoś się i zmierz swoje siły!',
        start_time: '2024-12-01T10:00:00',
        end_time: '2024-12-03T18:00:00',
        place: 'Centrum Kultury Dworek Białoprądnicki, Kraków',
        photo:
          'https://www.stryszawa.pl/assets/stryszawa/media/thumbnails/obraz_artykul/assets/stryszawa/media/files/213081a7-3aac-4821-b810-959f201fadbb/szachy2020-1.JPG',
        participantsCount: 50,
        participantsMax: 100,
        latitude: 50.084307 - 0.0125,
        longitude: 20.007556 + 0.025,
        creator: 'John Doe Corporation',
      },
    ]);
  }),
  // http.post(`${baseUrl}/api/accounts/register`, () => {
  //   return HttpResponse.json({});
  // }),
  // http.post(`${baseUrl}/api/accounts/login`, () => {
  //   return HttpResponse.json({
  //     data: [
  //       {
  //         isAuthenticated: 'success',
  //         user: 'Konrad',
  //       },
  //     ],
  //   });
  // }),
];
