document.addEventListener('DOMContentLoaded', () => {
    // resgistro
    var repas = document.querySelector('.recontraseñar')
    var regisbtnregistro = document.querySelector('.btnrgistro')

    const $formLogin = document.querySelector('#form-login')

    repas.addEventListener('keypress', (e) => {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            enviar();
        }
    })
    regisbtnregistro.addEventListener('click', enviar = async (event) => {
        const formData = new FormData($formLogin)
        let dataUser = {
            rol: formData.get('rol'),
            dni : formData.get('dni'),
            nombre:  formData.get('nombre'),
            apellido: formData.get('apellidos'),
            telefono: formData.get('telefono'),
            correo: formData.get('correo'),
            contrasena: formData.get('pass')
        }

            if (formData.get('pass') === formData.get('repass')) {
                createperfil(dataUser);
        } else {
            alert('Las contraseñas no son iguales')
        }
    // }
    })
})