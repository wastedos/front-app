import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Servicebtn from './actions/servicebtn';
import Showimage from './actions/showimage';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TableService({ itemId }) {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [dealer, setDealer] = React.useState([]); 
  const [month, setMonth] = React.useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const filteredServices = month
  ? services.filter(service => service.date.startsWith(month))
  : services;

  const handleClickOpen = async () => {
    setOpen(true);

    // جلب البيانات الخاصة بـ typeService بناءً على itemId
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dealer/read-dealer/${itemId}`);
      if (response.ok) {
        const data = await response.json();
        // نعرض الـ typeService الخاص بالتاجر
        setServices(data.typeService);
        setDealer(data)
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <VisibilityIcon/>
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              اسم التاجر : {dealer.dealerName} {/* هنا يمكنك إظهار اسم التاجر */}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
              <InputLabel color='#fff' id="demo-select-small-label">شهر</InputLabel>
              <Select
                color='#fff'
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={month}
                label="شهر"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>الكل</em>
                </MenuItem>
                {/* هنا تستطيع إضافة الأشهر */}
                <MenuItem value={"01"}>( 01 ) يناير </MenuItem>
                <MenuItem value={"02"}>( 02 ) فبراير</MenuItem>
                <MenuItem value={"03"}>( 03 ) مارس</MenuItem>
                <MenuItem value={"04"}>( 04 ) أبريل</MenuItem>
                <MenuItem value={"05"}>( 05 ) مايو</MenuItem>
                <MenuItem value={"06"}>( 06 ) يونيو</MenuItem>
                <MenuItem value={"07"}>( 07 ) يوليو</MenuItem>
                <MenuItem value={"08"}>( 08 ) أغسطس</MenuItem>
                <MenuItem value={"09"}>( 09 ) سبتمبر</MenuItem>
                <MenuItem value={"10"}>( 10 ) أكتوبر</MenuItem>
                <MenuItem value={"11"}>( 11 ) نوفمبر</MenuItem>
                <MenuItem value={"12"}>( 12 ) ديسمبر</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        <Box sx={{ p:{xs:2, md:5}, }}>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    التاريخ
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    رقم الفاتورة
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    الكود
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    نوع
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    عدد
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    سعر الشراء
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    سعر البيع
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    الصور
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                    التعديلات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{service.date}</TableCell>
                    <TableCell align="center">{service.billNumber}</TableCell>
                    <TableCell align="center">{service.code || "-"}</TableCell>
                    <TableCell align="center">{service.type}</TableCell>
                    <TableCell align="center">{service.count}</TableCell>
                    <TableCell align="center">{service.servicePriceBuy}</TableCell>
                    <TableCell align="center">{service.servicePriceSell}</TableCell>
                    <TableCell align="center"> <Showimage image={`https://go-gac.com/api/images/${service.imageName}`}/> </TableCell>
                    <TableCell align="center"><Servicebtn dealerId={itemId} serviceId={service._id}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
