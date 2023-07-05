import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowLeft from '../components/ArrowLeft'


const NotePage = () => {

  const navigate = useNavigate();

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

  const updateNote = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

  }

  const handleSubmit = () => {
    updateNote()
    navigate("/")
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
            <button className='back_btn' onClick={handleSubmit}><ArrowLeft/>Back</button>
        </h3>
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage