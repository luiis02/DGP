

const materiales = [
    {
      id_material: 1,
      nombre_material: "Cuaderno A4",
      descripcion: "Cuaderno de 80 hojas, tamaño A4",
      categoria: "Papelería",
      cantidad: 50,
      fecha_ingreso: "2024-11-15",
      estado: "Disponible",
      ultima_actualizacion: "2024-11-18 18:35:16",
      id_administrador: 5
    },
    {
      id_material: 2,
      nombre_material: "Lápiz HB",
      descripcion: "Lápiz para escritura general",
      categoria: "Papelería",
      cantidad: 200,
      fecha_ingreso: "2024-11-16",
      estado: "Disponible",
      ultima_actualizacion: "2024-11-18 18:35:16",
      id_administrador: 5
    },
    {
      id_material: 3,
      nombre_material: "Marcadores",
      descripcion: "Marcadores de colores surtidos",
      categoria: "Papelería",
      cantidad: 30,
      fecha_ingreso: "2024-11-12",
      estado: "Disponible",
      ultima_actualizacion: "2024-11-18 18:35:16",
      id_administrador: 5
    },
    {
      id_material: 4,
      nombre_material: "Borradores",
      descripcion: "Borradores de goma para lápiz",
      categoria: "Papelería",
      cantidad: 100,
      fecha_ingreso: "2024-11-10",
      estado: "Disponible",
      ultima_actualizacion: "2024-11-18 18:35:16",
      id_administrador: 5
    },
    {
      id_material: 5,
      nombre_material: "Rotuladores",
      descripcion: "Rotuladores de colores",
      categoria: "Papelería",
      cantidad: 80,
      fecha_ingreso: "2024-11-08",
      estado: "Disponible",
      ultima_actualizacion: "2024-11-18 18:35:16",
      id_administrador: 5
    }
];
  
export function getMateriales() {
    return materiales;
};