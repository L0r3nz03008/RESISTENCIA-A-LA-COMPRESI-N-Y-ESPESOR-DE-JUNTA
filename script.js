const anchoInput = document.getElementById('ancho');
const largoInput = document.getElementById('largo');
const anchoTotalInput = document.getElementById('anchoTotal');
const personasInput = document.getElementById('personas');
const espesorPisoInput = document.getElementById('espesorPiso');
const calcularButton = document.getElementById('calcular');
const resetButton = document.getElementById('reset');
const resistenciaSpan = document.getElementById('resistencia');
const cementoSpan = document.getElementById('cemento');
const aguaSpan = document.getElementById('agua');
const agregadoFinoSpan = document.getElementById('agregadoFino');
const agregadoGruesoSpan = document.getElementById('agregadoGrueso');
const volumenTotalValorSpan = document.getElementById('volumenTotalValor');
const cementoDerechaSpan = document.getElementById('cementoDerecha');
const aguaDerechaSpan = document.getElementById('aguaDerecha');
const agregadoFinoDerechaSpan = document.getElementById('agregadoFinoDerecha');
const agregadoGruesoDerechaSpan = document.getElementById('agregadoGruesoDerecha');
const porcentajeAditivoValorSpan = document.getElementById('porcentajeAditivoValor');
const reduccionValorSpan = document.getElementById('reduccionValor');
const nuevoEspesorValorSpan = document.getElementById('nuevoEspesorValor');

const datos = [
    { resistencia: 280, cemento: 420, agua: 190, agregadoFino: 0.67, agregadoGrueso: 0.67 },
    { resistencia: 240, cemento: 380, agua: 180, agregadoFino: 0.60, agregadoGrueso: 0.76 },
    { resistencia: 226, cemento: 350, agua: 170, agregadoFino: 0.55, agregadoGrueso: 0.84 },
    { resistencia: 210, cemento: 320, agua: 170, agregadoFino: 0.52, agregadoGrueso: 0.90 },
    { resistencia: 200, cemento: 300, agua: 158, agregadoFino: 0.48, agregadoGrueso: 0.95 },
    { resistencia: 189, cemento: 280, agua: 158, agregadoFino: 0.55, agregadoGrueso: 0.89 },
    { resistencia: 168, cemento: 300, agua: 158, agregadoFino: 0.72, agregadoGrueso: 0.72 },
    { resistencia: 159, cemento: 260, agua: 163, agregadoFino: 0.63, agregadoGrueso: 0.83 },
    { resistencia: 140, cemento: 230, agua: 148, agregadoFino: 0.55, agregadoGrueso: 0.92 },
    { resistencia: 119, cemento: 210, agua: 143, agregadoFino: 0.50, agregadoGrueso: 1.00 },
    { resistencia: 109, cemento: 175, agua: 133, agregadoFino: 0.55, agregadoGrueso: 0.98 },
    { resistencia: 99, cemento: 160, agua: 125, agregadoFino: 0.55, agregadoGrueso: 1.03 },
];

calcularButton.addEventListener('click', () => {
    const ancho = parseFloat(anchoInput.value) / 100;
    const largo = parseFloat(largoInput.value);
    const anchoTotal = parseFloat(anchoTotalInput.value);
    const personas = parseInt(personasInput.value);
    const espesorPiso = parseFloat(espesorPisoInput.value);

    const volumen = ancho * 0.01 * largo;

    let resistencia = 210; // Valor base (1:2:3)
    if (personas > 500 || anchoTotal > 10) {
        resistencia = 246; // 1:2:2
    } else if (personas > 300 || anchoTotal > 8) {
        resistencia = 175; // 1:2:4
    } else if (personas > 100 || anchoTotal > 6) {
        resistencia = 140; // 1:3:4
    }

    // Ajusta la resistencia en función del espesor del piso
    if (espesorPiso > 10) {
        const diferenciaEspesor = (espesorPiso - 10) / 2;
        resistencia += diferenciaEspesor * 10; // Aumenta la resistencia 10 kg/cm² por cada 2 cm adicionales
    }

    const datosConcreto = datos.find(data => data.resistencia === resistencia) || datos[2]; // Busca en la tabla o usa el concreto 1:2:3 como default

    resistenciaSpan.textContent = "Resistencia a la Compresión: " + resistencia.toFixed(2) + " kg/cm²";
    cementoSpan.textContent = (datosConcreto.cemento * volumen).toFixed(2) + " kg";
    aguaSpan.textContent = (datosConcreto.agua * volumen).toFixed(2) + " litros";

    // Cálculo y visualización de unidades para agregados
    const agregadoFinoVolumen = datosConcreto.agregadoFino * volumen;
    const agregadoGruesoVolumen = datosConcreto.agregadoGrueso * volumen;

    if (agregadoFinoVolumen >= 0.05) {
        agregadoFinoSpan.textContent = agregadoFinoVolumen.toFixed(2) + " m³";
    } else {
        agregadoFinoSpan.textContent = (agregadoFinoVolumen * 1000000).toFixed(2) + " cm³";
    }

    if (agregadoGruesoVolumen >= 0.05) {
        agregadoGruesoSpan.textContent = agregadoGruesoVolumen.toFixed(2) + " m³";
    } else {
        agregadoGruesoSpan.textContent = (agregadoGruesoVolumen * 1000000).toFixed(2) + " cm³";
    }

    // Calcula el volumen total de concreto
    volumenTotalValorSpan.textContent = volumen.toFixed(2);

    // Calcula la cantidad de materiales para 210 kg/cm²
    const datosConcreto210 = datos.find(data => data.resistencia === 210);
    cementoDerechaSpan.textContent = (datosConcreto210.cemento * volumen).toFixed(2) + " kg";
    aguaDerechaSpan.textContent = (datosConcreto210.agua * volumen).toFixed(2) + " litros";
    agregadoFinoDerechaSpan.textContent = (datosConcreto210.agregadoFino * volumen).toFixed(2) + " m³";
    agregadoGruesoDerechaSpan.textContent = (datosConcreto210.agregadoGrueso * volumen).toFixed(2) + " m³";

    // Calcula el porcentaje de aditivo
    const resistenciaMPa = resistencia / 10; // Convierte kg/cm² a MPa
    const porcentajeAditivo = (24.44 + 2.14 * resistenciaMPa) / 100; // Calcula el porcentaje de aditivo
    porcentajeAditivoValorSpan.textContent = porcentajeAditivo.toFixed(2);

    // Calcula el porcentaje de reducción
    const reduccionCemento = ((datosConcreto.cemento - datosConcreto210.cemento) / datosConcreto.cemento) * 100;
    const reduccionAgua = ((datosConcreto.agua - datosConcreto210.agua) / datosConcreto.agua) * 100;
    const reduccionAgregadoFino = ((datosConcreto.agregadoFino - datosConcreto210.agregadoFino) / datosConcreto.agregadoFino) * 100;
    const reduccionAgregadoGrueso = ((datosConcreto.agregadoGrueso - datosConcreto210.agregadoGrueso) / datosConcreto.agregadoGrueso) * 100;
    reduccionValorSpan.textContent = "Cemento: " + reduccionCemento.toFixed(2) + "% - Agua: " + reduccionAgua.toFixed(2) + "% - Agregado Fino: " + reduccionAgregadoFino.toFixed(2) + "% - Agregado Grueso: " + reduccionAgregadoGrueso.toFixed(2) + "%";

    // Calcula el nuevo espesor de junta
    const nuevoEspesor = 15.30 + 0.49 * porcentajeAditivo;
    nuevoEspesorValorSpan.textContent = nuevoEspesor.toFixed(2);
});

resetButton.addEventListener('click', () => {
    anchoInput.value = 2;
    largoInput.value = 5;
    anchoTotalInput.value = 5;
    personasInput.value = 200;
    espesorPisoInput.value = 10; // Reset del espesor del piso
    resistenciaSpan.textContent = "";
    cementoSpan.textContent = "";
    aguaSpan.textContent = "";
    agregadoFinoSpan.textContent = "";
    agregadoGruesoSpan.textContent = "";
    volumenTotalValorSpan.textContent = "";
    cementoDerechaSpan.textContent = "";
    aguaDerechaSpan.textContent = "";
    agregadoFinoDerechaSpan.textContent = "";
    agregadoGruesoDerechaSpan.textContent = "";
    porcentajeAditivoValorSpan.textContent = "";
    reduccionValorSpan.textContent = "";
    nuevoEspesorValorSpan.textContent = "";
});