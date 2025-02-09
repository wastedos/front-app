import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";


export default function Aboutus(){

    return(
        <Box
            sx={{display:{xs:'block', lg:'flex'}, justifyContent:'center', my:10}}
        >
            <Box sx={{width:{xs:'100%', md:'50%',}, maxHeight:{lg:'25rem', xl:'30rem'}, }}>
                <Box
                component="img"
                src="/image/home/maps.avif"
                sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                }}
                alt="About us image"
                />
            </Box>
            <Box sx={{width:{xs:'100%', lg:'50%'} }}>
                <Typography variant="h4" sx={{m:"10px",}}>
                    معلومات عنا
                </Typography>
                <Typography variant="h6" sx={{m:"10px",}}>
                    مرحبًا بك في موقعنا، وجهتك الأولى للحصول على أفضل الخدمات وأحدث المنتجات في مجال السيارات. نحن هنا لنجعل تجربتك مميزة وسهلة،
                     ونسعى دائمًا لتلبية احتياجاتك بأفضل الطرق الممكنة. نطمح لأن نكون الخيار الأول لعملائنا عندما يتعلق الأمر بخدمات السيارات. من خلال فريق من المتخصصين، نلتزم بتقديم جودة عالية وأسعار تنافسية. نحن هنا لتقديم تجربة تسوق متكاملة، سهلة، وسريعة. نهتم بتوفير أفضل الحلول والخدمات لعملائنا،
                    ونعمل جاهدين على تطوير خدماتنا لتلبية احتياجاتكم المتغيرة
                </Typography>
                <Link href="https://www.google.com/maps/place/German+Auto+Center/@30.0787006,31.3831615,23143m/data=!3m1!1e3!4m6!3m5!1s0x145817005f68ef85:0x2ac9803dc10c887d!8m2!3d30.1494923!4d31.404673!16s%2Fg%2F11wvz59zp3?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <Button
                    variant="outlined" 
                    sx={{m:2, textTransform: "none"}} 
                    startIcon={<LocationOnIcon />}
                >
                    العنوان
                </Button>
                </Link>
            </Box>
        </Box>
    )
}