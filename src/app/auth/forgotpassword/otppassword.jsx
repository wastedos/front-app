"use client";
import { TextField, Typography, Select, FormControl, MenuItem, InputLabel, Button, } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

export default function Otppassword({ nextStep, formData, updateFormData }) {

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false); // حالة للتحقق من وجود خطأ
  const handleChange = (e) => {
    const value = e.target.value;
    // التأكد من أن المدخل يحتوي على أرقام فقط وطوله لا يتجاوز 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError(false); // إخفاء رسالة الخطأ عندما تكون المدخلات صحيحة
    }
  };

  let x = 123456;
  const handleNext = () => {
    if (otp.length !== 6 || otp !== x.toString()) {
      setError(true);
    } else {
      setError(false);
      console.log('OTP is valid:', otp);
      nextStep(); 
    }
  };

  return (
    <Grid container spacing={5} size={12} sx={{ p: 5 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" sx={{ color: 'inheart', fontWeight: '700' }}>استرجاع كلمة المرور</Typography>
        <Typography variant="body2" sx={{ color: 'inheart', mt: 2 }}>ادخل الرقم المكون من 6 ارقام</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid size={12}>
            <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="number"
                id="otp"
                label="ادخل الرقم"
                variant="outlined"
                value={otp}
                onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                error={error} // عرض حالة الخطأ
                helperText={error ? 'رقم التعريف خطاء تحقق مره اخري' : ''} // رسالة الخطأ
            />
        </Grid>
        <Grid size={12}>
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{ textTransform: 'none', fontSize: '15px', fontWeight: '600', width: '100%', mt: { xs: 2, md: 0.5 } }}
            >
              التالي
            </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
