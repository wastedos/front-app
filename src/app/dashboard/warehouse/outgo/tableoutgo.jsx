'use client';
import * as React from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import FormOutgo from './formoutgo';
import Outgobtn from './actions/outgobtn';

export default function TableOutgo() {
  const theme = useTheme();
  
  const columns = [
    { id: 'date', name: 'تاريخ التسجيل' },
    { id: 'code', name: 'الكود' },
    { id: 'billnumber' || '-', name: 'رقم الفاتورة' },
    { id: 'category', name: 'النوع' },
    { id: 'brand', name: 'الماركة' },
    { id: 'quantity', name: 'العدد' },
    { id: 'price', name: 'السعر' },
    { id: 'total', name: 'الاجمالي' },
    { id: 'buyer', name: 'المشتري' },
    { id: 'buyerphone', name: 'رقم المشتري' },
  ];

  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch all items from the backend
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/warehouse/read-outgo");
        const data = await response.json();
        const updatedRows = data.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        }));
        setRows(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Filtered rows based on search
  const filteredRows = rows.filter((row) => 
    columns.some((column) => 
      row[column.id]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Grid size={12}>
      <Box sx={{ overflow: 'hidden', backgroundColor: theme.palette.colors.box }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <TextField
            label="بحث"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box>
            <FormOutgo setRows={setRows}/>
          </Box>

        </Box>
        <Paper sx={{ width: "100%"}}>
          <TableContainer sx={{ maxHeight: 800, backgroundColor: theme.palette.colors.box }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center" sx={{backgroundColor: 'black', color: 'white', fontWeight:'700'}}>
                      {column.name}
                    </TableCell>
                  ))}
                    <TableCell  align="center"  sx={{backgroundColor: 'black', color: 'white', fontWeight:'700'}}>
                    التعديلات 
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
                        <Outgobtn itemId={row._id}/>
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
