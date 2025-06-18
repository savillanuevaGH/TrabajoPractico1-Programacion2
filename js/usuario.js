document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que la página se recargue


    const data = {
        nombre: document.getElementById('register-user-name').value.trim(),
        apellido: document.getElementById('register-user-surname').value.trim(),
        direccion: document.getElementById('register-user-direction').value.trim(),
        telefono: document.getElementById('register-user-phonenumber').value.trim(),
        email: document.getElementById('register-user-email').value.trim(),
        password: document.getElementById('register-user-password').value, // No trim para contraseñas
        rol: "logueado" // Rol predeterminado para nuevos usuarios
    };

    // --- Validación básica del lado del cliente ---
    let errors = [];

    if (!data.nombre) errors.push("El nombre es obligatorio.");
    if (!data.apellido) errors.push("El apellido es obligatorio.");
    if (!data.email) {
        errors.push("El email es obligatorio.");
    } else if (!/\S+@\S+\.\S+/.test(data.email)) { // Validar formato de email
        errors.push("El formato del email no es válido.");
    }
    if (!data.password) {
        errors.push("La contraseña es obligatoria.");
    } else if (data.password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres.");
    }
    // Puedes añadir más validaciones aquí (ej. teléfono, dirección)

    if (errors.length > 0) {
        if (messageContainer) {
            messageContainer.style.color = 'red';
            messageContainer.innerHTML = errors.join('<br>'); // Muestra todos los errores
        }
        // Re-habilitar el botón y restaurar su texto si hay errores de validación
        if (registerButton) {
            registerButton.disabled = false;
            registerButton.textContent = 'Registrar';
        }
        return; 
    }

    try {
        const response = await fetch('http://localhost:4000/api/registrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json(); // Siempre intenta parsear la respuesta como JSON

        if (response.ok) { // Si la respuesta HTTP es 2xx (éxito)
            if (messageContainer) {
                messageContainer.style.color = 'green';
                messageContainer.textContent = '¡Usuario registrado con éxito! Redireccionando...';
            }
            // Opcional: Limpiar el formulario después del éxito
            this.reset();
            // Opcional: Redirigir al usuario o mostrar un mensaje de éxito prolongado
            setTimeout(() => {
                window.location.href = 'login.html'; // Ejemplo de redirección
            }, 2000); // Redirige después de 2 segundos
        } else {
            // Si la respuesta HTTP no es 2xx (hay un error)
            if (messageContainer) {
                messageContainer.style.color = 'red';
                // Muestra el mensaje del backend si existe, de lo contrario, un mensaje genérico
                messageContainer.textContent = result.mensaje || 'Error desconocido al registrar usuario.';
            }
        }
    } catch (error) {
        // Este bloque maneja errores de red o del lado del cliente que impiden la comunicación
        if (messageContainer) {
            messageContainer.style.color = 'red';
            messageContainer.textContent = 'No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.';
        }
        console.error('Error de conexión:', error);
    } finally {
        // Este bloque se ejecuta siempre, haya éxito o error
        if (registerButton && !response.ok) { // Solo re-habilitar si no hubo éxito para redireccionar
            registerButton.disabled = false;
            registerButton.textContent = 'Registrar';
        }
    }
});