"use client";
import { TextField, Button, Typography, } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from '@/src/navigation'//To route after check otp to home page
import { useState, useEffect } from 'react';

// Language
import {useTranslations} from 'next-intl';

export default function Stepotp({ formData }){
  const t = useTranslations("sign");//Language translate
  const router = useRouter(); // استخدام router للتنقل

  //Controll Resend otp for 60s disable
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let countdown;
    if (isDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            setIsDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isDisabled, timer]);

  const handleResendClick = () => {
    // هنا يمكنك إضافة الوظيفة لإعادة إرسال الـ OTP
    setIsDisabled(true);
    setTimer(60); // إعادة ضبط المؤقت إلى 60 ثانية
  };



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
  const validateOTP = () => {
    // التحقق من أن OTP يتكون من 6 أرقام
    if (otp.length !== 6 || otp !== x.toString()) {
      setError(true);
    } else {
      setError(false);
      // هنا يمكنك إضافة منطق آخر للتأكد من صحة الـ OTP أو إرسال البيانات
      console.log('OTP is valid:', otp);
      router.push('/');    
    }
  };

  return(
    <Grid container spacing={5} sx={{p:5,}}> 
      <Grid size={{xs:12, md:6}}>
        <Typography variant="h5" sx={{ color: 'inheart', fontWeight: '700' }}>
          {t('signup')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'inheart', mt:2 }}>
          {t('enter 6 digit otp code')}
        </Typography>
      </Grid>
      <Grid size={{xs:12, md:6}} sx={{mt:{xs:0, md:7},}}>
        <Grid size={12}>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            type="text"
            id="otp"
            label={t("enter code")}
            variant="outlined"
            value={otp}
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
            error={error} // عرض حالة الخطأ
            helperText={error ? t("invalid otp please check your mail") : ''} // رسالة الخطأ
          />
        </Grid>
        <Grid size={12}>
        <Typography
          sx={{ my: 1, cursor: isDisabled ? 'default' : 'pointer', pointerEvents: isDisabled ? 'none' : 'auto', color: isDisabled ? 'gray' : '',}}
          onClick={isDisabled ? null : handleResendClick}
        >
          {isDisabled ? `${t("resend code")} (${timer}s)` : t("resend code")}
        </Typography>
        </Grid>
        <Grid size={12}>
            <Button
              onClick={validateOTP}
              variant="contained"
              sx={{ textTransform:'none', fontSize:'15px', fontWeight:'800', width:'100%', mt:2 }}
            >
              {t("verification")}
            </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}