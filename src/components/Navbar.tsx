import { AccountBox, Home, Login } from '@mui/icons-material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 10000 }}>
      <BottomNavigation>
        <BottomNavigationAction label='Home' icon={<Home />} href='/' />
        <BottomNavigationAction
          label='Sign In'
          icon={<Login />}
          href='/login'
        />
        <BottomNavigationAction
          label='Events'
          icon={<LocationOnOutlinedIcon />}
          href='/profile'
        />
        <BottomNavigationAction
          label='Profile'
          icon={<AccountBox />}
          href='/profile'
        />
      </BottomNavigation>
    </Box>
  );
}
