import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormUpdate from './formupdate';
import FormDelete from './formdelete';

export default function Returnbtn({ itemId }) {
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
        {/* خيار تعديل العنصر */}
        <Box sx={{ display:'flex', flexDirection:'column'}}>
          {/*<FormUpdate itemId={itemId}/>*/}
          <FormDelete itemId={itemId}/>
        </Box>
      </Menu>
    </div>
  );
}
