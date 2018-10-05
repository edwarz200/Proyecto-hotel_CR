// Initialize Firebase
var config = {
  apiKey: "AIzaSyDs5AB066y8QaCahEwDluvk7a21tOI1gvE",
  authDomain: "sena-hotel-bd-5b493.firebaseapp.com",
  databaseURL: "https://sena-hotel-bd-5b493.firebaseio.com",
  projectId: "sena-hotel-bd-5b493",
  storageBucket: "sena-hotel-bd-5b493.appspot.com",
  messagingSenderId: "543015928238"
};
firebase.initializeApp(config);
let refUsers = firebase.database().ref('users')
let dataUser 

  refUsers.once('child_added', (data) => {
      // console.log(data.val().nombre_perf)
    })

// Crear perfil

function writePerfilData(data, uid) {
  // const userid = firebase.auth().currentUser.uid;
  // const dni = data.dni
  firebase.database().ref('users/' + uid).set({
    dni: data.dni,
    nombre_perf: data.nombre,
    apellido_perf: data.apellido,
    telefono_perf: data.telefono,
    correo_perf: data.correo,
  }).then(function () {
    // validarlogin(data.correo, data.contrasena);
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/invalid-email') {
      alert('Correo mal digitado')
    } else if (errorCode === 'auth/network-request-failed') {
      alert('Vulvete a conectar a la red del vecino')
    } else {
      alert(errorMessage);
    }

    var user = firebase.auth().currentUser;

    user.delete().then(function () {
      alert('Usuario borrado')
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('Correo mal digitado')
      } else if (errorCode === 'auth/network-request-failed') {
        alert('Vulvete a conectar a la red del vecino')
      } else {
        alert(errorMessage);
      }
      alert('Error en borrado de datos en el guardado de datos ' + errorMessage);
    });
  })
}

function validaciondecorreo() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    alert('Email Enviado');
    // location.href = "../pages/IndexLoginAndre.html"
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/invalid-email') {
      alert('Correo mal digitado')
    } else if (errorCode === 'auth/network-request-failed') {
      alert('Vulvete a conectar a la red del vecino')
    } else {
      alert(errorMessage);
    }
  })
  }


function createperfil(data) {
  firebase.auth().createUserWithEmailAndPassword(data.correo, data.contrasena).then(function ( res) {
    writePerfilData(data, res.user.uid);
    singin();
    // location.href = "../index.html";
    // validaciondecorreo();
  })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('Correo mal digitado')
      } else if (errorCode === 'auth/weak-password') {
        alert('La contraseña digitada debe tener mas de 6 caracteres')
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Correo ya usado')
      } else if (errorCode === 'auth/network-request-failed') {
        alert('Vulvete a conectar a la red del vecino')
      } else {
        alert(errorMessage);
      }
    });
}

// Login
singin()
function singin(){
  let nombre
  firebase.auth().onAuthStateChanged(function (userLog) {
    refUsers.once('value', (data) => {
      dataUser = data.val();
      nombre= dataUser[userLog.uid].nombre_perf
      apellido = dataUser[userLog.uid].apellido_perf
      alert(nombre + "  "+ apellido)
    });
    

  if (userLog) {
    var db = firebase.database();
    var ref = db.ref("sena-hotel-bd-5b493");
    // ref.orderByValue("nombre_perf").on("value", function(snapshot) {
    // console.log(snapshot.key);
    // });
    var pagina = window.location.href;
    var d = "file:///D:/ADSI/profe%20camilo/Proyecto/proyecto-hotel/pages/IndexLoginAndre.html";
    var d2 = "http://127.0.0.1:5500/pages/IndexLoginAndre.html"
    var d3 = "http://127.0.0.1:5500/pages/registro.html"
    var d4 = "file:///D:/ADSI/profe%20camilo/Proyecto/Proyecto-hotel/pages/registro.html"
    if (d == pagina || d2 == pagina || d3 == pagina || d4 == pagina) {
      location.href = "../index.html";
    } else {
      for (let i = 0; i < 1; i++) {
        // alert('El usuario no esta logueado')
        num1 = 1;
      }
    }

  } else {

    var pagina = window.location.href;
    var d = "file:///D:/ADSI/profe%20camilo/Proyecto/proyecto-hotel/pages/IndexLoginAndre.html";
    var d2 = "http://127.0.0.1:5500/pages/IndexLoginAndre.html"
    var d3 = "http://127.0.0.1:5500/pages/registro.html"
    var d4 = "file:///D:/ADSI/profe%20camilo/Proyecto/proyecto-hotel/pages/registro.html"
    if (d == pagina || d2 == pagina || d3 == pagina || d4 == pagina) {
    } else {
      for (let i = 0; i < 1; i++) {
        alert('El usuario no esta logueado')
        location.href = "pages/IndexLoginAndre.html";
        num1 = 1;
      }
    }
  }
});
}

function validarlogin(correo, password) {
  firebase.auth().signInWithEmailAndPassword(correo, password).then(function () {
    location.href = "../index.html";
  })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('Correo mal digitado')
      } else if (errorCode === 'auth/weak-password') {
        alert('La contraseña digitada debe tener mas de 6 caracteres')
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Correo ya usado')
      } else if (errorCode === 'auth/network-request-failed') {
        alert('Vulvete a conectar a la red del vecino')
      } else {
        alert(errorMessage);
      }
    });
}

function cerrarsesion() {
  firebase.auth().signOut().then(function () {
    alert('cerrado de sesion con exito');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/network-request-failed') {
      alert('Vulvete a conectar a la red del vecino')
    } else {
      alert('Error: ', errorMessage, '   Codigo de error: ', errorCode);
    }
  });
}
