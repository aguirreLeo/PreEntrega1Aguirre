class Producto {
    constructor(tipo, marca, precio) {
        this.tipo = tipo;
        this.marca = marca;
        this.precio = precio;
    }
    precioFinal() {
        let pFinal = this.precio + (this.precio * 0.21) + 2500;
        return pFinal;
    }
}

const compu = new Producto("Laptop", "Macbook", 1500000);
const celu = new Producto("Celular", "Iphone", 950000);
const tablet = new Producto("Tablet", "Samsung", 800000);
const auri = new Producto("Auricular", "Apple", 350400);
const cargador = new Producto("Cargador", "Samsung", 65000);

let carrito = [];

function mostrarDetallesProducto(producto) {
    console.table(producto);
    console.log("IVA: %21");
    console.log("Envío: $2500.");
    console.log("El precio final es: $" + producto.precioFinal().toFixed(2));
    alert("Puede realizar el pago en 1, 3 y 6 pagos sin interés. En 12 pagos queda con un recargo de 20%");
}

function calcularCuotas(producto, cuotas) {
    let precioFinal = producto.precioFinal();
    let montoCuota;

    switch (cuotas) {
        case 1:
            montoCuota = precioFinal;
            break;
        case 3:
            montoCuota = precioFinal / 3;
            break;
        case 6:
            montoCuota = precioFinal / 6;
            break;
        case 12:
            montoCuota = (precioFinal + (precioFinal * 0.20)) / 12;
            break;
        default:
            console.log("Valor no valido");
            return;
    }
    console.log(`Te queda en ${cuotas} pagos de $${montoCuota.toFixed(2)}`);
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log(`${producto.tipo} ha sido agregado al carrito.`);
}

function mostrarCarrito() {
    console.log("Productos en el carrito:");
        carrito.forEach((producto, recorrido) => {
            console.log(`${recorrido + 1}: ${producto.tipo} - ${producto.marca} - $${producto.precioFinal().toFixed(2)}`);
        });
    }

let seleccion = parseInt(prompt("Elija su producto a comprar: 1: Computadora | 2: Celular | 3: Tablet | 4: Auricular | 5: Cargador"));

while ((seleccion > 0 && seleccion < 6) || seleccion != "0") {
    let productoSeleccionado;

    switch (seleccion) {
        case 1:
            productoSeleccionado = compu;
            break;
        case 2:
            productoSeleccionado = celu;
            break;
        case 3:
            productoSeleccionado = tablet;
            break;
        case 4:
            productoSeleccionado = auri;
            break;
        case 5:
            productoSeleccionado = cargador;
            break;
        default:
            console.log("Selección no válida");
    }

    mostrarDetallesProducto(productoSeleccionado);

    let cuotas = parseInt(prompt("Elija la cantidad de cuotas a pagar: 1, 3, 6, o 12"));

    if (cuotas == 1 || cuotas == 3 || cuotas == 6 || cuotas == 12) {
        calcularCuotas(productoSeleccionado, cuotas);
    } else {
        console.log("Valor no válido");
    }

    agregarAlCarrito(productoSeleccionado);

    mostrarCarrito();

    seleccion = parseInt(prompt("Elija otro producto a comprar: 1: Computadora | 2: Celular | 3: Tablet | 4: Auricular | 5: Cargador | -- Presione 0 para salir"))
} 