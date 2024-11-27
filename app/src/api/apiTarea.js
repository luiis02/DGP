import { ipAddress } from "./config";

export const getTareaComanda = async () => { 
    try {
        const response = await fetch(`http://${ipAddress}:5000/comanda`);
        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al obtener las tareas de la comanda');
        }
    } catch(error){
        console.error("Error al obtener las tareas de la comanda:", error.message);
        throw error;
    }
} 

export const postTareaComanda = async (requestData) =>{
    try{
        console.log(requestData)
        const response = await fetch(`http://${ipAddress}:5000/comanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // Enviamos los datos de la tarea
        });

        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al actualizar la tarea de la comanda');
        }
    }catch(error){
        console.error("Error al actualizar la tarea de la comanda:", error.message);
        throw error;
    }
}

export const putTareaComanda = async (id, requestData) => {
    try{
        const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // Enviamos los datos de la tarea
        });

        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al actualizar la tarea de la comanda');
        }
    }catch(error){
        console.error("Error al actualizar la tarea de la comanda:", error.message);
        throw error;
    }
}

export const deleteTareaComanda = async (id) => {
    try{
        const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            console.log(`Tarea con ID ${id} eliminada correctamente.`);
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al eliminar la tarea de la comanda');
        }
    }catch(error){
        console.error("Error al eliminar la tarea de la comanda:", error.message);
        throw error;
    }
}

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
        console.error("Error al obtener las tareas del alumno:", error.message);
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
            console.log("Respuesta del servidor:", data);
            return data;
        } else {
            console.error("Error al asignar estudiante a la tarea", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
