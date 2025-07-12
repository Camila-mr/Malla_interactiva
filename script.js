document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".ramo input[type='checkbox']");

  // Cargar estado desde localStorage
  checkboxes.forEach((checkbox) => {
    const codigo = checkbox.closest(".ramo").dataset.codigo;
    checkbox.checked = localStorage.getItem(codigo) === "true";
  });

  // Aplicar lógica de prerrequisitos
  function actualizarBloqueos() {
    checkboxes.forEach((checkbox) => {
      const ramo = checkbox.closest(".ramo");
      const prereq = ramo.dataset.prerreq;
      const codigo = ramo.dataset.codigo;

      if (!prereq) {
        checkbox.disabled = false; // sin prerrequisitos
      } else {
        const prereqCheckbox = document.querySelector(
          `.ramo[data-codigo='${prereq}'] input[type='checkbox']`
        );
        checkbox.disabled = !prereqCheckbox.checked;
      }
    });
  }

  // Guardar estado y actualizar cuando se cambia algo
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const codigo = checkbox.closest(".ramo").dataset.codigo;
      localStorage.setItem(codigo, checkbox.checked);
      actualizarBloqueos();
    });
  });

  actualizarBloqueos(); // Aplicar bloqueo inicial
});
