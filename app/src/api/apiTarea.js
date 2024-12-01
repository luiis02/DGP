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
        throw new Error("Error al obtener las tareas de la comanda:", error.message);
        throw error;
    }
} 

export const postTareaComanda = async (requestData) =>{
    try{
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
        throw new Error("Error al actualizar la tarea de la comanda:", error.message);
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
        throw new Error("Error al actualizar la tarea de la comanda:", error.message);
        throw error;
    }
}

export const deleteTareaComanda = async (id) => {
    try{
        const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            return await response.json();  // Retorna la respuesta si es exitosa
        }else{
            throw new Error('Error al eliminar la tarea de la comanda');
        }
    }catch(error){
        throw new Error("Error al eliminar la tarea de la comanda:", error.message);
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
        throw new Error("Error al obtener las tareas del alumno:", error.message);
        throw error;
    }
} 

// función para asignar un estudiante a una tarea
export const postTareaEstudiante = async (tareaId, estudianteId)=>{
    try {
        const response = await fetch(`http://${ipAddress}/asignar_estudiante/${tareaId}/${estudianteId}`, {
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

export const postTarea = async (datos) => {
    try {
        const response = await fetch(`http://${ipAddress}:5000/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al agregar la tarea:", response.status, errorData);
            throw new Error(errorData.error || "Error desconocido");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Lanza el error para que pueda ser manejado donde se llame
    }
}
