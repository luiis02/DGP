import { ipAddress } from "./config";

// Obtener todas las tareas de un alumno:
export const getTareasAlumno = async (idAlumno) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/tareas/${idAlumno}`);
    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al obtener las tareas del alumno");
    }
  } catch (error) {
    throw new Error("Error al obtener las tareas del alumno:", error.message);
    throw error;
  }
};

// función para asignar un estudiante a una tarea
export const postTareaEstudiante = async (tareaId, estudianteId) => {
  try {
    const response = await fetch(
      `/asignar_estudiante/${tareaId}/${estudianteId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error en la solicitud:", error);
  }
};

export const postTareaJuego = async (url) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/juego`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }), // Enviamos los datos del juego
    });

    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al enviar la URL del juego");
    }
  } catch (error) {
    throw new Error("Error al enviar la URL del juego:", error.message);
  }
};

export const getTareasJuego = async () => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/juego`);
    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al obtener las URLs de los juegos");
    }
  } catch (error) {
    throw new Error("Error al obtener las URLs de los juegos:", error.message);
    throw error;
  }
};

export const deleteTareaJuego = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/juego/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(response);
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al eliminar la URL del juego");
    }
  } catch (error) {
    throw new Error("Error al eliminar la URL del juego:", error.message);
  }
};

export const getAllTareas = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/allTareas/${id}`);
    console.log(response);
    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al obtener todas las tareas");
    }
  } catch (error) {
    throw new Error("Error al obtener todas las tareas:", error.message);
    throw error;
  }
};

export const getMateriales = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/materiales/${id}`);
    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al obtener los materiales");
    }
  } catch (error) {
    throw new Error("Error al obtener los materiales:", error.message);
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// Para las tareas de comanda de comedor:
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

export const createTareaComanda = async (tarea) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea), // Convierte la tarea a JSON
    });

    if (response.ok) {
      return await response.json(); // Devuelve los datos de la respuesta
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error al crear la tarea de comanda:", error.message);
    throw error;
  }
};

export const getAllTareasComanda = async () => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda`);

    if (response.ok) {
      return await response.json(); // Devuelve todas las tareas de comanda
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener todas las tareas de comanda:",
      error.message
    );
    throw error;
  }
};

export const getTareasComandaPorAlumno = async (alumnoId) => {
  try {
    const response = await fetch(
      `http://${ipAddress}:5000/comanda/${alumnoId}`
    );

    if (response.ok) {
      return await response.json(); // Devuelve las tareas del alumno
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(
      `Error al obtener las tareas de comanda para el alumno ${alumnoId}:`,
      error.message
    );
    throw error;
  }
};

export const updateTareaComanda = async (id, tarea) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea), // Envía los datos actualizados
    });

    if (response.ok) {
      return await response.json(); // Devuelve la respuesta del servidor
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(
      `Error al actualizar la tarea de comanda ${id}:`,
      error.message
    );
    throw error;
  }
};

export const deleteTareaComanda = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return await response.json(); // Devuelve el resultado de la eliminación
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(
      `Error al eliminar la tarea de comanda ${id}:`,
      error.message
    );
    throw error;
  }
};

export const getTareaComanda = async () => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda`);
    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al obtener las tareas de la comanda");
    }
  } catch (error) {
    throw new Error(
      "Error al obtener las tareas de la comanda:",
      error.message
    );
    throw error;
  }
};

export const postTareaComanda = async (requestData) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Enviamos los datos de la tarea
    });

    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al actualizar la tarea de la comanda");
    }
  } catch (error) {
    throw new Error(
      "Error al actualizar la tarea de la comanda:",
      error.message
    );
  }
};

export const putTareaComanda = async (id, requestData) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/comanda/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Enviamos los datos de la tarea
    });

    if (response.ok) {
      return await response.json(); // Retorna la respuesta si es exitosa
    } else {
      throw new Error("Error al actualizar la tarea de la comanda");
    }
  } catch (error) {
    throw new Error(
      "Error al actualizar la tarea de la comanda:",
      error.message
    );
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// Para operar con los menús:
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

export const createMenu = async (menu) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu), // Convierte el objeto del menú a JSON
    });

    if (response.ok) {
      return await response.json(); // Devuelve los datos del nuevo menú
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error al crear el menú:", error.message);
    throw error;
  }
};

export const getAllMenus = async () => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/menus`);

    if (response.ok) {
      return await response.json(); // Devuelve todos los menús
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error al obtener los menús:", error.message);
    throw error;
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/menus/${id}`);

    if (response.ok) {
      return await response.json(); // Devuelve el menú específico
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error al obtener el menú con ID ${id}:`, error.message);
    throw error;
  }
};

export const updateMenu = async (id, menu) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/menus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu), // Envía los datos actualizados
    });

    if (response.ok) {
      return await response.json(); // Devuelve los datos del menú actualizado
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error al actualizar el menú con ID ${id}:`, error.message);
    throw error;
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await fetch(`http://${ipAddress}:5000/menus/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return await response.json(); // Devuelve el resultado de la eliminación
    } else {
      throw new Error(
        `Error HTTP: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error al eliminar el menú con ID ${id}:`, error.message);
    throw error;
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// Para las tareas por pasos:
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

// Obtener todas las tareas de un alumno:
export const getTasks = async (studentID, status = null, sort = false) => {
  try {
    // Construcción dinámica de la URL con query params
    let url = `http://${ipAddress}:5000/tasks/${studentID}`;

    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (sort) params.append("sort", "true");

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Realizar la solicitud
    const response = await fetch(url);

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al obtener las tareas del alumno. Código HTTP: " +
          response.status
      );
    }
  } catch (error) {
    console.error("Error al obtener las tareas del alumno:", error.message);
    throw error;
  }
};

// Obtener todas las tareas de un alumno, excluyendo las completadas:
export const getTasksExcludeCompleted = async (
  studentID,
  status = null,
  sort = false
) => {
  try {
    // Construcción dinámica de la URL con query params
    let url = `http://${ipAddress}:5000/tasks/${studentID}/exclude-completed`;

    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (sort) params.append("sort", "true");

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Realizar la solicitud
    const response = await fetch(url);

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al obtener las tareas del alumno. Código HTTP: " +
          response.status
      );
    }
  } catch (error) {
    console.error("Error al obtener las tareas del alumno:", error.message);
    throw error;
  }
};

// Obtener todos los pasos de una tarea concreta:
export const getTaskSteps = async (taskId) => {
  try {
    let url = `http://${ipAddress}:5000/tasks/${taskId}/steps`;

    // Realizar la solicitud
    const response = await fetch(url);

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al obtener los pasos de la tarea. Código HTTP: " +
          response.status
      );
    }
  } catch (error) {
    console.error("Error al obtener los pasos de la tarea:", error.message);
    throw error;
  }
};

// Marcar una tarea como completada:
export const markTaskCompleted = async (taskId) => {
  try {
    let url = `http://${ipAddress}:5000/tasks/${taskId}/complete`;

    // Realizar la solicitud
    const response = await fetch(url, {
      method: "PUT",
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al marcar la tarea como completada. Código HTTP: " +
          response.status
      );
    }
  } catch (error) {
    console.error("Error al marcar la tarea como completada:", error.message);
    throw error;
  }
};

// Actualizar el estado de un paso concreto:
export const updateStepStatus = async (stepId, status) => {
  try {
    let url = `http://${ipAddress}:5000/step/${stepId}/modify_status`;

    // Realizar la solicitud
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al modificar el estado del paso de la tarea. Código HTTP: " +
          response.status
      );
    }
  } catch (error) {
    console.error(
      "Error al modificar el estado del paso de la tarea:",
      error.message
    );
    throw error;
  }
};

// Actualizar el estado de un paso concreto:
export const startTask = async (taskId) => {
  try {
    let url = `http://${ipAddress}:5000/tasks/${taskId}/start`;

    // Realizar la solicitud
    const response = await fetch(url, {
      method: "PUT",
    });

    // Verificar si la respuesta fue exitosa
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        "Error al iniciar la tarea. Código HTTP: " + response.status
      );
    }
  } catch (error) {
    console.error("Error al iniciar la tarea:", error.message);
    throw error;
  }
};
