"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box } from "@mui/material";

export default function Swipper() {
  const [images, setImages] = useState([]); // حفظ الصور

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/get-images`);
        setImages(response.data); // تخزين البيانات
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الصور:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Box sx={{ height: { xs: "15rem", md: "20rem" }, width: "100%", mt: "6rem" }}>
      <Swiper
        style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.length > 0 && images.some((image) => image.imageType === "swiper") ? (
          images
            .filter((image) => image.imageType === "swiper") // ✅ عرض الصور الخاصة بالـ Swiper فقط
            .map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${image.image}`} // تحديث الرابط
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                  alt={`Image ${index}`}
                />
              </SwiperSlide>
            ))
        ) : (
          <SwiperSlide>
            <Box
              component="img"
              src="/image/home/otherswip.jpg"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
              alt="Placeholder image"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </Box>
  );
}
