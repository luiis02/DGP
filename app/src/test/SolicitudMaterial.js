const solicitudes = [
    {
        id: 1,
        profesor: "Juan Pérez",
        aula: "Aula 101",
        materiales: [
            { nombre: "Lápices", cantidad: 20 },
            { nombre: "Cuadernos", cantidad: 15 },
            { nombre: "Gomas de borrar", cantidad: 10 },
        ],
        fechaSolicitud: "2024-11-23",
    },
    {
        id: 2,
        profesor: "María López",
        aula: "Aula 202",
        materiales: [
            { nombre: "Marcadores", cantidad: 10 },
            { nombre: "Hojas A4", cantidad: 500 },
            { nombre: "Tijeras", cantidad: 5 },
        ],
        fechaSolicitud: "2024-11-23",
    },
    {
        id: 3,
        profesor: "Carlos Martínez",
        aula: "Aula 303",
        materiales: [
            { nombre: "Plastilina", cantidad: 8 },
            { nombre: "Cartulinas", cantidad: 20 },
            { nombre: "Reglas", cantidad: 15 },
        ],
        fechaSolicitud: "2024-11-22",
    },
    {
        id: 4,
        profesor: "Lucía Fernández",
        aula: "Aula 404",
        materiales: [
            { nombre: "Lápices de colores", cantidad: 12 },
            { nombre: "Pegamento", cantidad: 6 },
            { nombre: "Cintas adhesivas", cantidad: 3 },
        ],
        fechaSolicitud: "2024-11-21",
    },
];

export function getSolicitud(prueba) {

    return prueba ? solicitudes : [];  // Devuelve la lista de solicitudes pre-cargada
}
