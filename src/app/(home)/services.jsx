'use client';
import Grid from '@mui/material/Grid2';
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


function ServicesCard(props){
    const theme = useTheme();

    return(
        <Paper 
            sx={{ 
                height: "20rem", 
                width: "18rem",
                m: "10px",
                cursor: "pointer",
                flexWrap:'wrap',
                borderRadius:'15px',
                overflow:'hidden',
                transition:'0.5s',
                '&:hover': {
                    background: theme.palette.colors.cardhover,
                    transform: 'scale(1.05)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Adjusted opacity
                },
            }}
        >
       
            <Box sx={{height: '70%'}}>
                <Box
                component="img"
                src={props.images}
                sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                }}
                />
            </Box>
            <Box align='center' sx={{mt:1, px:1}}>
                <Typography variant="h6">
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.subtitle}
                </Typography>
            </Box>
        </Paper>
    );
}

export default function Services(){
    const theme = useTheme();

    const cardvalue = [
        { id: 1, images: "/image/home/3.jpg", title: 'صيانة الدورية', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 2, images: "/image/home/4.webp", title: 'قطع غيار اصلية', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 3, images: "/image/home/5.jpg", title: 'كشف اعطال', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 4, images: "/image/home/8.jpg", title: 'صيانة الكهرباء', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 5, images: "/image/home/1.jpg", title: 'تغير زيت', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 7, images: "/image/home/6.webp", title: 'صيانة عفشة', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 8, images: "/image/home/9.jpg", title: 'صيانة تكيف', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},
        { id: 6, images: "/image/home/2.jpg", title: 'غسيل سيارات', subtitle: 'خدمة اصلاح عالية الجوده لاعادة السيارة الي حالتها الاصلية باقصي سرعة وكفائة',},

    ];

    return (
        <Box 
            sx={{
                my:10,
                py:2,
                minHeight: "20rem",
                width: "100%",
                backgroundColor: theme.palette.colors.main,
            }}
        >
            <Typography variant="h3" align="center" sx={{ fontWeight:'700',}}>
                الخدمات المقدمة
            </Typography>

            {/* Swiper for small screens */}
            <Box sx={{display: { xs: 'flex', md: 'none' }, justifyContent:'center', alignItems:'center'}}>
                <Swiper
                    align='center'
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {cardvalue.map((e) => (
                        <SwiperSlide key={e.id}>
                            <ServicesCard link={e.link} images={e.images} title={e.title} subtitle={e.subtitle} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Fallback for larger screens */}
            <Box sx={{display: { xs: 'none', md: 'flex' }, justifyContent:'center', alignItems:'center'}}>
                <Grid container spacing={2}  sx={{my: 5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    {cardvalue.map((e) => (
                        <Grid  key={e.id}>
                            <ServicesCard link={e.link} images={e.images} title={e.title} subtitle={e.subtitle} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
