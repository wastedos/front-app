'use client'
import * as React from 'react';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AvatarMenu from '../header/component/avatarmenu';
import Themebtn from '../header/component/themebtn';
import Notificationbtn from './notificationbtn';

export default function Topbar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 240px)` },
        ml: { md: `240px` },
      }}
    >
      <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display:{md:'none'} }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{flexGrow:1,}}/>

          <Stack direction={'row'}>
            <Themebtn/>
            <Notificationbtn/>
            <AvatarMenu/>
          </Stack>

      </Toolbar>
    </AppBar>
  );
}
