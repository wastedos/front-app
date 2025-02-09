import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ServiceFormDelete from './serviceformdelete';
import ServiceFormEdit from './serviceformedit';


export default function Servicebtn({ dealerId, serviceId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // فتح القائمة المنسدلة
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // إغلاق القائمة المنسدلة
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{display:"flex", flexDirection:'column',}}>
          <ServiceFormEdit dealerId={dealerId} serviceId={serviceId}/>
          <ServiceFormDelete dealerId={dealerId} serviceId={serviceId}/>
        </Box>

      </Menu>
    </div>
  );
}
