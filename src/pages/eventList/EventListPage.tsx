import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function BasicList() {
    return (
      <Box sx={{ width: '100vw', maxWidth: '100vw', bgcolor: 'background.paper' }}>
        <nav aria-label="Events">
          <List>
          <ListItem disablePadding sx ={{ mb: 1}}>
                <ListItemButton sx={{ height: '250px', width: '100vw', backgroundImage: `url('/night.jpg')`, position: 'relative', borderRadius: '10px', padding: 0, border: '20px solid white' }}>
                    <Box sx={{ 
                    position: 'absolute', 
                    height: '35%', 
                    width: '100%', 
                    bottom: 0, 
                    backgroundColor: 'white', 
                    color: 'black', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '20px solid white',
                    paddingLeft: 2,
                    paddingRight: 2,
                    }}>
                    <Box sx={{ alignItems: 'flex-start' }}>
                        <Typography variant="h5">Event Name</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
                            <Typography variant="body2">User Name</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: '5px', right: '2px' }}>
                         
                        <Typography variant="body2" align="right">Date: Day/Month/Year</Typography>
                        <Typography variant="body2" align="right">5 - 10 people</Typography>
                    </Box>
                    </Box>
                    <ListItemText primary/>
                </ListItemButton>
                </ListItem>
                <Divider/> 
            <ListItem disablePadding sx ={{ mb: 1}}>
                <ListItemButton sx={{ height: '250px', width: '100vw', backgroundImage: `url('/night.jpg')`, position: 'relative', borderRadius: '10px', padding: 0, border: '20px solid white' }}>
                    <Box sx={{ 
                        position: 'absolute', 
                        height: '25%', 
                        width: '100%', 
                        bottom: 0, 
                        backgroundColor: 'white', 
                        color: 'black', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderTop: '20px solid white',
                    }}>
                    <Typography>Sample Text</Typography>
                    </Box>
                <ListItemText primary/>
                </ListItemButton>
            </ListItem>
            <Divider/> 
          </List>
        </nav>
      </Box>
    );
  }