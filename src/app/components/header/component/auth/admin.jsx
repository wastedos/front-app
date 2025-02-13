'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

//themes && language
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SignMenu from './sign';

export default function AdminMenu(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //Create Themes && Language
    const theme = useTheme();

    const logout = async () => {
        const token = localStorage.getItem('token');
        await fetch('/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnchorEl(null);
        localStorage.removeItem('token'); // إزالة التوكن
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        window.location.href = '/'; // إعادة التوجيه إلى صفحة تسجيل الدخول
    };

    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // إرسال التوكن
          },
        });
        setUserInfo(response.data); // تعيين البيانات المسترجعة
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    useEffect(() => {
        fetchUserInfo(); // استدعاء الوظيفة عند تحميل المكون
    }, []);
  
    if (!userInfo) {
      return <SignMenu/>
    }
    return(
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ mx: 1 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}/>
                </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: {xs:1, sm:1.5},
                    mr: {xs:1.5, sm:2.5},
                    width:'15rem',
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            > 
                <Box sx={{display:'flex',alignItems:'center', px:3}}>
                    <Avatar sx={{ width: 30, height: 30, mr:1 }}/>
                    <Typography variant='h6'>
                        {userInfo.name}
                    </Typography>
                </Box>

                <Box sx={{my:2}}/>
                <Link href='/dashboard' style={{color:theme.palette.colors.link}}>
                <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    صفحة الورشة
                </MenuItem>
                </Link>
                <Link href='/' style={{color:theme.palette.colors.link}}>
                    <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        الصفحة الرئسية
                    </MenuItem>
                </Link>
                <Link href='/user/profile?tab=1' style={{color:theme.palette.colors.link}}>
                <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    الملف الشخصي
                </MenuItem>
                </Link>
                <Link href='/user/profile?tab=2' style={{color:theme.palette.colors.link}}>
                <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                    <ListItemIcon>
                        <Settings  />
                    </ListItemIcon>
                    اعدادات الامان
                </MenuItem>
                </Link>
                <Divider sx={{my:1}}/>
                <Link href='/' style={{color:theme.palette.colors.link}}>
                <MenuItem onClick={logout} sx={{mx:1, borderRadius:'10px'}}>
                    <ListItemIcon sx={{color:'red'}}>
                        <Logout />
                    </ListItemIcon>
                    تسجيل الخروج
                </MenuItem>
                </Link>

            </Menu>
        </React.Fragment>
    );
}