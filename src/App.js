import './App.css';
import { useState } from "react";

export default function App() {
  const [cat, setCat] = useState(0);

  let name = ['Sniff', 'Mushroom', 'Fish', 'Onion', 'Chup', 'Mr. Whale', 'Gorp'];

  function handleClick() {
    let num = Math.floor(Math.random() * name.length);
    while (num === cat) num = Math.floor(Math.random() * name.length);
    setCat(num);
  }

  return (
    <div className='page'>
      <div className='column1'>
        <h1 className='h1'>{name[cat]}</h1>
      </div>
      <div className='column2'>
        <button className='button' onClick={handleClick}>New Cat</button>
        <Dialogue></Dialogue>
      </div>
    </div>
  );
}

function Dialogue() {
  return (
    <div>
      <h2 className='h2'>
        {generateText()}
      </h2>
    </div>
  );
}

function generateText() {
  let text = '', endText = Math.floor(Math.random() * 5), numWords = Math.floor(Math.random() * 5) + 1, puncNum = Math.floor(Math.random() * 4);
  let punc = ['. ', '! ', '? ', '...']

  while (endText !== 3) {
    for (let i = 0; i < numWords; i++) {
      text += i === 0 ? 'Meow ' : 'meow ';
    }
    text = text.substring(0, text.length - 1) + punc[puncNum];
    if (text.length > 85) break;
    numWords = Math.floor(Math.random() * 5) + 1;
    endText = Math.floor(Math.random() * 5);
    puncNum = Math.floor(Math.random() * 4)
  }
  return text;
}

