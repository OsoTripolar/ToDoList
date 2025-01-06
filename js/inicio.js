// Esta función retorna el valor del ProxIndex (LocalStorage),
// si no existe esa clave limpia el LocaStorage,
// le asigna la clave ProxIndex con el valor 0 y retorna esto mismo

export default function asignarKeyProxIndex(){

    if(localStorage.length === 0){ 
        
        localStorage.setItem('proxIndex', '0');
        return 0;

    }else{

        if(localStorage.getItem('proxIndex') !== null){

            //Si entra es porque proxIndex existe
            return parseInt(localStorage.getItem('proxIndex'));
            
        }else{
            
            localStorage.clear();
            asignarKeyProxIndex();
            
        }
    }
}