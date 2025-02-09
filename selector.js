// Obtener el archivo campaña.json (esto asume que tienes el archivo en el servidor)
fetch("campaña.json")
  .then((response) => response.json())
  .then((data) => {
    const campañasData = data.campañas; // Este es el array que viene del archivo campaña.json

    // Elementos del DOM
    const clienteSelect = document.getElementById("cliente");
    const campañaSelect = document.getElementById("campaña");
    const mesSelect = document.getElementById("mes");
    const mostrarDatosButton = document.getElementById("mostrarDatos");
    const resultadosSection = document.getElementById("resultados");
    const datosCampañaDiv = document.getElementById("datosCampaña");

    // Función para llenar el selector de clientes
    function cargarClientes() {
      campañasData.forEach((campaña) => {
        const option = document.createElement("option");
        option.value = campaña.cliente;
        option.textContent = campaña.cliente;
        clienteSelect.appendChild(option);
      });
    }

    // Función para llenar el selector de campañas según el cliente
    function cargarCampañas(clienteSeleccionado) {
      campañaSelect.innerHTML =
        '<option value="">Selecciona una Campaña</option>'; // Limpiar las opciones previas
      const campañasDelCliente = campañasData.filter(
        (campaña) => campaña.cliente === clienteSeleccionado
      );

      campañasDelCliente.forEach((campaña) => {
        const option = document.createElement("option");
        option.value = campaña.campaña;
        option.textContent = campaña.campaña;
        campañaSelect.appendChild(option);
      });

      campañaSelect.disabled = false; // Habilitar el selector de campaña
    }

    // Función para llenar el selector de meses
    function cargarMeses() {
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
      meses.forEach((mes) => {
        const option = document.createElement("option");
        option.value = mes;
        option.textContent = mes;
        mesSelect.appendChild(option);
      });

      mesSelect.disabled = false; // Habilitar el selector de mes
    }

    // Función para mostrar los datos de la campaña seleccionada
    function mostrarDatosCampaña(
      clienteSeleccionado,
      campañaSeleccionada,
      mesSeleccionado
    ) {
      const campañaSeleccionadaData = campañasData.find(
        (campaña) =>
          campaña.cliente === clienteSeleccionado &&
          campaña.campaña === campañaSeleccionada
      );

      if (
        campañaSeleccionadaData &&
        campañaSeleccionadaData.fechas[mesSeleccionado]
      ) {
        const fecha = campañaSeleccionadaData.fechas[mesSeleccionado];
        const diasHabiles = campañaSeleccionadaData.q_dias_habiles;
        const semanasTotales = campañaSeleccionadaData.q_semanas_totales;

        // Mostrar los detalles en la sección de resultados
        datosCampañaDiv.innerHTML = `
          <p><strong>Cliente:</strong> ${clienteSeleccionado}</p>
          <p><strong>Campaña:</strong> ${campañaSeleccionada}</p>
          <p><strong>Mes:</strong> ${mesSeleccionado}</p>
          <p><strong>Fecha seleccionada:</strong> ${fecha}</p>
          <p><strong>Días hábiles:</strong> ${diasHabiles}</p>
          <p><strong>Semanas totales:</strong> ${semanasTotales}</p>
        `;

        resultadosSection.classList.remove("hidden");
      }
    }

    // Eventos
    clienteSelect.addEventListener("change", (event) => {
      const clienteSeleccionado = event.target.value;
      if (clienteSeleccionado) {
        cargarCampañas(clienteSeleccionado);
      } else {
        campañaSelect.disabled = true;
        mesSelect.disabled = true;
        resultadosSection.classList.add("hidden");
      }
    });

    campañaSelect.addEventListener("change", (event) => {
      const campañaSeleccionada = event.target.value;
      const clienteSeleccionado = clienteSelect.value;
      if (campañaSeleccionada) {
        mesSelect.disabled = false;
      }
    });

    mostrarDatosButton.addEventListener("click", () => {
      const clienteSeleccionado = clienteSelect.value;
      const campañaSeleccionada = campañaSelect.value;
      const mesSeleccionado = mesSelect.value;

      if (clienteSeleccionado && campañaSeleccionada && mesSeleccionado) {
        mostrarDatosCampaña(
          clienteSeleccionado,
          campañaSeleccionada,
          mesSeleccionado
        );
      } else {
        alert("Por favor, selecciona cliente, campaña y mes.");
      }
    });

    // Inicializar los selectores
    cargarClientes();
    cargarMeses();
  })
  .catch((error) => {
    console.error("Error al cargar el archivo campaña.json:", error);
  });
