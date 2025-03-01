'use client'
import * as React from 'react';
import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HomeIcon from '@mui/icons-material/Home';

//State
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';

export default function Sidebar({ mobileOpen, onDrawerToggle, onTransitionEnd }) {
  //State to open and close support button in sidebar
  const [openwarehouse, setOpenwarehouse] = React.useState(false);
  const handleWarehouse = () => {
    setOpenwarehouse(!openwarehouse);
  };

  const [openpayment, setOpenpayment] = React.useState(false);
  const handlePayment = () => {
    setOpenpayment(!openpayment);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen2(!open2);
  };

  const drawerWidth = 240;
  
  const router = useRouter()
  const handleNavigation = (path) => {
    router.push(path);
    onDrawerToggle(false);
  };

  const handleDrawerClose = () => {
    onTransitionEnd();
    onDrawerToggle(false);
  };

  const handleDrawerTransitionEnd = () => {
    onTransitionEnd();
  };

  //Create Themes && Language
  const theme = useTheme();

  //Array
  const Array1 = [
    {"title":"صفحة الورشة", "icon":<DashboardIcon/>, "path":"/dashboard"},
    //{"title":"الصفحة الرئسية", "icon":<HomeIcon/>, "path":"/dashboard/home"},
    {"title":"السجل", "icon":<HistoryIcon/>, "path":"/dashboard/history"},
  ];

  const Array2 = [
    {"title":"امر شغل", "icon":<ContentPasteIcon/>, "path":"/dashboard/joborder"},
    {"title":"الفواتير", "icon":<ReceiptIcon/>, "path":"/dashboard/bills"}, 
    {"title":"المخزن", "icon":<WarehouseIcon/>, "path":"/dashboard/warehouse"},
    {"title":"الخزينة", "icon":<RequestQuoteIcon/>, "path":"/dashboard/payment"},
    {"title":"التجار", "icon":<AssignmentIndIcon/>, "path":"/dashboard/dealer"},
  ];

  const Array3 = [
    {"title":"المستخدمين", "icon":<GroupsIcon/>, "path":"/dashboard/users"},
    {"title":"الحجوزات", "icon":<CalendarMonthIcon/>, "path":"/dashboard/booking"},
  ];

  //Coustem Drawer
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Array1.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
      {Array2.map((item) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton onClick={() => handleNavigation(item.path)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
      </List>
      <Divider/>
      <List>
        {Array3.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton disabled onClick={handleClick}>
          <ListItemIcon>
            <PriorityHighIcon/>
          </ListItemIcon>
          <ListItemText primary={'لا يوجد'} />
          {open2 ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>       
              <ListItemButton sx={{ pl: 4 }} onClick={() => router.push('/dashboard')}>
                <ListItemIcon>
                  <FiberManualRecordOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={"?"} />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={"?"} />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={"?"} />
              </ListItemButton>
          </List>    
        </Collapse>
      </List>

    </div>
  );

  //Check language if arabic
  const isArabic = 'ar'

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        anchor={isArabic ? 'right' : 'left'} 
        ModalProps={{ keepMounted: true, disableRestoreFocus: false }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          // Dynamically set 'right' or 'left' based on language direction
        }}
        PaperProps={{
          sx: {
            // Dynamically set 'right' or 'left' based on language direction
            ...(isArabic ? { right: 0, right:'unset' } : { left: 0, left:'unset' })
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}