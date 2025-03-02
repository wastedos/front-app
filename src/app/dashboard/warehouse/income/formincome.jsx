import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function FormIncome() {
  const [open, setOpen] = React.useState(false);
  const [dealers, setDealers] = React.useState([]);
  const [formData, setFormData] = React.useState({
    code: "",
    codeCategory:"",
    billnumber: "",
    carModel: "",
    category: "",
    brand: "",
    quantity: "",
    price: "",
    dealerName: "",
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // حالة جديدة لـ Snackbar
  const [errorMessage, setErrorMessage] = React.useState(""); // حالة جديدة لتخزين رسالة الخطأ

  const handleClickOpen = () => {
    setOpen(true);
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ عند فتح الحوار
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ عند إغلاق الحوار
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  // Fetch dealers from the database
  React.useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dealer/read-dealer`, {
          method: "GET",
        });
        const data = await response.json();
        const dealers = data.filter(dealer => dealer.service === "قطع جديدة");
        setDealers(dealers);
      } catch (error) {
        console.error("Error fetching dealers:", error.message);
      }
    };

    fetchDealers();
  }, []);

  const handleCodeChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, code: value}));
  
    if (value) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/read-product/${value}`);
  
        if (!response.ok) {
          throw new Error("لم يتم العثور على المنتج، يمكنك إضافته يدويًا.");
        }
  
        const foundItem = await response.json();
  
        setFormData((prev) => ({
          ...prev,
          codeCategory: foundItem.codeCategory || "",
          carModel: foundItem.carModel || "",
          category: foundItem.category || "",
          brand: foundItem.brand || "",
        }));
      } catch (error) {
        console.error("Error fetching item details:", error.message);
        setErrorMessage(error.message);
        setOpenSnackbar(true);
  
        // السماح بإدخال البيانات يدويًا في حالة عدم العثور على المنتج
        setFormData((prev) => ({
          ...prev,
          codeCategory:"",
          carModel: "",
          category: "",
          brand: "",
        }));
      }
    }
  };
  
  const handleCodeCategoryChange = async (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, codeCategory: value }));
  
    if (value) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/read-product-by-codeCategory/${value}`);
  
        if (!response.ok) {
          throw new Error("لم يتم العثور على المنتج باستخدام كود القطعة.");
        }
  
        const foundItem = await response.json();
  
        // يمكنك تحديث باقي الحقول إذا كانت متوفرة من الرد
        setFormData((prev) => ({
          ...prev,
          code: foundItem.code || prev.code, // إذا أردت تحديث حقل الكود أيضًا
          carModel: foundItem.carModel || "",
          category: foundItem.category || "",
          brand: foundItem.brand || "",
        }));
      } catch (error) {
        console.error("Error fetching product by codeCategory:", error.message);
        setErrorMessage(error.message);
        setOpenSnackbar(true);
        
        // السماح بإدخال البيانات يدويًا في حالة عدم العثور على المنتج
        setFormData((prev) => ({
          ...prev,
          code:"",
          carModel: "",
          category: "",
          brand: "",
        }));
      }
    }
  };
  
  // Send Data to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // تعطل الزر
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/add-income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("فشل في حفظ العنصر");
      }

      setFormData({
        code: "",
        codeCategory:"",
        billnumber: "",
        carModel: "",
        category: "",
        brand: "",
        quantity: "",
        price: "",
        dealerName: "",
      });

      const result = await response.json();
      console.log("Item saved:", result);
      handleClose();
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message); // تعيين رسالة الخطأ
      setOpenSnackbar(true); // فتح Snackbar
    } finally {
      setIsSubmitting(false); // إعادة تفعيل الزر
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // إغلاق Snackbar
  };
  

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />} sx={{ textTransform: "none", mx: 1 }}>
        الوارد
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <Typography sx={{ fontSize: '2rem', fontWeight: '600' }}>الوارد</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    required
                    size='small'
                    name="code"
                    label="الكود"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.code}
                    onChange={handleCodeChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    size='small'
                    name="codeCategory"
                    label="كود القطعة"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.codeCategory}
                    onChange={handleCodeCategoryChange}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    size='small'
                    name="billnumber"
                    label="رقم العملية"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.billnumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    name="carModel"
                    label="نوع السيارة"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.carModel}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="category"
                    label="النوع"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="brand"
                    label="الماركة"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="quantity"
                    label="العدد"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="price"
                    label="السعر"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="dealer-label">اسم التاجر</InputLabel>
                    <Select
                      required
                      labelId="dealer-label"
                      name="dealerName"
                      label="اسم التاجر"
                      value={formData.dealerName}
                      onChange={handleChange}
                    >
                      {dealers.map((d) => (
                        <MenuItem key={d.dealerName} value={d.dealerName || ''}>
                          {d.dealerName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} sx={{ textTransform: "none" }} color="error">
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  autoFocus
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'لحظات ...' : 'تسجيل'}
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // تغيير موضع Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
