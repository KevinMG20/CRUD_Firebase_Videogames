import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState(0)
    const [release, setRelease] = useState(1)
    const [score, setScore] = useState(2)

    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        const videogame = doc(db, "videogames", id)
        const data = { name: name, genre: genre, release: release, score: score }
        await updateDoc(videogame, data)
        navigate('/')
    }

    const getVideoGameById = async (id) => {
        const videogame = await getDoc(doc(db, "videogames", id))
        if (videogame.exists()) {
            //console.log(videogame.data())
            setName(videogame.data().name)
            setGenre(videogame.data().genre)
            setRelease(videogame.data().release)
            setScore(videogame.data().score)
        } else {
            console.log('El videojuego no existe')
        }
    }

    useEffect(() => {
        getVideoGameById(id)
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Edit Product</h1>
                    <form onSubmit={update}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Género</label>
                            <input
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Lanzamiento</label>
                            <input
                                value={release}
                                onChange={(e) => setRelease(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Calificación</label>
                            <input
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                type="number"
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit