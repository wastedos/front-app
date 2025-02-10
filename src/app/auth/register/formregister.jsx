"use client"
import { useTheme } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import { TextField, Button, Typography, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Alert, Snackbar, Select, MenuItem, Divider } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Terms from './terms';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

export default function FormRegister(){
  //Handel language/Theme
  const theme = useTheme();
  //Handel Show & Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
      event.preventDefault();
  };
  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    password: '',
    birth: '',
    gender: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  //Handel Submit API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before submission

    try {
      // ارسال البيتات لي api
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, registerData);
      router.push('/auth/login'); //إعادة التوجيه إلى صفحة تسجيل الدخول بعد التسجيل بنجاح
    } catch (err) {
      setError('Error: ' + err.response.data.message);
    }
  };



  return(
    <Box
    sx={{
        backgroundColor: theme.palette.colors.box,
        borderRadius: '15px',
        overflow: 'hidden',
        width: { xs: '100%', sm: '1000px' },  // تثبيت العرض
        minHeight: '400px',  // تثبيت ارتفاع مبدئي
        //maxHeight: '600px',
    }}
    >
      {error && (
      <Snackbar open={open} autoHideDuration={6000}>
      <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
      >
          {error}
      </Alert>
      </Snackbar>
      )}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={5} sx={{p:5,}}> 
        <Grid size={{xs:12, md:6}}>
            <Typography variant="h5" sx={{ color: 'inheart', fontWeight: '700' }}>
              انشاء حساب جديد
            </Typography>
            <Typography variant="body1" sx={{ color: 'inheart', mt:2 }}>
              قم بي ادخال الاسم رقم الهاتف كلمة المرور تاريخ الميلاد نوع
            </Typography>
            <Box sx={{display:{xs:'none', md:'block'}}}>
                <Divider sx={{mt:5}}>بل فعل امتلك حساب</Divider>
                <Button onClick={() => {router.push('/auth/login')}} sx={{width:'100%', my:3}}>
                  تسجيل الدخول
                </Button>
            </Box>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Grid size={12}>
            <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="text"
                id="name"
                label="الاسم"
                variant="outlined"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                required
            />
          </Grid>
          <Grid size={12}>
            <TextField
                fullWidth
                margin="dense"
                type="number"
                id="number"
                label="رقم الهاتف"
                variant="outlined"
                value={registerData.phone}
                onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                required
            />
          </Grid>
          <Grid size={12}>
              <FormControl fullWidth margin="dense" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">كلمة المرور</InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
                  }
                  label="كلمة المرور"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                  />
              </FormControl>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:6}}> {/*input Gender*/}
              <FormControl fullWidth margin="dense">
                <InputLabel id="gender">الجنس</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  label="الجنس"
                  value={registerData.gender} // Update value
                  onChange={(e) => setRegisterData({...registerData, gender: e.target.value})} // Update formData
                >
                  <MenuItem value="male">زكر</MenuItem>
                  <MenuItem value="female">انثي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:6}}> {/*input Birth*/}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker 
                    value={registerData.birth ? dayjs(registerData.birth) : null}  //التأكد من أن القيمة هي dayjs
                    onChange={(newDate) => {
                      if (newDate) {
                        const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
                        setRegisterData((prevData) => ({ ...prevData, birth: formattedDate }));
                      }
                    }} 
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Terms/>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                type='submit'
                variant="contained"
                sx={{ textTransform: 'none', fontSize: '15px', fontWeight: '800', width: '100%', mt: { xs: 2, md: 0.5 } }}
              >
                انشاء الحساب
              </Button>
            </Grid>
          </Grid>
          <Box sx={{display:{xs:'block', md:'none'}}}>
            <Divider sx={{mt:5}}>بل فعل امتلك حساب</Divider>
            <Button onClick={() => {router.push('/auth/login')}} sx={{width:'100%', my:3}}>
              تسجيل الدخول
            </Button>
          </Box>
        </Grid>
      </Grid>
      </form>
    </Box>
  )
}