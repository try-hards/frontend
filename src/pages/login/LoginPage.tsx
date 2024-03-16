import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export default function LoginPage({switchPage}: {switchPage: () => void}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL + '/accounts/authenticated', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          sessionid: document.cookie.split('; ').find((row) => row.startsWith('sessionid='))?.split('=')[1] || '',
        },
      });

      if (response.ok) {
        // Jeśli autoryzxacja zakończyła się sukcesem, wywołaj funkcję przekazaną przez prop onLogin
        onLogin();
      } else {
        setError('Błąd logowania');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError('Błąd logowania');
    }
  };


  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
      </Box>
      <Box component="form" sx={{ mt: 4 }}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Dont have an account?{' '}
          <Link onClick={switchPage}  color="primary">
            Register
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

