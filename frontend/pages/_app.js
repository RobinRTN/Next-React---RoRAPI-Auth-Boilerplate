import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import { AuthProvider } from '@/components/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID

  return (
    <>
      <GoogleOAuthProvider clientId={googleId}>
        <AuthProvider>
          <Navbar />
          <Toaster />
          <Component {...pageProps} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );}
