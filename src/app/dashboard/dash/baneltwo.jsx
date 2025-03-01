'use client';
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const BanelTwo = () => {
  const theme = useTheme();
  const [withdrawData, setWithdrawData] = useState([]);
  const [depositData, setDepositData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const printFrameRef = useRef(null);

  const fetchTransactionData = async (month, year) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/monthly-transactions`;
      let params = new URLSearchParams();

      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const finalUrl = `${url}?${params.toString()}`;
      const response = await axios.get(finalUrl);
      setWithdrawData(response.data.withdraws);
      setDepositData(response.data.deposits);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePrint = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/monthly-transactions`, {
          params: { month: selectedMonth, year: selectedYear }
        }
      );
      const itemData = response.data;

      // Prepare HTML content for printing
      const printContent = `
        <html>
          <head>
            <title>تقرير المعاملات الشهرية</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                direction: rtl;
                text-align: right;
              }
              h1, h2 {
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              table, th, td {
                border: 1px solid black;
              }
              th, td {
                padding: 10px;
                text-align: center;
              }
              .section-title {
                font-weight: bold;
                background-color: #f4f4f4;
              }
            </style>
          </head>
          <body>
            <h1>تقرير المعاملات الشهرية</h1>
            <h2>شهر: ${selectedMonth}، سنة: ${selectedYear}</h2>
            <table>
              <thead>
                <tr>
                  <th>البند</th>
                  <th>القيمة</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>إيداع</td><td>${itemData.deposits.reduce((sum, deposit) => sum + deposit.totalDeposit, 0)}</td></tr>
                <tr><td>سحب</td><td>${itemData.withdraws.reduce((sum, withdraw) => sum + withdraw.totalWithdraw, 0)}</td></tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Load content into the hidden iframe
      const printFrame = printFrameRef.current;
      const printDocument = printFrame.contentDocument || printFrame.contentWindow.document;
      printDocument.open();
      printDocument.write(printContent);
      printDocument.close();

      // Trigger the print
      printFrame.contentWindow.print();
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  return (
    <Grid size={{ xs: 12, lg: 12, xl: 8 }}>
      <Box sx={{ height: '30rem', borderRadius: '15px', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
          <Box sx={{display:'flex'}}>
          <Box sx={{mr:2}}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="month-select-label">شهر</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                onChange={handleMonthChange}
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
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="year-select-label">سنة</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
                label="سنة"
              >
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
                <MenuItem value="2028">2028</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </Box>
          <Box>
            <IconButton onClick={handlePrint}>
              <PrintIcon />
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

      {/* Hidden iframe for printing */}
      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print Frame"
      />
    </Grid>
  );
};

export default BanelTwo;
