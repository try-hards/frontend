import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginProps {
  onLogin: () => void; // Dodajemy onLogin jako funkcję bez parametrów
}

export default function LoginPage({
  switchPage,
  onLogin,
}: { switchPage: () => void } & LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrfToken') || '',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
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
    <Container maxWidth='xs'>
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Sign in
        </Typography>
      </Box>
      <Box component='form' sx={{ mt: 4 }}>
        <TextField
          label='Email'
          fullWidth
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type='password'
          label='Password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant='body2'>
          Don't have an account?{' '}
          <Link onClick={switchPage} color='primary'>
            Register
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}
