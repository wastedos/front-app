import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Snackbar, Alert, TextField, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Showimage({ image }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}  sx={{mx:1}}>
        <ImageIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h5'>
            عرض الصورة
            </Typography>
            <IconButton>
              <CloseIcon onClick={handleClose}/>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box
              component="img"
              src={image ?? '/image/dashboard/Image-empty.png'}
              onError={(e) => e.target.src = '/image/dashboard/Image-empty.png'}
              sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
              }}
              alt="About us image"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
