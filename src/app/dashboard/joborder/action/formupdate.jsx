'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';

export default function FormUpdate({ itemId }) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [dealersNewpart, setDealersNewpart] = React.useState([]);
  const [dealersOutjob, setDealersOutjob] = React.useState([]);
  const [formData, setFormData] = React.useState({
    clientName: "",
    clientPhone: "",
    carModel: "",
    carColor: "",
    carKm: "",
    chassis: "",
    invoice:"",
    discount:"",
    payment:"",
  });
  const [parts, setParts] = React.useState([]);
  const [newparts, setNewParts] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [outjob, setOutJobs] = React.useState([]);
  const [other, setOther] = React.useState([]);
  const [payed, setPayed] = React.useState([])
  
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setNewParts([...newparts, { category: "", dealerName: "", quantity: "", pricesell: "", pricebuy: "", newpartsImage: undefined }]);
  };

  const handleUploadnewparts = (index, event) => {
    const { files } = event.target;
    const updatedNewParts = [...newparts];
  
    if (files.length > 0) {
      const file = files[0];
      updatedNewParts[index].newpartsImage = file;
      setNewParts(updatedNewParts);
    }
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
    setOutJobs([...outjob, { jobName: "", dealerName: "", jobPriceBuy: "", jobPriceSell: "", outjobImage: undefined }]);
  };

  const handleUploadoutjob = (index, event) => {
    const { files } = event.target;
    const updatedOutjob = [...outjob];
  
    if (files.length > 0) {
      const file = files[0];
      updatedOutjob[index].outjobImage = file;
      setOutJobs(updatedOutjob);
    }
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

  // ********************* Handle Payed *********************
  const handlePayedChange = (index, e) => {
    const { name, value } = e.target;
    const updatePayed = [...payed];
    updatePayed[index][name] = value; 
    setPayed(updatePayed);
  };

  const handleRemovePayed = (index) => {
    const updatePayed = payed.filter((_, i) => i !== index);
    setPayed(updatePayed);
  };

  const handleAddPayed = () => {
    setPayed([...payed, { payment: "", payedPrice: "" }]);
  };


  // Fetch dealers from the database
  React.useEffect(() => {
    const fetchDealers = async () => {
      try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dealer/read-dealer`);
      
        // تصفية التجار الذين يقدمون خدمة "قطع جديدة"
        const Newpart = response.data.filter(dealer => dealer.service === "قطع استيراد");
        const Outgo = response.data.filter(dealer => dealer.service === "اعمال خارجية");
        setDealersNewpart(Newpart);
        setDealersOutjob(Outgo);
      } catch (error) {
        console.error("Error fetching dealers:", error.message);
      }
    };
    fetchDealers();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    // Add client data
    formDataToSend.append("clientName", formData.clientName);
    formDataToSend.append("clientPhone", formData.clientPhone);
    formDataToSend.append("carModel", formData.carModel);
    formDataToSend.append("carColor", formData.carColor);
    formDataToSend.append("carKm", formData.carKm);
    formDataToSend.append("chassis", formData.chassis);
    formDataToSend.append("invoice", formData.invoice || "");
    formDataToSend.append("discount", formData.discount || "");
    formDataToSend.append("payment", formData.payment || "");
  
    // Add data as JSON
    formDataToSend.append("jobs", JSON.stringify(jobs));
    formDataToSend.append("parts", JSON.stringify(parts));
    formDataToSend.append("outjob", JSON.stringify(outjob));
    formDataToSend.append("other", JSON.stringify(other));
    formDataToSend.append("payed", JSON.stringify(payed));
    formDataToSend.append("newparts", JSON.stringify(newparts));
  
    // Add newparts images
    newparts.forEach((part) => {
      if (part.newpartsImage) {
        formDataToSend.append("newpartsImage", part.newpartsImage);
      }
    });

    // Add outjob images
    outjob.forEach((out) => {
      if (out.outjobImage) {
        formDataToSend.append("outjobImage", out.outjobImage);
      }
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/update-byid/${itemId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Job order updated successfully');

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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/job-byid/${itemId}`)
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
            carKm: data.carKm || "",
            chassis: data.chassis || "",
            payment: data.payment ||"",
            invoice: data.invoice || "",
            discount: data.discount || "",
          });
          setParts(data.parts || []);
          setNewParts(data.newparts || []);
          setJobs(data.jobs || []);
          setOutJobs(data.outjob || []);
          setOther(data.other || []);
          setPayed(data.payed || []);
        })
        .catch(error => console.error('Error fetching job order:', error));
    }
  }, [itemId]); // تأكد من إضافة itemId في الـ dependency array
  

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
                <Grid size={6}>
                  <TextField
                    required
                    name="carKm"
                    label="عدد الكيلومترات"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carKm || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="chassis"
                    label="رقم الشاسية"
                    type="text"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.chassis || ""}
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
                  <Button onClick={handleAddjob} variant="outlined" color='success' sx={{ width:'100%' }}>
                    اعمال الورشة 
                  </Button>
                </Grid>
                {jobs.map((jobs, index) => (
                  <React.Fragment key={index}>
                    <Grid container size={12} spacing={2} sx={{ p:1, backgroundColor: theme.palette.colors.box}}>
                      <Grid size={10}>
                        <TextField
                          name="jobName"
                          label="الخدمة"
                          type="text"
                          margin="dense"
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={jobs.jobName || ""}
                          onChange={(e) => handlejobsChange(index, e)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <Button
                          fullWidth
                          onClick={() => handleRemovejobs(index)}
                          color="error"
                          variant='outlined'
                          sx={{mt:1.3}}
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
                  <Grid size={4}>
                    <FormControl fullWidth margin="dense" size="small">
                      <InputLabel id="dealer-label">اسم التاجر</InputLabel>
                      <Select
                        labelId="dealer-label"
                        name="dealerName"
                        label="اسم التاجر"
                        value={newparts.dealerName}
                        onChange={(e) => handleNewPartChange(index, e)}
                      >
                        {dealersNewpart.map((d) => (
                          <MenuItem key={d._id} value={d.dealerName}>
                            {d.dealerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      value={newparts.pricebuy || ""}
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
                      value={newparts.pricesell || ""}
                      onChange={(e) => handleNewPartChange(index, e)}
                    />
                  </Grid>
                  <Grid size={10}>
                    <Button
                        fullWidth
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ textTransform:'none', }}
                      >
                        {newparts.newpartsImage ? newparts.newpartsImage.name : "تحميل صورة"}
                        <VisuallyHiddenInput
                          type="file"
                          name="newpartsImage"
                          onChange={(event) => handleUploadnewparts(index, event)}
                          multiple={false}
                        />
                      </Button>
                  </Grid>
                  <Grid size={2}>
                    <Button
                      fullWidth
                      onClick={() => handleRemoveNewPart(index)}
                      color="error"
                      variant='outlined'
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
                      value={outjob.jobName || ""}
                      onChange={(e) => handleOutjobChange(index, e)}
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth margin="dense" size="small">
                      <InputLabel id="dealer-label">اسم التاجر</InputLabel>
                      <Select
                        labelId="dealer-label"
                        name="dealerName"
                        label="اسم التاجر"
                        value={outjob.dealerName}
                        onChange={(e) => handleOutjobChange(index, e)}
                      >
                        {dealersOutjob.map((dealer) => (
                          <MenuItem key={dealer.dealerName} value={dealer.dealerName}>
                            {dealer.dealerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      value={outjob.jobPriceBuy || ""}
                      onChange={(e) => handleOutjobChange(index, e)}
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
                      value={outjob.jobPriceSell || ""}
                      onChange={(e) => handleOutjobChange(index, e)}
                    />
                  </Grid>
                  <Grid size={10}>
                    <Button
                        fullWidth
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ textTransform:'none', }}
                      >
                        {outjob.outjobImage ? outjob.outjobImage.name : "تحميل صورة"}
                        <VisuallyHiddenInput
                          type="file"
                          name="outjobImage"
                          onChange={(event) => handleUploadoutjob(index, event)}
                          multiple={false}
                        />
                      </Button>
                  </Grid>
                  <Grid size={2}>
                    <Button
                      fullWidth
                      onClick={() => handleRemoveOutjob(index)}
                      color="error"
                      variant='outlined'
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
                <Grid size={6}>
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
                <Grid size={6}>
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
              <Grid size={12}>
                <FormControl fullWidth margin="dense" size='small'>
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
              <Grid size={12}>
                <Button onClick={handleAddPayed} variant="outlined" sx={{ width:'100%', mt:2 }}>
                   المدفوعات 
                </Button>
              </Grid>
              {payed.map((pay, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2} sx={{ p:1, my:1, backgroundColor: theme.palette.colors.box, borderRadius:'5px'}}>
                    <Grid size={6}>
                      <FormControl fullWidth margin="dense" size='small'>
                        <InputLabel id="payment-label">طريقة الدفع</InputLabel>
                        <Select
                          labelId="payment-label"
                          id="payment"
                          name="payment"
                          label="طريقة الدفع"
                          value={pay.payment} // Update value
                          onChange={(e) => handlePayedChange(index, e)} // Update formData
                        >
                          <MenuItem value="cash">Cash</MenuItem>
                          <MenuItem value="instapay">Instapay</MenuItem>
                          <MenuItem value="vodafone">Vodafone Cash</MenuItem>
                          <MenuItem value="fawry">Fawry</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        required
                        name="payedPrice"
                        label="المبلغ"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={pay.payedPrice}
                        onChange={(e) => handlePayedChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemovePayed(index)}
                        color="error"
                        variant='outlined'
                        sx={{ ml: 2, mt:0.5 }}
                      >
                        حذف
                      </Button>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
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
