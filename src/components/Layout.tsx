import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Unauthenticated from '@/pages/login/Unauthenticated';
import { useUserStore } from '@/stores/useUserStore';

export default function Layout({ children }: React.PropsWithChildren) {
  const isLoggedIn = useUserStore((state: { isLoggedIn: any; }) => state.isLoggedIn);

  return (
    <Box>
      <Box
        component='main'
        sx={{
         display: 'flex',
          width: '100%',
        }}
      >
        {isLoggedIn ? children : <Unauthenticated/>}
      </Box>
      {isLoggedIn && <Navbar />}
    </Box>
  );
}

