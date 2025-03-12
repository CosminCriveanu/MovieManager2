import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de que Axios esté instalado
import { getMovies } from '../services/api'; // Importar función para obtener películas
import Menu from '../components/Menu';

const AdminPanel = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        genre: '',
        description: '',
        release_year: '',
        image_url: '',
        youtube_video_id: '',
    });
    const [editingMovie, setEditingMovie] = useState(null); // Película seleccionada para edición
    const [message, setMessage] = useState(''); // Estado para mostrar mensajes al usuario

    // Cargar películas al iniciar el componente
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies(); // Obtener las películas desde el backend
                setMovies(data);
            } catch (error) {
                console.error('Error al obtener películas:', error);
            }
        };

        fetchMovies();
    }, []);

    // Manejar los cambios en los inputs del formulario
    const handleInputChange = (e) => {
        setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    };

    // Manejar el clic en el botón "Editar"
    const handleEdit = (movie) => {
        setEditingMovie(movie); // Establece la película seleccionada para edición
        setNewMovie({
            title: movie.title,
            genre: movie.genre,
            description: movie.description,
            release_year: movie.release_year,
            image_url: movie.image_url,
            youtube_video_id: movie.youtube_video_id,
        }); // Prellenar el formulario con los datos de la película
    };

    // Manejar el envío del formulario para añadir o editar una película
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMovie) {
                // Si estamos editando una película existente
                const response = await axios.put(`http://localhost:5001/api/movies/${editingMovie.title}`, {
                    newTitle: newMovie.title, // Enviar el nuevo título como `newTitle`
                    genre: newMovie.genre,
                    description: newMovie.description,
                    release_year: newMovie.release_year,
                    image_url: newMovie.image_url,
                    youtube_video_id: newMovie.youtube_video_id,
                });

                // Actualizar la lista de películas con la película editada
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie.title === editingMovie.title ? { ...response.data } : movie
                    )
                );

                setMessage('Película actualizada con éxito.');
                setEditingMovie(null); // Salimos del modo de edición
            } else {
                // Si estamos añadiendo una nueva película
                const response = await axios.post('http://localhost:5001/api/movies', newMovie);
                setMovies((prevMovies) => [...prevMovies, response.data]);
                setMessage('Película añadida con éxito.');
            }

            // Limpiar el formulario después de guardar
            setNewMovie({
                title: '',
                genre: '',
                description: '',
                release_year: '',
                image_url: '',
                youtube_video_id: '',
            });
        } catch (error) {
            console.error('Error al guardar la película:', error);
            setMessage('Hubo un error al guardar la película.');
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMessage(''), 3000);
    };

    // Manejar el clic en el botón "Eliminar"
    const handleDelete = async (title) => {
        try {
            // Enviar la solicitud de eliminación al backend
            await axios.delete(`http://localhost:5001/api/movies/${title}`);

            // Actualizar la lista de películas eliminando la película correspondiente
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));

            setMessage('Película eliminada con éxito.');
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            setMessage('Hubo un error al eliminar la película.');
        }

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div>
            <Menu /> {/* El menú estará visible en esta página */}
            <h1>Panel de Administración</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Mensaje visual */}
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Año</th>
                        <th>Imagen</th>
                        <th>Video</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.title}> {/* Usamos "title" como clave única */}
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.release_year}</td>
                            <td>
                                <img
                                    src={movie.image_url}
                                    alt={movie.title}
                                    style={{ width: '100px', borderRadius: '8px' }}
                                />
                            </td>
                            <td>
                                <iframe
                                    width="150"
                                    height="100"
                                    src={`https://www.youtube.com/embed/${movie.youtube_video_id}`}
                                    title={movie.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(movie)}>Editar</button>
                                <button onClick={() => handleDelete(movie.title)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>{editingMovie ? 'Editar Película' : 'Añadir Nueva Película'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={newMovie.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Género"
                    value={newMovie.genre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={newMovie.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="release_year"
                    placeholder="Año"
                    value={newMovie.release_year}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder="URL de la Imagen"
                    value={newMovie.image_url}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="youtube_video_id"
                    placeholder="ID del Video de YouTube"
                    value={newMovie.youtube_video_id}
                    onChange={handleInputChange}
                />
                <button type="submit">{editingMovie ? 'Guardar Cambios' : 'Añadir Película'}</button>
            </form>
        </div>
    );
};

export default AdminPanel;
