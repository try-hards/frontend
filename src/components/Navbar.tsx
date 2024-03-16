import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Frontend-Base
          </Typography>
          <Box>
            <Button href='/' color='inherit'>
              Home
            </Button>
            <Button href='/map' color='inherit'>
              Map
            </Button>
            <Button href='/about' color='inherit'>
              About
            </Button>
            <Button href='/events' color='inherit'>
              Events
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
