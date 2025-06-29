export async function registrarUsuario(userData) {
  try {
      const response = await fetch('http://localhost:4000/api/registrarUsuario', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Usuario registrado exitosamente:', data);
          return { success: true, data };
      } else {
          const errorData = await response.json();
          console.error('Error al registrar usuario:', response.status, errorData);
          return { success: false, error: errorData, status: response.status };
      }
  } catch (error) {
      console.error('Error de conexión o inesperado:', error);
      return { success: false, error: { message: 'Error de conexión o inesperado.', details: error.message } };
  }
}