import React, { useEffect, useState } from 'react'
import { getStudents } from '../../api/api'

import InitialScreen from '../../components/initialSceen'
import Layaout from '../../components/Layaout'

const Home = () => {
  const [students, setStudents] = useState([]); // Cuando se carga la pantalla sera un array vacío

  const loadStudents = async () => {
    const data = await getStudents();
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