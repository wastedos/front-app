'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function Withdraw() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    typeSafe: '',
    amountWithdraw: '',
    typeWithdraw: '',
    payee:'',
    reasonWithdraw: '',
  });
  const [message, setMessage] = React.useState(false);
  const [err, setErr] = React.useState(false);

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

    const { typeSafe, amountWithdraw, typeWithdraw, payee, reasonWithdraw } = formData;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/withdraw`, {
        typeSafe, // نوع المحفظة
        amountWithdraw: parseFloat(amountWithdraw), // المبلغ الذي تم سحبه
        typeWithdraw, // نوع السحب
        payee,
        reasonWithdraw, // السبب
      });

      console.log('Transaction successful', response.data);
      // عرض رسالة النجاح
      setMessage(true);
      setTimeout(() => setMessage(false), 6000); // إخفاء الرسالة بعد 6 ثوانٍ
    } catch (error) {
      setErr(true)
      setTimeout(() => setErr(false), 6000); // إخفاء الرسالة بعد 6 ثوانٍ
      console.error("Error in withdraw:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<RemoveIcon />} variant='outlined' color="error" sx={{ my: 1, width: { xs: '100%', sm: '32%' } }}>
        سحب اموال
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          سحب اموال
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* استخدام Grid بشكل صحيح هنا */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="type-safe">من</InputLabel>
                    <Select
                      required
                      labelId="type-safe"
                      id="type-safe"
                      name="typeSafe"
                      label="من"
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
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="type-withdraw">نوع السحب</InputLabel>
                    <Select
                      required
                      labelId="type-withdraw"
                      id="type-withdraw"
                      name="typeWithdraw"
                      label="نوع السحب"
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

      {/* عرض رسالة نجاح عند السحب */}
      {message && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'green', padding: 2, borderRadius: 2 }}>
          <Typography color="white">تم السحب بنجاح!</Typography>
        </Box>
      )}
      {err && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'red', padding: 2, borderRadius: 2 }}>
          <Typography color="white">رصيد غير كافي</Typography>
        </Box>
      )}
    </React.Fragment>
  );
}
