import { registrarUsuario } from './registarUsuario.js';
import { loginUsuario } from './logIn.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-to-logIn');
    const btnRegister = document.getElementById('btn-to-register');
    const btnCarrito = document.getElementById('cart');
    const btnFavoritos = document.getElementById('btn-favorites');
    const btnGestionar = document.getElementById('btn-gestionar-productos');
    const btnLogout = document.getElementById('btn-logout');
    const username = document.getElementById('username');

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