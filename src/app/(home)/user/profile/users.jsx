'use client'
import * as React from 'react';
import { Avatar, Box, Button, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserBookings from './booking/userbooking';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserSecurity from './security/usersecurity';
import UserProfile from './userprofile/userprofile';
import UserVisited from './visited/uservisited';
import { usePathname, useSearchParams  } from "next/navigation";


export default function Users() {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");

  // إخفاء حقل الإدخال
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [value, setValue] = React.useState('1');

  useEffect(() => {
    if (tabValue === "1") {
      setValue("1"); 
    } else if (tabValue === "2") {
      setValue("2"); 
    }else if (tabValue === "3") {
      setValue("3"); 
    }else if (tabValue === "4") {
      setValue("4"); 
    }
  }, [tabValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected/user-info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // إرسال التوكن
        },
      });
      setUserInfo(response.data); // تعيين البيانات المسترجعة
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
      fetchUserInfo(); // استدعاء الوظيفة عند تحميل المكون
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", minHeight: "100vh", mt:{xs:7, lg:8} }}>
      
      {/* الخلفية */}
      <Box
        component="img"
        src="/image/users/user-bg.jpg"
        sx={{
          position: "absolute",
          objectFit: "cover",
          width: "100%",
          height: "40vh",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        alt="About us image"
      />

      {/* صورة البروفايل */}
      <Box align="center" position="relative">
        <Box
          sx={{
            position: "relative",
            width: "8rem",
            height: "8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={userInfo?.profileImage || "/image/users/profile.jpg"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "4px solid white",
              top:'60px'
            }}
          />
          {/* زر تغيير الصورة */}
          <Button
            sx={{
              position: "absolute",
              bottom: -50,
              right: 0,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              width: "2rem",
              height: "2rem",
              minWidth: "unset",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
            component="label"
          >
            📷
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
            />
          </Button>
        </Box>

        <Typography align="center" mt={10} variant="h5" fontWeight="600" color='#fff'>
            {userInfo ? userInfo.name : "تحميل..."}
        </Typography>
      </Box>

      {/* التبويبات */}
      <Box sx={{ width: "100%", typography: "body1", mt: 18 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="الملف الشخصي" value="1" />
              <Tab label="إعدادات الأمان" value="2" />
              <Tab label="الحجوزات" value="3" />
              <Tab label="سجل الزيرات" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><UserProfile/></TabPanel>
          <TabPanel value="2"><UserSecurity/></TabPanel>
          <TabPanel value="3"><UserBookings/></TabPanel>
          <TabPanel value="4"><UserVisited/></TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
