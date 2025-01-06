const boton1 = document.querySelector('.boton-1')
const boton2 = document.querySelector('.boton-2')
const boton3 = document.querySelector('.boton-3')
const input = document.querySelector('input')

boton3.addEventListener('click', esperarBoton);

// FUNCION;

function esperarBoton() {

    console.log("se apreto el boton 3");
        
    boton1.addEventListener('click', imprimir)
    boton2.addEventListener('click', imprimir)

    console.log("se resolvio");
    
}

function imprimir(){
    console.log("impriir");
}

async function esperarBoton() {

    console.log("se apreto el boton 3");
    
    await new Promise((resolve) =>{

        const accionBoton1 = ()=> { 
            
            resolve();
            boton1.removeEventListener('click',accionBoton1)
            boton2.removeEventListener('click',accionBoton2)
            console.log("click en boton 1");
        };
        
        const accionBoton2 = ()=> { 
            
            console.log("click en boton 2");
            resolve();
            boton1.removeEventListener('click',accionBoton1)
            boton2.removeEventListener('click',accionBoton2)
        };
        
        boton1.addEventListener('click',accionBoton1);
        boton2.addEventListener('click',accionBoton2);

    }) 

    console.log("La Ejecución terminó");
    
}

console.log("todo ya se leyó");





// async function esperarBoton() {


//     console.log("Se apretó el botón 3");
  
//     await new Promise((resolve) => {
//       const listener1 = () => {
//         if (input.value === "estefi") {
//           resolve();
//           boton1.removeEventListener('click', listener1); // Elimina el listener
//           boton2.removeEventListener('click', listener2); // Elimina el listener
//         }
//       };
  
//       const listener2 = () => {
//         console.log("xd");
//         resolve();
//         boton1.removeEventListener('click', listener1); // Elimina el listener
//         boton2.removeEventListener('click', listener2); // Elimina el listener
//       };
  
//       boton1.addEventListener('click', listener1);
//       boton2.addEventListener('click', listener2);
//     });
// }