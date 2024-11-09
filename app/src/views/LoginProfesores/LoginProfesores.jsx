//views/LoginProfesores/LoginProfesores.jsx
import React, { useEffect, useState } from 'react'
import Layaout from '../../components/Layaout/Layaout'
import { getProfesores } from '../../test/profesors'
import LoginProf from '../../components/loginProf/LoginProf'
import { getAdmin } from '../../test/admin' // Este método se encargaría de obtener si el profesor es administrador

const LoginProfesores = () => {
    const [profesores, setProfesores] = useState([]) // Estado para almacenar el nombre del profesor
    const [admin, setAdmin] = useState([]); // Estado para verificar si el profesor es administrador
    const loadProfesores =  () => {
      const data =  getProfesores(); // Por ejemplo, se establece el nombre del profesor en el estado
      setProfesores(data); // Se almacena el nombre del profesor en el estado
         // Se almacena si el profesor es administrador en el estado
    }
    const loadAdmin = () => {
      const data = getAdmin(); // Por ejemplo, se establece si el profesor es administrador en el estado
      setAdmin(data); // Se almacena si el profesor es administrador en el estado
    }
    useEffect(() => {
        loadProfesores(); // Carga los profesores cuando se carga la pantalla
        loadAdmin(); // Carga si el profesor es administrador cuando se carga la pantalla
    }, []) // Este useEffect se ejecuta una vez cuando se carga la pantalla
    
  return (
    <Layaout>
       <LoginProf profesores={profesores} admin={admin}/>
    </Layaout>   
  )
}
export default LoginProfesores