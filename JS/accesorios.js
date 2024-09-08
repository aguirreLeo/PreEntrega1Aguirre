let carrito = JSON.parse(localStorage.getItem("Cart")) || [];
let productos = [];

const fetchProductos = async () => {
    const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=accesorios-celulares'); 
    const data = await response.json(); 
    productos = data.results;
    renderizarProductos(productos); 
};

function addToCart(productoID) {
    const product = productos.find(p => p.id === productoID);
    const productoEnCarrito = carrito.find(p => p.id === productoID);

    if (!productoEnCarrito) {
        carrito.push({
            id: product.id,
            imagen: product.thumbnail,
            titulo: product.title,
            descrp: product.condition,
            precio: product.price,
            cantidad: 1
        });
    } else {
        productoEnCarrito.cantidad += 1;
    }
    
    localStorage.setItem("Cart", JSON.stringify(carrito));
    carritoSuma(); 

    Toastify({
        text: `Se agregó ${product.title} al Carrito!`,        
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
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <h3 class="card--titulo">${producto.title}</h3>
            <p class="descr-producto">${producto.condition}</p>
            <p class="precio">$${producto.price}</p>
            <button onclick="addToCart('${producto.id}')" class="card--btn">Agregar al carrito</button>
        `;
        contCard.appendChild(productoDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchProductos(); 
    carritoSuma(); 
});

