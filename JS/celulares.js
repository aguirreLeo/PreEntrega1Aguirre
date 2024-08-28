const celulares = [
    {
        id: 1,
        imagen: "./../img/celulares/S24.jpg",
        titulo: "Samsung S24 Ultra",
        descrip: "512gb/12ram",
        precio: 2499000,
    },
    {
        id: 2,
        imagen: "./../img/celulares/A54.jpg",
        titulo: "Samsung Galaxy A54 5G 256 GB",
        descrip: "Awesome graphite 8 GB RAM",
        precio: 892.999,
    },
    {
        id: 3,
        imagen: "./../img/celulares/ZFlip.jpg",
        titulo: "Samsung Galaxy Z Flip3",
        descrip: "Lavender 128gb 8gb Ram 5g",
        precio: 2799998,
    },
    {
        id: 4,
        imagen: "./../img/celulares/iphone-14.jpg",
        titulo: "Apple iPhone 14",
        descrip: "(128 GB) - Azul",
        precio: 1675680,
    },
    {
        id: 5,
        imagen: "./../img/celulares/iphone-14-pro-max.jpg",
        titulo: "Apple iPhone 14 Pro Max",
        descrip: "(128 GB) - Negro espacial",
        precio: 2999990,
    },
    {
        id: 6,
        imagen: "./../img/celulares/iphone-15-pro-max.jpg",
        titulo: "Apple iPhone 15 Pro Max (256 GB)",
        descrip: "Titanio Negro - Distribuidor Autorizado",
        precio: 4699900,
    },
    {
        id: 7,
        imagen: "./../img/celulares/Razr40.jpg",
        titulo: "Motorola RAZR 40 256 GB",
        descrip: "Gris mate 8 GB RAM",
        precio: 1299999,
    },
    {
        id: 8,
        imagen: "./../img/celulares/Edge50.jpg",
        titulo: "Moto Edge 30 Ultra 256gb",
        descrip: "Blanco Smartphone Motorola",
        precio: 1539999,
    },
    {
        id: 9,
        imagen: "./../img/celulares/G84.jpg",
        titulo: "Moto G84 5g",
        descrip: "Color Viva magenta",
        precio: 599.999,
    }
];


let carrito = [];

function addToCart(productoID) {
    const product = celulares.find(p => p.id === productoID);
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
}

function carritoSuma() {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const cuenta = almacenamiento.reduce((acum, el) => acum + el.cantidad, 0);
    const addElement = document.querySelector("#sumatoria");
    addElement.innerText = cuenta;
}

document.addEventListener("DOMContentLoaded", function () {
    function renderizarProductos() {
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

    renderizarProductos();
    carritoSuma(); 
});
