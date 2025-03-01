'use client'
import { Box, useTheme } from "@mui/material";



export default function Home() {
    const theme = useTheme();

    return(
        <Box sx={{p:{xs:1, md:3, lg:5}}}>
            <Box sx={{ mb:2, backgroundColor: theme.palette.colors.box, width:'100%', height:'15rem', borderRadius:'15px' }}>
                
            </Box>
            <Box sx={{ my:2, backgroundColor: theme.palette.colors.box, width:'100%', height:'35rem', borderRadius:'15px' }}>

            </Box>
        </Box>
    );
}