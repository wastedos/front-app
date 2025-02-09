import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { Box } from '@mui/material';
import AvatarMenu from './component/avatarmenu';
import Sidebar from './component/sidebar';
import Themebtn from './component/themebtn';
import Searchbar from './component/searchbar';
import Langbtn from './component/langbtn';
import Searchbtn from './component/searchbtn';


export default function Header(){
  return(
    <AppBar position="fixed">
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
          <Box sx={{display:'flex'}}>
            <Sidebar/>
            <Link href='/' style={{color:'#fff', margin:'0 20px'}}>
              <Box sx={{ height: '3rem', width: 'auto', mt:1 }}>
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
            </Link>
          </Box>
          <Searchbar/>
          <Box sx={{display:'flex'}}>
            
            <Searchbtn/>
            <Themebtn/>
            <AvatarMenu/>
          </Box>
        </Toolbar>
    </AppBar>   
  );
}