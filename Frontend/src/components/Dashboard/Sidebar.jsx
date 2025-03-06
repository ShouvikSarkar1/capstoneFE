import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{color: 'white'}}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => console.log('Home clicked')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => console.log('Profile clicked')}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => console.log('Messages clicked')}>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={() => console.log('Discover Events clicked')}>
            <ListItemText primary="Discover Events" />
          </ListItem>
          <ListItem button onClick={() => console.log('Your Calendar clicked')}>
            <ListItemText primary="Your Calendar" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}