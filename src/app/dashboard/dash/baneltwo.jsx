'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
//icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function BanelTwo() {

  const theme = useTheme();
  const [withdrawData, setWithdrawData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // جلب البيانات الخاصة بالسحوبات
  const fetchWithdrawData = async (month) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/withdraw`);
      setWithdrawData(response.data.withdraws);
    } catch (error) {
      console.error("Error fetching withdraw data:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchWithdrawData(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <Grid size={{ xs: 12, lg: 12, xl: 8 }}>
      <Box sx={{ height: '30rem', borderRadius: '15px', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">شهر</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="شهر"
              >
                {/* قائمة الشهور */}
                <MenuItem value="1">يناير</MenuItem>
                <MenuItem value="2">فبراير</MenuItem>
                <MenuItem value="3">مارس</MenuItem>
                <MenuItem value="4">ابريل</MenuItem>
                <MenuItem value="5">مايو</MenuItem>
                <MenuItem value="6">يونيو</MenuItem>
                <MenuItem value="7">يوليو</MenuItem>
                <MenuItem value="8">اغسطس</MenuItem>
                <MenuItem value="9">سبتمبر</MenuItem>
                <MenuItem value="10">اكتوبر</MenuItem>
                <MenuItem value="11">نوفمبر</MenuItem>
                <MenuItem value="12">ديسمبر</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ mb: 10 }} />

        {/* BarChart لعرض السحوبات فقط */}
        <BarChart
          sx={{ direction: 'rtl' }}
          series={withdrawData.map(item => ({
            data: [item.totalWithdraw],
            label: item._id // نوع الخزنة
          }))}
          height={290}
          xAxis={[{ data: ['السحب'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
          slotProps={{ legend: { hidden: true } }}
        />
      </Box>
    </Grid>
  );
}
