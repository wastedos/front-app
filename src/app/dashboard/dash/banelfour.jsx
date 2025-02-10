'use client'
import { Box,} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { Gauge } from '@mui/x-charts/Gauge';

const BanelFour = () => {

    //Create Themes && Language
    const theme = useTheme();

    return (
        <Grid size={{xs:12}}>
           <Box sx={{ height:'30rem', width:'100%', borderRadius:'15px', overflow:'hidden', backgroundColor: theme.palette.colors.box}}>
                <Box sx={{  }}>
                    
                </Box>
            </Box>
        </Grid>
    );
}

export default BanelFour;