'use client';
import * as React from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import FormUpdate from './formupdate';


export default function TableWarehouse() {
  const theme = useTheme();
  
  const columns = [
    { id: 'code', name: 'الكود' },
    { id: 'codeCategory', name: 'كود القطعة' },
    { id: 'carModel', name: 'نوع السيارة' },
    { id: 'category', name: 'النوع' },
    { id: 'brand', name: 'الماركة' },
    { id: 'income', name: 'الوارد' },
    { id: 'outgo', name: 'الصادر' },
    { id: 'returnin', name: 'مرتجع الوارد' },
    { id: 'returnout', name: 'مرتجع الصادر' },
    { id: 'quantity', name: 'العدد المتبقي' },
    { id: 'price', name: 'السعر' },
    { id: 'total', name: 'الاجمالي' },
  ];

  const [rows, setRows] = React.useState([]);
  const [totalSum, setTotalSum] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch all items from the backend
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse/read-product`);
        const data = await response.json();
        setRows(data.product);
        setTotalSum(data.totalSum);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Filtered rows based on search
  const filteredRows = rows?.filter((row) => 
    columns.some((column) => 
      row[column.id]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Grid size={12}>
      <Box sx={{ overflow: 'hidden', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: {xs:'block', md:'flex'}, alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <TextField
            sx={{width: {xs:"100%", md:'auto'}}}
            label="بحث"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Typography variant='h6' fontWeight={900} sx={{mx:1, fontWeight:900 ,mt:{xs:2, md:0}, color:'#707070'}}>اجمالي المخزن : {totalSum || 0}$</Typography>
        </Box>
        <Paper sx={{ width: "100%"}}>
          <TableContainer sx={{ maxHeight: 800, backgroundColor: theme.palette.colors.box }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center" sx={{backgroundColor: '#5f6a6a', color: 'white', fontWeight:'700'}}>
                      {column.name}
                    </TableCell>
                  ))}
                    <TableCell  align="center"  sx={{backgroundColor: '#5f6a6a', color: 'white', fontWeight:'700'}}>
                      تعديلات 
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="center">
                        {row[column.id]}
                      </TableCell>
                    ))}
                      <TableCell align="center">
                        <FormUpdate itemId={row._id}/>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Grid>
  );
}