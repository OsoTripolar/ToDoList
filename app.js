// VERSION 2: medium

// En esta versión haremos la lista de tareas utilizando objetos

    // v1: solo templates
    // v2: objetos
    // v3: localStorage

const input = document.querySelector('input')
const botonNuevaTarea = document.getElementById('nueva-tarea')
const listaTareas = document.querySelector('.conjunto-tareas')
const botonBorrarLista = document.getElementById('borrar-lista')

const tareasPendientes = []
const tareasHechas = []

botonNuevaTarea.addEventListener('click', ()=>{

    if (input.value !== ""){
        tareasPendientes.push(input.value)
    }

    imprimirListas();
    limpiarInput();
});

function imprimirListas(){

    // limpiar campo
    listaTareas.textContent = "";

    // imprimir las tareas
    mostrarListas(tareasHechas, tareasPendientes,true)
    mostrarListas(tareasPendientes,tareasHechas, false)

}

botonBorrarLista.addEventListener('click', ()=>{
    tareasPendientes.length = 0
    tareasHechas.length = 0
    
    imprimirListas();
})

//El tercer parámetro debe ser un booleano, solo colocar true si el primer parámetro necesita estilos de elemento marcado
function mostrarListas(arrayOrigen, arrayHermano, aparienciaDeListado){

    let auxIndice = 0;

    for(const tarea of arrayOrigen){

        // Acceso y clonación del template
        const template = document.querySelector('template')
        const clone = document.importNode(template.content, true);

        // Seleccion de los elementos
        const divTarea = clone.querySelector('.tarea');
        const p = clone.querySelector('p');
        const botonBorrar = clone.querySelector('.boton-eliminar');
        const botonListar = clone.querySelector('.boton-listar');

        // Modificación de Elementos
        divTarea.setAttribute('data-valor', auxIndice);
        p.textContent = tarea;

        // Dependiendo del array aplicamos clases
        if(aparienciaDeListado){
            divTarea.classList.add('listado')
        }

        // Boton Borrar
        botonBorrar.addEventListener('click', (e)=>{
            const divTareaActual = e.target.parentElement.parentElement
            const indexRef = divTareaActual.getAttribute('data-valor')
            
            //elimina el elemento del array
            arrayOrigen.splice(indexRef,1);

            imprimirListas();
        })
        
        // Boton Listar
        botonListar.addEventListener('click', (e)=>{
            const divTareaActual = e.target.parentElement.parentElement
            const indexRef = divTareaActual.getAttribute('data-valor')

            // añade el elemento al arrat contrario
            arrayHermano.push(arrayOrigen[indexRef]);
            // elimina ese elemento del array actual
            arrayOrigen.splice(indexRef, 1);

            imprimirListas();
        })

        auxIndice++;
        
        // Lo añade al DOM
        listaTareas.appendChild(clone);

    }
}

// Funcion para testear
function verListasEnConsola(){
    console.log("Pendientes");
    console.log(tareasPendientes);
    console.log("Completadas");
    console.log(tareasHechas);
}

// Atajo tecla ENTER
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        botonNuevaTarea.click(); 
    }
})

function limpiarInput(){
    input.value = "";
    input.focus();
}