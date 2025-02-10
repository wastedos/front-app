'use client';
import Grid from '@mui/material/Grid2';
import { Box, Paper, useTheme } from "@mui/material";
import { useRouter } from 'next/navigation';

function ServicesCard(props) {

    const theme = useTheme();

    return (
        <Paper 
            sx={{ 
                height: {xs:'7rem', md:'8rem'}, 
                width: {xs:'10rem', md:'15rem'},
                p: '10px',
                m: "10px",
                cursor: "pointer",
                borderRadius: '15px',
                transition: '0.5s',
                '&:hover': {
                    background: theme.palette.colors.cardhover,
                    transform: 'scale(1.01)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection:{xs:'column', md:'row'} ,alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ height: '5rem', width: '5rem', mt: 1 }}>
                    <Box
                        component="img"
                        src={props.images}
                        sx={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            borderRadius: '15px',
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    );
}

export default function Findcar() {

    const cardvalue = [
        { id: 1, images: "/image/carbrand/volkswagen.png", title: "VolksWagen" },
        { id: 2, images: "/image/carbrand/audi.png", title: "Audi" },
        { id: 3, images: "/image/carbrand/skoda.png", title: "Skoda" },
        { id: 4, images: "/image/carbrand/seat.png", title: "Seat" },
        { id: 5, images: "/image/carbrand/cupra.png", title: "Cupra" },
        { id: 6, images: "/image/carbrand/porsche.png", title: "Porsche" },
        { id: 7, images: "/image/carbrand/lamborghini.png", title: "Lamborghini" },
        { id: 8, images: "/image/carbrand/bentley.png", title: "Bentley" },
    ];

    return (
        <Box sx={{ minHeight: "20rem", width: "100%", padding: { xs: '10px', md: '20px' } }}>
            <Grid container spacing={1} sx={{ my: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {cardvalue.map((e) => (
                    <Grid key={e.id}>
                        <ServicesCard link={e.link} images={e.images} title={e.title} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
