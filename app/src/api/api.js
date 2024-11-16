const ipAddress = 'localhost'; // Coloca una IP predeterminada aquí si deseas

export const getEstudiantes = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/estudiantes`);
  return await resp.json();
};

export const getProfesores = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/profesores`);
  return await resp.json();
};

export const getAdmin = async () => {
  const resp = await fetch(`http://${ipAddress}:5000/admins`);
  return await resp.json();
};

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
          console.error("Error al subir la imagen.");
          return null;
      }
  } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
  }
}


export const postEstudiante = async (datosAlumno) => {
  try {
    console.log(datosAlumno)
    const response = await fetch(`http://${ipAddress}:5000/estudiantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAlumno), // Enviamos los datos del estudiante
    });

    if (response.ok) {
      console.log("Se ha creado el estudiante")
      return await response.json();  // Retorna la respuesta si es exitosa
    } else {
      throw new Error('Error al crear el estudiante');
    }
  } catch (error) {
    throw new Error('Error al crear el estudiante: ' + error.message);
  }
}
