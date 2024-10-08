const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSection = document.querySelectorAll(".slider-section");



btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

let operacion = 0;
let counter = 0;

function moveToRight() {
    if (counter >= (sliderSection.length - 1)) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
    } else {
        counter++;

        operacion = operacion + 100;
        slider.style.transform = `translate(-${operacion}%)`;
    }

}

function moveToLeft () {
    counter--;
    if (counter < 0) {
        counter = sliderSection.length - 1;
        operacion = 100 * (sliderSection.length - 1);
        slider.style.transform = `translate(-${operacion}%)`;
    }else {

        operacion = operacion - 100;
    slider.style.transform = `translate(-${operacion}%)`;
    }

}
function carritoSuma() {
    const almacenamiento = JSON.parse(localStorage.getItem("Cart")) || [];
    const cuenta = almacenamiento.reduce((acum, el) => acum + el.cantidad, 0);
    const addElement = document.querySelector("#sumatoria");
    addElement.innerText = cuenta;
}
carritoSuma();
