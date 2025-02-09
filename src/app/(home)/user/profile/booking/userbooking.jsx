'use client'
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Alert, IconButton, useTheme } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import Bookingbtn from "./bookingbtn";

const UserBookings = () => {
  const theme = useTheme();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // استدعاء API لجلب الحجوزات الخاصة بالمستخدم
        const token = localStorage.getItem("token"); // الحصول على التوكن
        const response = await axios.get("http://localhost:5000/booking/user-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        سجل الحجوزات
      </Typography>
        <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
          {bookings.map((booking) => (
            <Box
              key={booking._id}
              align="start"
              sx={{
                mb: 2,
                p:2,
                borderRadius: 2,
                backgroundColor: theme.palette.colors.box,
                width:{xs:'100%', lg:'30%'},
              }}
            >
              <Box sx={{ display:'flex', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', mt:2}}>
                  <BookIcon sx={{color: booking.state === "active" ? "green" : "red", }}/>
                  <Typography sx={{fontWeight:'600',}}>{booking.state}</Typography>
                </Box>
                <IconButton>
                  <Bookingbtn itemId={booking._id}/> 
                </IconButton>
              </Box>

              <Typography sx={{fontWeight:'600',}}>تاريخ الزيارة : {booking.datevisit}</Typography>
              <Typography sx={{fontWeight:'600'}}>اسم الزائر : {booking.name}</Typography>
              <Typography sx={{fontWeight:'600'}}>رقم الهاتف : {booking.phone}</Typography>
              <Typography sx={{fontWeight:'600'}}>نوع السيارة : {booking.brand}</Typography>
              <Typography sx={{fontWeight:'600'}}>سبب الزيارة : {booking.reason}</Typography>


            </Box>
          ))}
        </Box>
    </Box>
  );
};

export default UserBookings;
