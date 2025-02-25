'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Deposit() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    typeSafe: '',
    amountDeposit: '',
    reasonDeposit: '',
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);  // حالة Snackbar
  const [isSubmitting, setIsSubmitting] = React.useState(false);  // حالة الإرسال

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // تعيين حالة الإرسال إلى true

    const { typeSafe, amountDeposit, reasonDeposit } = formData;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit`, {
        typeSafe,
        amountDeposit, // المبلغ الذي تم إيداعه
        reasonDeposit, // السبب (اختياري)
      });

      console.log('Transaction successful', response.data);
      setSnackbarOpen(true);  // فتح Snackbar
      setFormData({ typeSafe: '', amountDeposit: '', reasonDeposit: '' }); // إعادة تعيين البيانات
    } catch (error) {
      console.error("Error in deposit:", error.message);
    } finally {
      setIsSubmitting(false); // تعيين حالة الإرسال إلى false
      handleClose(); // إغلاق الـ Dialog بعد العملية
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<AddIcon />} variant='outlined' color="success" sx={{ my: 1, width: { xs: '100%', sm: '32%' } }}>
        ايداع اموال
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          ايداع اموال
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="safe">الي</InputLabel>
                    <Select
                      required
                      labelId="safe"
                      id="safe"
                      name="typeSafe"
                      label="الي"
                      value={formData.typeSafe}
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
                  <TextField
                    required
                    name="amountDeposit"
                    label="المبلغ"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.amountDeposit}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    name="reasonDeposit"
                    label="السبب"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.reasonDeposit}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                  disabled={isSubmitting} // تعطيل الزر أثناء الإرسال
                >
                  {isSubmitting ? 'جاري الإيداع...' : 'تاكيد'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar لعرض رسالة النجاح */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          تم الإيداع بنجاح!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
