
function carritoSuma() {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const cuenta = almacenamiento.reduce((acum, el) => acum + el.cantidad, 0);
    const addElement = document.querySelector("#sumatoria");
    addElement.innerText = cuenta;
}

const unidadesElement = document.querySelector(".unidades");
const precioElement = document.querySelector(".precio");

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("Cart")) || [];
    let unidades = 0;
    let precioTotal = 0;

    if (productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precioTotal += producto.precio * producto.cantidad;
        });

        unidadesElement.innerText = unidades;
        precioElement.innerText = precioTotal.toLocaleString(); 
    } else {
        unidadesElement.innerText = 0;
        precioElement.innerText = 0;
    }
}


function incrementarCantidad(productoID) {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const productoEnCarrito = almacenamiento.find(p => p.id === productoID);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        localStorage.setItem("Cart", JSON.stringify(almacenamiento)); 
        renderizarProductos(); 
        carritoSuma();
        actualizarTotales ()
        revisarMensajeVacio()
    }
}


function disminuirCantidad(productoID) {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const productoEnCarrito = almacenamiento.find(p => p.id === productoID);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad -= 1; 

        if (productoEnCarrito.cantidad === 0) {
            const indiceProducto = almacenamiento.indexOf(productoEnCarrito);
            almacenamiento.splice(indiceProducto, 1);
        }

        localStorage.setItem("Cart", JSON.stringify(almacenamiento)); 
        renderizarProductos(); 
        carritoSuma();
        actualizarTotales ()
        revisarMensajeVacio()
    }
}
function eliminarProducto(productoID) {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const productoEnCarrito = almacenamiento.find(p => p.id === productoID);

    if (productoEnCarrito) { 
        const indiceProducto = almacenamiento.indexOf(productoEnCarrito);
        almacenamiento.splice(indiceProducto, 1);

        localStorage.setItem("Cart", JSON.stringify(almacenamiento)); 
        renderizarProductos(); 
        carritoSuma();
        actualizarTotales ()
        revisarMensajeVacio()
    }
}

function renderizarProductos() {
    const produc = JSON.parse(localStorage.getItem("Cart")) || [];
    const contCard = document.getElementById('productos');
    contCard.innerHTML = '';
    produc.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList = "card";
        productoDiv.innerHTML = `
            <div class="contendedor-carrito">
                <img class="imgCarrito" src="${producto.imagen}" alt="${producto.titulo}">
                <h3 class="card--tituloCarrito">${producto.titulo}</h3>
                <p class="precioCarrito">$${producto.precio}</p>
                <button class="menosCarrito">-</button>
                <span class="spanCarrito">${producto.cantidad}</span>
                <button class="masCarrito">+</button>
            </div>
            <div class="cont-eliminar">
            <button id="eliminarProducto"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
        contCard.appendChild(productoDiv);
        productoDiv.querySelector(".masCarrito").addEventListener("click", () => incrementarCantidad(producto.id));
        productoDiv.querySelector(".menosCarrito").addEventListener("click", () => disminuirCantidad(producto.id));
        productoDiv.querySelector("#eliminarProducto").addEventListener("click", () => eliminarProducto(producto.id));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderizarProductos(); 
    carritoSuma();
    actualizarTotales ()
    revisarMensajeVacio()
});

const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");


function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("Cart"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length>0);
    totalesElement.classList.toggle("escondido", !(productos && productos.length>0));
}

revisarMensajeVacio();