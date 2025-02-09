import '@/public/style/globals.css';
import Theme from "../theme/theme";
import CacheProviderComponent from '../theme/cacheprovidercomponent';


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html dir='rtl'>
       <body>
      <Theme>
      <CacheProviderComponent> 
        <div>
        {children}
        </div>
          
      </CacheProviderComponent>
      </Theme>
      </body>
    </html>
  )
}
