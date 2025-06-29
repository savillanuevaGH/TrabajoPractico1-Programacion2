import { registrarUsuario } from './registarUsuario.js';

document.addEventListener('DOMContentLoaded', () => {
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
        // Expresión regular simple para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

import { loginUsuario } from './logIn.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // evita recargar la página

      const email = document.getElementById('user-email').value;
      const password = document.getElementById('user-password').value;

      if (!email || !password) {
        alert('Por favor, completá todos los campos.');
        return;
      }

      await loginUsuario(email, password);
    });
  }
});
