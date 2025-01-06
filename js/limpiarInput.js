// Limpia los inputs y enfoca al input asignado en el parámetro

export default function limpiarInput(inputFocus){

    const inputPopup = document.querySelector('.popup input')
    const input = document.querySelector('input')

    input.value = "";
    inputPopup.value = "";

    inputFocus.focus();
    
}