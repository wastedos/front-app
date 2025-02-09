'use client'
import { Box, TextField, Typography, Button, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import axios from 'axios';

export default function Booking() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    brand: '',
    datevisit: '',
    reason: '', 
    state: 'active',
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الإرسال الافتراضي للنموذج
    setMessage('');

    // التحقق من وجود البيانات المطلوبة
    if (!registerData.name || !registerData.phone || !registerData.brand || !registerData.datevisit || !registerData.reason ) {
        setOpen(true)
        setError('error')
        setMessage('يجب تعبا جميع الخانات');
      return;
    }

    try {
      const token = document.cookie.split('token=')[1]; // استخراج التوكن من الكوكيز
      if (!token) {
        throw new Error('Authentication token is required');
      }

      const response = await axios.post(
        'http://localhost:5000/booking/add-booking',
        registerData, // إرسال البيانات إلى الخادم
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // إعادة تعيين الحقول
      setRegisterData({
        name: '',
        phone: '',
        brand: '',
        datevisit: '',
        reason: '',
      });


      setOpen(true);
      setError('success')
      setMessage('تم الحجز بي نجاح');
      //console.log('Reservation added:', response.data);
    } catch (error) {
      //console.error('Error adding reservation:', error);
      setOpen(true);
      setError('error')
      setMessage('يجب تسجيل اولا لتاكيد الحجز');
    }
  };

  // تحديث الحالة عند إدخال البيانات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={4000}  onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Box sx={{ backgroundColor: theme.palette.colors.box, borderRadius: '25px', p:{xs:2, md:5}, my: 10 }}>
          <Typography variant='h3' align='center' sx={{ mb: 3, fontWeight:'700'}}>
            حجز موعد للزيارة
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid size={12}>
                <TextField
                  name="name"
                  label='اسم الزائر'
                  type="text"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  value={registerData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="phone"
                  label='رقم الهاتف'
                  type="number"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  value={registerData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="brand"
                  label='نوع السيارة'
                  type="text"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  value={registerData.brand}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker      
                    name="datevisit"
                    label='تاريخ الزيارة'
                    value={registerData.datevisit ? dayjs(registerData.datevisit) : null}
                    onChange={(newDate) => {
                      if (newDate) {
                        const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
                        setRegisterData((prevData) => ({ ...prevData, datevisit: formattedDate }));
                      }
                    }}
                    minDate={dayjs()} // تحديد أقل تاريخ (تاريخ اليوم)
                    sx={{ width: '100%', }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              </Grid>
              <Grid size={12}>
                <TextField
                  name="reason"
                  label='سبب الزيارة'
                  type="text"
                  margin="dense"
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  value={registerData.reason}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: "none", my: 2 }}
                >
                  تاكيد الحجز
                </Button>
              </Grid>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }}>
              <Box sx={{ width:'100%', maxHeight:'20rem' }}>
                <Box
                  component="img"
                  src="/image/home/golf.png"
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                  }}
                  alt="Booking image"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
