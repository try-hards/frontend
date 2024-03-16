import logo from '@/assets/images/logo.png';
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false); // Stan dla otwierania/zamykania modala

  // const handleRegister = async () => {
  // try {
  // const response = await axios.post(
  //   '/api/accounts/register',
  //   {
  //     username,
  //     email,
  //     password,
  //     re_password: secondPassword,
  //   },
  //   {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'X-CSRF-Token': localStorage.getItem('csrfToken') || '',
  //     },
  //     withCredentials: true,
  //   },
  // );

  //     if (response.status === 200) {
  //       const csrfToken = response.headers['x-csrftoken'];
  //       localStorage.setItem('csrfToken', csrfToken);
  //       setOpenModal(true);
  //     } else {
  //       setError('Błąd rejestracji');
  //     }
  //   } catch (error) {
  //     console.error('Błąd rejestracji:', error);
  //     setError('Błąd rejestracji');
  //   }
  // };

  const handleRegister = async () => {
    try {
      // Wywołujemy odpowiedni endpoint do rejestracji
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/accounts/register`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': localStorage.getItem('csrfToken') || '',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            re_password: secondPassword,
          }),
        },
      );

      if (response.ok) {
        // Pobieramy token CSRF z nagłówka odpowiedzi
        const csrfToken = response.headers.get('X-CSRFToken');
        // Zapisujemy token CSRF w localStorage
        localStorage.setItem('csrfToken', csrfToken as string);
        // Jeśli rejestracja zakończyła się sukcesem, otwieramy modal
        setOpenModal(true);
      } else {
        // W przypadku błędu rejestracji, ustawiamy komunikat o błędzie
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
        <Box
          component={'img'}
          src={logo}
          alt='logo'
          sx={{ height: 64, mb: 2, borderRadius: 2 }}
        />
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
