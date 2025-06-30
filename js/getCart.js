document.addEventListener('DOMContentLoaded', async () => {
  mostrarCarrito();

  async function getCarrito() {
    const idUsuario = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token');
  
    if (!idUsuario || !token) {
      console.error('Usuario no logueado o token faltante.');
      return [];
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/obtenerProductosCarrito/${idUsuario}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      const data = await response.json();
  
      if (data.codigo === 200 && data.payload) {
        return data.payload; // Array de productos
      } else {
        console.error('Error al obtener el carrito:', data.mensaje);
        return [];
      }
  
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      return [];
    }
  }

  async function eliminarDelCarrito(idInventario) {
    const idUsuario = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token');
  
    if (!idUsuario || !token) return;
  
    try {
      const res = await fetch('http://localhost:4000/api/eliminarProductoCarrito', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: Number(idUsuario),
          id_inventario: idInventario
        })
      });
  
      const data = await res.json();
      if (data.codigo === 200) {
        mostrarCarrito();
      } else {
        console.error('No se pudo eliminar del carrito:', data.mensaje);
      }
  
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  }

  window.eliminarDelCarrito = eliminarDelCarrito;
  
  async function mostrarCarrito() {
    const productos = await getCarrito();
    const container = document.getElementById('carrito-items');
    const totalElement = document.getElementById('carrito-total');
  
    container.innerHTML = '';
    let total = 0;
  
    if (productos.length === 0) {
      container.innerHTML = '<p>No hay productos en el carrito.</p>';
      totalElement.innerHTML = '<strong>Total:</strong> $0';
      return;
    }
  
    productos.forEach((producto) => {
      console.log(producto);
      total += producto.precio;
  
      const item = document.createElement('div');
      item.classList.add('carrito-item');
  
      item.innerHTML = `
        <img src="https://placehold.co/300x200?text=${producto.producto}" alt="${producto.producto}" />
        <div>
          <h3>${producto.producto}</h3>
          <p>Color: ${producto.color}</p>
          <p>Talle: ${producto.talle}</p>
          <p>Precio: $${producto.precio}</p>
          <button onclick="eliminarDelCarrito(${producto.idInventario})">Eliminar</button>
        </div>
      `;
  
      container.appendChild(item);
    });
  
    totalElement.innerHTML = `<strong>Total:</strong> $${total}`;
  }
});