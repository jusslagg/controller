// Feriados de 2025
const feriados = [
  "25/12/2024",
  "01/01/2025",
  "03/03/2025",
  "04/03/2025",
  "24/03/2025",
  "02/04/2025",
  "18/04/2025",
  "01/05/2025",
  "25/05/2025",
  "16/06/2025",
  "20/06/2025",
  "09/07/2025",
  "18/08/2025",
  "13/10/2025",
  "24/11/2025",
  "08/12/2025",
  "25/12/2025",
];

// Función para verificar si una fecha es un día hábil
function esDiaHabil(fecha) {
  const dia = fecha.getDay();
  const fechaStr = `${fecha.getDate().toString().padStart(2, "0")}/${(
    fecha.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${fecha.getFullYear()}`;

  // Verificar si es fin de semana o feriado
  return dia !== 0 && dia !== 6 && !feriados.includes(fechaStr); // 0 es domingo, 6 es sábado
}

// Función para restar días hábiles
function restarDiasHabiles(fecha, diasAHabiles) {
  let fechaResultado = new Date(fecha);
  let diasRestados = 0;

  while (diasRestados < diasAHabiles) {
    fechaResultado.setDate(fechaResultado.getDate() - 1);
    if (esDiaHabil(fechaResultado)) {
      diasRestados++;
    }
  }

  return fechaResultado;
}

// Función para mostrar el resultado
document.getElementById("calcularFecha").addEventListener("click", function () {
  const fechaInput = document.getElementById("fecha").value;
  const diasInput = document.getElementById("dias").value;

  if (!fechaInput || !diasInput) {
    alert("Por favor, ingresa todos los campos.");
    return;
  }

  const fechaSeleccionada = new Date(fechaInput);
  const dias = parseInt(diasInput);

  // Llamar a la función para restar días hábiles
  const fechaFinal = restarDiasHabiles(fechaSeleccionada, dias);

  // Mostrar el resultado en el HTML
  const fechaFinalStr = `${fechaFinal.getDate().toString().padStart(2, "0")}/${(
    fechaFinal.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${fechaFinal.getFullYear()}`;
  document.getElementById(
    "resultadoCalculadora"
  ).innerText = `La fecha inicial, restando ${dias} días hábiles es: ${fechaFinalStr}`;
});
