import limpiarInput from "./limpiarInput.js"
import errorMessage from "./errorMessage.js"

const popup = document.querySelector('.popup')
const input = document.querySelector('input')

export default function mostrarTareas(){

    const listaTareas = document.querySelector('.conjunto-tareas')

    listaTareas.innerHTML = ""; // limpiamos el campo 

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
            const botonEditar = clone.querySelector('.boton-editar');
            const botonListar = clone.querySelector('.boton-listar');
            
            // Modificación de Elementos
            p.textContent = tareaFormatoObjeto.tarea;
            divTarea.setAttribute('data-id', i )
            
            // Dependiendo del array aplicamos clases
            if(tareaFormatoObjeto.marcado){
                divTarea.classList.add('listado')
            }
            
            // Boton Borrar
            botonBorrar.addEventListener('click', ()=>{
                
                localStorage.removeItem(i);
                mostrarTareas();
                
                if (localStorage.length == 1){
                    console.log("Todas la tareas han sido eliminadas");
                    localStorage.setItem("proxIndex", 0) // Reiniciamos 
                }
                
            })
            
            // Boton Listar
            botonListar.addEventListener('click', ()=>{
                
                // Funciona como un toogle
                tareaFormatoObjeto.marcado = !tareaFormatoObjeto.marcado;
                // Regresamos con el valor que define el estilo cambiado
                localStorage.setItem(i, JSON.stringify(tareaFormatoObjeto));
                
                mostrarTareas();
            })
            
            //Boton Editar
            botonEditar.addEventListener('click', abrirPopup)
            
            // Añadimos al DOM
            listaTareas.appendChild(clone)
        }
    }
}




function generarBotonListar(){

    // Funciona como un toogle
    tareaFormatoObjeto.marcado = !tareaFormatoObjeto.marcado;
    // Regresamos con el valor que define el estilo cambiado
    localStorage.setItem(i, JSON.stringify(tareaFormatoObjeto));
    
    mostrarTareas();
    
}



async function abrirPopup(i) {
    
    popup.classList.add('popup--visible');

    const inputPopup = document.querySelector('.popup input');
    const buttonPopupCancelar = document.getElementById('cancelar-popup');
    const buttonPopupEditar = document.getElementById('editar-popup');

    limpiarInput(inputPopup);

    
    await new Promise ((resolve) =>{

        const tareaID =  i.target.parentNode.parentNode.getAttribute('data-id');

        const editarTarea = () =>{

            if (inputPopup.value !== ""){

                const tarea = JSON.parse(localStorage.getItem(tareaID))
                tarea.tarea = inputPopup.value
                localStorage.setItem(tareaID, JSON.stringify(tarea));

                mostrarTareas();
                resolve();

                buttonPopupEditar.removeEventListener('click', editarTarea);
                buttonPopupCancelar.removeEventListener('click', cancelar)
                
            }
            else{
                errorMessage("El campo no puede estar vacío")
            }
            
        }
        
        const cancelar = () =>{
            
            resolve();
            limpiarInput(input)
    
            buttonPopupEditar.removeEventListener('click', editarTarea);
            buttonPopupCancelar.removeEventListener('click', cancelar);
        }
        
        buttonPopupEditar.addEventListener('click', editarTarea);
        
        buttonPopupCancelar.addEventListener('click', cancelar);
        
    });

    popup.classList.remove('popup--visible');   // Cerramos el Popup

}