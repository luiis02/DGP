const users = [
    // Profesores
    {
      id: 2,
      nombre: "Juan",
      apellido: "Pérez",
      nombre_usuario: "juan_p",
      contraseña: "juan456",
      color_tema: "#3F51B5",
      tamaño_letra: "14px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-09-01",
      foto_perfil: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 3,
      nombre: "María",
      apellido: "López",
      nombre_usuario: "maria_l",
      contraseña: "maria789",
      color_tema: "#FF5722",
      tamaño_letra: "13px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-08-15",
      foto_perfil: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      id: 4,
      nombre: "Carlos",
      apellido: "Rodríguez",
      nombre_usuario: "carlos_r",
      contraseña: "carlos101",
      color_tema: "#607D8B",
      tamaño_letra: "16px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-07-20",
      foto_perfil: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      id: 5,
      nombre: "Ana",
      apellido: "García",
      nombre_usuario: "ana_g",
      contraseña: "ana202",
      color_tema: "#795548",
      tamaño_letra: "15px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-10-10",
      foto_perfil: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      id: 6,
      nombre: "Luis",
      apellido: "Fernández",
      nombre_usuario: "luis_f",
      contraseña: "luis303",
      color_tema: "#009688",
      tamaño_letra: "14px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-05-05",
      foto_perfil: "https://randomuser.me/api/portraits/men/16.jpg",
    },
    {
      id: 7,
      nombre: "Isabel",
      apellido: "Martínez",
      nombre_usuario: "isabel_m",
      contraseña: "isabel404",
      color_tema: "#FF9800",
      tamaño_letra: "13px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-09-05",
      foto_perfil: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      id: 8,
      nombre: "Diego",
      apellido: "Ruiz",
      nombre_usuario: "diego_r",
      contraseña: "diego505",
      color_tema: "#CDDC39",
      tamaño_letra: "12px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-06-25",
      foto_perfil: "https://randomuser.me/api/portraits/men/18.jpg",
    },
    {
      id: 9,
      nombre: "Sofía",
      apellido: "Hernández",
      nombre_usuario: "sofia_h",
      contraseña: "sofia606",
      color_tema: "#E91E63",
      tamaño_letra: "14px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-11-01",
      foto_perfil: "https://randomuser.me/api/portraits/women/19.jpg",
    },
    {
      id: 10,
      nombre: "Ricardo",
      apellido: "Morales",
      nombre_usuario: "ricardo_m",
      contraseña: "ricardo707",
      color_tema: "#673AB7",
      tamaño_letra: "15px",
      tipo_usuario: "profesor",
      fecha_inicio: "2023-03-15",
      foto_perfil: "https://randomuser.me/api/portraits/men/20.jpg",
    }
  ];
  
  // Método para obtener la lista de usuarios
  export function getProfesores() {
    return users;
  }
  