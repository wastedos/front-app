'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function FormJobOrder() {
  const theme = useTheme();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const [open, setOpen] = React.useState(false);
  const [dealersNewpart, setDealersNewpart] = React.useState([]);
  const [dealersOutjob, setDealersOutjob] = React.useState([]);
  const [formData, setFormData] = React.useState({
    clientName: "",
    clientPhone: "",
    carModel: "",
    carColor: "",
    chassis: "",
    carKm: "",
    discount: "",
    payment:"",
  });
  const [parts, setParts] = React.useState([]);
  const [newparts, setNewParts] = React.useState([]);
  const [outjob, setOutJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [other, setOther] = React.useState([]);
  const [payed, setPayed] = React.useState([]);
  const [invoice, setInvoice] = React.useState([]);


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ********************* Handle parts *********************
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

  // ********************* Handle NewParts *********************
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

  // ********************* Handle outjobs *********************
  const handleoutjobsChange = (index, e) => {
    const { name, value } = e.target;
    const updateOutJobs = [...outjob];
    updateOutJobs[index][name] = value;
    setOutJobs(updateOutJobs);
  };

  const handleRemoveoutjobs = (index) => {
    const updateOutJobs = outjob.filter((_, i) => i !== index);
    setOutJobs(updateOutJobs);
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

  // ********************* Handle Jobs *********************
  const handlejobsChange = (index, e) => {
    const { name, value } = e.target;
    const updateJobs = [...jobs];
    updateJobs[index][name] = value;
    setJobs(updateJobs);
  };

  const handleRemovejobs = (index) => {
    const updateJobs = jobs.filter((_, i) => i !== index);
    setJobs(updateJobs);
  };

  const handleAddjob = () => {
    setJobs([...jobs, { jobName: "" }]);
  };

  // ********************* Handle Other *********************
  const handleOtherChange = (index, e) => {
    const { name, value } = e.target;
    const updateOther = [...other];
    updateOther[index][name] = value; 
    setOther(updateOther);
  };

  const handleRemoveOther = (index) => {
    const updateOther = other.filter((_, i) => i !== index);
    setOther(updateOther);
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

  // ********************* Handle Invoice *********************
  const handleInvoiceChange = (index, e) => {
    const { name, value } = e.target;
    const updateInvoice = [...invoice];
    updateInvoice[index][name] = value; 
    setInvoice(updateInvoice);
  };
  
  const handleRemoveInvoice = (index) => {
    const updateInvoice = invoice.filter((_, i) => i !== index);
    setInvoice(updateInvoice);
  };
  
  const handleAddInvoice = () => {
    setInvoice([...invoice, { invoiceType: "", invoicePrice: "" }]);
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

  const handleCodeChange = async (index, e) => {
    const { value } = e.target;
  
    setParts((prev) =>
      prev.map((part, i) =>
        i === index ? { ...part, code: value } : part
      )
    );
  
    if (value) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/warehouse/read-product/${value}`
        );
  
        if (!response.ok) {
          throw new Error("لم يتم العثور على المنتج، يمكنك إضافته يدويًا.");
        }
  
        const foundItem = await response.json();
  
        setParts((prev) =>
          prev.map((part, i) =>
            i === index ? { ...part, category: foundItem.category || "" } : part
          )
        );
      } catch (error) {
        // السماح بإدخال البيانات يدويًا في حالة عدم العثور على المنتج
        setParts((prev) =>
          prev.map((part, i) =>
            i === index ? { ...part, category: "" } : part
          )
        );
      }
    }
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    // Add client data
    formDataToSend.append("clientName", formData.clientName);
    formDataToSend.append("clientPhone", formData.clientPhone);
    formDataToSend.append("carModel", formData.carModel);
    formDataToSend.append("carColor", formData.carColor);
    formDataToSend.append("carKm", formData.carKm);
    formDataToSend.append("chassis", formData.chassis);
    formDataToSend.append("discount", formData.discount || "");
    formDataToSend.append("payment", formData.payment || "");

    // Add data as JSON
    formDataToSend.append("jobs", JSON.stringify(jobs));
    formDataToSend.append("parts", JSON.stringify(parts));
    formDataToSend.append("outjob", JSON.stringify(outjob));
    formDataToSend.append("other", JSON.stringify(other));
    formDataToSend.append("payed", JSON.stringify(payed));
    formDataToSend.append("invoice", JSON.stringify(invoice));
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/add`, {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        console.log("✅ Job order added successfully");
        // Reset form after submission
        setFormData({
          clientName: "",
          clientPhone: "",
          carModel: "",
          carColor: "",
          carKm: "",
          chassis: "",
          invoice: "",
          discount: "",
          payment:"",
        });
        setParts([]);
        setNewParts([]);
        setJobs([]);
        setOutJobs([]);
        setOther([]);
        setPayed([])
        handleClose();

        setSnackbarMessage('تم حفظ العنصر بنجاح!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

      } else {
        console.error("❌ Failed to add job order");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  // Hidden input for file uploads
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
                <Grid size={6}>
                  <TextField
                    name="carKm"
                    label="عدد الكيلو مترات"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carKm}
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
                    value={formData.chassis}
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
                          value={jobs.jobName}
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
                        value={part.code}
                        onChange={(e) => handleCodeChange(index, e)}
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
                          {dealersNewpart.map((dealer) => (
                            <MenuItem key={dealer.dealerName} value={dealer.dealerName}>
                              {dealer.dealerName}
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
                        variant="outlined"
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
                      <FormControl fullWidth margin="dense" size="small">
                        <InputLabel id="dealer-label">اسم التاجر</InputLabel>
                        <Select
                          labelId="dealer-label"
                          name="dealerName"
                          label="اسم التاجر"
                          value={outjob.dealerName}
                          onChange={(e) => handleoutjobsChange(index, e)}
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
                        onClick={() => handleRemoveoutjobs(index)}
                        color="error"
                        variant="outlined"
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
                <Grid size={6}>
                  <TextField
                    size='small'
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
                <Grid size={6}>
                  <FormControl fullWidth margin="dense"  size='small'>
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
              </Grid>
              <Grid size={12}>
                <Button onClick={handleAddInvoice} variant="outlined" color="warning" sx={{ width:'100%', mt:2 }}>
                   المصنعيات 
                </Button>
              </Grid>
              {invoice.map((inv, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2} sx={{ p:1, my:1, backgroundColor: theme.palette.colors.box, borderRadius:'5px'}}>
                    <Grid size={6}>
                    <TextField
                        required
                        name="invoiceType"
                        label="نوع المصنيعة"
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={inv.invoiceType}
                        onChange={(e) => handleInvoiceChange(index, e)}
                      />
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        required
                        name="invoicePrice"
                        label="المبلغ"
                        type="number"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={inv.invoicePrice}
                        onChange={(e) => handleInvoiceChange(index, e)}
                      />
                      <Button
                        onClick={() => handleRemoveInvoice(index)}
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
                <Button type="submit" autoFocus variant="contained" disabled={isSubmitting} sx={{ textTransform: "none" }}>
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
