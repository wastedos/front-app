'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function FormDealer() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    dealerName: '',
    dealerPhone: '',
    service: '',
  });
  const [typeService, setTypeService] = React.useState([]);

  // ********************* Handle outjobs *********************
  const handleChangetypeService = (index, e) => {
    const { name, value } = e.target;
    const updatetypeService = [...typeService];
    updatetypeService[index][name] = value;
    setTypeService(updatetypeService);
  };
  // Function to remove a specific part
  const handleRemovetypeService = (index) => {
    const updatetypeService = typeService.filter((_, i) => i !== index);
    setTypeService(updatetypeService);
  };
  // Add a new part row
  const handletypeService = () => {
    setTypeService([...typeService, { type:"", count:"", servicePriceBuy:"", servicePriceSell:"" }]);
  };


  const [message, setMessage] = React.useState(false);  // State for success message

  // Handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { dealerName, dealerPhone, service } = formData;
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dealer/add-dealer`, {
        dealerName: dealerName,
        dealerPhone: dealerPhone, 
        service: service,
        typeService
      });

      console.log('Transaction successful', response.data);

      // إعادة تعيين الحقول
      setFormData({ dealerName: '', dealerPhone: '', service: '' });
      setTypeService([]);
      // يمكن هنا تحديث واجهة المستخدم لعرض العملية الجديدة

      setMessage(true);  // عرض رسالة النجاح
      setTimeout(() => setMessage(false), 6000);  // إخفاء الرسالة بعد 6 ثوانٍ
    } catch (error) {
      console.error("Error in deposit:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} endIcon={<AddIcon />} variant='contained'>
        التجار
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          اضافة / تعديل التجار
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* استخدام Grid بشكل صحيح هنا */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    required
                    name="dealerName"
                    label="اسم التاجر"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.dealerName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="dealerPhone"
                    label="رقم التاجر"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.dealerPhone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="service">نوع الخدمة</InputLabel>
                    <Select
                      labelId="service"
                      id="service"
                      name="service"
                      label="نوع الخدمة"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="قطع استيراد">قطع استيراد</MenuItem>
                      <MenuItem value="اعمال خارجية">اعمال خارجية</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <Button onClick={handletypeService} variant="outlined" color='success' sx={{ width:'100%' }}>
                    اعمال خارجية / قطع استيراد
                  </Button>
                </Grid>
                {typeService.map((typeService, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={6}>
                      <TextField
                        required
                        name="type"
                        label="النوع"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.type}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        name="count"
                        label="عدد"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.count}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        name="servicePriceBuy"
                        label="سعر الشراء"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.servicePriceBuy}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="servicePriceSell"
                        label="سعر البيع"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typeService.servicePriceSell}
                        onChange={(e) => handleChangetypeService(index, e)}
                      />
                      <Button
                        onClick={() => handleRemovetypeService(index)}
                        color="error"
                        variant='outlined'
                        sx={{ ml: 2 }}
                      >
                        حذف
                      </Button>
                    </Grid>

                    </Grid>
                  </React.Fragment>
                ))}

              </Grid>

              <DialogActions sx={{mt:2}}>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                  اغلاق
                </Button>
                <Button
                  onClick={handleClose}
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: 'none' }}
                >
                  تاكيد
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* عرض رسالة نجاح عند الإيداع */}
      {message && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'green', padding: 2, borderRadius: 2 }}>
          <Typography color="white">تم اضافة التاجر بنجاح!</Typography>
        </Box>
      )}
    </React.Fragment>
  );
}
