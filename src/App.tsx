import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import { queryClient } from './config/query';
import { theme } from './config/theme';
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home/HomePage';
import MapPage from './pages/map/MapPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import EventListPage from './pages/eventList/EventListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/events',
        element: <EventListPage />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition='bottom-left' />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
