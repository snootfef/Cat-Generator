import React from "react";

const Modal = ({ open, onClose, cats }) => {
   if (!open) return null

   cats = cats.sort((a, b) => b.rating - a.rating);

   return (
      <div onClick={onClose} className='overlay'>
         <div className="modalBorder">
            <div onClick={(e) => {
               e.stopPropagation();
            }} className='modalContainer'>
               <p className='closeButton' onClick={onClose}>X</p>
               <p className='leaderboardText'>LEADERBOARD</p>
               <div className='columns'>
                  <section className='column1'>
                     <p className='heading'>rank</p>
                     {[1, 2, 3, 4, 5, 6, 7].map((num) => <p className='list'>{num + '.'}</p>)}
                  </section>
                  <section className='column2'>
                     <p className='heading'>name</p>
                     {cats.map((cat) => <p className='list'>{cat.name}</p>)}
                  </section>
                  <section className='column3'>
                     <p className='heading'>likes</p>
                     {cats.map((cat) => <p className='list'>{cat.rating}</p>)}
                  </section>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Modal;