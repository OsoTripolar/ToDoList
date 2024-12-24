// VERSION 2: medium

// En esta versión haremos la lista de tareas utilizando objetos

    // v1: solo templates
    // v2: objetos
    // v3: localStorage

const input = document.querySelector('input')
const botonNuevaTarea = document.getElementById('nueva-tarea')
const listaTareas = document.querySelector('.conjunto-tareas')
const borrarLista = document.getElementById('borrar-lista')

const listaTareasPendientes = []
const listaTareasCompletadas = []

let auxIndexPendientes = 0;
let auxIndexCompletadas = 0;


// CREO QUE YA ESTÁ BIEN
botonNuevaTarea.addEventListener('click', ()=>{

    if (input.value !== ""){


        listaTareasPendientes.push(input.value)

        // falta ponerle el índice

    }

    imprimirListas();
    limpiarInput();
});

// CREO QUE ESTÁ BIEN
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        botonNuevaTarea.click(); // DEBERÍA HACER LO MISMO CREO
    }
})



// MODIFICAR
borrarLista.addEventListener('click', ()=>{
    // listaTareas.textContent = "";
    // limpiarInput();
    listaTareasPendientes.length = 0
    listaTareasCompletadas.length = 0

    console.log(listaTareasCompletadas);
    console.log(listaTareasPendientes);
    
    imprimirListas();
})



// CREO QUE ESTÁ BIEN
function limpiarInput(){
    input.value = "";
    input.focus();
}

function imprimirListas(){

    console.log("Pendientes");
    console.log(listaTareasPendientes);
    console.log("Completadas");
    console.log(listaTareasCompletadas);

    // limpiar capo
    listaTareas.textContent = "";

    // imprimir completadas
    for(const pendientes of listaTareasCompletadas){

        const plantilla = document.querySelector('template').content.cloneNode(true)
        const p = plantilla.firstElementChild.firstElementChild // etiqueta p
        const botonBorrar = plantilla.firstElementChild.lastElementChild.lastElementChild;
        const botonListar = plantilla.firstElementChild.lastElementChild.firstElementChild;


        
        plantilla.firstElementChild.classList.add('listado');

        plantilla.firstElementChild.setAttribute('data-valor', auxIndexCompletadas);
        
        // Asignamos el contenido del input
        p.textContent = pendientes 
        
        // Botón Borrar
        botonBorrar.addEventListener('click', (e)=>{
            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor')
            listaTareasCompletadas.splice(indiceActual, 1);
            imprimirListas();
        })

        //Botón Listar
        botonListar.addEventListener('click', (e)=>{

            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor')
            listaTareasPendientes.push(listaTareasCompletadas[indiceActual])
            listaTareasCompletadas.splice(indiceActual, 1);
            imprimirListas();

        })
     
        // Agregar y resetear input
        listaTareas.appendChild(plantilla);

        console.log(auxIndexCompletadas);
        auxIndexCompletadas++;

    }

    
    // imprimir pendientes
    for(const pendientes of listaTareasPendientes){

        const plantilla = document.querySelector('template').content.cloneNode(true)
        const p = plantilla.firstElementChild.firstElementChild // etiqueta p
        const botonBorrar = plantilla.firstElementChild.lastElementChild.lastElementChild;
        const botonListar = plantilla.firstElementChild.lastElementChild.firstElementChild;

        plantilla.firstElementChild.setAttribute('data-valor', auxIndexPendientes);
        
        // Asignamos el contenido del input
        p.textContent = pendientes 
        
        // Botón Borrar
        botonBorrar.addEventListener('click', (e)=>{
            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor')
            listaTareasPendientes.splice(indiceActual, 1);
            imprimirListas();
        
            
        })

        //Botón Listar
        botonListar.addEventListener('click', (e)=>{

            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor') // obteniendo el indice
            listaTareasCompletadas.push(listaTareasPendientes[indiceActual]) // Añadiendo el valor actual a la otra array
            listaTareasPendientes.splice(indiceActual, 1);
            imprimirListas();

        })
     
        // Agregar y resetear input
        listaTareas.appendChild(plantilla);
        auxIndexPendientes++;
    }

    auxIndexCompletadas = 0;
    auxIndexPendientes = 0;
}
