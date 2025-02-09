'use client';
import * as React from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';


export default function Banelfive() {
  const theme = useTheme();
  

  return (
    <Grid size={{xs:12, xl:8,}}>
      <Box sx={{ overflow: 'hidden', backgroundColor: theme.palette.colors.box }}>
 
      </Box>
    </Grid>
  );
}
