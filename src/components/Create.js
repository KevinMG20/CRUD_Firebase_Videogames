import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState(0)
    const [release, setRelease] = useState(1)
    const [score, setScore] = useState(2)

    const navigate = useNavigate()
    const videogamesCollection = collection(db, "videogames")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(videogamesCollection, { name: name, genre: genre, release: release, score: score })
        navigate('/')
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Create Product</h1>
                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input

                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Género</label>
                            <input

                                onChange={(e) => setGenre(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Lanzamiento</label>
                            <input

                                onChange={(e) => setRelease(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Calificación</label>
                            <input

                                onChange={(e) => setScore(e.target.value)}
                                type="number"
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create