document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar estado guardado
  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    const codigo = ramo.dataset.codigo;
    const estado = localStorage.getItem(codigo);
    checkbox.checked = estado === "true";
  });

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const checkbox = ramo.querySelector("input[type='checkbox']");
      const codigo = ramo.dataset.codigo;
      const prerreq = ramo.dataset.prerreq;

      if (prerreq) {
        const codigos = prerreq.split(",").map(c => c.trim());
        const cumplidos = codigos.every(req => {
          const reqCheckbox = document.querySelector(`.ramo[data-codigo='${req}'] input[type='checkbox']`);
          return reqCheckbox && reqCheckbox.checked;
        });

        checkbox.disabled = !cumplidos;
        ramo.classList.toggle("bloqueado", !cumplidos);
      } else {
        checkbox.disabled = false;
        ramo.classList.remove("bloqueado");
      }

      localStorage.setItem(codigo, checkbox.checked);
    });
  }

  actualizarEstado();

  ramos.forEach(ramo => {
    const checkbox = ramo.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      localStorage.setItem(ramo.dataset.codigo, checkbox.checked);
      actualizarEstado();
    });
  });
});
