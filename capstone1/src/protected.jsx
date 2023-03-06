import React from 'react'

function ProtectedRoutes({children}) {
    const isauth=localStorage.getItem("token")

    return isauth ? (<div>
      <h2>this is protected</h2>{children}
       </div>) : (<Navigate replace to='/'/>)
    
  }

export default ProtectedRoutes