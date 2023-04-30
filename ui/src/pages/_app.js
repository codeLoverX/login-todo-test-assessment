import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/auth';
import { useEffect } from 'react';
import { ProtectRoute } from '@/components/ProtectRoute';
import { configuredAxios } from '../../api/configuredAxios';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.axios2 = configuredAxios()
   }, [])
  return (
    <>
      <AuthProvider>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}
