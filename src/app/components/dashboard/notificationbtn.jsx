'use client'
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

export default function Notificationbtn(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const Array1 = [
        {"id":"1", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"2", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"3", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"4", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"5", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"6", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"7", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"8", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"9", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"10", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"11", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
        {"id":"12", "time":"5 دقايق", "from":"المخزن", "message":"تم سحب 10 قطع بورده k2412433 من المخزن"},
    ]
    
    const [notifications, setNotifications] = React.useState([...Array1]);
    const handleClearNotifications = () => {
        setNotifications([]); // Assuming you manage Array1 state using useState
        handleClose();
    };

    return(
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Notifications">
            <IconButton onClick={handleClick}>
            <Badge color="warning" badgeContent={notifications.length}>
                <NotificationsIcon/>
            </Badge>
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
                overflowY: 'auto',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                mr: 8.5,
                width:'20rem',
                maxHeight:'30rem',
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
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
                '&::-webkit-scrollbar':{
                    width: '8px',
                },
                '&::-webkit-scrollbar-track' : {
                    boxShadow: 'inset 0 0 5px grey',
                },
                '&::-webkit-scrollbar-thumb' : {
                    background: '#bcdae8', 
                },
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        > 
            <Box sx={{display:'flex', justifyContent:'space-between', px:2}}>
                <Button color='error' onClick={handleClearNotifications} sx={{  textTransform:'none'}}>
                    حزف
                </Button>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Divider sx={{my:1}}/>
            {notifications.length === 0 ? 
            <Typography variant="body1" sx={{ p: 2 }}>لا توجد إشعارات حالياً</Typography> 
                :(notifications.map((e) => (
                    <Box key={e.id}>
                        <Box sx={{ p:1.5, height:'auto', width:'20rem', flexWrap:'wrap',}}>
                            <Box sx={{display:'flex', justifyContent:'space-between', my:1}}>
                                <Typography variant="body1" >من : {e.from}</Typography>
                                <Typography variant="body1" >{e.time}</Typography>
                            </Box>
                            <Typography variant='body1'>
                                {e.message}
                            </Typography>
                        </Box>
                        <Divider sx={{my:1}}/>
                    </Box>
                ))
            )}
        </Menu>
    </React.Fragment>
    )
}