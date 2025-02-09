'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Topbar from './topbar';
import Sidebar from './sidebar';


export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box>
      
      <Topbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerClose}
        onTransitionEnd={handleDrawerTransitionEnd}
      />
    </Box>
  );
}