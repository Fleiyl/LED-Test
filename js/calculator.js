// HTML ELEMENTS

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


// Reflection
const ceilingReflection =
    document.getElementById("ceilingReflection");

const wallReflection =
    document.getElementById("wallReflection");

const floorReflection =
    document.getElementById("floorReflection");


// Room dimension
const roomLength =
    document.getElementById("roomLength");

const roomWidth =
    document.getElementById("roomWidth");

const ceilingHeight =
    document.getElementById("ceilingHeight");

const workingHeight =
    document.getElementById("workingHeight");

const targetIlluminance =
    document.getElementById("targetIlluminance");


// Calculate button
const calculateButton =
    document.getElementById("calculateButton");


// Result
const resultArea =
    document.getElementById("resultArea");

const resultMountingHeight =
    document.getElementById("resultMountingHeight");

const resultRoomIndex =
    document.getElementById("resultRoomIndex");

const resultEfficiency =
    document.getElementById("resultEfficiency");

const resulEfficiencyArmature =
    document.getElementById("resultEfficiencyArmature");

const resultLightFlux =
    document.getElementById("resultLightFlux");

const resultCalculatedLampQuantity =
    document.getElementById("resultCalculatedLampQuantity");

const resultFixedLampQuantity =
    document.getElementById("resultFixedLampQuantity");

const resultActualIlluminance =
    document.getElementById("resultActualIlluminance");

const resultTotalPower =
    document.getElementById("resultTotalPower");

// LED TYPE DROPDOWN
const families = [
    ...new Set(
        lampData.map(
            lamp => lamp.family
        )
    )
];


families.forEach(family => {
    const option =
        document.createElement("option");
    option.value = family;
    option.textContent = family;
    ledTypeSelect.appendChild(option);
});


// LED TYPE → LAMP MODEL
ledTypeSelect.addEventListener(
    "change",
    function () {
        const selectedFamily =
            this.value;

        // Reset Lamp Model
        lampModelSelect.innerHTML =
            '<option value="">Select Lamp Model</option>';

        // Reset specification
        lampPower.textContent = "-";
        lampFlux.textContent = "-";
        lampLength.textContent = "-";

        // Jika tidak memilih LED Type
        if (!selectedFamily) {
            lampModelSelect.disabled = true;
            return;
        }

        // Cari lampu berdasarkan family
        const filteredLamps =
            lampData.filter(
                lamp =>
                    lamp.family === selectedFamily
            );

        // Masukkan lampu ke dropdown
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

// LAMP MODEL → LAMP SPECIFICATION
lampModelSelect.addEventListener(
    "change",
    function () {
        const selectedId =
            this.value;
        const selectedLamp =
            lampData.find(lamp => lamp.id == selectedId);


        // Jika tidak ada lampu
        if (!selectedLamp) {
            lampPower.textContent = "-";
            lampFlux.textContent = "-";
            lampLength.textContent = "-";
            return;
        }

        // Tampilkan spesifikasi
        lampPower.textContent =
            selectedLamp.power;
        lampFlux.textContent =
            selectedLamp.flux;
        lampLength.textContent =
            selectedLamp.length;
    }
);

// CREATE REFLECTION DROPDOWN
const reflectionValues = [
    ...new Set(
        efficiencyData.map(
            data => data.reflection
        )
    )
];

// Ceiling
const ceilingValues = [
    ...new Set(
        reflectionValues.map(
            reflection =>
                reflection.split("/")[0]
        )
    )
];

ceilingValues.forEach(value => {
    const option =
        document.createElement("option");
    option.value = value;
    option.textContent = value;
    ceilingReflection.appendChild(option);
});

// Wall
const wallValues = [
    ...new Set(
        reflectionValues.map(
            reflection =>
                reflection.split("/")[1]
        )
    )
];

wallValues.forEach(value => {
    const option =
        document.createElement("option");
    option.value = value;
    option.textContent = value;
    wallReflection.appendChild(option);
});

// Floor
const floorValues = [
    ...new Set(
        reflectionValues.map(
            reflection =>
                reflection.split("/")[2]
        )
    )
];

floorValues.forEach(value => {
    const option =
        document.createElement("option");
    option.value = value;
    option.textContent = value;
    floorReflection.appendChild(option);
});

// 6. CALCULATE
calculateButton.addEventListener(
    "click",
    function () {

        // GET INPUT VALUES
        const L =
            Number(roomLength.value);
        const W =
            Number(roomWidth.value);
        const Hc =
            Number(ceilingHeight.value);
        const Hw =
            Number(workingHeight.value);
        const E =
            Number(targetIlluminance.value);

        // VALIDATION
        if (
            !lampModelSelect.value ||
            !L ||
            !W ||
            !Hc ||
            !Hw ||
            !E
        ) {
            alert("Please complete all required inputs.");
            return;
        }

        if (Hc <= Hw) {
            alert("Ceiling Height must be greater than Working Height.");
            return;
        }

        // GET SELECTED LAMP
        const selectedId =
            lampModelSelect.value;
        const selectedLamp =
            lampData.find(
                lamp =>
                    lamp.id == selectedId
            );

        if (!selectedLamp) {
            alert("Lamp model not found.");
            return;
        }

        // AREA
        const area =
            L * W;
        resultArea.textContent =
            area.toFixed(2);
        
        // MOUNTING HEIGHT
        const mountingHeight =
            Hc - Hw;
        resultMountingHeight.textContent =
            mountingHeight.toFixed(2);

        // ROOM INDEX
        const roomIndex =
            area /
            (
                mountingHeight *
                (L + W)
            );
        resultRoomIndex.textContent =
            roomIndex.toFixed(2);

        // GET REFLECTION

        const selectedReflection =
            ceilingReflection.value +
            "/" +
            wallReflection.value +
            "/" +
            floorReflection.value;

        // FIND EFFICIENCY DATA
        const efficiencyRows =
            efficiencyData.filter(
                data =>
                    data.family === selectedLamp.family &&
                    data.type === selectedLamp.name &&
                    data.reflection === selectedReflection
            );

        if (efficiencyRows.length === 0) {
            alert("Efficiency data not found for the selected lamp and reflection factor.");
            return;
        }

        // SORT ROOM INDEX
        efficiencyRows.sort(
            (a, b) =>
                a.roomIndex - b.roomIndex
        );

        // FIND LOWER POINT
        const lower =
            efficiencyRows
                .filter(
                    row =>
                        row.roomIndex <= roomIndex
                )
                .pop();

        // FIND UPPER POINT
        const upper =
            efficiencyRows
                .find(
                    row =>
                        row.roomIndex >= roomIndex
                );

        // INTERPOLATION
        let efficiency;
        if (
            lower &&
            upper &&
            lower.roomIndex !== upper.roomIndex
        ) {
            efficiency =
                lower.efficiency +
                (
                    (roomIndex - lower.roomIndex) /
                    (upper.roomIndex - lower.roomIndex)
                ) *
                (
                    upper.efficiency -
                    lower.efficiency
                );

        } else if (lower) {
            efficiency =
                lower.efficiency;
        } else if (upper) {
            efficiency =
                upper.efficiency;
        } else {
            alert("Room Index is outside the available efficiency data.");
            return;
        }

        // CONVERT EFFICIENCY TO FACTOR
        const efficiencyFactor =
            efficiency / 100;
        resultEfficiency.textContent =
            efficiency.toFixed(2) + " %";

        // DIRT FACTOR
        const dirtFactor = 0.75;

        // EFFICIENCY ARMATURE / UTILIZATION FACTOR
        const efficiencyArmature =
            efficiencyFactor *
            dirtFactor;
        resultEfficiencyArmature.textContent =
            efficiencyArmature.toFixed(4);

        // REQUIRED LIGHT FLUX
        const lightFlux =
            (
                E *
                area
            ) /
            efficiencyArmature;
        resultLightFlux.textContent =
            lightFlux.toFixed(2);

        // CALCULATED LAMP QUANTITY
        const calculatedLampQuantity =
            lightFlux /
            selectedLamp.flux;
        resultCalculatedLampQuantity.textContent =
            calculatedLampQuantity.toFixed(2);

        // FIXED LAMP QUANTITY
        const fixedLampQuantity =
            Math.ceil(
                calculatedLampQuantity
            );
        resultFixedLampQuantity.textContent =
            fixedLampQuantity;

        // ACTUAL ILLUMINANCE
        const actualIlluminance =
            (
                fixedLampQuantity *
                selectedLamp.flux *
                efficiencyArmature
            ) /
            area;
        resultActualIlluminance.textContent =
            actualIlluminance.toFixed(2);

        // TOTAL POWER
        const totalPower =
            fixedQuantity *
            selectedLamp.power;
        resultTotalPower.textContent =
            totalPower.toFixed(2);
    }
);
