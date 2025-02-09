import { Box } from "@mui/material";
import FormLogin from "./formlogin";

//MetaData for Home page
export const metadata = {
    title: "Login",
    description: "login to account",
};
export default function Login(){
    return(
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormLogin/>
        </Box>
    );
}