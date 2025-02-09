import { Box, } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import FormRegister from "./formregister";

//MetaData for Register Page
export const metadata = {
  title: "Register",
  description: "create a new account",
};

export default function Register() {
  return (
    <Box sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FormRegister/>
    </Box>
  );
}

