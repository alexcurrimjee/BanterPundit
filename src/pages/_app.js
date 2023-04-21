import { AuthProvider } from '../lib/useAuth';
import { UserProvider } from '../lib/UserContext'
import { ThemeProvider } from '../lib/ThemeContext'

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
