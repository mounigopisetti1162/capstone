import React from 'react'
import './Message.css'
function Message({message,own}) {
  return (
    <>
    <div className={own ? "message own":'message'}>
    <div className='message-top'>
<img className='message-pic'src='/public/images/person/2.jpg' alt='name'/>
<p className='message-text'>{message.text}  </p> </div>
    <div className="message-bottom">

    </div>
    </div>
    </>
  )
}

export default Message