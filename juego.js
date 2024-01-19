//Empezamos el juego con 3 vidas cada uno y una bala en la recámara. 
//Contamos con 3 posibilidades para jugarç (disparar(si no se protege pierde una vida el rival), protegerse y recargar (añadien))

const juego = require("prompt-sync")({ sigint: true })

let nombre = juego("[+] ¿Cómo te llamas? --> ")
console.log("\n[+] Buenas " + nombre)
console.log("[+] Jugarás contra la máquina hasta que alguno de los 2 se quede sin vidas.")
console.log("\n[+] Tienes 3 acciones posibles:")
console.log("\n[+] RECARGAR: Añades una bala a la recámara.")
console.log("[+] DISPARAR: Restas 1 vida al rival si no se protege.")
console.log("[+] PROTEGER: En caso de que el rival te dispare no pierdes vida.")
console.log("\n[+] Comienzas con 3 vidas y una bala en la recámara")

//VARIABLES

let vidasJugador = 3
let balasJugador = 1

let vidasMaquina = 3
let balasMaquina = 1


let acciones = ['R', 'D', 'P']

let jugador = 1

let maquina = 0

let accionJugador

//BUCLE PRINCIPAL

while (vidasJugador > 0 && vidasMaquina > 0) {
    accionJugador = conseguirAccion()
    let accionMaquina = obtenerAccionAleatoria()
    ejecutarAcciones(jugador, accionJugador, accionMaquina)
    ejecutarAcciones(maquina, accionMaquina, accionJugador)
    console.log("\n[+] " + nombre + " tienes " + vidasJugador + " vidas y " + balasJugador + " balas")
    console.log("[+] La máquina tiene " + vidasMaquina + " vidas y " + balasMaquina + " balas\n\n")
}

if (vidasMaquina == 0){
    console.log("\n[+] ¡FELICIDADES " + nombre + "! - HAS GANADO LA PARTIDA [+]")
} else {
    console.log("\n[-] ¡LO SENTIMOS " + nombre + "! - HAS PERDIDO LA PARTIDA [-]")
}


//FUNCIONES

function recargar(sujeto) {
    if (sujeto == 0) {
        balasMaquina++
    }
    if (sujeto == 1) {
        balasJugador++
    }
}

function disparar(sujeto, accionJugador, accionMaquina) {
    if (sujeto == 0) {
        if (balasMaquina > 0) {
            balasMaquina--;
            if (accionJugador === 'P') {
               
            } else {
                vidasJugador = (accionMaquina === 'P') ? vidasJugador : vidasJugador - 1;
            }
        } else {
            recargar(sujeto);
        }
    }
    if (sujeto == 1) {
        if (balasJugador > 0) {
            balasJugador--;
            if (accionMaquina === 'P') {
                
            } else {
                vidasMaquina = (accionJugador === 'P') ? vidasMaquina : vidasMaquina - 1;
            }
        } else {
            console.log("\n[!] No tienes balas, utiliza otra acción");
            conseguirAccion();
        }
    }
}



function proteger() {
    
}


function obtenerAccionAleatoria() {
    let accionAleatoria = Math.floor(Math.random() * acciones.length);
    return acciones[accionAleatoria];

}

function conseguirAccion() {
    let accionJugador = juego("[+] ¿Qué acción quieres realizar?: R - D - P --> ")
    while (accionJugador !== 'R' && accionJugador !== 'D' && accionJugador !== 'P') {
        accionJugador = juego("[!] Esa letra no corresponde a ninguna acción" +
            "\n[+] ¿Qué acción quieres realizar?: R - D - P --> ")
    }
    return accionJugador
}

function getNombreAccion(accion) {
    if (accion == 'R') {
        return 'recargar'
    } else if (accion == 'D') {
        return 'disparar'
    } else if (accion == 'P') {
        return 'proteger'
    }
}

function ejecutarAcciones(sujeto, accion, accion2) {
    let nombreSujeto = sujeto === 0 ? "[+] La máquina decide" : "\n[+] Tú decides"
    let nombreAccion = getNombreAccion(accion)

    switch (accion) {
        case 'R':
            recargar(sujeto)
            break;
        case 'D':
            disparar(sujeto, accion, accion2)
            break;
        case 'P':
            proteger()
            break;
    }

    console.log(nombreSujeto + " " + nombreAccion)
}



