let carrito = JSON.parse(localStorage.getItem("Cart")) || [];
let productos = [];

const fetchProductos = async() => {
    const response = await fetch('./../JSON/celulares.json'); 
    productos = await response.json(); 
    renderizarProductos(productos); 
}

function addToCart(productoID) {
    const product = productos.find(p => p.id === productoID);
    const productoEnCarrito = carrito.find(p => p.id === productoID);

    if (!productoEnCarrito) {
        carrito.push({
            id: product.id,
            imagen: product.imagen,
            titulo: product.titulo,
            descrip: product.descrip,
            precio: product.precio,
            cantidad: 1
        });
    } else {
        productoEnCarrito.cantidad += 1;
    }
    

    localStorage.setItem("Cart", JSON.stringify(carrito));
    carritoSuma(); 
    Toastify({
        text: `Se agrego ${product.titulo} al Carrito.!`,        
        duration: 3000        
        }).showToast();
}

function carritoSuma() {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const cuenta = almacenamiento.reduce((acum, el) => acum + el.cantidad, 0);
    const addElement = document.querySelector("#sumatoria");
    addElement.innerText = cuenta;
}

function renderizarProductos(celulares) {
    const contCard = document.getElementById('productos');
    contCard.innerHTML = '';
    celulares.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList = "card";
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3 class="card--titulo">${producto.titulo}</h3>
            <p class="descr-producto">${producto.descrip}</p>
            <p class="precio">$${producto.precio}</p>
            <button onclick="addToCart(${producto.id})" class="card--btn">Agregar al carrito</button>
        `;
        contCard.appendChild(productoDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchProductos(); 
    carritoSuma(); 
});
