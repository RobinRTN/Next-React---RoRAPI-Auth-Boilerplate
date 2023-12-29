import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Loader from './Loader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCustomApi from './CustomApi';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';

const emailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// Schema de validation
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Adresse email invalide').matches(emailFormatRegex, 'Format de l\'email invalide').required('Champs requis'),
  password: Yup.string().required('Champs requis').min(6, 'Le mot de passe doit comporter au moins 6 caractères.'),
  confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
     .required('Champs requis')
});

const SignUpForm = () => {
  const router = useRouter();
  const API = useCustomApi();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await API.post('/signup', {
        user: {
          email: values.email,
          password: values.password
        }
      });
      router.push('/signin');
      toast.success('Compte créé avec succès ! Veuillez vérifier votre e-mail pour confirmer.');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessages) => {
          errorMessages.forEach((message) => toast.error(message));
        });
      } else {
        toast.error('Une erreur s’est produite. Veuillez réessayer.');
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={SignUpSchema}
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

            <Field type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />

            <button type="submit" disabled={isSubmitting} className="submit-button">
              S'inscrire
            </button>
          </Form>
          <div className='flex justify-center mt-2'>
            <Link className='bold-text' href='/signin'>
              Déja un compte ? Se connecter
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

export default SignUpForm;
