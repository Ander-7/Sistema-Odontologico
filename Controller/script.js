document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Credenciales especificadas
    const validEmail = 'admin@example.com';
    const validPassword = '123';

  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar credenciales
    if (email === validEmail && password === validPassword) {
        window.location.href = '/View/Crud/crud.html'; 
    } else {
        // Mostrar alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo electrónico o contraseña incorrectos.',
            confirmButtonText: 'Aceptar'
        });
    }
});
