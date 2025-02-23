import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function FormIncome() {
  const [open, setOpen] = React.useState(false);
  const [dealers, setDealers] = React.useState([]);
  const [formData, setFormData] = React.useState({
    code: "",
    category: "",
    brand: "",
    quantity: "",
    price: "",
    dealerName: "",
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
        // تصفية التجار الذين يقدمون خدمة "قطع جديدة"
        const dealers = data.filter(dealer => dealer.service === "قطع جديدة");
        setDealers(dealers);
      } catch (error) {
        console.error("Error fetching dealers:", error.message);
      }
    };
  
    fetchDealers();
  }, []);
  

  //Send Data to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/add-income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to save item");
      }
      setFormData({
        code: "",
        category: "",
        brand: "",
        quantity: "",
        price: "",
        dealerName: "",
      })
      const result = await response.json();
      console.log("Item saved:", result);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />} sx={{ textTransform: "none", mx:1 }}>
        الوارد
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          <Typography sx={{ fontSize:'2rem', fontWeight:'600'}}>الوارد</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    size='small'
                    name="code"
                    label="الكود"
                    margin="dense"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
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
                    name="quantity"
                    label="العدد"
                    type="number"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="price"
                    label="السعر"
                    type="number"
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
                >
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
