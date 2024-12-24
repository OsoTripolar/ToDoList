// VERSION 2: medium

// En esta versión haremos la lista de tareas utilizando objetos

    // v1: solo templates
    // v2: objetos
    // v3: localStorage

const input = document.querySelector('input')
const botonNuevaTarea = document.getElementById('nueva-tarea')
const listaTareas = document.querySelector('.conjunto-tareas')
const borrarLista = document.getElementById('borrar-lista')

const tareasPendientes = ["estoy pendiente"]
const tareasHechas = []

// CREO QUE YA ESTÁ BIEN
botonNuevaTarea.addEventListener('click', ()=>{

    if (input.value !== ""){


        tareasPendientes.push(input.value)

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
    tareasPendientes.length = 0
    tareasHechas.length = 0

    console.log(tareasHechas);
    console.log(tareasPendientes);
    
    imprimirListas();
})



// CREO QUE ESTÁ BIEN
function limpiarInput(){
    input.value = "";
    input.focus();
}

function imprimirListas(){

    let auxIndexPendientes = 0;
    let auxIndexCompletadas = 0;

    // limpiar capo
    listaTareas.textContent = "";

    // imprimir completadas
    for(const pendientes of tareasHechas){

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
            tareasHechas.splice(indiceActual, 1);
            imprimirListas();
        })

        //Botón Listar
        botonListar.addEventListener('click', (e)=>{

            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor')
            tareasPendientes.push(tareasHechas[indiceActual])
            tareasHechas.splice(indiceActual, 1);
            imprimirListas();

        })
     
        // Agregar y resetear input
        listaTareas.appendChild(plantilla);

        console.log(auxIndexCompletadas);
        auxIndexCompletadas++;

    }

    
    // imprimir pendientes
    for(const pendientes of tareasPendientes){

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
            tareasPendientes.splice(indiceActual, 1);
            imprimirListas();
        
            
        })

        //Botón Listar
        botonListar.addEventListener('click', (e)=>{

            const indiceActual = e.target.parentElement.parentElement.getAttribute('data-valor') // obteniendo el indice
            tareasHechas.push(tareasPendientes[indiceActual]) // Añadiendo el valor actual a la otra array
            tareasPendientes.splice(indiceActual, 1);
            imprimirListas();

        })
     
        // Agregar y resetear input
        listaTareas.appendChild(plantilla);
        auxIndexPendientes++;
    }

}

function verListasEnConsola(){
    console.log("Pendientes");
    console.log(tareasPendientes);
    console.log("Completadas");
    console.log(tareasHechas);
}

function pintaArrays(arrayOrigen, arrayHermano, isThisAListadeArray){

    let auxIndice = 0;

    for(const tarea of arrayOrigen){

        verListasEnConsola();

        // Acceso y clonación del template
        const template = document.querySelector('template')
        const clone = document.importNode(template.content, true);

        // Seleccion de los elementos
        const divTarea = clone.querySelector('.tarea-botones');
        const p = clone.querySelector('p');
        const botonBorrar = clone.querySelector('.boton-eliminar');
        const botonListar = clone.querySelector('.boton-listar');
        divTarea.setAttribute('data-valor', auxIndice);
        p.textContent = tarea;

        // Dependiendo del array aplicamos clases
        if(isThisAListadeArray){
            divTarea.classList.add('listado')
        }

        // Boton Borrar
        botonBorrar.addEventListener('click', (e)=>{
            const divTareaActual = e.target.parentElement.parentElement
            const indexRef = divTareaActual.getAttribute.getAttribute('data-valor')
            
            arrayOrigen.splice(indexRef,1)
        })
        
        // Boton Listar
        botonListar.addEventListener('click', (e)=>{
            const divTareaActual = e.target.parentElement.parentElement
            const indexRef = divTareaActual.getAttribute.getAttribute('data-valor')

            arrayHermano.push(arrayOrigen[indexRef]);
            arrayOrigen.splice(indexRef, 1);

            verListasEnConsola();
        })

        auxIndice++;
        
        // Vuelve a Imprimir en Pantalla
        listaTareas.appendChild(divTarea);

    }

    verListasEnConsola();
}