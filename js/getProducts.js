export async function getProductos() {
  try {
    const res = await fetch('http://localhost:4000/api/obtenerProductos', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return null;
  }
}

export async function getCategorias() {
  try {
    const token = localStorage.getItem('token');
    console.log('Usando token:', token);

    const res = await fetch('http://localhost:4000/api/obtenerCategorias', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Error al obtener categorías');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return null;
  }
}
