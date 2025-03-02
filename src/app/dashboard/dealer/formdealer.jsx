'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, useTheme, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormDealer() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    dealerName: '',
    dealerPhone: '',
    service: '',
  });
  const [typeService, setTypeService] = React.useState([]);

  // ********************* Handle outjobs *********************
  const handleChangetypeService = (index, e) => {
    const { name, value } = e.target;
    const updatetypeService = [...typeService];
    updatetypeService[index][name] = value;
    setTypeService(updatetypeService);
  };
  // Function to remove a specific part
  const handleRemovetypeService = (index) => {
    const updatetypeService = typeService.filter((_, i) => i !== index);
    setTypeService(updatetypeService);
  };
  // Add a new part row
  const handletypeService = () => {
    setTypeService([...typeService, { type:"", count:"", servicePriceBuy:"", servicePriceSell:"" }]);
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState({});  // State for success message

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
    setIsSubmitting(true);

    const { dealerName, dealerPhone, service } = formData;
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dealer/add-dealer`, {
        dealerName: dealerName,
        dealerPhone: dealerPhone, 
        service: service,
        typeService
      });

      console.log('Transaction successful', response.data);

      // إعادة تعيين الحقول
      setFormData({ dealerName: '', dealerPhone: '', service: '' });
      setTypeService([]);
      handleClose();

      setMessage({ open: true, text: 'تم إضافة التاجر بنجاح!', severity: 'success' });  // عرض رسالة النجاح
    } catch (error) {
      console.error("خطأ في التسجيل:", error.message);
      setMessage({ open: true, text: 'حدث خطأ أثناء إضافة التاجر.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setMessage({ ...message, open: false });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<AddIcon />} variant='contained'>
        التجار
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          اضافة / تعديل التجار
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* استخدام Grid بشكل صحيح هنا */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    required
                    name="dealerName"
                    label="اسم التاجر"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.dealerName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="dealerPhone"
                    label="رقم التاجر"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.dealerPhone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="service">نوع الخدمة</InputLabel>
                    <Select
                      labelId="service"
                      id="service"
                      name="service"
                      label="نوع الخدمة"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="قطع جديدة">قطع جديدة</MenuItem>
                      <MenuItem value="قطع استيراد">قطع استيراد</MenuItem>
                      <MenuItem value="اعمال خارجية">اعمال خارجية</MenuItem>
                      <MenuItem value="اخري">اخري</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <Button onClick={handletypeService} variant="outlined" color='success' sx={{ width:'100%' }}>
                    اعمال خارجية / قطع استيراد
                  </Button>
                </Grid>
                {typeService.map((typeService, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={6}>
                      <TextField
                        required
                        name="type"
                        label="النوع"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.type}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        name="count"
                        label="عدد"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.count}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        name="servicePriceBuy"
                        label="سعر الشراء"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.servicePriceBuy}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        name="servicePriceSell"
                        label="سعر البيع"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.servicePriceSell}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={2}>
                      <Button
                        fullWidth
                        onClick={() => handleRemovetypeService(index)}
                        color="error"
                        variant='outlined'
                        sx={{mt:1.3}}
                      >
                        حذف
                      </Button>
                    </Grid>
                    </Grid>
                  </React.Fragment>
                ))}

              </Grid>

              <DialogActions sx={{mt:2}}>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar لعرض الرسالة */}
      <Snackbar open={message.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={message.severity} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
