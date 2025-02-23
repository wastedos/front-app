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

export default function FormDelete({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false); // ✅ تعريف setMessage

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // حذف العنصر باستخدام ID
  const deleteItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/warehouse/delete-income/${itemId}`,
        { withCredentials: true }
      );
      console.log("Item deleted successfully:", response.data);

      // ✅ إظهار رسالة النجاح
      setMessage(true);

      // ✅ إغلاق الديالوج بعد الحذف مباشرة
      setOpen(false);

      // ✅ إخفاء الرسالة بعد 6 ثوانٍ
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} color="error">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          حذف وارد
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={deleteItem}>
              <Grid container spacing={2} sx={{ width: { xs: 'auto', md: '30rem' } }}>
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
                  إغلاق
                </Button>
                <Button
                  type="submit"
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

      {/* ✅ Snackbar لعرض رسالة النجاح */}
      <Snackbar
        open={message}
        autoHideDuration={6000}
        onClose={() => setMessage(false)}
      >
        <Alert onClose={() => setMessage(false)} severity="success">
          تم حذف العنصر بنجاح!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
