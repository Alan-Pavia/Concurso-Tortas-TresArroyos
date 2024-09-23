import * as fs from "readline-sync";

/*### ¡Gran Concurso de Tortas de Tres Arroyos!:

Te toca ser jurado de un concurso de tortas, y el número de participantes puede variar. Tu tarea es pedir al usuario cuántos concursantes habrá y luego solicitar las puntuaciones de `Sabor`, `Presentación` y `Dificultad` para cada torta. Al final, debes determinar qué torta tiene el mayor puntaje. Y si hay empate? En ese caso, informaremos que se produjo un empate (no es necesario indicar si fueron dos o mas empates ni entre que tortas es el empate, solo basta con indicar que se produjo empate si al menos existe uno).

## Funciones a implementar:
-calcularPuntaje(sabor, presentacion, dificultad):
    Recibe tres números entre 1 y 5 que representan las puntuaciones de una torta y devuelve la suma de esos números (el puntaje total del pastel).
-determinarGanador():
    Utiliza la librería readline-sync para pedir al usuario el número de participantes, luego solicita las puntuaciones de cada uno de ellos y usa la función calcularPuntaje para determinar la torta con el mayor puntaje.

*Si lo consideran necesario, pueden implementar funciones extra. */

function calcularPuntaje(sabor: number, presentacion: number, dificultad: number): number {
    return sabor + presentacion + dificultad;
}

// Función para validar puntajes entre 1 y 5
function obtenerPuntajeValido(tipo: string): number {
    let puntaje = fs.questionInt(`Puntuacion de ${tipo} (1-5): `);
    while (puntaje < 1 || puntaje > 5) {
        console.log(`La puntuacion de ${tipo} debe ser entre 1 y 5.`);
        puntaje = fs.questionInt(`Puntuacion de ${tipo} (1-5): `);
    }
    return puntaje;
}

function determinarGanador(): void {
    let numConcursantes = fs.questionInt("Cuantos concursantes habra? ");

    // Validación de que el número de concursantes sea mayor que 0
    while (numConcursantes <= 0) {
        console.log("Debe haber al menos un concursante.");
        numConcursantes = fs.questionInt("Cuantos concursantes habra? ");
    }


    let maxPuntaje = 0;
    let numeroGanador = 0;
    let hayEmpate = false;

    for (let i = 1; i <= numConcursantes; i++) {
        console.log(`\nConcursante n° ${i}:`);
        
        const sabor = obtenerPuntajeValido('Sabor');
        const presentacion = obtenerPuntajeValido('Presentacion');
        const dificultad = obtenerPuntajeValido('Dificultad');

        const puntajeTotal = calcularPuntaje(sabor, presentacion, dificultad);

        console.log(`\nPuntuacion total: ${puntajeTotal}`);

        /*Verifico el ganador del concurso  se actualiza el puntaje máximo y se verifica si hay empates, permitiendo saber quien gano o si hay un empate */
        if (puntajeTotal > maxPuntaje) {
            maxPuntaje = puntajeTotal;
            numeroGanador = i;
            hayEmpate = false;
        } else if (puntajeTotal === maxPuntaje) {
            hayEmpate = true;
        }
    }

    if (hayEmpate) {
        console.log('\nSe produjo un empate.');
    } else {
        console.log(`\nEl ganador es el concursante ${numeroGanador} con ${maxPuntaje} puntos.`);
    }
}

//Ejecuto el programa
determinarGanador();