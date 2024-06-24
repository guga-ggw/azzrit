import { Button } from '@mui/material'
import React from 'react'

const ButtonInputElement = ({text} : {text : string}) => {
  return (
    <Button className='mt-8' type='submit' variant="outlined">{text}</Button>
  )
}

export default ButtonInputElement