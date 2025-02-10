import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Box, Snackbar, Alert, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function DealerFormPayed({ dealerId }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ typeSafe: '', payed: '' });
  const [message, setMessage] = React.useState({ open: false, text: '', severity: 'success' });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "payed" ? Number(value) : value, // تحويل payed إلى رقم
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // إرسال بيانات الدفع
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/payed-dealer/${dealerId}`,
        formData, // إرسال البيانات هنا ✅
        { withCredentials: true }
      );

      console.log("تم تحديث الدفع:", response.data);
      setMessage({ open: true, text: "تم الدفع بنجاح!", severity: "success" });
      setOpen(false);

      // إغلاق الحوار بعد نجاح العملية
      setTimeout(() => {
        setMessage({ open: false, text: "", severity: "success" });
      }, 3000);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الدفع:", error.message);
      setMessage({ open: true, text: "حدث خطأ أثناء الدفع", severity: "error" });
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <PriceChangeIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center">قائمة السداد</DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ width: '30rem' }}>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="safe">من خزنة</InputLabel>
                    <Select
                      required
                      labelId="safe"
                      id="safe"
                      name="typeSafe"
                      label="من خزنة"
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
                    name="payed"
                    label="المبلغ"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.payed}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>اغلاق</Button>
                <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>تاكيد</Button>
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
