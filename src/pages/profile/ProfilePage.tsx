import zalnoImage from '@/assets/zalno.jpeg'; // Importowanie zdjęcia
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

const ProfilePage = () => {
  // Dane symulujące wydarzenia uczestniczone przez użytkownika
  const participatedEvents = [
    {
      name: 'Maraton Krakowski',
      date: '2024-03-11',
      place: 'Kraków Lubicz 19',
      participants: 50,
    },
    {
      name: 'Domówka',
      date: '2024-03-12',
      place: 'Kraków Kijowska 115',
      participants: 30,
    },
    {
      name: 'Spotkanie Integracyjne Informatyków',
      date: '2024-02-14',
      place: 'Kraków Al. Pokoju 23',
      participants: 20,
    },
    {
      name: 'Impreza',
      date: '2024-01-12',
      place: 'Kraków Kijowska 115',
      participants: 20,
    },
  ];

  return (
    <Container maxWidth='sm'>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        {/* Zdjęcie zamiast domyślnego avatara */}
        <Avatar
          src={zalnoImage}
          sx={{
            width: 150, // Zwiększenie szerokości
            height: 150, // Zwiększenie wysokości
            mx: 'auto',
          }}
        />
        <Typography variant='h5' gutterBottom>
          Adrian Zalno
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Web Developer
        </Typography>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom align='center'>
            Followers
          </Typography>
          <Typography variant='body1' align='center'>
            1
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom align='center'>
            Following
          </Typography>
          <Typography variant='body1' align='center'>
            3
          </Typography>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant='h6' gutterBottom>
          Participated Events
        </Typography>
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          <List>
            {participatedEvents.map((event, index) => (
              <Paper key={index} sx={{ marginBottom: 2, padding: 1 }}>
                <ListItemText
                  primary={`${event.name}`}
                  secondary={
                    <Typography variant='body2' color='textSecondary'>
                      {`${event.date} - ${event.place}`} <br />
                      {`${event.participants} participants`}
                    </Typography>
                  }
                />
              </Paper>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
