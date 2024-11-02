import React from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Logout as LogoutIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

interface DrawerComponentProps {
  onLogout: () => void;
  menuItems: { text: string; icon: React.ReactNode; action: () => void; }[];
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({onLogout, menuItems }) => {

  const listItemStyles = {
    overflow: 'auto',
    cursor: 'pointer',
    padding: 2,
    transition: 'border-color 0.3s, background-color 0.3s',
    '&:hover': {
      borderColor: 'primary.main',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', cursor: 'pointer' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} onClick={item.action} sx={listItemStyles}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem onClick={onLogout} sx={listItemStyles}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
