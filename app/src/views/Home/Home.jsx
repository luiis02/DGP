//Views/Home/Home.jsx
import React, { useEffect, useState } from 'react'
import { getEstudiantes } from '../../test/students'; 

import InitialScreen from '../../components/initialScream/initialSceen';
import Layaout from '../../components/Layaout/Layaout'

const Home = () => {
  const [students, setStudents] = useState([]); // Cuando se carga la pantalla sera un array vacío

  const loadStudents =  () => {
    const data = getEstudiantes();
    setStudents(data); // Cuando se cargan los estudiantes, se van a almacenar en el estado de la app
  }

  useEffect(() => {
    loadStudents();
  }, [])
  return (
    <Layaout>
      <InitialScreen students={students}/>
    </Layaout>
  )
}

export default Home