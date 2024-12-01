import { ipAddress } from "./config";

export const postImagen = async ({ fotoUri, nombre }) => {
    const formData = new FormData();
    formData.append('foto', {
        uri: fotoUri,
        name: `${nombre}.jpg`,
        type: 'image/jpg',
    });
    
  
    try {
        const resp = await fetch(`http://${ipAddress}:5000/imagenes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });
        const data = await resp.json();
        if (resp.ok) {
            return data.url; // Devolver la URL de la imagen subida
        } else {
            throw new Error("Error al subir la imagen.");
        }
    } catch (error) {
        throw new Error("Error al subir la imagen:", error);
    }
  }
  
  export const deleteImage = async (fotoId) => {
    try {
      const response = await fetch(`http://${ipAddress}:5000/imagenes/${fotoId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        return await response.json();  // Retorna la respuesta si es exitosa
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la foto');
      }
    } catch (error) {
      throw new Error("Error al eliminar la foto:", error.message);
      throw error;
    }
  };