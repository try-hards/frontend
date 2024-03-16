import React, { useEffect } from 'react';
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
import NotFoundPage from './pages/notFound/NotFoundPage';
import ProfilePage from './pages/profile/ProfilePage';

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
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/csrf_cookie', {
          method: 'GET',
          credentials: "include",
        });

        if (response.ok) {
          const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
          if (token) {
            localStorage.setItem('csrfToken', token); // Zapisuje token CSRF w localStorage
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error("Error fetching CSRF cookie:", error);
      }
    };

    fetchCsrfToken();
  }, []); // useEffect dependency array is empty, so it will run only once after component mounts

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
