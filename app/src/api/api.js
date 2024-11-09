const ipAddress = '192.168.0.23'; // Coloca una IP predeterminada aquí si deseas

export const getStududiantes = async () => {
  const resp = await fetch(`http://${ipAddress}:3000/estudiantes`);
  return await resp.json();
};

export const getProfesores = async () => {
  const resp = await fetch(`http://${ipAddress}:3000/profesores`);
  return await resp.json();
};

export const getAdmin = async () => {
  const resp = await fetch(`http://${ipAddress}:3000/admin`);
  return await resp.json();
};