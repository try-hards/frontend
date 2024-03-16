import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterProps {
  onRegister: (username: string, email: string, password: string) => void;
}

export default function RegisterPage({
  switchPage,
}: {
  switchPage: () => void;
}) {
  const [username, setUsername] = useState('abcdef');
  const [email, setEmail] = useState('user@mail.com');
  const [password, setPassword] = useState('password123');
  const [secondPassword, setSecondPassword] = useState('password123');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false); // Stan dla otwierania/zamykania modala

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        '/api/accounts/register',
        {
          username,
          email,
          password,
          re_password: secondPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': localStorage.getItem('csrfToken') || '',
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const csrfToken = response.headers['x-csrftoken'];
        localStorage.setItem('csrfToken', csrfToken);
        setOpenModal(true);
      } else {
        setError('Błąd rejestracji');
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      setError('Błąd rejestracji');
    }
  };

  const handleCloseModal = () => {
    // Po zamknięciu modala, przekierowujemy użytkownika na stronę logowania
    setOpenModal(false);
  };

  return (
    <Container maxWidth='xs'>
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Sign Up
        </Typography>
      </Box>
      <Box component='form' sx={{ mt: 4 }}>
        <TextField
          label='Username'
          fullWidth
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Email'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type='password'
          label='Password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type='password'
          label='Repeat password'
          fullWidth
          margin='normal'
          value={secondPassword}
          onChange={(e) => setSecondPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant='body2'>
          Already have an account?{' '}
          <Link onClick={switchPage} color='primary'>
            Sign In
          </Link>
          .
        </Typography>
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Thank you for registering!</DialogTitle>
        <DialogContent>
          <Typography>
            Your account has been successfully registered.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link onClick={switchPage}>
            <Button color='primary'>Back to Login</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
