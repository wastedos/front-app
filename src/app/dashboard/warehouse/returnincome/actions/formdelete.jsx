import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Snackbar, Alert, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormDelete({ itemId }) {
  const [open, setOpen] = React.useState(false);
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
        `http://localhost:5000/warehouse/delete-byid/${itemId}`,
        { withCredentials: true } // مهم جداً
      );
      console.log("Item deleted successfully:", response.data);
      
      // Show success message in Snackbar
      setMessage(true);

      // Hide Snackbar after 6 seconds
      setTimeout(() => {
        setMessage(false);
      }, 6000);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<DeleteIcon />} color="error" sx={{ textTransform: 'none' }}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Delete Item
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={deleteItem}>
              <Grid container spacing={2} sx={{ width: '30rem' }}>
                <Grid size={12}>
                  <TextField
                    name="delete"
                    label="Reason of Delete"
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
                  Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    type="submit"
                    autoFocus
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
