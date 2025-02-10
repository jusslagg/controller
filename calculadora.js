// Feriados de 2025 con su nombre
const feriados = {
  "25/12/2024": "25/12-Navidad",
  "01/01/2025": "01/01-Año Nuevo",
  "03/03/2025": "03/03-Carnaval",
  "04/03/2025": "04/03-Carnaval",
  "24/03/2025": "24/03-Día Nacional de la Memoria",
  "02/04/2025": "02/04-Día del Veterano de Guerra",
  "18/04/2025": "18/04-Día del Trabajador",
  "01/05/2025": "01/05-Día del Trabajador",
  "25/05/2025": "25/05-Día de la Revolución de Mayo",
  "16/06/2025":
    "16/06-Paso a la Inmortalidad del Gral. Don Martín Miguel de Güemes",
  "20/06/2025": "20/06-Paso a la Inmortalidad del Gral. Manuel Belgrano",
  "09/07/2025": "09/07-Día de la Independencia",
  "17/08/2025": "17/08-Paso a la Inmortalidad del Gral. José de San Martín",
  "12/10/2025": "12/10-Día del Respeto a la Diversidad Cultural",
  "24/11/2025": "24/11-Día de la Soberanía Nacional",
  "08/12/2025": "08/12-Día de la Inmaculada Concepción",
  "25/12/2025": "25/12-Navidad",
};

// Función para verificar si una fecha es un día hábil
function esDiaHabil(fecha) {
  const dia = fecha.getDay();
  const fechaStr = `${fecha.getDate().toString().padStart(2, "0")}/${(
    fecha.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${fecha.getFullYear()}`;

  // Verificar si es fin de semana o feriado
  return dia !== 0 && dia !== 6 && !feriados[fechaStr]; // 0 es domingo, 6 es sábado
}

// Función para restar días hábiles
function restarDiasHabiles(fecha, diasAHabiles) {
  let fechaResultado = new Date(fecha);
  let diasRestados = 0;
  let finesDeSemana = 0; // Contador de fines de semana
  let feriadosEnRango = []; // Arreglo para almacenar feriados en el rango

  // Recorremos los días restando hasta llegar a la cantidad deseada de días hábiles
  while (diasRestados < diasAHabiles) {
    const fechaStr = `${fechaResultado
      .getDate()
      .toString()
      .padStart(2, "0")}/${(fechaResultado.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${fechaResultado.getFullYear()}`;

    if (esDiaHabil(fechaResultado)) {
      diasRestados++;
    } else {
      // Contabilizar fines de semana
      if (fechaResultado.getDay() === 0 || fechaResultado.getDay() === 6) {
        finesDeSemana++;
      }
      // Contabilizar feriados, pero solo si no es fin de semana
      if (feriados[fechaStr] && !feriadosEnRango.includes(fechaStr)) {
        feriadosEnRango.push(feriados[fechaStr]); // Aseguramos que no se dupliquen
      }
    }
    // Decrementar el día
    fechaResultado.setDate(fechaResultado.getDate() - 1);
  }

  return {
    fechaResultado,
    finesDeSemana,
    feriadosEnRango, // Devuelvo los nombres de los feriados
  };
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
  const { fechaResultado, finesDeSemana, feriadosEnRango } = restarDiasHabiles(
    fechaSeleccionada,
    dias
  );

  // Mostrar el resultado en el HTML
  const fechaFinalStr = `${fechaResultado
    .getDate()
    .toString()
    .padStart(2, "0")}/${(fechaResultado.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${fechaResultado.getFullYear()}`;

  // Mostrar los nombres de los feriados
  let feriadosTexto = feriadosEnRango.length
    ? `Feriados: ${feriadosEnRango.join(", ")}`
    : "No hay feriados en el rango.";

  const resultado = `
        La fecha inicial, restando ${dias} días hábiles es: ${fechaFinalStr}.
        <br>
        Días de fin de semana: ${finesDeSemana}.
        <br>
        ${feriadosTexto}.
      `;

  document.getElementById("resultadoCalculadora").innerHTML = resultado;
});
