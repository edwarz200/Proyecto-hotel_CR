// Initialize Firebase
var config = {
  apiKey: "AIzaSyDs5AB066y8QaCahEwDluvk7a21tOI1gvE",
  authDomain: "sena-hotel-bd-5b493.firebaseapp.com",
  databaseURL: "https://sena-hotel-bd-5b493.firebaseio.com",
  projectId: "sena-hotel-bd-5b493",
  storageBucket: "sena-hotel-bd-5b493.appspot.com",
  messagingSenderId: "543015928238"
}
firebase.initializeApp(config)
let refUsers = firebase.database().ref('users')
let dataUser

const $app = document.querySelector('#app')
const $loader = document.querySelector('.jm_loadingpage')


// Crear perfil

function writePerfilData(data, uid) {
  // const userid = firebase.auth().currentUser.uid
  // const dni = data.dni
  firebase.database().ref('users/' + uid).set({
    ROL: data.rol,
    DNI: data.dni,
    Nombre: data.nombre,
    Apellido: data.apellido,
    Telefono: data.telefono,
    Correo: data.correo,
  }).then(function () {
    // validarlogin(data.correo, data.contrasena)
  }).catch(function (error) {
    var errorCode = error.code
    var errorMessage = error.message
    if (errorCode === 'auth/invalid-email') {
      alertify.set('notifier', 'delay', 2)
      alertify.set('notifier', 'position', 'bottom-right')
      alertify.success('Correo mal digitado')
    } else if (errorCode === 'auth/network-request-failed') {
      alertify.set('notifier', 'delay', 2)
      alertify.set('notifier', 'position', 'bottom-right')
      alertify.success('Vuelvete a conectar a la red del vecino')
    } else {
      alert(errorMessage)
    }
    var user = firebase.auth().currentUser
    user.delete().then(function () {
      alert('Usuario borrado')
    }).catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/invalid-email') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('Correo mal digitado')
      } else if (errorCode === 'auth/network-request-failed') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('Vulvete a conectar a la red del vecino')
      } else {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success(errorMessage)
      }
      alert('Error en borrado de datos en el guardado de datos ' + errorMessage)
    })
  })
}

function validaciondecorreo() {
  var user = firebase.auth().currentUser
  user.sendEmailVerification().then(function () {
    alertify.set('notifier', 'delay', 3)
    alertify.set('notifier', 'position', 'bottom-center')
    alertify.success('email enviado');
    // location.href = "../pages/IndexLoginAndre.html"
  }).catch(function (error) {
    var errorCode = error.code
    var errorMessage = error.message
    if (errorCode === 'auth/invalid-email') {
      alertify.set('notifier', 'delay', 2)
      alertify.set('notifier', 'position', 'bottom-right')
      alertify.success('Correo mal digitado')
    } else if (errorCode === 'auth/network-request-failed') {
      alertify.set('notifier', 'delay', 2)
      alertify.set('notifier', 'position', 'bottom-right')
      alertify.success('Vulvete a conectar a la red del vecino')
    } else {
      alertify.set('notifier', 'delay', 2)
      alertify.set('notifier', 'position', 'bottom-right')
      alertify.success(errorMessage)
    }
  })
}


function createperfil(data) {
  firebase.auth().createUserWithEmailAndPassword(data.correo, data.contrasena).then(function (res) {
    writePerfilData(data, res.user.uid)
    singin()
    // location.href = "../index.html"
    // validaciondecorreo()
    alertify.set('notifier', 'delay', 3)
    alertify.set('notifier', 'position', 'bottom-center')
    alertify.success('Bienvenido');
  })
    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/invalid-email') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.error('Correo mal digitado')
      } else if (errorCode === 'auth/weak-password') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.error('La contraseña digitada debe tener mas de 6 caracteres')
      } else if (errorCode === 'auth/email-already-in-use') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.error('Correo ya usado')
      } else if (errorCode === 'auth/network-request-failed') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.error('Vulvete a conectar a la red del vecino')
      } else {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.error(errorMessage)
      }
    })
}

// Login
singin()
function singin() {
  firebase.auth().onAuthStateChanged((userLog) => {
    if (userLog) {
      refUsers.once('value', function (data) {
        dataUser = data.val()
        nombre = dataUser[userLog.uid].Nombre
        apellido = dataUser[userLog.uid].Apellido
        rol = dataUser[userLog.uid].ROL
        enviarnombre(nombre, apellido,rol);
      });
      

      // todos los datos obtenidos de la base de datos

      var pagina = window.location.href
      if (pagina.indexOf('registro.html') != -1 || pagina.indexOf('index.html') != -1 || pagina.indexOf('page.html') == -1 ) {
        location.href = "pages/principal_page.html"
      }

    } else {
      // user not login

      var pagina = window.location.href

      // alertify.set('notifier', 'delay', 2)
      // alertify.set('notifier', 'position', 'bottom-right')
      // alertify.message('El usuario no esta logueado')

      if (pagina.indexOf('registro.html') != -1 || pagina.indexOf('index.html') != -1) {
        if (pagina.indexOf('registro.html') != -1) {
          alertify.set('notifier', 'delay', 5)
          alertify.set('notifier', 'position', 'bottom-center')
          alertify.message('Registrate')
        } else {
          alertify.set('notifier', 'delay', 5)
          alertify.set('notifier', 'position', 'bottom-center')
          alertify.message('Inicia sesion')
        }
      } else if(pagina.indexOf('page.html') != -1){
          location.href = "../index.html"
        }
    }
  })
}

function validarlogin(correo, password) {
  firebase.auth().signInWithEmailAndPassword(correo, password).then(function () {
    location.href = "pages/principal_page.html"
    singin();
  })
    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/invalid-email') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('Correo mal digitado')
      } else if (errorCode === 'auth/weak-password') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('La contraseña digitada debe tener mas de 6 caracteres')
      } else if (errorCode === 'auth/email-already-in-use') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('Correo ya usado')
      } else if (errorCode === 'auth/network-request-failed') {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success('Vulvete a conectar a la red del vecino')
      } else {
        alertify.set('notifier', 'delay', 2)
        alertify.set('notifier', 'position', 'bottom-right')
        alertify.success(errorMessage)
      }
    })
}

function cerrarsesion() {
  swal("Estas seguro?", {
    buttons: {
      cancel: "Cancelar",
      catch: {
        text: "Continuar",
        value: "catch",
      },
    },
  })
    .then((value) => {
      switch (value) {
        case "catch":
          firebase.auth().signOut().then(function () {
            swal({
              text: "Cerrando Sesión",
              icon: "success",
              button: false,
              timer: 3000,
            });

          }).catch(function (error) {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/network-request-failed') {
              alertify.set('notifier', 'delay', 2)
              alertify.set('notifier', 'position', 'bottom-right')
              alertify.success('Vulvete a conectar a la red del vecino')
            } else {
              alertify.set('notifier', 'delay', 2)
              alertify.set('notifier', 'position', 'bottom-right')
              alertify.success(errorMessage)
            }
          })
          break;

        default:
          alertify.set('notifier', 'delay', 3)
          alertify.set('notifier', 'position', 'bottom-center')
          alertify.success('Cancelado');
          break;
      }
    });

}
