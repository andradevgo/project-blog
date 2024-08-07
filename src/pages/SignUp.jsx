import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Debe llenar todos los campos');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label value="Tu nombre de usuario" />
              <TextInput
                type="text"
                placeholder="Nombre de usuario"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="contraseña"
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
                'Registrarse'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>¿Tienes una cuenta?</span>
            <Link to="/sign-in" className="underline text-blue-600">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
