document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".ramo input[type='checkbox']");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", actualizarEstadoRamos);
  });

  actualizarEstadoRamos();
});

function actualizarEstadoRamos() {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    const prerreqs = ramo.dataset.prerreq?.split(",").filter(Boolean) || [];

    if (prerreqs.length === 0) {
      checkbox.disabled = false;
      return;
    }

    const todosAprobados = prerreqs.every(codigo => {
      const prereqCheckbox = document.querySelector(`.ramo[data-codigo="${codigo}"] input`);
      return prereqCheckbox?.checked;
    });

    checkbox.disabled = !todosAprobados;
  });
}
