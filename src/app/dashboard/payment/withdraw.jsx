'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Withdraw() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    typeSafe: '',
    amountWithdraw: '',
    typeWithdraw: '',
    payee: '',
    reasonWithdraw: '',
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { typeSafe, amountWithdraw, typeWithdraw, payee, reasonWithdraw } = formData;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/withdraw`, {
        typeSafe,
        amountWithdraw: parseFloat(amountWithdraw),
        typeWithdraw,
        payee,
        reasonWithdraw,
      });

      setSnackbarMessage('تم السحب بنجاح!');
      setFormData({ typeSafe: '', amountWithdraw: '', typeWithdraw: '', payee: '', reasonWithdraw: '' });
    } catch (error) {
      console.error("Error in withdraw:", error);
      setSnackbarMessage('رصيد غير كافي أو حدث خطأ!');
    } finally {
      setSnackbarOpen(true);
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} endIcon={<RemoveIcon />} variant='outlined' color="error" sx={{ my: 1, width: { xs: '100%', sm: '32%' } }}>
        سحب اموال
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center">سحب اموال</DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="type-safe-label">من</InputLabel>
                    <Select
                      required
                      labelId="type-safe-label"
                      name="typeSafe"
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
                    name="amountWithdraw"
                    label="المبلغ"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.amountWithdraw}
                    onChange={handleInputChange}
                    inputProps={{ min: "0", step: "any" }} // Prevent negative values
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="type-withdraw-label">نوع السحب</InputLabel>
                    <Select
                      required
                      labelId="type-withdraw-label"
                      name="typeWithdraw"
                      value={formData.typeWithdraw}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="مصروف تأسيس">مصروف تأسيس</MenuItem>
                      <MenuItem value="مصروف تشغيل">مصروف تشغيل</MenuItem>
                      <MenuItem value="اعمال خارجية">أعمال خارجية</MenuItem>
                      <MenuItem value="قطع استيراد">قطع استيراد</MenuItem>
                      <MenuItem value="نثريات مستردة">نثريات مستردة</MenuItem>
                      <MenuItem value="نثريات">نثريات</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={6}>
                  <TextField
                    name="payee"
                    label="المستفيد"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.payee}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="reasonWithdraw"
                    label="السبب"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.reasonWithdraw}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={handleClose}>اغلاق</Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'جاري السحب...' : 'تأكيد'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('نجاح') ? "success" : "error"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
