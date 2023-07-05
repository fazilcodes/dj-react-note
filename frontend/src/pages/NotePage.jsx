import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ArrowLeft from '../components/ArrowLeft'
import { Link } from 'react-router-dom'


const NotePage = () => {

  const { id } = useParams()  
  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  const getNote = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <Link to='/'><ArrowLeft /></Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage