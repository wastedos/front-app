import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function FormUpdate({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    quantity: '',
    price: '',
    total: 0,
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // حساب total عند تغيير quantity أو price
      if (name === 'quantity' || name === 'price') {
        const quantity = parseFloat(updatedData.quantity) || 0;
        const price = parseFloat(updatedData.price) || 0;
        updatedData.total = quantity * price;
      }

      return updatedData;
    });
  };

  // دالة تحديث العنصر
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/warehouse/update-income/${itemId}`,
        {
          quantity: formData.quantity,
          price: formData.price,
          total: formData.total,
        },
        {
          withCredentials: true, // لتضمين الكوكيز في الطلب
        }
      );

      setSnackbarOpen(true); // عرض Snackbar عند نجاح التحديث
      setOpen(false); // إغلاق النافذة
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          تعديل
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleUpdate}>
              <TextField
                name="quantity"
                label="العدد"
                type="number"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <TextField
                name="price"
                label="السعر"
                type="number"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <TextField
                name="total"
                label="الإجمالي"
                type="number"
                margin="dense"
                fullWidth
                variant="outlined"
                value={formData.total}
                disabled
              />
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }} color="error">
                  إغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                >
                  تعديل
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          تم التحديث بنجاح!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
