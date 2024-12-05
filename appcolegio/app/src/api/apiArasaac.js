const urlArasaac = 'https://static.arasaac.org/pictograms';
const urlAll = 'https://api.arasaac.org/v1/pictograms/all/es';

export const obtenerPictograma = async (pictograma) => {
    try {
        const respuesta = await fetch(`${urlArasaac}/${pictograma}`);
        if (respuesta) {
            return respuesta.url;
        } else {
            console.error("No se encontró el pictograma.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el pictograma:", error);
        return null;
    }
};

export const allPictograms = async () => {
    try{
        const respuesta = await fetch(urlAll);
        if(respuesta){
            const pictogramas = await respuesta.json();
            return pictogramas
        }else{
            console.error("No se encontraron pictogramas.");
            return null; 
        }
    }catch (error) {
        console.error("Error al obtener los pictogramas:", error);
        return null;
    }
};