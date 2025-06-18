const API_ROUTE = process.env.API;

async function loginUsuario(user, pass) {
    try {
      const res = await fetch(API_ROUTE + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: user, password: pass })
      });
  
      if (!res.ok) throw new Error('Credenciales incorrectas');
  
      const data = await res.json();

      localStorage.setItem('token', data.token);
  
      console.log('Login exitoso. Token guardado:', data.token);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
}