document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado desde localStorage
  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    const codigo = ramo.dataset.codigo;
    const guardado = localStorage.getItem(codigo);
    if (guardado === "true") checkbox.checked = true;
  });

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const checkbox = ramo.querySelector("input[type='checkbox']");
      const codigo = ramo.dataset.codigo;
      localStorage.setItem(codigo, checkbox.checked);

      const prerreq = ramo.dataset.prerreq;
      if (prerreq) {
        const requisitos = prerreq.split(",");
        const todosAprobados = requisitos.every(req => {
          const prereqRamo = document.querySelector(`.ramo[data-codigo='${req.trim()}'] input[type='checkbox']`);
          return prereqRamo && prereqRamo.checked;
        });
        checkbox.disabled = !todosAprobados;
        if (!todosAprobados) checkbox.checked = false;
      }
    });
  }

  actualizarEstado();

  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      actualizarEstado();
    });
  });
});
