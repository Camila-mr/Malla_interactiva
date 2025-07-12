document.querySelectorAll(".ramo input[type='checkbox']").forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    actualizarEstadoRamos();
  });
});

function actualizarEstadoRamos() {
  document.querySelectorAll(".ramo").forEach(ramo => {
    const prerreq = ramo.dataset.prerreq;
    const checkbox = ramo.querySelector("input[type='checkbox']");

    if (!prerreq) return; // no tiene prerrequisitos

    const prereqCheckbox = document.querySelector(`.ramo[data-codigo='${prerreq}'] input`);
    checkbox.disabled = !prereqCheckbox.checked;
  });
}

actualizarEstadoRamos(); // al cargar la página
