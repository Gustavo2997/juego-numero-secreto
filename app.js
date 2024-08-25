//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Juego del número secreto';

//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un número del 1 al 10';

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); 
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//Esta es la forma larga de usar la función limpiarCaja:
/*function limpiarCaja() {
   let valorCaja = document.querySelector('#valorUsuario');
   valorCaja.value = '';
}*/

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Preguntarle a la lista si ya sorteo todos los números:
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
         // Veamos si el número generado está en la lista:
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
          } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
         } 
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juega al número secreto');
    asignarTextoElemento('p',`Indica un número entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Lo primero que hacemos para reiniciar juego es limpiar la caja, usamos esa función:
    limpiarCaja();
    //lo siguiente es:
    //Cambiar el texto, generar nuevamente el número secreto e inicializar el contador de intentos.
    //Para ello se agrupó esas tres cosas en una sola función llamada condicionesIniciales.
    condicionesIniciales();
    //Por último, deshabilitar el botón de nuevo juego mediante un elemento llamado setAttribute.
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();