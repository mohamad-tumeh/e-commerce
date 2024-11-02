import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

interface AppBarComponentProps {
  title: string;
  onMenuClick: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ title, onMenuClick }) => (
  <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: `240px` }}>
    <Toolbar>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
