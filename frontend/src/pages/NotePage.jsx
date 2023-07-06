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
    if (id === 'new') return
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`)
    let data = await response.json()
    setNote(data)
  };

  const createNote = async() => {
    let response = fetch(`http://127.0.0.1:8000/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  const updateNote = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  };

  let deleteNote = async() => {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate("/")
  }

  const handleSubmit = () => {
    if (id !== 'new' && note.body === '' ) {
      deleteNote()
      console.log('deleted');
    } else if (id !== 'new') {
      updateNote()
      console.log('updated');
    } else if (id == 'new' && note.body !== null) {
      createNote()
      console.log('created');
    }
    navigate("/")
  };

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
            <button className='back_btn' onClick={handleSubmit}><ArrowLeft/>Back</button>
        </h3>
        { id !== 'new' ? <button onClick={deleteNote}>Delete</button> : <button onClick={handleSubmit}>Done</button> }
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage