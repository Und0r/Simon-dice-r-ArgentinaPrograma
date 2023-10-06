let contadorMaquina = [];
let contadorUsuario = [];
let ronda = 0;

document.querySelector("#comenzar").onclick = empezarJuego;
bloquearInputUsuario();


function empezarJuego() {
 mostrarElementos();
  reiniciarRonda();
  document.querySelector("#facil").onclick = comenzarRondaFacil;
  document.querySelector("#media").onclick = comenzarRondaMedia;
  document.querySelector("#dificil").onclick = comenzarRondaDificil;
}

function mostrarElementos(){
    document.querySelector("#rondas").classList = "";
    document.querySelector("#turno").classList = "";
    document.querySelector("#dificultad").classList = "";
}

function ocultarDificultad(){
    document.querySelector("#dificultad").classList = "oculto";
}

function reiniciarRonda() {
  document.querySelector("#rondas").textContent = "";
  document.querySelector("#turno").textContent = "";
  contadorMaquina = [];
  contadorUsuario = [];
  ronda = 0;
}


function comenzarRondaFacil() {
  bloquearInputUsuario();
    ocultarDificultad();
  actualizarEstado("Turno PC");

  const $nuevoCuadro = cuadroAleatorio();
  contadorMaquina.push($nuevoCuadro);

  const RETRASO_TURNO_JUGADOR = (contadorMaquina.length + 1) * 1200;

  contadorMaquina.forEach(function ($cuadro, index) {
    const RETRASO_MS = (index + 1) * 1200;
    setTimeout(function () {
      resaltar($cuadro, 700);
    }, RETRASO_MS);
  });

  setTimeout(function () {
    actualizarEstado("Turno del Usuario");
    desbloquearInputUsuario(1);
  }, RETRASO_TURNO_JUGADOR);

  contadorUsuario = [];
  ronda++;
  actualizarRonda(ronda);
}

function comenzarRondaMedia() {
    bloquearInputUsuario();
    ocultarDificultad();
    actualizarEstado("Turno PC");
  
    const $nuevoCuadro = cuadroAleatorio();
    contadorMaquina.push($nuevoCuadro);
  
    const RETRASO_TURNO_JUGADOR = (contadorMaquina.length + 1) * 800;
  
    contadorMaquina.forEach(function ($cuadro, index) {
      const RETRASO_MS = (index + 1) * 800;
      setTimeout(function () {
        resaltar($cuadro, 500);
      }, RETRASO_MS);
    });
  
    setTimeout(function () {
      actualizarEstado("Turno del Usuario");
      desbloquearInputUsuario(2);
    }, RETRASO_TURNO_JUGADOR);
  
    contadorUsuario = [];
    ronda++;
    actualizarRonda(ronda);
  }

  function comenzarRondaDificil() {
    bloquearInputUsuario();
    ocultarDificultad();
    actualizarEstado("Turno PC");
  
    const $nuevoCuadro = cuadroAleatorio();
    contadorMaquina.push($nuevoCuadro);
  
    const RETRASO_TURNO_JUGADOR = (contadorMaquina.length + 1) * 500;
  
    contadorMaquina.forEach(function ($cuadro, index) {
      const RETRASO_MS = (index + 1) * 500;
      setTimeout(function () {
        resaltar($cuadro, 300);
      }, RETRASO_MS);
    });
  
    setTimeout(function () {
      actualizarEstado("Turno del Usuario");
      desbloquearInputUsuario(3);
    }, RETRASO_TURNO_JUGADOR);
  
    contadorUsuario = [];
    ronda++;
    actualizarRonda(ronda);
  }
   
  
function manejarRespuestaUsuarioFacil(e) {
  const $cuadro = e.target;
  resaltar($cuadro, 500);
  contadorUsuario.push($cuadro);

  const $cuadroMaquina = contadorMaquina[contadorUsuario.length - 1];

  if ($cuadro.id !== $cuadroMaquina.id) {
    perder();
    return;
  }

  if (contadorUsuario.length === contadorMaquina.length) {
    bloquearInputUsuario();
    setTimeout(comenzarRondaFacil, 1000);
  }
}

function manejarRespuestaUsuarioMedia(e) {
    const $cuadro = e.target;
    resaltar($cuadro, 500);
    contadorUsuario.push($cuadro);
  
    const $cuadroMaquina = contadorMaquina[contadorUsuario.length - 1];
  
    if ($cuadro.id !== $cuadroMaquina.id) {
      perder();
      return;
    }
  
    if (contadorUsuario.length === contadorMaquina.length) {
      bloquearInputUsuario();
      setTimeout(comenzarRondaMedia, 1000);
    }
  }

  function manejarRespuestaUsuarioDificil(e) {
    const $cuadro = e.target;
    resaltar($cuadro, 300);
    contadorUsuario.push($cuadro);
  
    const $cuadroMaquina = contadorMaquina[contadorUsuario.length - 1];
  
    if ($cuadro.id !== $cuadroMaquina.id) {
      perder();
      return;
    }
  
    if (contadorUsuario.length === contadorMaquina.length) {
      bloquearInputUsuario();
      setTimeout(comenzarRondaDificil, 1000);
    }
  }

function cuadroAleatorio() {
  const $cuadro = document.querySelectorAll(".cuadro");
  const indice = Math.floor(Math.random() * $cuadro.length);
  return $cuadro[indice];
}

function actualizarRonda(ronda) {
  document.querySelector("#rondas").textContent = "#" + ronda;
}

function actualizarEstado(estado, error = false) {
  const $estado = document.querySelector("#turno");
  $estado.textContent = estado;
  if (error) {
    $estado.classList.remove("alert-primary");
    $estado.classList.add("alert-danger");
  } else {
    $estado.classList.remove("alert-danger");
    $estado.classList.add("alert-primary");
  }
}

function resaltar($cuadro, retraso) {
  $cuadro.style.opacity = 1;
  setTimeout(function () {
    $cuadro.style.opacity = 0.5;
  }, retraso);
}

function bloquearInputUsuario() {
  document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function desbloquearInputUsuario(dificultad) {
    if(dificultad === 1){
        document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
            $cuadro.onclick = manejarRespuestaUsuarioFacil;
          });
    } else if (dificultad === 2){
        document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
            $cuadro.onclick = manejarRespuestaUsuarioMedia;
          });
    }else if (dificultad === 3) {
        document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
            $cuadro.onclick = manejarRespuestaUsuarioDificil;
          });
    }
  
}

function perder() {
  bloquearInputUsuario();
  reiniciarRonda();
  actualizarEstado(
    'Perdiste! Presiona "Jugar" para volver a intentarlo.',
    true
  );
}
