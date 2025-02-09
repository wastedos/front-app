'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CarRentalIcon from '@mui/icons-material/CarRental';
import BuildIcon from '@mui/icons-material/Build';
import StoreIcon from '@mui/icons-material/Store';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Typography, Toolbar, Divider, Button, } from '@mui/material';
import Link  from 'next/link';

//themes && language
import { useTheme } from '@emotion/react';


export default function Sidebar() {
  //State to open and close sidebar
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //State to open and close support button in sidebar
  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen2(!open2);
  };
  
  //Create Themes && Language
  const theme = useTheme();
  
  //Check language if arabic
  const isArabic = 'ar'

  // Set anchor dynamically based on language
  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon/>
      </IconButton>
      <Drawer 
        anchor={isArabic ? 'right' : 'left'} 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            // Dynamically set 'right' or 'left' based on language direction
            ...(isArabic ? { right: 0, right:'unset' } : { left: 0, left:'unset' })
          }
        }}
      >
        <Box sx={{ width:300, }} role="presentation">
          <Toolbar>
            <Typography component="h1" sx={{ flexGrow: 1 }}>
              القائمة
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Link href='/' style={{color:theme.palette.colors.link}}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='الصحة الرائيسية' />
              </ListItemButton>
            </Link>

            <Link href='/' style={{color:theme.palette.colors.link}}>
              <ListItemButton disabled>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary='خدمات السيارات' />
              </ListItemButton>
            </Link>

            <Link href='/' style={{color:theme.palette.colors.link}}>
              <ListItemButton disabled>
                <ListItemIcon>
                  <SellIcon />
                </ListItemIcon>
                <ListItemText primary='قطع الغيار' />
              </ListItemButton>
            </Link>

            <Link href='/' style={{color:theme.palette.colors.link}}>
              <ListItemButton disabled>
                <ListItemIcon>
                  <CarRentalIcon />
                </ListItemIcon>
                <ListItemText primary='معرض السيارت' />
              </ListItemButton>
            </Link>

            <Divider />

            <Link href='/' style={{color:theme.palette.colors.link,}}>
              <ListItemButton disabled>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary='معلومات عنا' /> 
              </ListItemButton>
            </Link>

            <ListItemButton disabled onClick={handleClick}>
              <ListItemIcon>
                <HeadsetMicIcon />
              </ListItemIcon>
              <ListItemText primary='الدعم' />
              {open2 ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>       
                  <a href="tel:201021123482" style={{color:theme.palette.colors.link}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <LocalPhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary='حسن' />
                  </ListItemButton>
                  </a>
                  <a href="tel:201003520816" style={{color:theme.palette.colors.link}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <LocalPhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary='الجزار' />
                  </ListItemButton>
                  </a>
              </List>    
            </Collapse>
          </List>
        </Box>
        <Box sx={{m:"20px 10px", display:'flex', justifyContent:'space-between'}}>


        </Box>
      </Drawer>
    </>
  );
}
