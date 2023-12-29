import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Loader from './Loader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';
import useCustomApi from './CustomApi';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';


const emailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// Schema de validation pour la connexion
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .matches(emailFormatRegex, 'Format de l\'email invalide')
    .required('Champs requis'),
  password: Yup.string().required('Champs requis'),
});

const SignInForm = () => {
  const router = useRouter();

  const API = useCustomApi();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await API.post('/login', {
        user: {
          email: values.email,
          password: values.password
        }
      });
      toast.success('Connexion réussie.');
      await handleResponse(response);
      router.push('/');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
      } else {
        toast.error('Une erreur s’est produite. Veuillez réessayer.');
      }
    }
    setSubmitting(false);
  };

  const { updateAuth } = useAuth();

  const handleResponse =  async(response) => {
    const authHeader = response.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7); // Remove 'Bearer ' from the start
    }

    // const token = response.headers.authorization;
    const id = response.data.status.data.user.id;
    const email = response.data.status.data.user.email;
    const username = response.data.status.data.user.username;
    const picture_number = response.data.status.data.user.picture_number;

    updateAuth({
      accessToken: token,
      userId: id,
      userEmail: email,
      username: username,
      userPicture: picture_number
    })
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <div className='flex justify-center pb-5 gap-3 mb-3 mt-2'>
            <LoginGoogle/>
            <LoginFacebook/>
          </div>
          <Form className="signup-form flex justify-center flex-col gap-2">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error-message" />

            <Field type="password" name="password" placeholder="Mot de passe" />
            <ErrorMessage name="password" component="div" className="error-message" />

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Se connecter
            </button>
          </Form>
          <div className='flex justify-center mt-1'>
            <Link className='bold-text' href='/signup'>
              Pas de compte ? Créer un compte
            </Link>
          </div>
          <div className='flex justify-center mt-2'>
            <Loader show={isSubmitting} />
          </div>
        </>
      )}
    </Formik>
  );
};

export default SignInForm;
