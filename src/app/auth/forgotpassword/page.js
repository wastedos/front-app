import { Box } from "@mui/material";
import Formforgot from "./formforgot";

export default function Forgotpassword(){
    return(
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Formforgot/>
        </Box>
    );
}