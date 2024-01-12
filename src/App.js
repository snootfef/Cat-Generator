import './App.css';
import { useState } from "react";
import Modal from './Modal';

let catNames = ['Sniff', 'Mushroom', 'Fish', 'Onion', 'Chup', 'Mr. Whale', 'Gorp'];
let cats = catNames.map((names) => ({ name: names, text: [], rating: 0, image: names + '.jpg' }));

export default function App() {
  const [currentCat, setCurrentCat] = useState(0);
  const [likes, setLikes] = useState(0);
  const [text, setText] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let fileName = "\\assets\\" + cats[currentCat].image;
  let altText = cats[currentCat].name + " the cat";

  function handleClick() {
    let num = Math.floor(Math.random() * cats.length);
    while (num === currentCat) num = Math.floor(Math.random() * cats.length);
    cats[num].text.push(generateText());
    setClicked(false);
    setCurrentCat(num);
  }

  return (
    <div className='page'>
      <div className='column1'>
        <section className='interactionSection'>
          <h1>{cats[currentCat].rating}</h1>
          <h1>{cats[currentCat].name}</h1>
        </section>
        <img className='catImg' src={fileName} alt={altText}></img>
      </div>
      <div className='column2'>
        <section className='interactionSection'>
          <button className='button' onClick={handleClick}>New Cat</button>
          <button onClick={() => setOpenModal(true)}>Rating</button>
        </section>
        <Dialogue index={currentCat} setLikes={setLikes} clicked={clicked} setClicked={setClicked} setText={setText} ></Dialogue>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}></Modal>
    </div >
  );
}

function Dialogue({ index, setLikes, clicked, setClicked, setText }) {
  if (cats[index].text.length === 0)
    cats[index].text.push(generateText());

  function handleClick(like) {
    if (!clicked) {
      if (like) {
        cats[index].rating++;
        cats[index].text.push('You liked this!');
      }
      else {
        cats[index].rating--;
        cats[index].text.push('You disliked this!');
      }
      setClicked(true);
      setLikes(cats[index].rating);
      setText(cats[index].text);
    }
  }

  return (
    <div>
      <section className='dialogueBox'>
        {cats[index].text.map((string) => <p>{string}</p>)}
      </section>
      <section className='interactionSection'>
        {!clicked && <button onClick={() => handleClick(true)}>Like</button>}
        {!clicked && <button onClick={() => handleClick(false)}>Dislike</button>}
      </section>
    </div>
  );
}

function generateText() {
  let text = '', endText = Math.floor(Math.random() * 7), numWords = Math.floor(Math.random() * 5) + 1, puncNum = Math.floor(Math.random() * 4);
  let punc = ['. ', '! ', '? ', '...']

  while (endText !== 3) {
    for (let i = 0; i < numWords; i++) {
      text += i === 0 ? 'Meow ' : 'meow ';
    }
    text = text.substring(0, text.length - 1) + punc[puncNum];
    if (text.length > 85) break;
    numWords = Math.floor(Math.random() * 5) + 1;
    endText = Math.floor(Math.random() * 7);
    puncNum = Math.floor(Math.random() * 4)
  }
  return text === '' ? '...' : text;
}

