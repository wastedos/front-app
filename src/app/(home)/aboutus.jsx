'use client'
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios"; // إضافة استيراد axios

export default function Aboutus() {
  const [images, setImages] = useState([]); // حفظ الصور
  const [loading, setLoading] = useState(true); // لحالة التحميل
  const [error, setError] = useState(null); // لحالة الخطأ

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/get-images`);
        setImages(response.data); // تخزين البيانات
      } catch (error) {
        setError("حدث خطأ أثناء جلب الصور");
        console.error("حدث خطأ أثناء جلب الصور:", error);
      } finally {
        setLoading(false); // إيقاف التحميل بعد العملية
      }
    };

    fetchImages();
  }, []);

  return (
    <Box sx={{ display: { xs: 'block', lg: 'flex' }, justifyContent: 'center', my: 10 }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, maxHeight: { lg: '25rem', xl: '30rem' } }}>
        {loading ? (
          <Typography>جارٍ تحميل الصور...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : images.length > 0 && images.some((image) => image.imageType === "about")  ? (
          images
            .filter((image) => image.imageType === "about")
            .map((image, index) => (
              <Box
                component="img"
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${image.image}`}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                }}
                alt="About us image"
                key={index}
              />
            ))
        ) : (
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
        )}
      </Box>
      <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
        <Typography variant="h4" sx={{ m: "10px" }}>
          معلومات عنا
        </Typography>
        <Typography variant="h6" sx={{ m: "10px" }}>
          مرحبًا بك في موقعنا، وجهتك الأولى للحصول على أفضل الخدمات وأحدث المنتجات في مجال السيارات. نحن هنا لنجعل تجربتك مميزة وسهلة،
          ونسعى دائمًا لتلبية احتياجاتك بأفضل الطرق الممكنة. نطمح لأن نكون الخيار الأول لعملائنا عندما يتعلق الأمر بخدمات السيارات. من خلال فريق من المتخصصين، نلتزم بتقديم جودة عالية وأسعار تنافسية. نحن هنا لتقديم تجربة تسوق متكاملة، سهلة، وسريعة. نهتم بتوفير أفضل الحلول والخدمات لعملائنا،
          ونعمل جاهدين على تطوير خدماتنا لتلبية احتياجاتكم المتغيرة
        </Typography>
        <Link href="https://www.google.com/maps/place/German+Auto+Center/@30.0787006,31.3831615,23143m/data=!3m1!1e3!4m6!3m5!1s0x145817005f68ef85:0x2ac9803dc10c887d!8m2!3d30.1494923!4d31.404673!16s%2Fg%2F11wvz59zp3?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outlined"
            sx={{ m: 2, textTransform: "none" }}
            startIcon={<LocationOnIcon />}
          >
            العنوان
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
