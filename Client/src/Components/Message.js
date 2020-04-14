import React from "react";

const getStyle = (props) => {
  let baseClass = "alert";
  if (props.message.messageError) baseClass = baseClass + "alert-danger";
  else baseClass = baseClass + "alert-primary";
  return baseClass + "text-center";
};

const Message = (props) => {
  return (
    <div className={getStyle(props)} role="alert">
      {props.message.messageBody}
    </div>
  );
};

// {message ? <Message message={message} : null/>}
export default Message;
