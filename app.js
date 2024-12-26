// VERSION 2: medium

// En esta versión haremos la lista de tareas utilizando localStorage

    // v1: solo templates
    // v2: objetos
    // v3: localStorage

const input = document.querySelector('input')
const botonNuevaTarea = document.getElementById('nueva-tarea')
const listaTareas = document.querySelector('.conjunto-tareas')
const botonBorrarLista = document.getElementById('borrar-lista')

let auxIndex;

asignarKeyProxIndex();
mostrarListas();

// ------------ BOTONES ------------ //

botonNuevaTarea.addEventListener('click', ()=>{

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
        
    }

    mostrarListas();
    limpiarInput();

});

botonBorrarLista.addEventListener('click', ()=>{

    // Borra la lista y reasigna la proxIndex
    localStorage.clear();
    localStorage.setItem('proxIndex', '0')

    mostrarListas();
})

// ------------ FUNCIONES ------------ //

function asignarKeyProxIndex (){
    
    if(localStorage.length === 0){ 
        
        localStorage.setItem('proxIndex', '0')
        console.log("no había nada en el LocalStorage");
        auxIndex = 0;
        
    }else{
        auxIndex = parseInt(localStorage.getItem('proxIndex'));
    }
}

function mostrarListas(){

    // limpiamos el campo 
    listaTareas.innerHTML = "";

    // Recorremos el localStorage (no accede a la key proxIndex)
    for(let i = 0; i < parseInt(localStorage.getItem('proxIndex')); i++){

        //Tenemos que cerciorarnos de que el key exista
        if (localStorage.getItem(i) !== null){

            // convertimos la tarea a formato objeto
            const tareaFormatoObjeto = JSON.parse(localStorage.getItem(i)); 

            // Acceso y clonación del template
            const template = document.querySelector('template')
            const clone = document.importNode(template.content, true);

            // Seleccion de los elementos
            const divTarea = clone.querySelector('.tarea');
            const p = clone.querySelector('p');
            const botonBorrar = clone.querySelector('.boton-eliminar');
            const botonListar = clone.querySelector('.boton-listar');

            // Modificación de Elementos
            p.textContent = tareaFormatoObjeto.tarea;

            // Dependiendo del array aplicamos clases
            if(tareaFormatoObjeto.marcado){
                divTarea.classList.add('listado')
            }

            // Boton Borrar
            botonBorrar.addEventListener('click', ()=>{

                localStorage.removeItem(i);
                mostrarListas();

            })
            
            // Boton Listar
            botonListar.addEventListener('click', ()=>{

                // Funciona como un toogle
                tareaFormatoObjeto.marcado = !tareaFormatoObjeto.marcado;
                // Regresamos con el valor que define el estilo cambiado
                localStorage.setItem(i, JSON.stringify(tareaFormatoObjeto));

                mostrarListas();
            })

            // Añadimos al DOM
            listaTareas.appendChild(clone)

        }

    }
    
}

// ------------ ATAJOS ------------ //

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