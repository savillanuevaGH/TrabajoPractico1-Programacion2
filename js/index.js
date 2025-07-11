import { registrarUsuario } from './registarUsuario.js';
import { loginUsuario } from './logIn.js';
import { getProductos, getCategorias } from './getProducts.js'

document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-to-logIn');
    const btnRegister = document.getElementById('btn-to-register');
    const btnCarrito = document.getElementById('cart');
    const btnFavoritos = document.getElementById('btn-favorites');
    const btnGestionar = document.getElementById('btn-gestionar-productos');
    const btnLogout = document.getElementById('btn-logout');
    const username = document.getElementById('username');

    async function cargarCategorias() {
        const categoriasRespuesta = await getCategorias();
        const select = document.getElementById('categories-filter');
      
        if (!categoriasRespuesta?.payload || !select) return;
      
        categoriasRespuesta.payload.forEach(cat => {
          const option = document.createElement('option');
          option.value = cat.id_categoria;
          option.textContent = cat.nombre;
          select.appendChild(option);
        });
      }      
      

      async function mostrarProductos() {
        const productosRespuesta = await getProductos();
        const categoriasRespuesta = await getCategorias();
        const productContainer = document.getElementById('products');

        const generoSeleccionado = document.getElementById('gender-filter').value;
        const categoriaSeleccionada = document.getElementById('categories-filter').value;

        if (!productosRespuesta?.payload || !categoriasRespuesta?.payload || !productContainer) return;

        const productos = productosRespuesta.payload;
        const categorias = categoriasRespuesta.payload;
        productContainer.innerHTML = '';

        const productosFiltrados = productos.filter(prod => {
            const coincideGenero = generoSeleccionado === 'all' || prod.genero === String(generoSeleccionado);
            const coincideCategoria = categoriaSeleccionada === 'all' || String(prod.idCategoria || prod.id) === String(categoriaSeleccionada);
            return coincideGenero && coincideCategoria;
          });

        if (productosFiltrados.length === 0) {
            productContainer.innerHTML = '<p>No hay productos en esta categoría.</p>';
            return;
        }
      
        productosFiltrados.forEach(producto => {
            const categoria = categorias.find(cat => 
                String(cat.id_categoria || cat.id) === String(producto.idCategoria)
            );                           
            const productCard = document.createElement('article');
            productCard.classList.add('product-card');
      
          productCard.innerHTML = `
          <img src="https://placehold.co/300x200/png?text=${producto.producto}" alt="${producto.producto}" class="product-img" />
            <div class="product-details">
                <h2>${producto.producto}</h2>
                <p class="description">${producto.descripcion}</p>
                <p><strong>Categoría:</strong> ${categoria?.nombre || 'Sin categoría'}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>

                <div class="cuotas">
            <label for="cuotas">Cuotas:</label>
                <select id="cuotas">
                    <option value="1">1 cuota</option>
                    <option value="3">3 cuotas</option>
                    <option value="6">6 cuotas</option>
                    <option value="9">9 cuotas</option>
                    <option value="12">12 cuotas</option>
                </select>
            <p id="precio-cuota">${producto.precio || 'Sin asignar'}</p>
        </div>
            </div>
            <button class="add-to" onclick="agregarAFavoritos(${producto.idProducto})">❤️ Agregar a Favoritos</button>
            <button class="add-to" onclick="agregarAlCarrito(${producto.idProducto})">Agregar al carrito</button>
    `;
      
          productContainer.appendChild(productCard);
        });
      }
    
    const genderSelect = document.getElementById('gender-filter');
    genderSelect.addEventListener('change', async (e) => {
        await mostrarProductos();
    }); 

    const categoriesSelect = document.getElementById('categories-filter');
    categoriesSelect.addEventListener('change', async (e) => {
        await mostrarProductos();
    });

    document.getElementById('btn-favorites').addEventListener('click', () => {
      mostrarFavoritosEnDialog();
      document.getElementById('favorites').showModal();
    });

    document.getElementById('cerrar-favoritos').addEventListener('click', () => {
      document.getElementById('favorites').close();
    });


    async function agregarAFavoritos(idProducto) {
      const idUsuario = localStorage.getItem('id_usuario');
      const token = localStorage.getItem('token');
    
      if (!idUsuario || !token) {
        alert('Debes iniciar sesión para agregar favoritos.');
        return;
      }
    
      try {
        const res = await fetch('http://localhost:4000/api/agregarFavorito', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_producto: Number(idProducto),
            id_usuario: Number(idUsuario)
          })
        });
    
        const data = await res.json();
        if (data.codigo === 200) {
          alert('Producto agregado a favoritos.');
        } else {
          console.error('No se pudo agregar favorito:', data.mensaje);
        }
      } catch (error) {
        console.error('Error al agregar a favoritos:', error);
      }
    }    
        
    async function agregarAlCarrito(idProducto) {
        const idUsuario = localStorage.getItem('id_usuario');
        const token = localStorage.getItem('token');
      
        if (!idUsuario || !token) {
          alert('Debes iniciar sesión para agregar productos al carrito.');
          return;
        }
      
        try {
          const res = await fetch('http://localhost:4000/api/agregarACarrito', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_inventario: Number(idProducto),
              id_usuario: Number(idUsuario)
            })
          });
      
          const data = await res.json();
      
          if (data.codigo === 200) {
            alert('Producto agregado al carrito con éxito ✅');
          } else {
            console.error('Error:', data.mensaje);
            alert('No se pudo agregar al carrito.');
          }
      
        } catch (error) {
          console.error('Error al agregar al carrito:', error);
          alert('Ocurrió un error al agregar al carrito.');
        }
      }

      window.agregarAFavoritos = agregarAFavoritos;
      window.agregarAlCarrito = agregarAlCarrito;

      async function obtenerFavoritos() {
        const idUsuario = localStorage.getItem('id_usuario');
        const token = localStorage.getItem('token');
      
        if (!idUsuario || !token) return [];
      
        try {
          const res = await fetch(`http://localhost:4000/api/obtenerFavoritos/${idUsuario}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          const data = await res.json();
          return data.codigo === 200 ? data.payload : [];
      
        } catch (error) {
          console.error('Error al obtener favoritos:', error);
          return [];
        }
      }

      async function mostrarFavoritosEnDialog() {
        const favoritos = await obtenerFavoritos();
        const productosData = await getProductos(); // Función que ya tenés
        const productos = productosData?.payload || [];
      
        const favoritosContainer = document.getElementById('favoritos-container');
        favoritosContainer.innerHTML = '';
      
        const productosFavoritos = productos.filter(p => 
          favoritos.some(fav => fav.id_producto === p.id_producto)
        );
      
        if (productosFavoritos.length === 0) {
          favoritosContainer.innerHTML = '<p>No tienes productos en favoritos.</p>';
          return;
        }
      
        productosFavoritos.forEach(producto => {
          const item = document.createElement('div');
          item.classList.add('favorito-item');
      
          item.innerHTML = `
            <img src="https://placehold.co/150x100?text=${producto.producto}" alt="${producto.producto}">
            <div>
              <h4>${producto.producto}</h4>
              <p>$${producto.precio}</p>
              <button onclick="eliminarFavorito(${producto.idProducto})">Eliminar</button>
            </div>
          `;
      
          favoritosContainer.appendChild(item);
        });
      }

      window.eliminarFavorito = eliminarFavorito;

      async function eliminarFavorito(idProducto) {
        const idUsuario = localStorage.getItem('id_usuario');
        const token = localStorage.getItem('token');
      
        try {
          const res = await fetch('http://localhost:4000/api/eliminarFavorito', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_usuario: idUsuario,
              id_producto: idProducto
            })
          });
      
          const data = await res.json();
          console.log('Respuesta del backend:', data); // DEBUG
      
          if (data.codigo === 200) {
            mostrarFavoritosEnDialog(); // Refrescar
          } else {
            console.error('Error eliminando producto de favoritos:', data.mensaje);
          }
      
        } catch (error) {
          console.error('Error al eliminar favorito:', error);
        }
      }      
      

    // Mostrar u ocultar botones según login y rol
    function actualizarUI() {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');
        const nombre = localStorage.getItem('usuarioNombre');

        const logueado = !!token;

        btnLogin.style.display = logueado ? 'none' : 'inline-block';
        btnRegister.style.display = logueado ? 'none' : 'inline-block';
        btnCarrito.style.display = logueado ? 'inline-block' : 'none';
        btnFavoritos.style.display = logueado ? 'inline-block' : 'none';
        btnLogout.style.display = logueado ? 'inline-block' : 'none';
        username.textContent = localStorage.getItem('usuarioNombre') || 'Usuario';

        if (logueado) {
            username.textContent = nombre || 'Usuario';
        }

        if (logueado && rol === 'admin') {
            btnGestionar.style.display = 'inline-block';
        } else {
            btnGestionar.style.display = 'none';
        }

        cargarCategorias();
        mostrarProductos();
    }

    // Logout
    btnLogout?.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    actualizarUI();

    //Registrar usuarios

    //Formulario de registro
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');
    const registerDialog = document.getElementById('register');

    if (registerForm && messageContainer && registerDialog) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            messageContainer.textContent = '';
            messageContainer.className = '';

            //Datos del formulario
            const userData = {
                nombre: document.getElementById('register-user-name').value,
                apellido: document.getElementById('register-user-surname').value,
                direccion: document.getElementById('register-user-direction').value,
                email: document.getElementById('register-user-email').value,
                telefono: document.getElementById('register-user-phonenumber').value,
                rol: "usuario",
                password: document.getElementById('register-user-password').value
            };

            if (!userData.nombre || !userData.apellido || !userData.email || !userData.password) {
                showMessage('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }

            if (!isValidEmail(userData.email)) {
                showMessage('Por favor, ingresa un formato de correo electrónico válido.', 'error');
                return;
            }

            const result = await registrarUsuario(userData);

            if (result.success) {
                showMessage('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
                setTimeout(() => {
                    registerDialog.close();
                    
                    document.getElementById('log-in').showModal();
                }, 2000);
            } else {
                let errorMessage = 'Hubo un error al registrar el usuario.';
                if (result.error && result.error.message) {
                    errorMessage = result.error.message;
                } else if (result.status === 409) {
                    errorMessage = 'El correo electrónico ya está registrado.';
                } else if (result.status === 400 && result.error && result.error.details) {
                    errorMessage = `Error de validación: ${result.error.details.join(', ')}`;
                }
                showMessage(errorMessage, 'error');
            }
        });
    }

    // Función para mostrar mensajes
    function showMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = `message-${type}`;
    }

    // Función auxiliar para validación de email (básica)
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    //LogIn

    //Formulario de LogIn
    const loginForm = document.getElementById('login-form');
    const loginDialog = document.getElementById('log-in');
  
    if (loginForm && loginDialog) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        //Datos del formulario
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
  
        if (!email || !password) {
          alert('Por favor, completá todos los campos.');
          return;
        }
  
        const result = await loginUsuario(email, password);
  
        if (result.success) {
            loginDialog.close();
            location.reload();
            actualizarUI();
        } else {
          alert('Error: ' + result.error);
        }
      });
    }
});