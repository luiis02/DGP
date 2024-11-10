const ipAddress = '192.168.18.44'; // Coloca una IP predeterminada aquí si deseas

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