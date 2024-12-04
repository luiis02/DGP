import { ipAddress } from "./config";


export const getProfesores = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/profesores`);
  return await resp.json();
};



export const getAdmin = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/admins`);
  if(resp){
    return await resp.json();
  }else{
    throw new Error('Error al obtener los administradores');
  }
};

export const getEstudiantes = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/estudiantes`);
  if(resp){
    return await resp.json();
  }else{
    throw new Error('Error al obtener los estudiantes');
  }
};

export const postEstudiante = async (datosAlumno) => {
  try { 
    const response = await fetch(`http://${ipAddress}:5000/estudiantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAlumno), // Enviamos los datos del estudiante
    });

    if (response.ok) {
      return await response.json();  // Retorna la respuesta si es exitosa
    } else {
      throw new Error('Error al crear el estudiante');
    }
  } catch (error) {
    throw new Error('Error al crear el estudiante: ' + error.message);
  }
}

export const putEstudiante = async (datosAlumno) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/estudiantes/${datosAlumno.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAlumno), // Enviamos los datos del estudiante
    });
    
    if (response.ok) {
      return await response.json();  // Retorna la respuesta si es exitosa
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el estudiante');
    }
  }catch(error){
    throw new Error("Error al actualizar el estudiante:", error.message);
  }
}

export const deleteEstudiante = async (idEstudiante) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/estudiantes/${idEstudiante}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return await response.json();  // Retorna la respuesta si es exitosa
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el estudiante');
    }
  } catch (error) {
    throw new Error("Error al eliminar el estudiante:", error.message);
  }
};

export const getEstudiantesConTareas = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/estudiantes/conTareas`);
  if(resp){
    return await resp.json();
  }else{
    throw new Error('Error al obtener los estudiantes');
  }
};