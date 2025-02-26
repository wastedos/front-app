'use client';
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const BanelFour = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const printFrameRef = useRef(null);

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

  const chartData = [
    { category: "المكسب", value: orders.profit || 0 },
    { category: "الدخل", value: orders.totalIncome || 0 },
    { category: "المصروف", value: orders.totalExpenses || 0 },
    { category: "بيع قطع الغيار", value: orders.sellPartsTotal || 0 },
    { category: "شراء قطع الاستيراد", value: orders.buyNewPartsTotal || 0 },
    { category: "بيع قطع الاستيراد", value: orders.sellNewPartsTotal || 0 },
    { category: "شراء الاعمال الخارجية", value: orders.buyOutJobsTotal || 0 },
    { category: "بيع الاعمال الخارجية", value: orders.sellOutJobsTotal || 0 },
    { category: "النثريات", value: orders.otherTotal || 0 },
    { category: "المصنعيات", value: orders.invoiceTotal || 0 },
    { category: "الخصوم", value: orders.discountTotal || 0 },
  ];

  const handlePrint = async () => {
    try {
      // Fetch data for the report (you can adjust the URL and parameters as needed)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bills/read-bill`, {
          params: { month, year }
        }
      );
      const itemData = response.data;

      // Prepare HTML content for printing
      const printContent = `
        <html>
          <head>
            <title>تقرير</title>
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
            <h1>تقرير الفواتير</h1>
            <h2>تقرير للعام ${year}، شهر ${month}</h2>
            <table>
              <thead>
                <tr>
                  <th>البند</th>
                  <th>القيمة</th>
                </tr>
              </thead>
              <tbody>
                ${chartData.map(item => `
                  <tr>
                    <td>${item.category}</td>
                    <td>${item.value}</td>
                  </tr>
                `).join('')}
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
    <Grid size={{ xs: 12 }}>
      <Box sx={{ p: 2, height: '40rem', width: '100%', borderRadius: '15px', overflow: 'hidden', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
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
          <Box>
            <IconButton onClick={handlePrint} sx={{ mx: 1 }}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        <BarChart
          sx={{ direction: 'rtl' }}
          series={[{
            data: chartData.map(item => item.value),
          }]}
          height={500}
          xAxis={[{ data: chartData.map(item => item.category), scaleType: 'band' }]}
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

export default BanelFour;
