const admin = [
   // Administrador
   {
    id: 1,
    nombre: "Admin",
    apellido: "Principal",
    nombre_usuario: "Admin",
    contraseña: "Admin123",
    color_tema: "#212121",
    tamaño_letra: "15px",
    tipo_usuario: "administrador",
    fecha_inicio: "2024-01-01",
    foto_perfil: "https://randomuser.me/api/portraits/men/11.jpg",
  },
]; 
export function getAdmin() {
    return admin;
};