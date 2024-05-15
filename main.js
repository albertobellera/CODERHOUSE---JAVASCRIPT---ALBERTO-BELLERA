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
      calcularPoliza();
      break;
    case 3:
      alert("Seleccionaste la opción 3: Calcular letra mensual");
      calcularLetra();
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

// Funciones para las acciones de la actividad.

function crearVehiculo() {
  alert("Para poder registrar su vehiculo, debe proporcionar la siguiente informacion:");
  let nombreDueno = prompt("Cual es tu primer Nombre?");
  let edadDueno = parseInt(prompt("Que edad tienes?"));
  let modeloCarro = prompt("Que modelo es tu carro?");
  let anoCarro = parseInt(prompt("De que año es tu carro?"));
  let precioCarro = parseFloat(prompt("Cuanto cuesta tu carro?")).toFixed(2);
  
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

function registrarVehiculo(listaVehiculos) {
  let vehiculo = crearVehiculo();
  listaVehiculos.push(vehiculo);
  console.log(listaVehiculos);
}

function verVehiculos(listaVehiculos) {
  if (listaVehiculos.length === 0) {
    alert("No hay vehículos registrados.");
  } else {
    let mensaje = "Vehículos registrados:\n";
    for (let i = 0; i < listaVehiculos.length; i++) {
      let vehiculo = listaVehiculos[i];
      mensaje += `${i + 1}. ${vehiculo.nombreDueno} - ${vehiculo.modeloCarro} (${vehiculo.anoCarro}) - $${vehiculo.precioCarro}\n`;
    }
    alert(mensaje);
  }
}

function calcularPoliza() {
  // Implementación de la función para calcular póliza
  alert("Función para calcular póliza de seguro mensual aún no implementada.");
}

function calcularLetra() {
  // Implementación de la función para calcular letra mensual
  alert("Función para calcular letra mensual aún no implementada.");
}
