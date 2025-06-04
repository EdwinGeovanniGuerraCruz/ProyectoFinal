const celdas = document.querySelectorAll(".celda");
const mensajeTurno = document.getElementById("estado");
const marcadorX = document.getElementById("puntos-x");
const marcadorO = document.getElementById("puntos-o");
const botonReiniciar = document.getElementById("reiniciar");
const jugadorActual = document.getElementById("jugador-turno");

let tablero = Array(9).fill(null);
let turno = "X";
let juegoActivo = true;
let puntos = { X: 0, O: 0 };

const imagenes = {
  X: "img/x.png",
  O: "img/o.png"
};

// Pone imagen en la celda según el turno
function ponerImagen(celda, jugador) {
  const imagen = document.createElement("img");
  imagen.src = imagenes[jugador];
  imagen.alt = jugador;
  imagen.classList.add("mostrar");
  celda.appendChild(imagen);
}

// Cambia al otro jugador
function cambiarTurno() {
  turno = turno === "X" ? "O" : "X";
  jugadorActual.src = imagenes[turno];
}

// Ver si alguien ganó
function hayGanador() {
  const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      combinacion.forEach(i => {
        celdas[i].classList.add("ganadora");
      });
      mensajeTurno.classList.add("win");
      return true;
    }
  }
  return false;
}

// Ver si es empate
function hayEmpate() {
  return tablero.every(celda => celda !== null);
}

// Cuando el jugador hace clic en una celda
function manejarClick(e) {
  const celda = e.target;
  const indice = Array.from(celdas).indexOf(celda);

  if (!juegoActivo || tablero[indice]) return;

  tablero[indice] = turno;
  ponerImagen(celda, turno);

  if (hayGanador()) {
    mensajeTurno.innerHTML = `🎉 ¡El jugador ${turno} ganó!`;
    puntos[turno]++;
    actualizarMarcador();
    juegoActivo = false;
    return;
  }

  if (hayEmpate()) {
    mensajeTurno.innerHTML = "Empate 😐";
    juegoActivo = false;
    return;
  }

  cambiarTurno();
}

// Actualiza los puntos de los jugadores
function actualizarMarcador() {
  marcadorX.textContent = puntos.X;
  marcadorO.textContent = puntos.O;
}

// Reinicia todo menos los puntos
function reiniciarJuego() {
  tablero.fill(null);
  celdas.forEach(celda => {
    celda.innerHTML = "";
    celda.classList.remove("ganadora");
  });
  mensajeTurno.innerHTML = "Turno de <img id='jugador-turno' src='" + imagenes["X"] + "' alt='X'>";
  jugadorActual.src = imagenes["X"];
  turno = "X";
  juegoActivo = true;
}

// Eventos
celdas.forEach(celda => celda.addEventListener("click", manejarClick));
botonReiniciar.addEventListener("click", reiniciarJuego);
