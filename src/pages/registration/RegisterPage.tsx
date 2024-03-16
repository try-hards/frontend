import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterProps {
  onRegister: (username: string, email: string, password: string) => void;
}

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false); // Stan dla otwierania/zamykania modala

  const handleRegister = async () => {
    try {
      // Wywołujemy odpowiedni endpoint do rejestracji
      const response = await fetch(API_URL + '/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
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
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
      </Box>
      <Box component="form" sx={{ mt: 4 }}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Repeat password"
          fullWidth
          margin="normal"
          value={secondPassword}
          onChange={(e) => setSecondPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link href="/login" color="primary">
            Sign In
          </Link>
          .
        </Typography>
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Thank you for registering!</DialogTitle>
        <DialogContent>
          <Typography>Your account has been successfully registered.</Typography>
        </DialogContent>
        <DialogActions>
          <Link href="/login">
            <Button color="primary">
              Back to Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
