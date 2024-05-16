let listaVehiculos = [];

// Menu

function mostrarMenu() {
  alert("Bienvenido al sistema de ayuda para CarroPortantes :D");
  alert("Seleccione una opción:\n1. Registrar vehículo\n2. Calcular póliza de seguro mensual\n3. Calcular letra mensual\n4. Ver vehículos registrados\n5. Salir del sistema");
}

function procesarOpcion(opcion) {
  switch(opcion) {
    case 1:
      alert("Seleccionaste la opción 1: Registrar vehículo");
      registrarVehiculo(listaVehiculos);
      break;
    case 2:
      alert("Seleccionaste la opción 2: Calcular póliza de seguro mensual");
      seleccionarVehiculoPara(calcularPoliza);
      break;
    case 3:
      alert("Seleccionaste la opción 3: Calcular letra mensual");
      seleccionarVehiculoPara(calcularLetra);
      break;
    case 4:
      alert("Seleccionaste la opción 4: Ver vehículos registrados");
      verVehiculos(listaVehiculos);
      break;
    case 5:
      alert("Seleccionaste la opción 5: Salir del sistema");
      break;
    default:
      alert("Opción no válida");
  }
}

function menu() {
  let opcion;

  do {
    mostrarMenu();
    opcion = parseInt(prompt("Ingrese el número de la opción deseada:"));

    if (opcion >= 1 && opcion <= 5) {
      procesarOpcion(opcion);
    } else {
      alert("Opción no válida");
    }
  } while (opcion !== 5);
}

menu();

// Funciones para las acciones del sistema.

// Creamos el objeto vehiculo.

function crearVehiculo() {
  alert("Para poder registrar su vehiculo, debe proporcionar la siguiente informacion:");
  let nombreDueno = prompt("Cual es tu primer Nombre?");
  let edadDueno = parseInt(prompt("Que edad tienes?"));
  // Validación de edad
  while (isNaN(edadDueno) || edadDueno <= 0) {
    edadDueno = parseInt(prompt("Por favor, ingresa una edad válida (número mayor que cero):"));
  }
  let modeloCarro = prompt("Que modelo es tu carro?");
  let anoCarro = parseInt(prompt("De que año es tu carro?"));
  // Validación de año del carro
  while (isNaN(anoCarro) || anoCarro <= 0 || anoCarro > new Date().getFullYear()) {
    anoCarro = parseInt(prompt("Por favor, ingresa un año de carro válido (número mayor que cero y no en el futuro):"));
  }
  let precioCarro = parseFloat(prompt("Cuanto cuesta tu carro?"));
  // Validación de precio del carro
  while (isNaN(precioCarro) || precioCarro <= 0) {
    precioCarro = parseFloat(prompt("Por favor, ingresa un precio de carro válido (número mayor que cero):"));
  }
  
  let vehiculo = {
    nombreDueno: nombreDueno,
    edadDueno: edadDueno,
    modeloCarro: modeloCarro,
    anoCarro: anoCarro,
    precioCarro: precioCarro,
  };
  
  alert("Vehículo registrado exitosamente");

  return vehiculo;
}

// Metemos el objeto en el arreglo.

function registrarVehiculo(listaVehiculos) {
  let vehiculo = crearVehiculo();
  listaVehiculos.push(vehiculo);
  console.log(listaVehiculos);
}

// Aqui podemos ver todos los objetos que hay en el arreglo.

function verVehiculos(listaVehiculos) {
  if (listaVehiculos.length === 0) {
    alert("No hay vehículos registrados.");
  } else {
    let mensaje = "Vehículos registrados:\n";
    for (let i = 0; i < listaVehiculos.length; i++) {
      let vehiculo = listaVehiculos[i];
      mensaje += `${i + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}\n`;
    }
    alert(mensaje);
  }
}

// Con esta funcion podemos seleccionar el vehiculo para el cual queramos aplicar el calculo correspondiente (ya sea poliza o letra mensual).

function seleccionarVehiculoPara(callback) {
  if (listaVehiculos.length === 0) {
    alert("No hay vehículos registrados.");
    return;
  }

  let mensaje = "Seleccione un vehículo:\n";
  for (let i = 0; i < listaVehiculos.length; i++) {
    let vehiculo = listaVehiculos[i];
    mensaje += `${i + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro.toFixed(2)}\n`;
  }
  
  let seleccion = parseInt(prompt(mensaje)) - 1;

  if (seleccion >= 0 && seleccion < listaVehiculos.length) {
    let vehiculoSeleccionado = listaVehiculos[seleccion];
    callback(vehiculoSeleccionado);
  } else {
    alert("Selección no válida.");
  }
}

// Esta funcion es para calcular la poliza de seguro mensual.

function calcularPoliza(vehiculo) {
  let { nombreDueno, edadDueno, modeloCarro, anoCarro, precioCarro } = vehiculo;
  let fraccionPoliza = 0;

  if (edadDueno <18) {
    alert(`Lo sentimos, ${nombreDueno}, pero no puedes asegurar el vehículo ${modeloCarro} porque eres menor de 18 años.`);
    return null;
  }

  switch (true) {
    case (edadDueno >= 18 && edadDueno <= 23):
      switch (true) {
        case (anoCarro >= 2019):
          fraccionPoliza = 0.006;
          break;
        case (anoCarro >= 2010 && anoCarro <= 2018):
          fraccionPoliza = 0.0055;
          break;
        case (anoCarro <= 2009):
          fraccionPoliza = 0.003;
          break;
      }
      break;

    case (edadDueno >= 24 && edadDueno <= 55):
      switch (true) {
        case (anoCarro >= 2019):
          fraccionPoliza = 0.005;
          break;
        case (anoCarro >= 2010 && anoCarro <= 2018):
          fraccionPoliza = 0.0049;
          break;
        case (anoCarro <= 2009):
          fraccionPoliza = 0.0025;
          break;
      }
      break;
    case (edadDueno >= 56):
      switch (true) {
        case (anoCarro >= 2019):
          fraccionPoliza = 0.0047;
          break;
        case (anoCarro >= 2010 && anoCarro <= 2018):
          fraccionPoliza = 0.0046;
          break;
        case (anoCarro <= 2009):
          fraccionPoliza = 0.002;
          break;
      }
      break;
  }
  
  let polizaMensual = precioCarro * fraccionPoliza;

  alert(`La póliza mensual para ${nombreDueno} y su vehículo ${modeloCarro} es de $${polizaMensual.toFixed(2)}`);

  return polizaMensual;
}

// Esta funcion es para calcular la letra mensual del vehiculo.

function calcularLetra(vehiculo) {
  let { nombreDueno, modeloCarro, precioCarro } = vehiculo;

  let abonoInicial = parseFloat(prompt("Cuanto diste de abono inicial para el vehiculo?"));
  // Validación de abono inicial
  while (isNaN(abonoInicial) || abonoInicial < 0 || abonoInicial > precioCarro) {
    abonoInicial = parseFloat(prompt(`Por favor, ingresa un abono inicial válido (número mayor o igual a cero y menor o igual al precio del carro: $${precioCarro}):`));
  }
  let anosLetraSeleccion = parseInt(prompt("En cuantos años quieres pagar el vehiculo?"));
  // Validación de años para pagar la letra
  while (isNaN(anosLetraSeleccion) || anosLetraSeleccion <= 0 || anosLetraSeleccion > 10) {
    anosLetraSeleccion = parseInt(prompt("Por favor, ingresa una cantidad de años válida para pagar la letra (número mayor que cero y menor o igual a 10):"));
  }
  
  let porcentajePrecioLetra;

  if (anosLetraSeleccion <= 5) {
    porcentajePrecioLetra = 0.05;
  } else if (anosLetraSeleccion > 5 && anosLetraSeleccion <= 7) {
    porcentajePrecioLetra = 0.07;
  } else {
    porcentajePrecioLetra = 0.1;
  }

  let montoRestante = (precioCarro - abonoInicial) * (1 + porcentajePrecioLetra);
  let letraMensual = montoRestante / (anosLetraSeleccion * 12);

  alert(`La letra mensual para ${nombreDueno} y su vehículo ${modeloCarro} es de $${letraMensual.toFixed(2)}`);
  return letraMensual;
}
