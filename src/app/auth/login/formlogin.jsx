"use client"
import { useTheme } from '@mui/material/styles';
import Grid from "@mui/material/Grid2";
import { TextField, Button, Typography, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Alert, Snackbar } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Otheroptionsign from './otheroptionsign';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


export default function FormLogin(){
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

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    //Handel Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error before submission
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                phone,
                password,
          });
            // Save token in localStorage or cookies
            localStorage.setItem('token', response.data.token);
            // Save token in cookies (with an expiration time of 1 day)
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (24 * 60 * 60 * 1000)); // 1 day
            document.cookie = `token=${response.data.token}; expires=${expireDate.toUTCString()}; path=/`;
    
          // Redirect user to dashboard or homepage
          router.push('/');
        } catch (err) {
          // Show error if login fails
          setError(err.response?.data?.message || 'Something went wrong');
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
                        تسجيل الدخول
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'inheart', mt:2 }}>
                        ادخل رقم العاتف و كلمة المرور
                    </Typography>
                    <Box sx={{display:{xs:'none', md:'block'}}}>
                        <Otheroptionsign/>
                    </Box>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Grid size={12}>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            type="number"
                            id="phone"
                            label="رقم الهاتف"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Box sx={{display:'flex', justifyContent:'space-between', my:'10px'}}>
                            <Link
                            href='/auth/register'
                            style={{textTransform:'none', color:'green', }}
                            >
                                انشاء حساب جديد
                            </Link>
                            <Link 
                            href='/auth/forgotpassword'
                            style={{textTransform:'none', color:theme.palette.colors.text, }}
                            >
                                نسيت كلمة المرور
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Button
                        type='submit'
                        variant="contained"
                        sx={{ textTransform:'none', fontSize:'15px', fontWeight:'600', width:'100%', mt:2 }}
                        >
                            تسجيل الدخول
                        </Button>
                    </Grid>
                    <Box sx={{display:{xs:'block', md:'none'}}}>
                        <Otheroptionsign/>
                    </Box>
                </Grid>
            </Grid>
            </form>
        </Box>
    )
}