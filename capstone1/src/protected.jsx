import React from 'react'

function ProtectedRoutes({children}) {
    const isauth=localStorage.getItem("token")

    return isauth ? (<div>
      {children}
       </div>) : (<Navigate replace to='/'/>)
    
  }

export default ProtectedRoutes