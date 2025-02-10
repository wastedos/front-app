"use client";
import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Typography, Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function UserVisited() {
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bills/user-bills`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%", p: 2 }}>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>رقم الفاتورة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اسم العميل</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>رقم العميل</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>موديل السيارة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>لون السيارة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>كيلو مترات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اعمال الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>قطع الغيار</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نثريات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>طريقة الدفع</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>مصنعية الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الخصم</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الاجمالي</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{order.Jobid}</TableCell>
                  <TableCell align="center">{order.clientName}</TableCell>
                  <TableCell align="center">{order.clientPhone}</TableCell>
                  <TableCell align="center">{order.carModel}</TableCell>
                  <TableCell align="center">{order.carColor}</TableCell>
                  <TableCell align="center">{order.carKm}</TableCell>
                  <TableCell>
                    <TableBody>
                      {[...(order.jobs || []), ...(order.outjob || [])].map((jobs, partIndex) => (
                        <TableRow key={partIndex}>
                          <TableCell align="center">{jobs.jobName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableCell>
                  <TableCell align="center">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">نوع</TableCell>
                          <TableCell align="center">العدد</TableCell>
                          <TableCell align="center">السعر</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...(order.parts || []), ...(order.newparts || [])].map((part, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{part.category}</TableCell>
                            <TableCell align="center">{part.quantity}</TableCell>
                            <TableCell align="center">{part.pricesell}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>

                  <TableCell align="center">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">نوع</TableCell>
                          <TableCell align="center">السعر</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.other.map((other, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{other.otherName}</TableCell>
                            <TableCell align="center">{other.otherPrice}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell align="center">{order.payment}</TableCell>
                  <TableCell align="center">
                    {Number(order.invoice) +
                      (Array.isArray(order.outjob)
                        ? order.outjob.reduce((total, job) => total + Number(job.jobPriceSell || 0), 0)
                        : 0)}
                  </TableCell>
                  <TableCell align="center">{order.discount}</TableCell>
                  <TableCell align="center">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> 
      </Box>
    </Grid>
  );
}


/*
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={6} sx={{fontWeight:'600'}}>فاتورة رقم : {order.Jobid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">اسم العميل</TableCell>
                            <TableCell align="center">رقم العميل</TableCell>
                            <TableCell align="center">نوع السيارة</TableCell>
                            <TableCell align="center">عدد كيلو مترات</TableCell>
                            <TableCell align="center">الاعمال</TableCell>
                            <TableCell align="center">قطع الغيار</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{order.clientName}</TableCell>
                            <TableCell align="center">{order.clientPhone}</TableCell>
                            <TableCell align="center">{order.carModel}</TableCell>
                            <TableCell align="center">{order.carKm}</TableCell>
                            <TableCell align="center">
                                <TableBody>
                                    {[...(order.jobs || []), ...(order.outjob || [])].map((jobs, partIndex) => (
                                        <TableRow key={partIndex}>
                                        <TableCell>{jobs.jobName}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </TableCell>
                            <TableCell align="center">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" fontWeight='600'>نوع القطعة</TableCell>
                                        <TableCell align="center" fontWeight='600'>عدد</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...(order.parts || []), ...(order.newparts || [])].map((part, partIndex) => (
                                    <TableRow key={partIndex}>
                                        <TableCell align="center">{part.category}</TableCell>
                                        <TableCell align="center">{part.quantity}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>مصنعية</TableCell>
                            <TableCell align="right">{order.invoice}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>الخصم</TableCell>
                            <TableCell align="right">{order.discount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>الاجمالي</TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
*/