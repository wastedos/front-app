import { Box } from "@mui/material";
import TableBills from "./tablebills";

//MetaData for Home page
export const metadata = {
  title: "Bills",
  description: "Generated by indoom.com",
};
export default function Bills() {
  return (
    <Box component="main" sx={{minHeight:'100vh', width:'100%', p:{xs:1, md:5}, }}>
      
      <TableBills/>

    </Box>
  )
};
