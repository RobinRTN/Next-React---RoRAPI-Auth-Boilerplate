import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

const LoginGoogle = () => {

  const { updateAuth } = useAuth();
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const handleGoogleSuccess = async (response) => {
    try {
      console.log("Login Success");
      const googleToken = response.credential; // Get the token from Google response

      const backendResponse = await axios.post(`${baseURL}/social_auth_google/callback`, {
        credential: googleToken
      });
      toast.success('Connexion réussie.');
      await handleResponse(backendResponse);
      router.push('/');
      // console.log(backendResponse.data);
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Connexion Google a échouée.');
    }
  };

  const handleGoogleFailure = (response) => {
    toast.error('Google sign-in was unsuccessful. Please try again.');
  };

  const handleResponse =  async(response) => {


    // console.log(response);
    const token = response.data.data.token;
    const id = response.data.data.user.id;
    const email = response.data.data.user.email;
    const username = response.data.data.user.username;
    const picture_number = response.data.data.user.picture_number;
    updateAuth({
      accessToken: token,
      userId: id,
      userEmail: email,
      username: username,
      userPicture: picture_number
    })
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleFailure}
      type="icon"
    />
  )
}

export default LoginGoogle;
