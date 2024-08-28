
function carritoSuma() {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const cuenta = almacenamiento.reduce((acum, el) => acum + el.cantidad, 0);
    const addElement = document.querySelector("#sumatoria");
    addElement.innerText = cuenta;
}


function incrementarCantidad(productoID) {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const productoEnCarrito = almacenamiento.find(p => p.id === productoID);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        localStorage.setItem("Cart", JSON.stringify(almacenamiento)); 
        renderizarProductos(); 
        carritoSuma(); 
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
        `;
        contCard.appendChild(productoDiv);
        productoDiv.querySelector(".masCarrito").addEventListener("click", () => incrementarCantidad(producto.id));
        productoDiv.querySelector(".menosCarrito").addEventListener("click", () => disminuirCantidad(producto.id));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderizarProductos(); 
    carritoSuma(); 
});
