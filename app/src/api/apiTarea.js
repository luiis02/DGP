import { ipAddress } from "./config";

// Obtener todas las tareas de un alumno:
export const getTareasAlumno = async (idAlumno) => { 
    try {
        const response = await fetch(`http://${ipAddress}:5000/tareas/${idAlumno}`);
        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al obtener las tareas del alumno');
        }
    } catch(error){
        throw new Error("Error al obtener las tareas del alumno:", error.message);
        throw error;
    }
} 

// función para asignar un estudiante a una tarea
export const postTareaEstudiante = async (tareaId, estudianteId)=>{
    try {
        const response = await fetch(`/asignar_estudiante/${tareaId}/${estudianteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Error en la solicitud:", error);
    }
}

export const postTareaJuego = async (url) => {
    try{
        const response = await fetch(`http://${ipAddress}:5000/juego`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url}), // Enviamos los datos del juego
        });

        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al enviar la URL del juego');
        }
    }catch(error){
        throw new Error("Error al enviar la URL del juego:", error.message);
    }
}

export const getTareasJuego = async () => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/juego`);
        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        } else{
            throw new Error('Error al obtener las URLs de los juegos');
        }
    } catch(error){
        throw new Error("Error al obtener las URLs de los juegos:", error.message);
        throw error;
    }
}

export const deleteTareaJuego = async (id) => {
    try{
        const response = await fetch(`http://${ipAddress}:5000/juego/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            console.log(response)
            return await response.json();  // Retorna la respuesta si es exitosa
        } else{
            throw new Error('Error al eliminar la URL del juego');
        }
    }catch(error){
        throw new Error("Error al eliminar la URL del juego:", error.message);
    }
}

export const getAllTareas = async (id) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/allTareas/${id}`);
        console.log(response)
        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        } else{
            throw new Error('Error al obtener todas las tareas');
        }
    } catch(error){
        throw new Error("Error al obtener todas las tareas:", error.message);
        throw error;
    }
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// Para las tareas de comanda de comedor:
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

export const createTareaComanda = async (tarea) => { 
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarea), // Convierte la tarea a JSON
        });

        if (response.ok) {
            return await response.json(); // Devuelve los datos de la respuesta
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al crear la tarea de comanda:', error.message);
        throw error;
    }
};

export const getAllTareasComanda = async () => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda`);

        if (response.ok) {
            return await response.json(); // Devuelve todas las tareas de comanda
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al obtener todas las tareas de comanda:', error.message);
        throw error;
    }
};

export const getTareasComandaPorAlumno = async (alumnoId) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda/${alumnoId}`);

        if (response.ok) {
            return await response.json(); // Devuelve las tareas del alumno
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al obtener las tareas de comanda para el alumno ${alumnoId}:`, error.message);
        throw error;
    }
};

export const updateTareaComanda = async (id, tarea) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarea), // Envía los datos actualizados
        });

        if (response.ok) {
            return await response.json(); // Devuelve la respuesta del servidor
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al actualizar la tarea de comanda ${id}:`, error.message);
        throw error;
    }
};

export const deleteTareaComanda = async (id) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return await response.json(); // Devuelve el resultado de la eliminación
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al eliminar la tarea de comanda ${id}:`, error.message);
        throw error;
    }
};



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// Para operar con los menús:
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

export const createMenu = async (menu) => { 
    try {
        const response = await fetch(`http://${ipAddress}:5000/menus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menu), // Convierte el objeto del menú a JSON
        });

        if (response.ok) {
            return await response.json(); // Devuelve los datos del nuevo menú
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al crear el menú:', error.message);
        throw error;
    }
};

export const getAllMenus = async () => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/menus`);

        if (response.ok) {
            return await response.json(); // Devuelve todos los menús
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al obtener los menús:', error.message);
        throw error;
    }
};

export const getMenuById = async (id) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/menus/${id}`);

        if (response.ok) {
            return await response.json(); // Devuelve el menú específico
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al obtener el menú con ID ${id}:`, error.message);
        throw error;
    }
};

export const updateMenu = async (id, menu) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/menus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menu), // Envía los datos actualizados
        });

        if (response.ok) {
            return await response.json(); // Devuelve los datos del menú actualizado
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al actualizar el menú con ID ${id}:`, error.message);
        throw error;
    }
};

export const deleteMenu = async (id) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/menus/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return await response.json(); // Devuelve el resultado de la eliminación
        } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error al eliminar el menú con ID ${id}:`, error.message);
        throw error;
    }
};