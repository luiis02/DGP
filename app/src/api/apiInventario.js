import { ipAddress } from "./config";

export const getMateriales = async () => {
    const resp = await fetch(`http://${ipAddress}:5000/materiales`);
    return await resp.json();
  };

  export const postMaterial = async (datosMaterial) => {
    try {
      const response = await fetch(`http://${ipAddress}:5000/materiales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosMaterial), // Enviamos los datos del material
      });
  
      if (response.ok) {
        console.log("Se ha creado el material")
        return await response.json();  // Retorna la respuesta si es exitosa
      } else {
        throw new Error('Error al crear el material');
      }
    } catch (error) {
      throw new Error('Error al crear el material: ' + error.message);
    }
  };

  export const putMaterial = async (datosMaterial) => {
    try {
      const response = await fetch(`http://localhost:5000/materiales/${datosMaterial.id_material}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosMaterial),
      });
      return await response.json();
    }catch(error){
        console.error(error);
        return null;
    }
  }

  export const deleteMaterial = async (datosMaterial) =>{
    try {
      const response = await fetch(`http://localhost:5000/materiales/${datosMaterial.id_material}`, {
          method: 'DELETE',
      });
  
      if (!response.ok) {
          throw new Error('Error al eliminar el material');
      }
  
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error.message);
      return null;
  }
}

export const getSolicitud = async () => {
  try{
    const response = await fetch(`http://localhost:5000/solicitud`);
    if(response)
      return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export const postSolicitud = async (datosSolicitud) => {
  console.log(datosSolicitud)
  try{
    const response = await fetch(`http://localhost:5000/solicitud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosSolicitud),
    });
    if(response)
      return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

