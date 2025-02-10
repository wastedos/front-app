import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Unauthorized(){
    return(
        <Box align="center" sx={{minHeight: '80vh', mt: { xs: 8, sm: 10 }, }}>
            <Box sx={{mt:30}}>
                <Typography variant="h4" fontWeight={900}>غير مصرح لك الدخول الي هذه الصفحة</Typography>
                <Button href="/" sx={{mt:5}} variant="outlined" endIcon={<ArrowBackIcon/>}>العودة</Button>
            </Box>
        </Box>
    )
}