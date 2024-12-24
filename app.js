const input = document.querySelector('input')
const botonNuevaTarea = document.getElementById('nueva-tarea')
const listaTareas = document.querySelector('.conjunto-tareas')

botonNuevaTarea.addEventListener('click', ()=>{

    if (input.value !== ""){


        const plantilla = document.querySelector('template').content.cloneNode(true)
        const p = plantilla.firstElementChild.firstElementChild // etiqueta p
        const botonBorrar = plantilla.firstElementChild.lastElementChild.lastElementChild;
        const botonListar = plantilla.firstElementChild.lastElementChild.firstElementChild;
        
        // Asignamos el contenido del input
        p.textContent = input.value 
        
        // Botón Borrar
        botonBorrar.addEventListener('click', (e)=>{
            e.target.parentElement.parentElement.remove();
        })

        //Botón Listar
        botonListar.addEventListener('click', (e)=>{
            e.target.parentElement.parentElement.classList.toggle('listado') 
        })
     
        // Agregar y resetear input
        listaTareas.appendChild(plantilla);
        input.value = "";

        input.focus();
    }
});

input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        botonNuevaTarea.click();
    }
})