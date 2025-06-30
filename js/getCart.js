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

//Pagos
document.addEventListener('DOMContentLoaded', async () => {
  const idUsuario = localStorage.getItem('id_usuario');
  const token = localStorage.getItem('token');
  const productosLista = document.getElementById('productos-lista');
  const totalElement = document.getElementById('total');
  const tipoPago = document.getElementById('tipo-pago');
  const datosTarjeta = document.getElementById('datos-tarjeta');
  const numeroTarjeta = document.getElementById('numero-tarjeta');
  const fechaVencimiento = document.getElementById('fecha-vencimiento');
  const nombreTarjeta = document.getElementById('nombre-tarjeta');
  const btnPagar = document.getElementById('btn-pagar');
  const mensajePago = document.getElementById('mensaje-pago');

  let total = 0;

  if (!idUsuario || !token) {
    productosLista.innerHTML = '<p>Debes iniciar sesión para ver tu carrito.</p>';
    return;
  }

  try {
    const res = await fetch(`http://localhost:4000/api/obtenerProductosCarrito/${idUsuario}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (data.codigo !== 200) throw new Error(data.mensaje);

    const productos = data.payload || [];

    if (productos.length === 0) {
      productosLista.innerHTML = '<p>No hay productos en el carrito.</p>';
      return;
    }

    productos.forEach(producto => {
      total += producto.precio;
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${producto.producto}</strong> - $${producto.precio}</p>
        <p>Color: ${producto.color}, Talle: ${producto.talle}</p>
        <hr>
      `;
      productosLista.appendChild(div);
    });

    totalElement.textContent = `Total: $${total}`;

  } catch (err) {
    console.error('Error al obtener productos del carrito:', err);
    productosLista.innerHTML = '<p>Error al cargar los productos.</p>';
  }

  tipoPago.addEventListener('change', validarFormulario);
  [numeroTarjeta, fechaVencimiento, nombreTarjeta].forEach(el => el.addEventListener('input', validarFormulario));

  function validarFormulario() {
    const metodo = tipoPago.value;
    const requiereTarjeta = metodo === 'debito' || metodo === 'credito';

    datosTarjeta.style.display = requiereTarjeta ? 'block' : 'none';

    const camposLlenos = requiereTarjeta
      ? numeroTarjeta.value && fechaVencimiento.value && nombreTarjeta.value
      : metodo !== '';

    btnPagar.disabled = !camposLlenos;
  }

  btnPagar.addEventListener('click', () => {
    mensajePago.textContent = 'Pago aprobado con éxito ✅';
  });
});