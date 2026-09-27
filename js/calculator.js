// ========================================
// 1. GET HTML ELEMENTS
// ========================================

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


// ========================================
// 2. CREATE LED TYPE DROPDOWN
// ========================================

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


// ========================================
// 3. LED TYPE → LAMP MODEL
// ========================================

ledTypeSelect.addEventListener(
    "change",
    function () {

        // Ambil LED Type yang dipilih
        const selectedFamily =
            this.value;


        // Reset Lamp Model
        lampModelSelect.innerHTML =
            '<option value="">Select Lamp Model</option>';


        // Kalau belum memilih LED Type
        if (!selectedFamily) {

            lampModelSelect.disabled = true;

            return;
        }


        // Cari lampu yang sesuai dengan LED Type
        const filteredLamps =
            lampData.filter(
                lamp =>
                    lamp.family === selectedFamily
            );


        // Masukkan hasil filter ke Lamp Model
        filteredLamps.forEach(lamp => {

            const option =
                document.createElement("option");

            option.value = lamp.id;

            option.textContent = lamp.name;

            lampModelSelect.appendChild(option);

        });


        // Aktifkan Lamp Model
        lampModelSelect.disabled = false;

    }
);
