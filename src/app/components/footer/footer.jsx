'use client'
import { Box, Typography, IconButton, Divider, Button,} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';

import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import Terms from './terms';
import Privacy from './privacy';
import Cookies from './cookies';

//Footer Components
export default function Footer() {
  
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        borderTop: 'solid 1px',
      }}
    >
        <Grid container sx={{px:{xs:3, md:10},}}>
          <Grid size={{xs:12, sm:6, md:5}}>
            <Box >
              <Box sx={{ height: '12rem', width: 'auto', mb: 1 }}>
                <Box
                  component="img"
                  src="/image/logo/logo-gac.png"
                  sx={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:6, sm:3, md:2}}>
            <Box sx={{mt:{xs:'20px', sm:0,}, }}>
              <Typography variant="h5" gutterBottom>
                الروابط
              </Typography>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                <Box>
                  <Link
                    style={{marginTop:3, color:'inherit'}}
                    href='/'
                  > 
                    خدمات السيارت
                  </Link>
                </Box>
                <Box>
                  <Link
                    style={{marginTop:3, color:'inherit'}}
                    href='/'
                  > 
                    متاجر السيارات
                  </Link>
                </Box>
                <Box>
                  <Link
                    style={{marginTop:3, color:'inherit'}}
                    href='/'
                  > 
                    قطع الغيار
                  </Link>
                </Box>
                <Box>
                  <Link
                    style={{marginTop:3, color:'inherit', }}
                    href='/'
                  > 
                    الاحداث
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:6, sm:3, md:2}}>
            <Box sx={{mt:{xs:'20px', sm:0,}, }}>
              <Typography variant="h5" gutterBottom>
                تواصل
              </Typography>
              <Box sx={{display:"flex", flexDirection:"column"}}>
                <Box>
                  <Link
                    style={{marginTop: 3, color:'inherit'}}
                    href='https://wa.me/+201001038389'
                    target='_blank'
                  > 
                    WhatsApp
                  </Link>
                </Box>
                <Box>
                  <a
                    style={{ marginTop: 3, color: 'inherit' }}
                    href='tel:01001038389'
                  > 
                    Call
                  </a>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid container size={{xs:12, md:3}}>
            <Grid size={{xs:12, sm:6, md:12}}>
              <Typography variant="h5" gutterBottom>
                منصات التواصل
              </Typography>
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61572559378532"
                target="_blank"
                sx={{color:'inherit', }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/go_gac/"
                target="_blank"
                sx={{color:'inherit', }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.tiktok.com/@go_gac"
                target="_blank" 
                sx={{color:'inherit', }}
                aria-label="tiktok"
              >
                <AudiotrackOutlinedIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com/channel/UCWvAQOvbbdam-92mzkKufMQ"
                target="_blank"
                sx={{color:'inherit', }}
                aria-label="Youtube"
              >
                <YouTubeIcon />
              </IconButton>
            </Grid>
            <Grid size={{xs:12, sm:6, md:12}}>
              <Typography variant="h5"  gutterBottom>
                  حمل التطبيق
              </Typography>
              <Box sx={{display:{xs:'block', md:'flex'}, flexWrap:'wrap'}}>
                <Button disabled variant='outlined' color='inheirt' sx={{height:50, minWidth:180, m:1}}>
                  <Box sx={{height:'20px',width:'20px'}}>
                  <Box
                      component="img"
                      src='/image/component/googleplay.png'
                      sx={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                      }}
                    />
                  </Box>
                  <Box sx={{mx:1}}>
                    <Typography sx={{fontSize:'10px',}} align='start'>تحميل من</Typography>
                    <Typography variant="body1" >Google play</Typography>
                  </Box>
                </Button>
                <Button disabled variant='outlined' color='inheirt' sx={{height:50, minWidth:180, m:1}}>
                  <Box sx={{height:'20px',width:'20px'}}>
                  <Box
                      component="img"
                      src='/image/component/appstore.png'
                      sx={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                      }}
                    />
                  </Box>
                  <Box sx={{mx:1}}>
                    <Typography sx={{fontSize:'10px',}} align='start'>احصل علية من</Typography>
                    <Typography variant="body1" >App Store</Typography>
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{my:3, mx:1}} />

        <Grid container spacing={2} align="center">
          <Grid size={{xs:12, md:6}}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Developed by Mohamed Ashraf
            </Typography>
          </Grid>
          <Grid size={{xs:12, md:6}}>
              <Terms/>
              <Privacy/>
              <Cookies/>
          </Grid>
        </Grid>
        
    </Box>
  );
}
