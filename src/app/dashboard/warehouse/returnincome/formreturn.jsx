import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function FormReturn() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    code: "",
    quantity: "",
    billnumber: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Send Data to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/add-returnIncome`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("فشل حفظ العنصر");
      }
      setFormData({
        code: "",
        quantity: "",
        billnumber: "",
      });
      const result = await response.json();
      console.log("تم حفظ العنصر:", result);
      setSnackbarMessage('تم حفظ العنصر بنجاح!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error(error.message);
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<ReplayIcon />} sx={{ textTransform: "none", mx: 1 }}>
        مرتجع الوارد
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <Typography sx={{ fontSize: '2rem', fontWeight: '600' }}>مرتجع الوارد</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    required
                    name="code"
                    label="الكود"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="billnumber"
                    label="رقم الفاتورة"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.billnumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
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
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: "none" }} color="error">
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
