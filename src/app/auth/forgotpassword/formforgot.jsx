"use client"
import { Box, LinearProgress } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

import Emailforgot from "./emailforgot";
import Otppassword from "./otppassword";
import Newpassword from "./newpassword";

export default function Formforgot(){
    const theme = useTheme();//theme
    const [loading, setLoading] = useState(false); // State to control loading indicator
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      email:'',
      otp:'',
      newPassword:'',
    });
  
    // لتحديث البيانات المُدخلة من المستخدم
    const updateFormData = (key, value) => {
      setFormData({
        ...formData,
        [key]: value,
      });
    };
  
   // للانتقال إلى الخطوة التالية
    const nextStep = () => {
      if (step === 1) {
        setLoading(true); // Show loading before moving to the next step
        setTimeout(() => {
          setLoading(false);
          setStep(step + 1);
        }, 1000); // Adjust the delay as needed
      } else {
        setStep(step + 1);
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
          maxHeight: '600px',  // حدود قصوى للارتفاع
        }}
      >
        {loading && <LinearProgress />} {/* Show LinearProgress only when loading is true */}
        {step === 1 && (
          <>        
            <Emailforgot nextStep={nextStep} formData={formData} updateFormData={updateFormData} />
          </>
        )}
        {step === 2 && (
          <>
            <Otppassword nextStep={nextStep} formData={formData} updateFormData={updateFormData} />
            
          </>
        )}
        {step === 3 && (
          <>
            <Newpassword formData={formData} />
          </>
        )}
      </Box>
    );
}