import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', form); 
    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        if (response.ok) {
            setErrorMessage('');
            setSuccessMessage('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token);
            navigate('/movies');
        } else {
            setSuccessMessage('');
            setErrorMessage(data.error || 'Error desconocido');
        }
    } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error al conectar con el servidor');
        console.error('Error en el inicio de sesión:', error);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <h1>Inicio de Sesión</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
