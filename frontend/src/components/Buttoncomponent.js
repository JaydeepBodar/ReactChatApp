  import React from 'react'
import { Button } from '@mui/material'
const Buttoncomponent = ({variant,children,color,onClick,className,type}) => {
  return (
    <React.Fragment>
      <Button type={type} variant={variant} color={color} onClick={onClick} className={className}>{children}</Button>
    </React.Fragment>
  )
}

export default Buttoncomponent;
