import localFont from 'next/font/local';
import { AuthProvider } from '../lib/useAuth';
import { UserProvider } from '../lib/UserContext';
import { ThemeProvider } from '../lib/ThemeContext';

import '../styles/globals.css';
const helvetica = localFont({
  src: [
    {
      path: '../fonts/HelveticaNowDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNowDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNowDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNowDisplay-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <div className={`${helvetica.variable} font-sans h-full flex`}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
