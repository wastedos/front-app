'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';


export default function FormJobOrder() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    clientName: "",
    clientPhone: "",
    carModel: "",
    carColor: "",
    carKm: "",
    invoice:"",
    discount:"",
    payment:"",
  });

  const [parts, setParts] = React.useState([]);
  const [newparts, setNewParts] = React.useState([]);
  const [outjob, setOutJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [other, setOther] = React.useState([]);


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ********************* Hande part *********************
  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...parts];
    updatedParts[index][name] = value;
    setParts(updatedParts);
  };
  // Function to remove a specific part
  const handleRemovePart = (index) => {
    const updatedParts = parts.filter((_, i) => i !== index);
    setParts(updatedParts);
  };
  // Add a new part row
  const handleAddPart = () => {
    setParts([...parts, { code:"", quantity: "", pricesell:"", category:"" }]);
  };

  // ********************* Handle NewPart *********************
  const handleNewPartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNewParts = [...newparts];
    updatedNewParts[index][name] = value;
    setNewParts(updatedNewParts);
  };
  // Function to remove a specific part
  const handleRemoveNewPart = (index) => {
    const updatedNewParts = newparts.filter((_, i) => i !== index);
    setNewParts(updatedNewParts);
  };
  // Add a new part row
  const handleAddNewPart = () => {
    setNewParts([...newparts, { category:"", dealerName:"", quantity: "", pricesell:"", pricebuy:"" }]);
  };


  // ********************* Handle outjobs *********************
  const handleoutjobsChange = (index, e) => {
    const { name, value } = e.target;
    const updateOutJobs = [...outjob];
    updateOutJobs[index][name] = value;
    setOutJobs(updateOutJobs);
  };
  // Function to remove a specific part
  const handleRemoveoutjobs = (index) => {
    const updateOutJobs = outjob.filter((_, i) => i !== index);
    setOutJobs(updateOutJobs);
  };
  // Add a new part row
  const handleAddOutjob = () => {
    setOutJobs([...outjob, { jobName:"", dealerName:"", jobPriceBuy:"", jobPriceSell:"" }]);
  };

  // ********************* Handle Jobs *********************
  const handlejobsChange = (index, e) => {
    const { name, value } = e.target;
    const updateJobs = [...jobs];
    updateJobs[index][name] = value;
    setJobs(updateJobs);
  };
  // Function to remove a specific part
  const handleRemovejobs = (index) => {
    const updateJobs = jobs.filter((_, i) => i !== index);
    setJobs(updateJobs);
  };
  // Add a new part row
  const handleAddjob = () => {
    setJobs([...jobs, { jobName:""}]);
  };
  
  // ********************* Handle Other *********************
  const handleOtherChange = (index, e) => {
    const { name, value } = e.target;
    const updateOther = [...other];
    updateOther[index][name] = value; 
    setOther(updateOther);
  };
  // Function to remove a specific part
  const handleRemoveOther = (index) => {
    const updateOther = other.filter((_, i) => i !== index);
    setOther(updateOther);
  };
  // Add a new part row
  const handleAddOther = () => {
    setOther([...other, { otherName:"", otherPrice:"", }]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newOrder = {
      ...formData,
      parts: parts,
      newparts: newparts,
      outjob: outjob,
      jobs: jobs,
      other: other,
    };
  
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
  
      if (response.ok) {
        console.log('Job order added successfully');
        // Reset form after submission
        setFormData({
          clientName: "",
          clientPhone: "",
          carModel: "",
          carColor: "",
          carKm: "",
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
        
        handleClose();
      } else {
        console.error('Failed to add job order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} endIcon={<AddIcon />} sx={{ textTransform: "none", mx: 1 }}>
        امر التشغيل
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '2rem', fontWeight: '600' }}>امر التشغيل</Typography>
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
                    value={formData.clientName}
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
                    value={formData.clientPhone}
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
                    value={formData.carModel}
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
                    value={formData.carColor}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    name="carKm"
                    label="كيلو متر"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carKm}
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
                    نثريات 
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
                        value={part.code}
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
                        value={part.quantity}
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
                        value={part.pricesell}
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
                        value={part.category}
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
                        value={newparts.category}
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
                        value={newparts.dealerName}
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
                        value={newparts.quantity}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        name="pricebuy"
                        label="سعر الشراء"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.pricebuy}
                        onChange={(e) => handleNewPartChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="pricesell"
                        label="سعر البيع"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newparts.pricesell}
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
                        label="نوع الشغلانة"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobName}
                        onChange={(e) => handleoutjobsChange(index, e)}
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
                        value={outjob.dealerName}
                        onChange={(e) => handleoutjobsChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        name="jobPriceBuy"
                        label="سعر الشراء"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobPriceBuy}
                        onChange={(e) => handleoutjobsChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        name="jobPriceSell"
                        label="سعر البيع"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={outjob.jobPriceSell}
                        onChange={(e) => handleoutjobsChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemoveoutjobs(index)}
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
                        value={other.otherName}
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
                        value={other.otherPrice}
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
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="instapay">Instapay</MenuItem>
                      <MenuItem value="vodafone">Vodafone Cash</MenuItem>
                      <MenuItem value="fawry">Fawry</MenuItem>
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
