import asignarKeyProxIndex from "./inicio.js"
import mostrarTareas from "./mostrarTareas.js"
import limpiarInput from "./limpiarInput.js"
import errorMessage from "./errorMessage.js"
import activarShortcuts from "./shortcuts.js"

const botonNuevaTarea = document.getElementById('nueva-tarea')
const botonBorrarLista = document.getElementById('borrar-lista')
const input = document.querySelector('input')

let auxIndex = asignarKeyProxIndex();

mostrarTareas();

botonNuevaTarea.addEventListener('click', generarNuevaTarea);
botonBorrarLista.addEventListener('click', borrarLista);

function generarNuevaTarea(){
    
    if (input.value !== ""){

        // Creamos el objeto de nueva tarea
        const nuevaTarea = {
            tarea : input.value,
            marcado: false,
        }   
        
        // Añadimos el objeto al localStorage
        localStorage.setItem(auxIndex, JSON.stringify(nuevaTarea))
        // Aumentamos el N° del proxIndex
        auxIndex++;
        localStorage.setItem('proxIndex', auxIndex)
        mostrarTareas();
        limpiarInput(input);
        
    }else{
        errorMessage("No puedes crear una tarea vacía")
    }

}

function borrarLista(){

    if(localStorage.length === 1){
        errorMessage("la lista está vacía")
       }else{
           localStorage.clear();
           localStorage.setItem('proxIndex', '0')
           mostrarTareas();
       }

}

activarShortcuts();