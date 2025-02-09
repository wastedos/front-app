'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Deposit() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    typeSafe: '',
    amountDeposit: '',
    reasonDeposit: '',
  });
  const [message, setMessage] = React.useState(false);  // State for success message

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
  
    const { typeSafe, amountDeposit, reasonDeposit } = formData;
  
    try {
      const response = await axios.post('http://localhost:5000/transactions/deposit', {
        typeSafe: typeSafe,
        amountDeposit: amountDeposit, // المبلغ الذي تم إيداعه
        reasonDeposit: reasonDeposit, // السبب (اختياري)
      });
  
      console.log('Transaction successful', response.data);
      // يمكن هنا تحديث واجهة المستخدم لعرض العملية الجديدة
      setMessage(true);  // عرض رسالة النجاح
      setTimeout(() => setMessage(false), 6000);  // إخفاء الرسالة بعد 6 ثوانٍ
    } catch (error) {
      console.error("Error in deposit:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<AddIcon />} variant='outlined' color="success" sx={{ my: 1, width: {xs:'100%', sm:'32%'} }}>
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
              {/* استخدام Grid بشكل صحيح هنا */}
              <Grid container spacing={2} sx={{ width: '30rem' }}>
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
                  onClick={handleClose}
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                >
                  تاكيد
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* عرض رسالة نجاح عند الإيداع */}
      {message && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'green', padding: 2, borderRadius: 2 }}>
          <Typography color="white">تم الإيداع بنجاح!</Typography>
        </Box>
      )}
    </React.Fragment>
  );
}
