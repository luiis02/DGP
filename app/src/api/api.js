import NetInfo from "@react-native-community/netinfo";
const ipAddress = '192.168.0.23';//'192.168.18.44'; // Coloca una IP predeterminada aquí si deseas
export const getStudents = async () => {
  /*
    // Obtener la dirección IP de la máquina
  Este codigo esta mal... hay que poner un código para obtener la direccion IP de la maquiena que esta ejecutando el servidor 
  const state = await NetInfo.fetch();
  const ipAddress = state.details.ipAddress || '192.168.18.44'; // Coloca una IP predeterminada aquí si deseas
  console.log('IP Address:', ipAddress);
  */
  const resp = await fetch(`http://${ipAddress}:3000/estudiantes`);
  return await resp.json();
};