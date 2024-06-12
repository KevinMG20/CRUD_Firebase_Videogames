import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import FullPageBackground from './FullPageBackground'
const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
  const [videogames, setVideogames] = useState([])

  //2 - referenciamos a la DB firestore
  const videogamesCollection = collection(db, "videogames")

  //3 - Funcion para mostrar TODOS los docs
  const getVideogames = async () => {
    const data = await getDocs(videogamesCollection)
    //console.log(data.docs)
    setVideogames(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(videogames)
  }
  //4 - Funcion para eliminar un doc
  const deleteVideogame = async (id) => {
    const gameDoc = doc(db, "videogames", id)
    await deleteDoc(gameDoc)
    getVideogames()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el videojuego?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la funcion para eliminar   
        deleteVideogame(id)
        Swal.fire(
          'Eliminado!',
          'El videojuego ha sido eliminado.',
          'success'
        )
      }
    })
  }
  //6 - usamos useEffect
  useEffect(() => {
    getVideogames()
  }, [])
  //7 - devolvemos vista de nuestro componente
  return (
    <>
      <FullPageBackground imageUrl="https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg" opacity={0.2}/>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className="d-grid gap-2">
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Género</th>
                  <th>Lanzamiento</th>
                  <th>Calificación</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {videogames.map((videogame) => (
                  <tr key={videogame.id}>
                    <td>{videogame.name}</td>
                    <td>{videogame.genre}</td>
                    <td>{videogame.release}</td>
                    <td>{videogame.score}</td>
                    <td>
                      <Link to={`/edit/${videogame.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={() => { confirmDelete(videogame.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show