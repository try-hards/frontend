import Unauthenticated from '@/pages/login/Unauthenticated';
import { useUserStore } from '@/stores/useUserStore';
import { Box } from '@mui/material';
import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: React.PropsWithChildren) {
  const isLoggedIn = useUserStore(
    (state: { isLoggedIn: any }) => state.isLoggedIn,
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component='main'
        sx={{
          width: '100%',
          flexGrow: 1,
        }}
      >
        {isLoggedIn ? children : <Unauthenticated />}
      </Box>
      {isLoggedIn && (
        <>
          <Navbar />
          <Box sx={{ height: 56 }} />
        </>
      )}
    </Box>
  );
}
