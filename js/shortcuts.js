// Esta función asigna EventListeners a los input y les asigna atajos

export default function activarShortcuts(){
    
    const inputPopup = document.querySelector('.popup input');
    const buttonPopupEditar = document.getElementById('editar-popup');
    const buttonPopupCancelar = document.getElementById('cancelar-popup');
    const input = document.querySelector('input')
    const botonNuevaTarea = document.getElementById('nueva-tarea')

    input.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'){
            botonNuevaTarea.click(); 
        }
        if(e.key === 'Escape'){
            input.blur()
        }
    })

    inputPopup.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'){
            buttonPopupEditar.click();
        }
        
        if(e.key === 'Escape'){
            buttonPopupCancelar.click();
        }
    })

}