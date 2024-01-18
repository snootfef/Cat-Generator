import './App.css';
import { useState } from "react";
import Modal from './Modal';
import { PiCat } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { PiHeartBreakFill } from "react-icons/pi";

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
      <div className='columnLeft'>
        <section className='catName'>
          <PiCat className='PiCat' />
          <h1>{cats[currentCat].name}</h1>
        </section>
        <picture className='catImgBorder'>
          <img className='catImg' src={fileName} alt={altText}></img>
        </picture>
        <section className='catRating'>
          <PiHeartFill className='ratingHeart' />
          <h2>{cats[currentCat].rating}</h2>
        </section>
      </div>
      <div className='columnRight'>
        <section className='editCat'>
          <button className='catButtons' onClick={handleClick}>new<br />cat</button>
          <button className='catButtons' onClick={() => setOpenModal(true)}>rat<br />ing</button>
        </section>
        <Dialogue index={currentCat} setLikes={setLikes} clicked={clicked} setClicked={setClicked} setText={setText} ></Dialogue>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} cats={cats}></Modal>
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
    <>
      <section className='dialogueBorder'>
        <section className='dialogueBox'>
          {cats[index].text.map((string) => <div className={string.startsWith('Y') ? 'likeBoxes' : 'generatedBox'}><p className={string.startsWith('Y') ? 'likedText' : 'generatedText'}>{string}</p></div>)}
        </section>
      </section >
      <section className='likeSection'>
        {!clicked && <button className='likeButtons' onClick={() => handleClick(true)}>
          <PiHeartFill className='likeHearts' />
        </button>}
        {!clicked && <button className='likeButtons' onClick={() => handleClick(false)}>
          <PiHeartBreakFill className='likeHearts' />
        </button>}
      </section>
    </>
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

