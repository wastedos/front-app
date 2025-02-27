"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Billbtn from "./action/billbtn";

export default function TableBills() {
  const theme = useTheme();
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bills/read-bills`);
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
  }, []);
  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.colors.box, borderRadius:'15px', overflow:'hidden', p:1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt:1
          }}
        >
          <TextField
            label="بحث"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>رقم الشغل</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اسم العميل</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>رقم العميل</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>موديل السيارة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>لون السيارة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>كيلو مترات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>رقم الشاسية</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اعمال الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>قطع الجديدة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>قطع استيراد</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اعمال خارجية</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نثريات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>طريقة الدفع</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>مصنعية الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الخصم</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الاجمالي</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>التفعلات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{order.Jobid}</TableCell>
                  <TableCell align="center">{order.clientName}</TableCell>
                  <TableCell align="center">{order.clientPhone}</TableCell>
                  <TableCell align="center">{order.carModel}</TableCell>
                  <TableCell align="center">{order.carColor}</TableCell>
                  <TableCell align="center">{order.carKm}</TableCell>
                  <TableCell align="center">{order.chassis}</TableCell>
                  <TableCell>
                    <Table>
                    <TableBody>
                      {order.jobs?.map((job, partIndex) => (
                        <TableRow key={partIndex}>
                          <TableCell align="center">{job.jobName}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell align="center">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">الكود</TableCell>
                          <TableCell align="center">العدد</TableCell>
                          <TableCell align="center">السعر</TableCell>
                          <TableCell align="center">نوع</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.parts.map((part, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{part.code}</TableCell>
                            <TableCell align="center">{part.quantity}</TableCell>
                            <TableCell align="center">{part.pricesell}</TableCell>
                            <TableCell align="center">{part.category}</TableCell>
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
                          <TableCell align="center">البائع</TableCell>
                          <TableCell align="center">العدد</TableCell>
                          <TableCell align="center">سعر الشراء</TableCell>
                          <TableCell align="center">سعر البيع</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.newparts.map((newPart, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{newPart.category}</TableCell>
                            <TableCell align="center">{newPart.dealerName}</TableCell>
                            <TableCell align="center">{newPart.quantity}</TableCell>
                            <TableCell align="center">{newPart.pricebuy}</TableCell>
                            <TableCell align="center">{newPart.pricesell}</TableCell>
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
                          <TableCell align="center">المكان</TableCell>
                          <TableCell align="center">سعر الشراء</TableCell>
                          <TableCell align="center">سعر البيع</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.outjob.map((outjob, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{outjob.jobName}</TableCell>
                            <TableCell align="center">{outjob.dealerName}</TableCell>
                            <TableCell align="center">{outjob.jobPriceBuy}</TableCell>
                            <TableCell align="center">{outjob.jobPriceSell}</TableCell>
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
                  <TableCell>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نوع الخزنة</TableCell>
                          <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>المبلغ</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.payed.map((pay, payIndex) => (
                          <TableRow key={payIndex}>
                            <TableCell align="center">{pay.payment}</TableCell>
                            <TableCell align="center">{pay.payedPrice}</TableCell>
                          </TableRow>
                        ))}
                          <TableRow>
                            <TableCell align="center">{order.payment}</TableCell>
                            <TableCell align="center">{order.theRest}</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نوع</TableCell>
                          <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>المصنعية</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.invoice.map((inv, invIndex) => (
                          <TableRow key={invIndex}>
                            <TableCell align="center">{inv.invoiceType}</TableCell>
                            <TableCell align="center">{inv.invoicePrice}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell align="center">{order.discount}</TableCell>
                  <TableCell align="center">{order.total}</TableCell>
                  <TableCell align="center">
                    <Billbtn itemId={order._id} />
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
