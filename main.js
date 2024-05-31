let listaVehiculos = [];

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formRegistrar").addEventListener("submit", function(event) {
        event.preventDefault();
        registrarVehiculo();
    });

    document.getElementById("formBuscarVehiculo").addEventListener("submit", function(event) {
        event.preventDefault();
        buscarVehiculoPorDueno();
    });

    document.getElementById("formFiltrarVehiculos").addEventListener("submit", function(event) {
        event.preventDefault();
        filtrarVehiculosPorPrecio();
    });

    document.getElementById("formCalcularLetra").addEventListener("submit", function(event) {
        event.preventDefault();
        let vehiculoSeleccionado = listaVehiculos[parseInt(document.querySelector('input[name="vehiculoLetra"]:checked').value)];
        calcularLetra(vehiculoSeleccionado);
    });

    document.getElementById("formCalcularPoliza").addEventListener("submit", function(event) {
        event.preventDefault();
        let vehiculoSeleccionado = listaVehiculos[parseInt(document.querySelector('input[name="vehiculoPoliza"]:checked').value)];
        calcularPoliza(vehiculoSeleccionado);
    });
});

function registrarVehiculo() {
    let nombreDueno = document.getElementById("nombreDueno").value;
    let edadDueno = parseInt(document.getElementById("edadDueno").value);
    let modeloCarro = document.getElementById("modeloCarro").value;
    let anoCarro = parseInt(document.getElementById("anoCarro").value);
    let precioCarro = parseFloat(document.getElementById("precioCarro").value);

    let vehiculo = {
        nombreDueno: nombreDueno,
        edadDueno: edadDueno,
        modeloCarro: modeloCarro,
        anoCarro: anoCarro,
        precioCarro: precioCarro,
    };

    listaVehiculos.push(vehiculo);
    document.getElementById("formRegistrar").reset();
    actualizarListaVehiculos();
}

function actualizarListaVehiculos() {
    let lista = document.getElementById("listaVehiculos");
    lista.innerHTML = "";
    listaVehiculos.forEach((vehiculo, index) => {
        let item = document.createElement("li");
        item.textContent = `${index + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}`;
        lista.appendChild(item);
    });

    actualizarSelectVehiculos("vehiculosPoliza", "vehiculoPoliza");
    actualizarSelectVehiculos("vehiculosLetra", "vehiculoLetra");
}

function actualizarSelectVehiculos(selectId, radioName) {
    let select = document.getElementById(selectId);
    select.innerHTML = "";
    listaVehiculos.forEach((vehiculo, index) => {
        let item = document.createElement("div");
        item.innerHTML = `<input type="radio" name="${radioName}" value="${index}" id="${radioName}${index}">
                          <label for="${radioName}${index}">${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}</label>`;
        select.appendChild(item);
    });
}

function calcularPoliza(vehiculo) {
    let { nombreDueno, edadDueno, modeloCarro, anoCarro, precioCarro } = vehiculo;
    let fraccionPoliza = 0;

    if (edadDueno < 18) {
        document.getElementById("polizaMensaje").textContent = `Lo sentimos, ${nombreDueno}, pero no puedes asegurar el vehículo ${modeloCarro} porque eres menor de 18 años.`;
        return;
    }

    if (edadDueno >= 18 && edadDueno <= 23) {
        fraccionPoliza = anoCarro >= 2019 ? 0.006 : anoCarro >= 2010 ? 0.0055 : 0.003;
    } else if (edadDueno >= 24 && edadDueno <= 55) {
        fraccionPoliza = anoCarro >= 2019 ? 0.005 : anoCarro >= 2010 ? 0.0049 : 0.0025;
    } else if (edadDueno >= 56) {
        fraccionPoliza = anoCarro >= 2019 ? 0.0047 : anoCarro >= 2010 ? 0.0046 : 0.002;
    }

    let polizaMensual = precioCarro * fraccionPoliza;
    document.getElementById("polizaMensaje").textContent = `La póliza mensual para ${nombreDueno} y su vehículo ${modeloCarro} es de $${polizaMensual.toFixed(2)}`;
}

function calcularLetra(vehiculo) {
    let { nombreDueno, modeloCarro, precioCarro } = vehiculo;

    let abonoInicial = parseFloat(document.getElementById("abonoInicial").value);
    let anosLetraSeleccion = parseInt(document.getElementById("anosLetraSeleccion").value);

    let porcentajePrecioLetra;
    if (anosLetraSeleccion <= 5) {
        porcentajePrecioLetra = 0.05;
    } else if (anosLetraSeleccion > 5 && anosLetraSeleccion <= 7) {
        porcentajePrecioLetra = 0.07;
    } else {
        porcentajePrecioLetra = 0.1;
    }

    let valorFinanciado = precioCarro - abonoInicial;
    let interes = valorFinanciado * porcentajePrecioLetra * anosLetraSeleccion;
    let valorTotalAdeudado = valorFinanciado + interes;
    let letraMensual = valorTotalAdeudado / (anosLetraSeleccion * 12);

    document.getElementById("letraMensaje").textContent = `La letra mensual para ${nombreDueno} y su vehículo ${modeloCarro} es de $${letraMensual.toFixed(2)}`;
}

function buscarVehiculoPorDueno() {
    let nombreBuscar = document.getElementById("nombreBuscar").value;
    let vehiculoEncontrado = listaVehiculos.find(vehiculo => vehiculo.nombreDueno.toLowerCase() === nombreBuscar.toLowerCase());

    if (vehiculoEncontrado) {
        document.getElementById("buscarMensaje").textContent = `Vehículo encontrado: ${vehiculoEncontrado.nombreDueno} - ${vehiculoEncontrado.modeloCarro} (${vehiculoEncontrado.anoCarro}) - $${vehiculoEncontrado.precioCarro.toFixed(2)}`;
    } else {
        document.getElementById("buscarMensaje").textContent = "No se encontró ningún vehículo para el dueño especificado.";
    }
}

function filtrarVehiculosPorPrecio() {
    let precioMinimo = parseFloat(document.getElementById("precioMinimo").value);
    let precioMaximo = parseFloat(document.getElementById("precioMaximo").value);

    let vehiculosFiltrados = listaVehiculos.filter(vehiculo => vehiculo.precioCarro >= precioMinimo && vehiculo.precioCarro <= precioMaximo);

    let mensaje = "Vehículos en el rango de precio:<br>";
    if (vehiculosFiltrados.length > 0) {
        vehiculosFiltrados.forEach((vehiculo, index) => {
            mensaje += `${index + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}<br>`;
        });
    } else {
        mensaje += "No se encontraron vehículos en el rango de precio especificado.";
    }

    document.getElementById("filtroMensaje").innerHTML = mensaje;
}
