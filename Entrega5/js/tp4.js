let juego = false;
let nave = crearNave();
let minutos = 0;
let segundos = 0;

document.onkeydown  = function() { nave.detectarTeclaOn(event) };
document.onkeyup = function() {nave.detectarTeclaOff(event)};
let puntos = 0;
let enemigos = null;

actualizarPanel();

function crearEnemigos () {
  for (let i = 1; i < 9; i++) {
    let div = document.createElement("div");
    div.id = "roca"+i;
    let padre = document.getElementById("mesa");
    padre.appendChild(div);
  }
  let enemigo1 = new Enemigo("roca1", 10, 500);
  let enemigo2 = new Enemigo("roca2", 20, 600);
  let enemigo3 = new Enemigo("roca3", 50, 650);
  let enemigo4 = new Enemigo("roca4", 12, 550);
  let enemigo5 = new Enemigo("roca5", 30, 500);
  let enemigo6 = new Enemigo("roca6", 20, 900);
  let enemigo7 = new Enemigo("roca7", 12, 450);
  let enemigo8 = new Enemigo("roca8", 40, 600);
  enemigos = [enemigo1, enemigo2, enemigo3, enemigo4, enemigo5, enemigo6, enemigo7, enemigo8];
  return enemigos;
}

function crearNave () {
  let div = document.createElement("div");
  div.id = "nave";
  let padre = document.getElementById("mesa");
  padre.appendChild(div);
  let nueva = new Nave("nave");
  return nueva;
}


function removerActores() {
  for (let i = 1; i < 9; i++) {
    let id = "roca"+i;
    let div = document.getElementById(id);
    if (div != null) {
      div.remove();
    }
  }
  let div2 = document.getElementById("nave");
  div2.remove();
}

function activarEnemigos () {
  enemigos.forEach(function(enemigo) {
let movEnem = setInterval(function(){
    if (juego) {
      enemigo.caer();
    }
    else {
      clearInterval(movEnem);
    }}, enemigo.intervalo);
  });
}

function activarNave () {
let movNave = setInterval(function(){
    if (juego) {
      nave.mover();
    }
    else {
      clearInterval(movNave);
    }}, 10);
}

function nuevoJuego () {
    // console.log("antes nuevoJuego" +juego);
    if (!juego) {
      resetearPantalla();
      // let div2 = document.getElementById("nave");
      // div2.remove();
      juego = true;
        // console.log("click" +juego);
      // minutos = 0;
      // segundos = 0;
      nave = crearNave();
      activarNave();
      enemigos = crearEnemigos();
      activarEnemigos();
      let bodyJuego =  document.getElementById("bodyJuego");
       bodyJuego.classList.add("stop-scrolling");
      aumentarVelocidadEnemigos();
      analisisColision();
      tiempo();
    }
}

function resetearPantalla() {
  let div2 = document.getElementById("nave");
  if (div2 != null) {
    div2.remove();
  }
  minutos = 0;
  segundos = 0;
  let div5 = document.getElementById("fondoOff");
  if (div5 != null) {
    div5.remove();
  }
  let div4 = document.getElementById("fondoBienv");
  if (div4 != null) {
    div4.remove();
  }
  let div15 = document.getElementById("fondoFin");
  if (div15 != null) {
    div15.remove();
  }
}
function terminarJuego () {
  removerActores();
  let divOff = document.createElement("div");
  divOff.id = "fondoOff";
  let padre = document.getElementById("pantalla");
  padre.appendChild(divOff);
  juego = false;
  let bodyJuego =  document.getElementById("bodyJuego");
   bodyJuego.classList.remove("stop-scrolling");
    // document.getElementsByTagName('body').classList.remove('stop-scrolling');
}

function analisisColision () {
let colision = setInterval(function(){
  for (let i = 0; i < enemigos.length; i++) {
    if (nave.colisiona(enemigos[i])) {
      nave.chocada();
      clearInterval(colision);
      setTimeout(function(){   terminarJuego (); }, 3000);

    }
  }
}, 10);
}

function tiempo () {
  let meta = window.setInterval (function(){
    if (juego){
      segundos++;
        actualizarPanel () ;
      if (segundos > 60) {
        segundos = segundos - 60;
        minutos++;
      }
      if (minutos == 3) {
        document.getElementById("puntos").innerHTML = "TIEMPO =  0" + minutos + " : 00" ;
        window.clearInterval(meta);
        removerActores();
        let divFin = document.createElement("div");
        divFin.id = "fondoFin";
        let padre3 = document.getElementById("pantalla");
        padre3.appendChild(divFin);
          juego = false;
      }
    }
    else {
      window.clearInterval(meta);
    }
  }, 1000);
}

function actualizarPanel () {
  if (segundos > 9) {
    document.getElementById("puntos").innerHTML = "TIEMPO =  0" + minutos + " : " + segundos;
  }
  else {
    document.getElementById("puntos").innerHTML = "TIEMPO =  0" + minutos + " : " + "0"+segundos;
  }
}

function aumentarVelocidadEnemigos () {
  for (let i = 0; i < enemigos.length; i++) {
  let velocidad =  setInterval(function(){
     if (enemigos[i].intervalo < 0.2) {
      enemigos[i].intervalo = enemigos[i].intervalo - 0.1;
    }
    else {
      enemigos[i].intervalo = 0.1;
    }}, 3000);
  }
}

document.getElementById("nuevo").addEventListener("click", function() {
  nuevoJuego();
});

// document.getElementById("jugar").addEventListener("click", function() {
//       // document.getElementById("juegoIntro").style.display = 'none';
//       // document.getElementById("juego").style.display = 'inline';
//       if (juego) {
//         juego = false;
//         terminarJuego();
//         alert("aca");
//         resetearPantalla();
//         nave = crearNave();
//       }
//       else {
//         resetearPantalla();
//         nave = crearNave();
//       }
//       let divBienv = document.createElement("div");
//       divBienv.id = "fondoBienv";
//       let padre2 = document.getElementById("pantalla");
//       padre2.appendChild(divBienv);
// });

// document.getElementById("logo").addEventListener("click", function() {
//       document.getElementById("juegoIntro").style.display = 'inline';
//       document.getElementById("juego").style.display = 'none';
// });
//
// document.getElementById("inicio").addEventListener("click", function() {
//       document.getElementById("juegoIntro").style.display = 'inline';
//       document.getElementById("juego").style.display = 'none';
// });
