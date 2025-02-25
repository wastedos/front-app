'use client'
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';

const BanelFour = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/bills/read-bill`;
        let params = new URLSearchParams();

        if (month) params.append("month", month);
        if (year) params.append("year", year);

        const finalUrl = `${url}?${params.toString()}`;
        console.log("Fetching URL:", finalUrl);

        const response = await fetch(finalUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders(data);
        } else {
          console.error("Failed to fetch job orders");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, [month, year]);

  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ p: 2, height: '40rem', width: '100%', borderRadius: '15px', overflow: 'hidden', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>شهر</InputLabel>
            <Select value={month} label="شهر" onChange={handleMonthChange}>
              <MenuItem value=""><em>الكل</em></MenuItem>
              <MenuItem value={"01"}>يناير</MenuItem>
              <MenuItem value={"02"}>فبراير</MenuItem>
              <MenuItem value={"03"}>مارس</MenuItem>
              <MenuItem value={"04"}>أبريل</MenuItem>
              <MenuItem value={"05"}>مايو</MenuItem>
              <MenuItem value={"06"}>يونيو</MenuItem>
              <MenuItem value={"07"}>يوليو</MenuItem>
              <MenuItem value={"08"}>أغسطس</MenuItem>
              <MenuItem value={"09"}>سبتمبر</MenuItem>
              <MenuItem value={"10"}>أكتوبر</MenuItem>
              <MenuItem value={"11"}>نوفمبر</MenuItem>
              <MenuItem value={"12"}>ديسمبر</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>السنة</InputLabel>
            <Select value={year} label="السنة" onChange={handleYearChange}>
                <MenuItem value=""><em>الكل</em></MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
                <MenuItem value="2028">2028</MenuItem>
                <MenuItem value="2029">2029</MenuItem>
                <MenuItem value="2030">2030</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" align="center" fontWeight={900} sx={{ mb: 2 }}> <ReceiptIcon/> تفاصيل الفواتير</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>  المكسب : {orders.profit || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي الدخل : {orders.totalIncome || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي المصروف : {orders.totalExpenses || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي بيع قطع الغيار : {orders.sellPartsTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي شراء قطع الغيار الاستيراد : {orders.buyNewPartsTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي بيع قطع الغيار الاستيراد : {orders.sellNewPartsTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي شراء الاعمال الخارجية : {orders.buyOutJobsTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي بيع الاعمال الخارجية : {orders.sellOutJobsTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي النثريات : {orders.otherTotal || 0}</Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}> اجمالي المصنعيات : {orders.invoiceTotal || 0}</Typography>
            </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default BanelFour;
