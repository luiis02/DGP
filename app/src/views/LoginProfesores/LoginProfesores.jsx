//views/LoginProfesores/LoginProfesores.jsx
import React, { useEffect, useState } from 'react'
import Layaout from '../../components/Layaout/Layaout'
import { getProfesores } from '../../api/api'; // Este método se encargaría de obtener los profesores}
import LoginProf from '../../components/loginProf/LoginProf'
import { getAdmin } from '../../api/api'; // Este método se encargaría de obtener si el profesor es administrador}

const LoginProfesores =  () => {
    const [profesores, setProfesores] = useState([]) // Estado para almacenar el nombre del profesor
    const [admins, setAdmins] = useState([]); // Estado para verificar si el profesor es administrador
    const loadProfesoresAdmins =  async () => {
      const prof =  await getProfesores(); // Por ejemplo, se establece el nombre del profesor en el estado
      setProfesores(prof); // Se almacena el nombre del profesor en el estado
      const adm = await getAdmin(); // Por ejemplo, se establece si el profesor es administrador en el estado
      setAdmins(adm); // Se almacena si el profesor es administrador en el estado
    }
    useEffect(() => {
        loadProfesoresAdmins(); // Carga los profesores cuando se carga la pantalla
    }, []) // Este useEffect se ejecuta una vez cuando se carga la pantalla
    
  return (
    <Layaout>
       <LoginProf profesores={profesores} admin={admins}/>
    </Layaout>   
  )
}
export default LoginProfesores