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
  const [depositData, setDepositData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchTransactionData = async (month) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/monthly-transactions`;
      if (month) {
        const currentYear = new Date().getFullYear();
        url += `?month=${month}&year=${currentYear}`;
      }

      const response = await axios.get(url);
      setWithdrawData(response.data.withdraws);
      setDepositData(response.data.deposits);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData(selectedMonth);
  }, [selectedMonth]);

  return (
    <Grid size={{ xs: 12, lg: 12, xl: 8 }}>
      <Box sx={{ height: '30rem', borderRadius: '15px', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="month-select-label">شهر</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="شهر"
              >
                <MenuItem value=""><em>كل الأشهر</em></MenuItem>
                <MenuItem value="01">يناير</MenuItem>
                <MenuItem value="02">فبراير</MenuItem>
                <MenuItem value="03">مارس</MenuItem>
                <MenuItem value="04">ابريل</MenuItem>
                <MenuItem value="05">مايو</MenuItem>
                <MenuItem value="06">يونيو</MenuItem>
                <MenuItem value="07">يوليو</MenuItem>
                <MenuItem value="08">اغسطس</MenuItem>
                <MenuItem value="09">سبتمبر</MenuItem>
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

        <BarChart
          sx={{ direction: 'rtl' }}
          series={[
            {
              data: depositData.map(item => item.totalDeposit),
              color: "green"
            },
            {
              data: withdrawData.map(item => item.totalWithdraw),
              color: "red"
            }
          ]}
          height={290}
          xAxis={[{ data: withdrawData.map(item => item._id), scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
        />
      </Box>
    </Grid>
  );
}
