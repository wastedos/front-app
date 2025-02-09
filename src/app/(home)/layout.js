import '@/public/style/globals.css';
import Theme from "../theme/theme";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CacheProviderComponent from '../theme/cacheprovidercomponent';

export default async function RootLayout({ children }) {
  return (
    <html dir='rtl'>
      <head>
        <link rel="icon" href="/image/logo/favicon.ico" />
      </head>
      <body>
        <Theme>
          <CacheProviderComponent>
            <Header />
              {children}
            <Footer />
          </CacheProviderComponent>
        </Theme>
      </body>
    </html>
  );
}
