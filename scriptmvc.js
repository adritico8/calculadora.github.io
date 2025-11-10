//MODELO
const Modelo = (() => {
    const evaluarExpresion = (expresion) => {
        try {
            return eval(expresion);
        } catch {
            return 'ERROR';
        }
    };

    return {
        evaluarExpresion
    };
})();

// VISTA
const Vista = (() => {
    const pantalla = document.querySelector('.pantalla');

    const actualizarPantalla = (valor) => {
        pantalla.textContent = valor;
    };

    const obtenerContenidoPantalla = () => pantalla.textContent;

    return {
        actualizarPantalla,
        obtenerContenidoPantalla
    };
})();

// CONTROLADOR
const Controlador = ((Vista, Modelo) => {
    const botones = document.querySelectorAll('.btn');

    const manejarClick = (boton) => {
        const valor = boton.textContent;
        const id = boton.id;
        const pantallaActual = Vista.obtenerContenidoPantalla();

        if (id === 'c') {
            Vista.actualizarPantalla('0');
        } else if (id === 'borrar') {
            if (pantallaActual.length === 1 || pantallaActual === 'ERROR') {
                Vista.actualizarPantalla('0');
            } else {
                Vista.actualizarPantalla(pantallaActual.slice(0, -1));
            }
        } else if (id === 'igual') {
            const resultado = Modelo.evaluarExpresion(pantallaActual);
            Vista.actualizarPantalla(resultado);
        } else {
            if (pantallaActual === '0' || pantallaActual === 'ERROR') {
                Vista.actualizarPantalla(valor);
            } else {
                Vista.actualizarPantalla(pantallaActual + valor);
            }
        }
    };

    const iniciar = () => {
        botones.forEach(boton => {
            boton.addEventListener('click', () => manejarClick(boton));
        });
    };

    return {
        iniciar
    };
})(Vista, Modelo);

// Iniciar la app
Controlador.iniciar();
