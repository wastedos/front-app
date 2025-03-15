'use client'
import { Box, useTheme } from "@mui/material";
import HomeImage from "./homeImage";
import AboutImage from "./aboutImage";



export default function Home() {
    const theme = useTheme();

    return(
        <Box sx={{p:{xs:1, md:3, lg:5}}}>
            <Box sx={{p:2, mb:2, backgroundColor: theme.palette.colors.box, width:'100%', height:'auto', borderRadius:'15px' }}>
                <HomeImage/>
                <AboutImage/>
            </Box>
            <Box sx={{ my:2, backgroundColor: theme.palette.colors.box, width:'100%', height:'35rem', borderRadius:'15px' }}>

            </Box>
        </Box>
    );
}