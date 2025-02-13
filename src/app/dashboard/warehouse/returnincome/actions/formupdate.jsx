import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormUpdate({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    quantity: '',
    price: '',
    total: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // حساب total إذا تم تعديل quantity أو price
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
      // إرسال البيانات إلى السيرفر لتحديث العنصر
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/warehouse/update-byid/${itemId}`,
        {
          quantity: formData.quantity,
          price: formData.price,
          total: formData.total,
        },
        {
          withCredentials: true, // لتضمين الكوكيز في الطلب
        }
      );

      console.log('Item updated successfully:', response.data);
      setOpen(false); // غلق النافذة بعد التحديث
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />} sx={{ textTransform: 'none', width:'100%'}}>
        تعديل
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          تعديل المرتجع 
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleUpdate}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    name="quantity"
                    label="العدد"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="price"
                    label="السعر"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    name="total"
                    label="الاجمالي"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.total}
                    disabled // الحقل غير قابل للتعديل
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }} color="error">
                  اغلاق
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
    </React.Fragment>
  );
}
