document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado guardado en localStorage
  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    const codigo = ramo.dataset.codigo;
    const estado = localStorage.getItem(codigo);
    if (estado === "true") {
      checkbox.checked = true;
    }
  });

  // Función para activar o bloquear según prerrequisitos
  function actualizarEstado() {
    ramos.forEach(ramo => {
      const checkbox = ramo.querySelector("input[type='checkbox']");
      const codigo = ramo.dataset.codigo;
      const prerreq = ramo.dataset.prerreq;

      if (prerreq) {
        const codigos = prerreq.split(",").map(c => c.trim());
        const todosAprobados = codigos.every(req => {
          const reqRamo = document.querySelector(`.ramo[data-codigo='${req}'] input[type='checkbox']`);
          return reqRamo && reqRamo.checked;
        });

        checkbox.disabled = !todosAprobados;
        if (!todosAprobados) checkbox.checked = false;
      } else {
        checkbox.disabled = false; // si no tiene prerrequisitos, siempre habilitado
      }

      // Guardar estado
      localStorage.setItem(codigo, checkbox.checked);
    });
  }

  // Ejecutar al inicio
  actualizarEstado();

  // Reaccionar a cambios
  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      actualizarEstado();
    });
  });
});
