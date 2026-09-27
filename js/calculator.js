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

ledTypeSelect.addEventListener(
    "change",
    function () {

        const selectedFamily =
            this.value;


        lampModelSelect.innerHTML =
            '<option value="">Select Lamp Model</option>';


        const filteredLamps =
            lampData.filter(
                lamp =>
                    lamp.family === selectedFamily
            );


        filteredLamps.forEach(lamp => {

            const option =
                document.createElement("option");

            option.value = lamp.id;

            option.textContent = lamp.name;

            lampModelSelect.appendChild(option);

        });

    }
);
