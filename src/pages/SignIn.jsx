import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Debe llenar todos los campos'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* right */}
        <div className="flex-1 order-1 md:order-2">
          <Link to="/">
            <div className="flex w-40 h-auto mx-auto overflow-hidden rounded-full">
              <img
                className="bg-cover"
                src="https://lh3.googleusercontent.com/u/1/drive-viewer/AKGpihZc_ASAh0i4gb6NaeTTWYIzRUPv72cyiP7-jgWelgWNiubSQ7iL1J48EFNkiFStHbRfUavVxZOrVRTR5ryXslp7PnOYK7YYYEk=w1919-h853-rw-v1"
                alt="Logo-neo"
              />
            </div>
          </Link>
          <p className="text-sm mt-5 mx-auto text-center px-12">
            Conoce y opina sobre lo mejor de la gastronomía local
          </p>
        </div>
        {/* left */}
        <div className="flex-1 order-2 md:order-1" onSubmit={handleSubmit}>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
          <form action="" className="flex flex-col gap-4">
            <div>
              <Label value="Tu correo electrónico" />
              <TextInput
                type="email"
                icon={HiMail}
                placeholder="tucorreo@correo.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Tu contraseña" />
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Cargando</span>
                </>
              ) : (
                'Ingresar'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>¿No tienes una cuenta?</span>
            <Link to="/sign-up" className="underline text-blue-600">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
