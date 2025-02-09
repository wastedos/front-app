import '@/public/style/globals.css';
import Theme from "@/src/app/theme/theme";

import { Box } from '@mui/material';
import Header from '@/src/app/components/dashboard/header';
import CacheProviderComponent from '../theme/cacheprovidercomponent';

export default function RootLayout({ children }) {
  return (
    <html dir='rtl'>
      <head>
        <link rel="icon" href="/image/logo/favicon.ico" />
      </head>
      <body>
        <Theme>
          <CacheProviderComponent>
          <Header />
          <Box component="div" sx={{ ml: { xs: 0, md: 30 }, mt: { xs: 7, md: 8 } }}>
            {children}
          </Box>
          </CacheProviderComponent>
        </Theme>
      </body>
    </html>
  );
}
