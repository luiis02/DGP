const students = [
    {
      id: 1,
      nombre: "Carlos",
      apellido: "Hernández",
      nombre_usuario: "carlos_h",
      contraseña: "carlos123",
      color_tema: "#1A73E8",
      tamaño_letra: "14px",
      tipo_usuario: "estudiante",
      supervisado_por: 2,
      fecha_inicio: "2024-09-01",
      foto_perfil: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      nombre: "María",
      apellido: "González",
      nombre_usuario: "maria_g",
      contraseña: "maria456",
      color_tema: "#FF5733",
      tamaño_letra: "12px",
      tipo_usuario: "estudiante",
      supervisado_por: 2,
      fecha_inicio: "2024-08-15",
      foto_perfil: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      nombre: "Luis",
      apellido: "Martínez",
      nombre_usuario: "luis_m",
      contraseña: "luis789",
      color_tema: "#FFC107",
      tamaño_letra: "16px",
      tipo_usuario: "estudiante",
      supervisado_por: 3,
      fecha_inicio: "2024-09-10",
      foto_perfil: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      nombre: "Ana",
      apellido: "López",
      nombre_usuario: "ana_l",
      contraseña: "ana001",
      color_tema: "#00BFA5",
      tamaño_letra: "14px",
      tipo_usuario: "estudiante",
      supervisado_por: 3,
      fecha_inicio: "2024-10-01",
      foto_perfil: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: 5,
      nombre: "Miguel",
      apellido: "Pérez",
      nombre_usuario: "miguel_p",
      contraseña: "miguel002",
      color_tema: "#9C27B0",
      tamaño_letra: "13px",
      tipo_usuario: "estudiante",
      supervisado_por: 2,
      fecha_inicio: "2024-07-20",
      foto_perfil: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      id: 6,
      nombre: "Lucía",
      apellido: "Díaz",
      nombre_usuario: "lucia_d",
      contraseña: "lucia003",
      color_tema: "#03A9F4",
      tamaño_letra: "15px",
      tipo_usuario: "estudiante",
      supervisado_por: 4,
      fecha_inicio: "2024-08-30",
      foto_perfil: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      id: 7,
      nombre: "Daniel",
      apellido: "Fernández",
      nombre_usuario: "daniel_f",
      contraseña: "daniel004",
      color_tema: "#E91E63",
      tamaño_letra: "12px",
      tipo_usuario: "estudiante",
      supervisado_por: 3,
      fecha_inicio: "2024-09-25",
      foto_perfil: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      id: 8,
      nombre: "Laura",
      apellido: "Jiménez",
      nombre_usuario: "laura_j",
      contraseña: "laura005",
      color_tema: "#8BC34A",
      tamaño_letra: "14px",
      tipo_usuario: "estudiante",
      supervisado_por: 2,
      fecha_inicio: "2024-10-15",
      foto_perfil: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      id: 9,
      nombre: "David",
      apellido: "Ruiz",
      nombre_usuario: "david_r",
      contraseña: "david006",
      color_tema: "#FF9800",
      tamaño_letra: "13px",
      tipo_usuario: "estudiante",
      supervisado_por: 4,
      fecha_inicio: "2024-07-05",
      foto_perfil: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
      id: 10,
      nombre: "Sara",
      apellido: "Sánchez",
      nombre_usuario: "sara_s",
      contraseña: "sara007",
      color_tema: "#CDDC39",
      tamaño_letra: "15px",
      tipo_usuario: "estudiante",
      supervisado_por: 1,
      fecha_inicio: "2024-08-22",
      foto_perfil: "https://randomuser.me/api/portraits/women/10.jpg"
    }
  ];
  
  export function getEstudiantes() {
    return students;
  };
  