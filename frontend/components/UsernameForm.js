import { useEffect, useState, useCallback } from 'react';
import debounce from 'debounce';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import PictureSelect from './PicureSelect';

export default function UsernameForm() {

  const { authState, updateUsername } = useAuth();
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || !selectedPicture) return;

    const picture_number = selectedPicture.split('_')[1];

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
      }
      await axios.patch(`${baseUrl}/users/update_username`, {
        username: formValue,
        picture_number: picture_number
      }, config);
      updateUsername(formValue);
      toast.success("Nom d'utilisateur et photo de profil confirmés");
    } catch (error) {
      console.error('Error updating username', error);
      toast.error('Erreur, veuillez réessayer');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (selectionId) => {
    setSelectedPicture(selectionId);
  }

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }

  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const config = {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          },
        }
        try {
          const response = await axios.get(`${baseUrl}/users/check_username?username=${username}`, config);
          setIsValid(response.data.available);
        } catch (error) {
          console.error('Error checking username', error);
        } finally {
          setLoading(false);
        }
      }
    }, 500),
    []
  );

  return (
    <div className='flex justify-center'>
      <section className='flex flex-col justify-center align-center flex-1 max-w-custom mt-2'>
        <h2 className='mb-3 heavy text-center'>Choisis un nom d'utilisateur</h2>
        <form onSubmit={onSubmit} className='signup-form flex justify-center flex-col gap-2'>
          <div className='relative'>
            <input name="username" placeholder="Nom d'utilisateur" value={formValue} onChange={onChange} />
            { loading && (<div className='absolute top-1 right-1 bottom-1'>
                <div className="loader-small"></div>
              </div>
            )}
          </div>
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <h2 className='mb-3 heavy text-center'>Choisis une photo de profil</h2>
          <div className="picture-form flex flex-wrap justify-center gap-4 mb-4">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div key ={ `key_${num}`}
                  className={`picture-element ${selectedPicture === `picture_${num}` ? 'selected' : ''}`}
                  onClick={() => handleClick(`picture_${num}`)}
                >
                  <img
                  width={70}
                  height={70}
                  className='rounded-border'
                  alt={`profile_${num}`}
                  src={`profile_${num}.png`}/>
                </div>
              ))
            }
          </div>
          <button type="submit" className="submit-button" disabled={!isValid || !selectedPicture}>
            Valider
          </button>
        </form>
      </section>
    </div>
  )
}

function UsernameMessage({ username, isValid }) {

  if (isValid) {
    return <p className="error-message text-center">{username} est disponible !</p>;
  } else if (username && !isValid) {
    return <p className="error-message text-center">Ce nom est déjà pris ou invalide !</p>;
  } else {
    return <p></p>;
  }
}
