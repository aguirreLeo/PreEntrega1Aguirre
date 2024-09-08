class Usuario {
    constructor(nombre, userName, password, avatar){
        this.nombre = nombre;
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
    }

    validarCredenciales(userName, password){
        return this.userName === userName && this.password === password;
    }
}

const usuarios = [
    new Usuario("Stewie Griffin", "Stewie", "1234", "https://w7.pngwing.com/pngs/871/498/png-transparent-stewie-griffin-lois-griffin-brian-griffin-peter-griffin-television-stewie-television-child-face-thumbnail.png"),
    new Usuario("Peter Griffin", "Peter", "1234", "https://w7.pngwing.com/pngs/879/318/png-transparent-peter-griffin-lois-griffin-chris-griffin-stewie-griffin-brian-griffin-chicken-from-family-guy-child-food-hand-thumbnail.png"),
    new Usuario("Glenn Quagmire", "Quagmire", "1234", "https://w7.pngwing.com/pngs/734/166/png-transparent-glenn-quagmire-peter-griffin-cleveland-brown-brian-griffin-family-guy-the-quest-for-stuff-family-guy-quagmire-television-food-hand-thumbnail.png")
];

const loginIcon = document.getElementById("login");


if (localStorage.getItem("sesionActiva")) {
    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));
    loginIcon.innerHTML = `<img src="${sesionActiva.avatar}" alt="Avatar">`;
}

loginIcon.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (localStorage.getItem("sesionActiva")) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se cerrará la sesión",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("sesionActiva");
                loginIcon.innerHTML = `<i class="fa-regular fa-user"></i>`;
            }
        });
    } else {
        // Login
        Swal.fire({
            title: "Iniciar Sesión",
            html: `<input type="text" id="username" class="swal2-input" placeholder="Usuario">
                   <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
            confirmButtonText: 'Iniciar Sesión',
            focusConfirm: false,
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value;
                const password = Swal.getPopup().querySelector('#password').value;
                if (!username || !password) {
                    Swal.showValidationMessage(`Por favor ingresa ambos campos`);
                    return false;
                }
                return { username, password };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { username, password } = result.value;
                const usuario = usuarios.find(u => u.validarCredenciales(username, password));

                if (usuario) {
                    localStorage.setItem("sesionActiva", JSON.stringify(usuario));
                    Swal.fire({
                        title: `¡Bienvenido, ${usuario.nombre}!`,
                        html: `<img src="${usuario.avatar}" alt="Avatar" style="width: 200px; border-radius: 50%;">`,
                        icon: 'success'
                    });
                    loginIcon.innerHTML = `<img src="${usuario.avatar}" alt="Avatar" style="width: 40px; border-radius: 50%;">`;
                } else {
                    Swal.fire("Error", "Usuario o contraseña incorrecto", "error");
                }
            }
        });
    }
});



