import React from "react";

const Modal = ({ open, onClose }) => {
   if (!open) return null

   return (
      <div onClick={onClose} className='overlay'>
         <div onClick={(e) => {
            e.stopPropagation();
         }} className='modalContainer'>
            <img src='\assets\stinky.jpg' alt='Stinky cat'></img>
            <p onClick={onClose}>X</p>
         </div>
      </div >
   )
}

export default Modal;