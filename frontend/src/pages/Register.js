import React, { useState } from 'react';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // Para mensajes de error
  const [successMessage, setSuccessMessage] = useState(''); // Para mensajes de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.text(); // Obtener mensaje del backend
      if (response.ok) {
        setErrorMessage(''); // Limpiar mensaje de error
        setSuccessMessage(data); // Mostrar mensaje de éxito
      } else {
        setSuccessMessage(''); // Limpiar mensaje de éxito
        setErrorMessage(data); // Mostrar mensaje de error
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error al conectar con el servidor');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mensaje de error */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Mensaje de éxito */}
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
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
