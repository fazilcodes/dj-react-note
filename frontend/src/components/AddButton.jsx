import React from 'react'
import { Link } from 'react-router-dom'
import AddIconSvg from './AddIconSvg'


const AddButton = () => {
  return (
    <Link to={'/notes/new'} className='floating-button'>
        <AddIconSvg />
    </Link>
  )
}

export default AddButton