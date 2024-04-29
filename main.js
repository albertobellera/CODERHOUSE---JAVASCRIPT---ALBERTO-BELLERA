let reiniciar = 'S';

while (reiniciar === 'S') {
    alert("Bienvenido a la calculadora de póliza de seguro para tu auto!");

    let edad = prompt("Ingresa tu edad:");
    let añoCarro = prompt("Ingresa el año del carro:");
    let precioCarro = prompt("Ingresa el precio del carro:");

    while (edad === "" || añoCarro === "" || precioCarro === "") {
        alert("Debes completar todos los campos. Intenta nuevamente.");
        edad = prompt("Ingresa tu edad:");
        añoCarro = prompt("Ingresa el año del carro:");
        precioCarro = prompt("Ingresa el precio del carro:");
    }

    if (parseInt(edad) < 18) {
        alert("No puedes asegurar un carro siendo menor de edad.");
    } else {
        let fraccionPoliza = calcularPoliza(parseInt(edad), parseInt(añoCarro));

        function calcularPoliza(edad, añoCarro) {
            let fraccionPoliza;

            if (edad >= 18 && edad <= 23) {
                if (añoCarro >= 2019) {
                    fraccionPoliza = 0.006;
                } else if (añoCarro >= 2010 && añoCarro <= 2018) {
                    fraccionPoliza = 0.0055;
                } else if (añoCarro <= 2009) {
                    fraccionPoliza = 0.003;
                }
            } else if (edad >= 24 && edad <= 55) {
                if (añoCarro >= 2019) {
                    fraccionPoliza = 0.005;
                } else if (añoCarro >= 2010 && añoCarro <= 2018) {
                    fraccionPoliza = 0.0049;
                } else if (añoCarro <= 2009) {
                    fraccionPoliza = 0.0025;
                }
            } else if (edad >= 56) {
                if (añoCarro >= 2019) {
                    fraccionPoliza = 0.0047;
                } else if (añoCarro >= 2010 && añoCarro <= 2018) {
                    fraccionPoliza = 0.0046;
                } else if (añoCarro <= 2009) {
                    fraccionPoliza = 0.002;
                }
            }

            console.log(fraccionPoliza);

            return fraccionPoliza;
        }

        alert("Tu edad es: " + edad + ". El año de tu carro es: " + añoCarro + ". El precio de tu carro es: " + precioCarro + ".");

        const calcularPolizaMensual = (fraccionPoliza, precio) => {
            let polizaMensual = fraccionPoliza * precio;
            return polizaMensual;
        }

        alert("El seguro del seguro mensual para tu auto es de: $" + calcularPolizaMensual(fraccionPoliza, parseFloat(precioCarro)));
    }

    reiniciar = prompt("¿Deseas calcular otra póliza? (S/N)");

    reiniciar = reiniciar.toUpperCase();
}

alert("Gracias por usar la calculadora de póliza de seguro para tu auto. ¡Hasta luego!");
