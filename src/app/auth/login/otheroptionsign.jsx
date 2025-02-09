"use client";
import { Box, Button, Divider, } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GoogleIcon from '@mui/icons-material/Google';

export default function Otheroptionsign() {
  // Language
  return (
    <Grid>
      <Divider sx={{m:"50px 0px"}}>خيارت اخري</Divider>
      <Box sx={{my:'20px',display:'flex', justifyContent:'space-evenly'}}>
        <Button sx={{textTransform:'none', width:'100%', p:'12px 0'}}>
          <GoogleIcon sx={{color:'gray', mr:'5px'}}/>تابع بي حساب جوجل
        </Button>
      </Box>
    </Grid>
  );
}
