# 🧶 Lana & Lino - Tienda Online de Indumentaria

Este proyecto fue desarrollado como parte del **Trabajo Práctico 1** para la carrera, con el objetivo de crear una página web que permita la venta de productos de la tienda de indumentaria *Lana & Lino*. Se trabajó respetando los requerimientos técnicos y funcionales establecidos por la cátedra, utilizando únicamente tecnologías web puras.

## 🚀 Objetivo del Proyecto

Desarrollar una aplicación web que permita:
- Visualizar un catálogo de productos.
- Gestionar productos desde un panel de administrador.
- Permitir a los usuarios registrados comprar productos, agregarlos a favoritos y modificar su perfil.
- Aplicar filtros de búsqueda y navegación.
- Alternar entre **modo claro** y **modo oscuro**.
- Interactuar con un backend proporcionado por la cátedra (sin modificarlo).

---

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (vanilla/puro)
- Backend proporcionado por la cátedra (sin frameworks, no modificable)

---

## ✅ Funcionalidades Principales

### 🧑‍💻 Usuarios
- Registro e inicio de sesión con validación.
- Visualización y edición de datos personales.
- Acceso a funciones según tipo de usuario: visitante, usuario logueado, administrador.

### 🛒 Catálogo de Productos
- Visualización general y filtrado por categoría, género, color y nombre.
- Visualización individual de productos con talles, stock y cuotas.
- Agregar productos al carrito (si hay stock).
- Visualización de cuotas: 1, 3, 6, 9 o 12.

### ❤️ Favoritos
- Agregar/quitar productos a favoritos.
- Vista exclusiva con acceso rápido a productos favoritos.

### 🛍️ Carrito de Compras
- Mostrar productos agregados, total y opción de eliminar.
- Redirección a la pantalla de pago.

### 💳 Pago
- Selección de método (transferencia, débito, crédito).
- Validación de campos según método.
- Simulación de pago exitoso (sin transacciones reales).

### 🧑‍🔧 Administrador
- Acceso exclusivo a la gestión de productos.
- Alta, modificación y búsqueda de productos con formulario completo.

### 🌙 Modo Claro / Oscuro
- Alternancia entre ambos modos desde cualquier sección.

---

## 📋 Consideraciones Técnicas

- Toda la lógica se implementa en JavaScript puro (sin frameworks ni librerías externas).
- Comunicación con backend proporcionado por la cátedra, vía `fetch()`.
- La visibilidad de botones y funcionalidades depende del estado de autenticación del usuario.
- El sitio está diseñado para ser responsive y accesible.

---

## 🔒 Permisos por Tipo de Usuario

| Funcionalidad             | Visitante | Usuario Logueado | Administrador |
|--------------------------|-----------|------------------|---------------|
| Ver catálogo             | ✅        | ✅               | ✅            |
| Agregar al carrito       | ❌        | ✅               | ✅            |
| Agregar a favoritos      | ❌        | ✅               | ✅            |
| Editar perfil            | ❌        | ✅               | ✅            |
| Gestionar productos      | ❌        | ❌               | ✅            |

---

## 🧑‍💼 Autores

Desarrollado por el grupo de la materia como parte del Trabajo Práctico 1.

- [Santiago Viilanueva](github.com/savillanuevaGH)
- [Laila Vazquez](github.com/lavazquezGH)

---

> *Este sitio fue desarrollado únicamente con fines académicos como parte del Trabajo Práctico de la carrera.*
