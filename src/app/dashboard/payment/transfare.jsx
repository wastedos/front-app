'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Transfer() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    paymentFrom: '',
    paymentTo: '',
    price: '',
    reason: '',
  });
  const [message, setMessage] = React.useState(false);  // State for success message
  const [error, setError] = React.useState('');  // State for error message

  // Handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Transfer money)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { paymentFrom, paymentTo, price, reason } = formData;

    // Validate input
    if (!paymentFrom || !paymentTo || !price) {
      setError('الرجاء تعبئة جميع الحقول المطلوبة.');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      setError('يرجى إدخال مبلغ صحيح.');
      return;
    }

    setError(''); // Clear any previous error message

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/transfer`, {
        fromSafe: paymentFrom, // المحفظة التي سيتم التحويل منها
        toSafe: paymentTo, // المحفظة التي سيتم التحويل إليها
        amountTransfer: parseFloat(price), // المبلغ الذي سيتم تحويله
        reasonTransfer: reason, // السبب (اختياري)
      });

      console.log('Transfer successful', response.data);
      setMessage(true);  // Display success message
      setTimeout(() => setMessage(false), 6000);  // Hide the message after 6 seconds
    } catch (error) {
      console.error("Error in transfer:", error.message);
      setError('حدث خطأ أثناء عملية التحويل. الرجاء المحاولة مرة أخرى.');
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<CompareArrowsIcon />} variant='outlined' sx={{ my: 1, width: {xs:'100%', sm:'32%'} }}>
        تحويل اموال
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          تحويل اموال
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* Grid layout */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="payment-from">من</InputLabel>
                    <Select
                      required
                      labelId="payment-from"
                      id="payment-from"
                      name="paymentFrom"
                      label="من"
                      value={formData.paymentFrom}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="instapay">Instapay</MenuItem>
                      <MenuItem value="vodafone">Vodafone Cash</MenuItem>
                      <MenuItem value="fawry">Fawry</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="payment-to">إلى</InputLabel>
                    <Select
                      required
                      labelId="payment-to"
                      id="payment-to"
                      name="paymentTo"
                      label="إلى"
                      value={formData.paymentTo}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="instapay">Instapay</MenuItem>
                      <MenuItem value="vodafone">Vodafone Cash</MenuItem>
                      <MenuItem value="fawry">Fawry</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <TextField
                    required
                    name="price"
                    label="المبلغ"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    name="reason"
                    label="السبب"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.reason}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              {/* Display error message if exists */}
              {error && (
                <Box sx={{ color: 'red', marginTop: 2 }}>
                  <p>{error}</p>
                </Box>
              )}

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
                >
                  تأكيد
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Display success message if transaction is successful */}
      {message && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'green', padding: 2, borderRadius: 2 }}>
          <p style={{ color: 'white' }}>تم التحويل بنجاح!</p>
        </Box>
      )}
    </React.Fragment>
  );
}
