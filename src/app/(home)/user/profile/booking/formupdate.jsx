import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import SnoozeIcon from '@mui/icons-material/Snooze';
import { Box, IconButton, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormUpdate({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    quantity: '',
    price: '',
    total: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // حساب total إذا تم تعديل quantity أو price
      if (name === 'quantity' || name === 'price') {
        const quantity = parseFloat(updatedData.quantity) || 0;
        const price = parseFloat(updatedData.price) || 0;
        updatedData.total = quantity * price;
      }

      return updatedData;
    });
  };

  // دالة تحديث العنصر
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // إرسال البيانات إلى السيرفر لتحديث العنصر
      const response = await axios.put(
        `http://localhost:5000/booking/update-booking/${itemId}`,
        { state: "idle" },
        {withCredentials: true,},
      );
      console.log('Item updated successfully:', response.data);
      setOpen(false); // غلق النافذة بعد التحديث
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleUpdate}>
        <SnoozeIcon />
      </IconButton>
    </Box>
  );
}
