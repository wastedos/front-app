'use client';
import * as React from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';


export default function TableTransfer() {
  const theme = useTheme();
  
  const columns = [
    { id: 'formatDate', name: 'تاريخ التسجيل' },
    { id: 'fromSafe', name: 'من' },
    { id: 'toSafe', name: 'الي' },
    { id: 'amountTransfer', name: 'المبلغ' },
    { id: 'reasonTransfer', name: 'السبب' },
  ];

  const [rows, setRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch all items from the backend
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/read-transfer`);
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

  // Filter rows based on search input with multiple words
  const filteredRows = rows.filter((row) => {
    const searchWords = searchTerm.toLowerCase().split(" "); // تقسيم النص المدخل إلى كلمات
    return searchWords.every((word) => 
      columns.some((column) => row[column.id]?.toString().toLowerCase().includes(word))
    );
  });

  const totalTmountTransfer = filteredRows.reduce((sum, row) => sum + (parseFloat(row.amountTransfer) || 0), 0);

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
          <Typography variant="h6" sx={{fontWeight:'600'}}>الاجمالي : {totalTmountTransfer.toLocaleString()}</Typography>
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
