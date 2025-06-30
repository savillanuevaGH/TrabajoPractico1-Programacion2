export async function loginUsuario(email, pass) {
  try {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pass })
    });

    if (!res.ok) throw new Error('Credenciales incorrectas');

    const data = await res.json();

    // Extraer datos del payload y guardar
    const usuario = data.payload[0];
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('rol', usuario.rol);
    localStorage.setItem('usuarioNombre', usuario.nombre);

    console.log('Login exitoso. Token guardado:', data.jwt);
    return { success: true };
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    return { success: false, error: error.message };
  }
}
