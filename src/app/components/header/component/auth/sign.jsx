'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Link from 'next/link';

//themes && language
import { useTheme } from '@emotion/react';


export default function SignMenu(){
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
        window.location.href = '/login'; // إعادة التوجيه إلى صفحة تسجيل الدخول
    };

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
                    width:'12rem',
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

              <Link href='/auth/login' style={{color:theme.palette.colors.link}}>
              <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                <ListItemIcon>
                  <HowToRegIcon />
                </ListItemIcon>
                تسجيل الدخول
              </MenuItem>
              </Link>

              <Link href='/auth/register' style={{color:theme.palette.colors.link}}>
              <MenuItem onClick={handleClose} sx={{mx:1, borderRadius:'10px'}}>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                انشاء حساب
              </MenuItem>
              </Link>

            </Menu>
        </React.Fragment>
    );
}