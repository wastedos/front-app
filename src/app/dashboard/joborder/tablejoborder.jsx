"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FormJobOrder from './formjoborder';
import JobOrderbtn from './action/joborderbtn';
import Showimage from './action/showimage';

export default function TableJobOrder() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]); // حالة لتخزين البيانات

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joborders/temporary`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch job orders');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  },); // يتم استدعاء useEffect مرة واحدة عند التحميل

  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.colors.box, borderRadius:'15px', overflow:'hidden', p:1 }}>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', mt:1}}>
          <Typography variant="h5">قائمة الأوامر</Typography>
          <FormJobOrder/>
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
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اعمال الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>قطع الجديدة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>قطع استيراد</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>اعمال خارجية</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نثريات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>المدفوعات</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>طريقة الدفع</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>مصنعية الورشة</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الخصم</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الاجمالي</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الباقي</TableCell>
                <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>التفعلات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell align="center">{order.Jobid}</TableCell>
                    <TableCell align="center">{order.clientName}</TableCell>
                    <TableCell align="center">{order.clientPhone}</TableCell>
                    <TableCell align="center">{order.carModel}</TableCell>
                    <TableCell align="center">{order.carColor}</TableCell>
                    <TableCell align="center">{order.carKm}</TableCell>
                    <TableCell>
                      <Table>
                      <TableBody>
                        {order.jobs.map((jobs, partIndex) => (
                          <TableRow key={partIndex}>
                            <TableCell align="center">{jobs.jobName}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الكود</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>نوع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>العدد</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>السعر</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.parts.map((part, partIndex) => (
                            <TableRow key={partIndex}>
                              <TableCell align="center">{part.code}</TableCell>
                              <TableCell align="center">{part.category}</TableCell>
                              <TableCell align="center">{part.quantity}</TableCell>
                              <TableCell align="center">{part.pricesell}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>البائع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>النوع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>العدد</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>سعر الشراء</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>سعر البيع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الصور</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.newparts.map((newPart, partIndex) => (
                            <TableRow key={partIndex}>
                              <TableCell align="center">{newPart.dealerName}</TableCell>
                              <TableCell align="center">{newPart.category}</TableCell>
                              <TableCell align="center">{newPart.quantity}</TableCell>
                              <TableCell align="center">{newPart.pricebuy}</TableCell>
                              <TableCell align="center">{newPart.pricesell}</TableCell>
                              <TableCell align="center"> <Showimage image={`https://go-gac.com/api/images/${newPart.imageName}`} /> </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>المكان</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>النوع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>السعر الشراء</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>السعر البيع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>الصور</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.outjob.map((outjob, partIndex) => (
                            <TableRow key={partIndex}>
                              <TableCell align="center">{outjob.dealerName}</TableCell>
                              <TableCell align="center">{outjob.jobName}</TableCell>
                              <TableCell align="center">{outjob.jobPriceBuy}</TableCell>
                              <TableCell align="center">{outjob.jobPriceSell}</TableCell>
                              <TableCell align="center"> <Showimage image={`https://go-gac.com/api/images/${outjob.imageName}`} /> </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>النوع</TableCell>
                            <TableCell align="center" sx={{fontWeight:"600", fontSize:"1rem"}}>السعر</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.other.map((other, otherIndex) => (
                            <TableRow key={otherIndex}>
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
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell align="center">{order.payment}</TableCell>
                    <TableCell align="center">{order.invoice}</TableCell>
                    <TableCell align="center">{order.discount}</TableCell>
                    <TableCell align="center">{order.total}</TableCell>
                    <TableCell align="center">{order.theRest}</TableCell>
                    <TableCell align="center"><JobOrderbtn itemId={order._id}/></TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>  
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
