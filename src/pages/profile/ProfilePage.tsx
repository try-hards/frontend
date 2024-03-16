import { Container, Typography, Box, Avatar, Button, Divider } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Avatar sx={{ width: 100, height: 100, mx: 'auto' }} />
        <Typography variant="h5" gutterBottom>
          John Doe
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Web Developer
        </Typography>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h6" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies massa vel est cursus, vel eleifend odio interdum.
          Mauris mattis nisi sit amet enim euismod, quis tincidunt lorem suscipit.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
