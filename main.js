let listaVehiculos = JSON.parse(localStorage.getItem('listaVehiculos')) || [];

document.addEventListener("DOMContentLoaded", function() {
    actualizarListaVehiculos();

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

    localStorage.setItem('listaVehiculos', JSON.stringify(listaVehiculos));
}

function actualizarListaVehiculos() {
    let lista = document.getElementById("listaVehiculos");
    lista.innerHTML = "";
    listaVehiculos.forEach((vehiculo, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${index + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)} 
                          <button onclick="eliminarVehiculo(${index})">Eliminar</button>`;
        lista.appendChild(item);
    });

    actualizarSelectVehiculos("vehiculosPoliza", "vehiculoPoliza");
    actualizarSelectVehiculos("vehiculosLetra", "vehiculoLetra");
}

function eliminarVehiculo(index) {
    listaVehiculos.splice(index, 1);
    actualizarListaVehiculos();

    localStorage.setItem('listaVehiculos', JSON.stringify(listaVehiculos));
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
    if (precioCarro <= 12000) {
        porcentajePrecioLetra = 0.20;
    } else if (precioCarro <= 25000) {
        porcentajePrecioLetra = 0.15;
    } else {
        porcentajePrecioLetra = 0.10;
    }

    let precioFinal = precioCarro * (1 + porcentajePrecioLetra);
    let cantidadMeses = anosLetraSeleccion * 12;
    let montoMensual = (precioFinal - abonoInicial) / cantidadMeses;

    document.getElementById("letraMensaje").textContent = `La letra mensual para ${nombreDueno} y su vehículo ${modeloCarro} es de $${montoMensual.toFixed(2)}`;
}

function buscarVehiculoPorDueno() {
    let nombreBuscar = document.getElementById("nombreBuscar").value;
    let vehiculo = listaVehiculos.find(v => v.nombreDueno.toLowerCase() === nombreBuscar.toLowerCase());

    let mensaje = vehiculo ? `Vehículo encontrado: ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}` : "Vehículo no encontrado.";
    document.getElementById("buscarMensaje").textContent = mensaje;
}

function filtrarVehiculosPorPrecio() {
    let precioMinimo = parseFloat(document.getElementById("precioMinimo").value);
    let precioMaximo = parseFloat(document.getElementById("precioMaximo").value);

    let vehiculosFiltrados = listaVehiculos.filter(v => v.precioCarro >= precioMinimo && v.precioCarro <= precioMaximo);

    let mensaje = vehiculosFiltrados.length > 0 ? 
                  vehiculosFiltrados.map(v => `${v.nombreDueno} - ${v.modeloCarro} (${v.anoCarro}) - $${v.precioCarro.toFixed(2)}`).join("<br>") : 
                  "No se encontraron vehículos en ese rango de precio.";
    document.getElementById("filtroMensaje").innerHTML = mensaje;
}
