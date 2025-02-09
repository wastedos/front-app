"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';

export default function Swipper() {
  return (
    <Box sx={{height:{xs:'15rem', md:'20rem'}, width:'100%', mt:'6rem',}}>
      <Swiper 
        style={{width:'100%', height:'100%', borderRadius:'20px'}}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box
            component="img"
            src="/image/home/swip1.jpg"
            sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius:'20px'
            }}
            alt="About us image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
              component="img"
              src="/image/home/swip1.jpg"
              sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius:'20px'
              }}
              alt="About us image"
            />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="img"
            src="/image/home/swip1.jpg"
            sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius:'20px'
            }}
            alt="About us image"
          />        
        </SwiperSlide>
        <SwiperSlide>
          <Box
              component="img"
              src="/image/home/swip1.jpg"
              sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius:'20px'
              }}
              alt="About us image"
            />         
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
