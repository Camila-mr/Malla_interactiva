document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".ramo input[type='checkbox']");

  // Al marcar o desmarcar, actualiza la habilitación de todos los ramos
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

    // Habilita el ramo solo si todos sus prerrequisitos están marcados
    const todosAprobados = prerreqs.every(codigo => {
      const prereqCheckbox = document.querySelector(`.ramo[data-codigo="${codigo}"] input`);
      return prereqCheckbox?.checked;
    });

    checkbox.disabled = !todosAprobados;
  });
}
