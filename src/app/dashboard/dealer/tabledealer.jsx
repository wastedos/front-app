"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Dealerbtn from "./actions/dealerbtn";
import TableService from "./tableservice";
import FormDealer from "./formdealer";


export default function TableDealer() {
  const [orders, setOrders] = useState([]); // حالة لتخزين البيانات
  const [searchTerm, setSearchTerm] = useState(""); // حالة البحث

  // Filtered rows based on search
  const filteredRows = orders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/dealer/read-dealer");
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
  }, []); // يتم استدعاء useEffect مرة واحدة عند التحميل

  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="بحث"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormDealer/>
        </Box>
        
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>

                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  اسم التاجر
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  رقم التاجر
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  نوع الخدمة
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  الخدمة 
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  اجمالي الشراء 
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  اجمالي البيع 
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  تم سداد
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  الباقي
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600", fontSize: "1rem" }}>
                  التعديلات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((dealer, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{dealer.dealerName}</TableCell>
                  <TableCell align="center">{dealer.dealerPhone}</TableCell>
                  <TableCell align="center">{dealer.service}</TableCell>
                  <TableCell align="center"><TableService itemId={dealer._id}/></TableCell>
                  <TableCell align="center">{dealer.totalPriceBuy}</TableCell>
                  <TableCell align="center">{dealer.totalPriceSell}</TableCell>
                  <TableCell align="center">{dealer.payed}</TableCell>
                  <TableCell align="center">{dealer.theRest}</TableCell>
                  <TableCell align="center">
                    <Dealerbtn dealerId={dealer._id}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
