import NetInfo from "@react-native-community/netinfo";
export const getStudents = async () => {
  // Obtener la dirección IP de la máquina
  const state = await NetInfo.fetch();
  const ipAddress = state.details.ipAddress || '192.168.18.44'; // Coloca una IP predeterminada aquí si deseas

  const resp = await fetch(`http://${ipAddress}:3000/estudiantes`);
  return await resp.json();
};