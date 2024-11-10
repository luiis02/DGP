const urlArasaac = 'https://static.arasaac.org/pictograms';

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