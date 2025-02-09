import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Snackbar, Alert, TextField, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function DealerFormDelete({ dealerId }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ open: false, text: '', severity: 'success' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function for delete item by id
  const deleteItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:5000/dealer/delete-dealer/${dealerId}`,
        { withCredentials: true } // مهم جداً
      );
      console.log("Item deleted successfully:", response.data);

      setMessage({ open: true, text: "تم حذف التاجر!", severity: "success" });
      setOpen(false);


      // Hide Snackbar after 6 seconds
      setTimeout(() => {
        setMessage(false);
      }, 6000);
    } catch (error) {
      console.error("Error deleting item:", error.message);
      setMessage({ open: true, text: "حدث خطأ أثناء الحذف", severity: "error" });
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} color="error">
        <DeleteIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          حذف التاجر
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={deleteItem}>
              <Grid container spacing={2} sx={{ width: '30rem' }}>
                <Grid size={12}>
                  <TextField
                    name="delete"
                    label="سبب الحذف"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    required
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                  اغلاق
                </Button>
                <Button
                    onClick={handleClose}
                    type="submit"
                    autoFocus
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    color="error"
                >
                  حذف
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar لعرض الرسائل */}
      <Snackbar open={message.open} autoHideDuration={4000} onClose={() => setMessage({ ...message, open: false })}>
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
