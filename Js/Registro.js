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
            dni : formData.get('dni'),
            nombre:  formData.get('nombre'),
            apellido: formData.get('apellidos'),
            telefono: formData.get('telefono'),
            correo: formData.get('correo'),
            contrasena: formData.get('pass')
        }
        // if (dniper === "") {
        //     alert('falta el Documento')
        // } else { num1 = 1 }
        // if (nombreper === "") {
        //     alert('falta el nombre')
        // } else { num2 = 1 }
        // if (apellper === "") {
        //     alert('faltan los apellidos')
        // } else { num3 = 1 }
        // if (telper === "") {
        //     alert('falta el telefono')
        // } else { num4 = 1 }
        // if (correoper === "") {
        //     alert('falta el email')
        // } else { num5 = 1 }
        // if (regiscontraseña === "") {
        //     alert('falta la contraseña')
        // } else { num6 = 1 }

        // if (num1 === 1 & num2 === 1 & num3 === 1 & num4 === 1 & num5 === 1 & num6 === 1) {
            if (formData.get('pass') === formData.get('repass')) {
                createperfil(dataUser);
        } else {
            alert('Las contraseñas no son iguales')
        }
    // }
    })
})