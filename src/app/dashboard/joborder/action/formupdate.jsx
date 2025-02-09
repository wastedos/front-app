'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

export default function FormUpdate({ itemId }) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    clientName: "",
    clientPhone: "",
    carModel: "",
    carColor: "",
    invoice:"",
    discount:"",
    payment:"",
  });

  const [parts, setParts] = React.useState([]);
  const [newparts, setNewParts] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [outjob, setOutJobs] = React.useState([]);
  const [other, setOther] = React.useState([]);
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ********************* Handle part *********************
  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...parts];
    updatedParts[index][name] = value;
    setParts(updatedParts);
  };

  const handleRemovePart = (index) => {
    const updatedParts = parts.filter((_, i) => i !== index);
    setParts(updatedParts);
  };

  const handleAddPart = () => {
    setParts([...parts, { code: "", quantity: "", pricesell: "", category: "" }]);
  };

  // ********************* Handle New Part *********************
  const handleNewPartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNewParts = [...newparts];
    updatedNewParts[index][name] = value;
    setNewParts(updatedNewParts);
  };

  const handleRemoveNewPart = (index) => {
    const updatedNewParts = newparts.filter((_, i) => i !== index);
    setNewParts(updatedNewParts);
  };

  const handleAddNewPart = () => {
    setNewParts([...newparts, { category: "", dealerName: "", quantity: "", pricesell: "", pricebuy: "" }]);
  };

  // ********************* Handle jobs *********************
  const handlejobsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobs = [...jobs];
    updatedJobs[index][name] = value;
    setJobs(updatedJobs);
  };

  const handleRemovejobs = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  const handleAddjob = () => {
    setJobs([...jobs, { jobName:"",}]);
  };

  // ********************* Handle Outjob *********************
  const handleOutjobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOutJobs = [...outjob];
    updatedOutJobs[index][name] = value;
    setOutJobs(updatedOutJobs);
  };

  const handleRemoveOutjob = (index) => {
    const updatedOutJobs = outjob.filter((_, i) => i !== index);
    setOutJobs(updatedOutJobs);
  };

  const handleAddOutjob = () => {
    setOutJobs([...outjob, { jobName:"", dealerName:"", jobPriceBuy:"", jobPriceSell:"" }]);
  };

  // ********************* Handle Other *********************
  const handleOtherChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOther = [...other];
    updatedOther[index][name] = value;
    setOther(updatedOther);
  };

  const handleRemoveOther = (index) => {
    const updatedOther = other.filter((_, i) => i !== index);
    setOther(updatedOther);
  };

  const handleAddOther = () => {
    setOther([...other, { otherName: "", otherPrice: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      ...formData,
      parts,
      newparts,
      outjob,
      other,
    };

    try {
      const response = await fetch(`http://localhost:5000/joborders/update-byid/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        console.log('Job order updated successfully');
        setFormData({
          clientName: "",
          clientPhone: "",
          carModel: "",
          carColor: "",
          invoice: "",
          discount: "",
          payment:"",
        });
        setParts([]);
        setNewParts([]);
        setJobs([]);
        setOutJobs([]);
        setOther([]);
        handleClose();
      } else {
        console.error('Failed to update job order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetch(`http://localhost:5000/joborders/job-byid/${itemId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched data:", data);  // إضافة هذا السطر للتحقق من البيانات المستلمة
          setFormData({
            clientName: data.clientName || "",
            clientPhone: data.clientPhone || "",
            carModel: data.carModel || "",
            carColor: data.carColor || "",
            invoice: data.invoice || "",
            discount: data.discount || "",
            payment: data.payment || "",
          });
          setParts(data.parts || []);
          setNewParts(data.newparts || []);
          setJobs(data.jobs || []);
          setOutJobs(data.outjob || []);
          setOther(data.other || []);
        })
        .catch(error => console.error('Error fetching job order:', error));
    }
  }, [itemId]); // تأكد من إضافة itemId في الـ dependency array
  

  return (
    <React.Fragment>
      <IconButton variant="contained" onClick={handleClickOpen} sx={{ mx: 1 }}>
        <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '2rem', fontWeight: '600' }}>تعديل امر التشغيل</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    required
                    name="clientName"
                    label="اسم العميل"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.clientName || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="clientPhone"
                    label="رقم العميل"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.clientPhone || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="carModel"
                    label="موديل السيارة"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carModel || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="carColor"
                    label="لون السيارة"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carColor || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={3}>
                  <Button onClick={handleAddPart} variant="outlined" color='success' sx={{ width:'100%' }}>
                     قطعة جديدة
                  </Button>
                </Grid>
                <Grid size={3}>
                  <Button onClick={handleAddNewPart} variant="outlined" color='success' sx={{ width:'100%' }}>
                   قطعة استيراد
                  </Button>
                </Grid>
                
                <Grid size={3}>
                  <Button onClick={handleAddOutjob} variant="outlined" color='success' sx={{ width:'100%' }}>
                    اعمال خارجية
                  </Button>
                </Grid>
                <Grid size={3}>
                  <Button onClick={handleAddOther} variant="outlined" color='success' sx={{ width:'100%' }}>
                    نسريات
                  </Button>
                </Grid>
                <Grid size={12}>
                  <Button onClick={handleAddjob} variant="outlined"  sx={{ width:'100%' }}>
                    اعمال الورشة 
                  </Button>
                </Grid>
                {jobs.map((jobs, index) => (
                  <React.Fragment key={index}>
                    <Grid container size={12} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="jobName"
                        label="الخدمة"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={jobs.jobName}
                        onChange={(e) => handlejobsChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemovejobs(index)}
                        color="error"
                        variant='outlined'
                        sx={{ml:2 }}
                      >
                        حذف
                      </Button>
                    </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
                {parts.map((part, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor:theme.palette.colors.box}}>
                    <Grid size={4}>
                      <TextField
                        required
                        name="code"
                        label="الكود"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={part.code || ""}
                        onChange={(e) => handlePartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        required
                        name="quantity"
                        label="العدد"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={part.quantity || ""}
                        onChange={(e) => handlePartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        required
                        name="pricesell"
                        label="السعر"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={part.pricesell || ""}
                        onChange={(e) => handlePartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        required
                        name="category"
                        label="نوع القطعة"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={part.category || ""}
                        onChange={(e) => handlePartChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemovePart(index)}
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

                {newparts.map((newparts, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={4}>
                      <TextField
                        required
                        name="category"
                        label="نوع القطعة"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.category || ""}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        required
                        name="dealerName"
                        label="البائع"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.dealerName || ""}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        required
                        name="quantity"
                        label="العدد"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.quantity || ""}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        name="pricebuy"
                        label="سعر الشراء"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.pricebuy || ""}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="pricesell"
                        label="سعر البيع"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.pricesell || ""}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemoveNewPart(index)}
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
                {outjob.map((outjob, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={6}>
                      <TextField
                        required
                        name="jobName"
                        label="اعمال خارجية"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobName || ""}
                        onChange={(e) => handleOutjobChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        name="dealerName"
                        label="اسم المكان"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.dealerName || ""}
                        onChange={(e) => handleOutjobChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        name="jobPriceBuy"
                        label="سعرالبيع"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobPriceBuy || ""}
                        onChange={(e) => handleOutjobChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="jobPriceSell"
                        label="سعرالشراء"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobPriceSell || ""}
                        onChange={(e) => handleOutjobChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemoveOutjob(index)}
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
                {other.map((other, index) => (
                  <React.Fragment key={index}>
                    <Grid container spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                    <Grid size={6}>
                      <TextField
                        required
                        name="otherName"
                        label="نثريات"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={other.otherName || ""}
                        onChange={(e) => handleOtherChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        required
                        name="otherPrice"
                        label="سعر"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={other.otherPrice || ""}
                        onChange={(e) => handleOtherChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemoveOther(index)}
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

                <Grid size={4}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="payment-label">طريقة الدفع</InputLabel>
                    <Select
                      labelId="payment-label"
                      id="payment"
                      name="payment"
                      label="طريقة الدفع"
                      value={formData.payment} // Update value
                      onChange={handleChange} // Update formData
                    >
                      <MenuItem value="cash">كاش</MenuItem>
                      <MenuItem value="instapay">انستاباي</MenuItem>
                      <MenuItem value="vodafone">فودافون كاش</MenuItem>
                      <MenuItem value="fawry">فاوري</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={4}>
                  <TextField
                    name="invoice"
                    label="مصنعية"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.invoice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    name="discount"
                    label="الخصم"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <DialogActions sx={{ mt: 3 }}>
                <Button onClick={handleClose} sx={{ textTransform: "none" }} color="error">
                  اغلاق
                </Button>
                <Button type="submit" autoFocus variant="contained" sx={{ textTransform: "none" }}>
                  تسجيل
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
