import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Box, Snackbar, Alert, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';

export default function ServiceFormEdit({ dealerId, serviceId }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ open: false, text: '', severity: 'success' });
  const [formData, setFormData] = React.useState({ type: '', count: '', servicePriceBuy: '', servicePriceSell:'', serviceImage: undefined });
  
  //Handle form input changes
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };

  const handleUploadService = (event) => {
    const { files } = event.target;
  
    if (files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        serviceImage: file, // ✅ تحديث الصورة بشكل صحيح
      }));
    }
  };
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function for update item by id
  const updateItem = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", formData.type);
      formDataToSend.append("count", formData.count);
      formDataToSend.append("servicePriceBuy", formData.servicePriceBuy);
      formDataToSend.append("servicePriceSell", formData.servicePriceSell);
      
      if (formData.serviceImage) {
        formDataToSend.append("serviceImage", formData.serviceImage); // إرسال الصورة فقط إذا تم اختيارها
      }
  
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dealer/edit-service/${dealerId}/${serviceId}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // ضروري لرفع الصور
          },
        }
      );
  
      console.log("Item updated successfully:", response.data);
      setMessage({ open: true, text: "تم تحديث التاجر!", severity: "success" });
      setOpen(false);
  
      // اغلاق الـ snackbar
      setTimeout(() => {
        setMessage({ open: false });
      }, 6000);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الخدمة:", error.message);
      setMessage({ open: true, text: "حدث خطأ أثناء التحديث", severity: "error" });
    }
  };
  
  // for upload image
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

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          تعديل الخدمة
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={updateItem}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    name="type"
                    label="نوع"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.type}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="count"
                    label="عدد"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.count}
                    onChange={handleInputChange}
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
                    value={formData.servicePriceBuy}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="servicePriceSell"
                    label="سعر البيع"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.servicePriceSell}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/*<Grid size={12}>
                    <Button
                        fullWidth
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ textTransform:'none', }}
                      >
                        {formData.serviceImage ? formData.serviceImage.name : "تحميل صورة"}
                        <VisuallyHiddenInput
                          type="file"
                          name="serviceImage"
                          onChange={handleUploadService}
                          multiple={false}
                        />
                      </Button>
                  </Grid>*/}
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                  اغلاق
                </Button>
                <Button
                    onClick={handleClose}
                    type="submit"
                    autoFocus
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    color="success"
                >
                    تاكيد
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar لعرض الرسائل */}
      <Snackbar open={message.open} autoHideDuration={4000} onClose={() => setMessage({ ...message, open: false })}>
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
