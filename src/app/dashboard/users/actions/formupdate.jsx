import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormUpdate({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    password: '',
    pwd: '',
    role: '',
  });

  // تحميل البيانات الأصلية من السيرفر
  React.useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get-user/${itemId}`);
          setFormData({
            name: response.data.name || '',  // التأكد من ملء الحقول بالقيم الأصلية
            phone: response.data.phone || '',
            password: response.data.pwd || '',
            role: response.data.role || '',
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [open, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // إذا كان الحقل هو كلمة المرور، نقوم بتحديث password و pwd بنفس القيمة
      if (name === 'password') {
        return {
          ...prevData,
          password: value,
          pwd: value, // تحديث pwd بنفس القيمة
        };
      }

      // تحديث الحقل المعين فقط
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-user/${itemId}`,
        formData, // إرسال formData بالكامل
        {
          withCredentials: true,
        }
      );

      console.log('Item updated successfully:', response.data);
      setOpen(false);
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          تعديل المستخدمين
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleUpdate}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    name="name"
                    label="اسم المستخدم"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="phone"
                    label="رقم المستخدم"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="password"
                    label="كلمة المرور"
                    type="password"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.password || formData.pwd}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="role">الوظيفة</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      label="الوظيفة"
                      value={formData.role}
                      onChange={handleChange}
                      name="role"
                    >
                      <MenuItem value="admin">مشرف</MenuItem>
                      <MenuItem value="employee">موظف</MenuItem>
                      <MenuItem value="user">مستخدم</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }} color="error">
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                >
                  تعديل
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
