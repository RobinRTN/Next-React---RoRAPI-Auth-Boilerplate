import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const useCustomApi = () => {
  const { authState, clearAuth } = useAuth();
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const API = axios.create({
    baseURL: baseURL,
    timeout: 4000,
    headers: {
      'Content-Type': 'Application/json',
    }
  });

  const getToken = () => {
    return authState.accessToken;
  };

  API.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  API.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
      clearAuth();
      router.push('/signin');
      toast.success('Session expirée, veuillez vous reconnecter');
    }
    return Promise.reject(error);
  });

  return API;
};

export default useCustomApi;
