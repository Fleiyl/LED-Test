const ledTypeSelect =
  document.getElementById("ledType");

const lampModelSelect =
  document.getElementById("lampModel");

const lampPower =
  document.getElementById("lampPower");

const lampFlux =
  document.getElementById("lampFlux");

const lampLength =
  document.getElementById("lampLength");

const families = [
  ...new Set(
    lampData.map(lamp => lamp.family)
  )
];

families.forEach(family => {
  const option = 
    document.createElement("option");

  option.value = family;

  option.textContent = family;

  ledTypeSelect.appendChild(option);
});

                          
