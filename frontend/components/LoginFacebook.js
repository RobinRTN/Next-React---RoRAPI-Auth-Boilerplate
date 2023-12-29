import FacebookLogin from '@greatsumini/react-facebook-login';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const LoginFacebook = () => {

  const { updateAuth } = useAuth();
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const facebookId = process.env.NEXT_PUBLIC_FACEBOOK_ID;

  const handleFacebookSuccess = async (response) => {
    try {
      const FacebookToken = response.accessToken;
      console.log(response);
      console.log(FacebookToken);
      const backendResponse = await axios.post(`${baseURL}/social_auth_facebook/callback`, {
        credential: FacebookToken
      });
      toast.success('Connexion réussie.');
      await handleResponse(backendResponse);
      router.push('/');
      console.log(backendResponse.data);
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Connexion Facebook a échouée.');
    }
  };

  const handleFacebookFailure = (response) => {
    toast.error('Facebook sign-in was unsuccessful. Please try again.');
  };

  const handleResponse =  async(response) => {

    console.log(response);
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
      <FacebookLogin
        appId={facebookId}
        onSuccess={handleFacebookSuccess}
        onFail={handleFacebookFailure}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} style={{ backgroundColor: '#4267B2', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', width:'40px', height:'40px'
           }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
        )}
      />
  )
}

export default LoginFacebook;
