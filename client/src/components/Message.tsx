import React from "react";

const Message = ({ variant, children }: { variant: string; children: any }) => {
  return (
    <div className={`alert alert-${variant}`} >
      { children }
    </div>
  )
}

Message.defaultProps = {
  variant: 'info',  
}

export default Message;