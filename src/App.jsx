import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";

const pokies = ["bulbasaur","gengar","ivysaur","venusaur","wartortle","blastoise","charmeleon","charmander","charizard","squirtle"];


function App() {
  const [imgs, setImgs] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({
    "current-score": 0,
    "best-score": 0,
  });
  let arr = [];
  for(let i = 0 ; i < 10 ; i++){
    arr.push({
      id:i,
      clicked:false
    })
  }
  const [cards,setCards] = useState(arr);


  useEffect(() => {
    Promise.all(
      pokies.map((el) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${el}/`)
          .then((response) => response.json())
          .then((data) => data["sprites"]["front_default"])
      )
    ).then((images) => setImgs(images));
  }, []);

  function handleClick(event){
    let array = cards.slice()
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    let index = event.currentTarget.id;
    setCards(array.map(card=>card.id == index ? {...card,clicked:true} : card))
    array.forEach(card=>{
      if(card.id == index){
        if(!card.clicked){
          setScoreBoard({...scoreBoard,"current-score":scoreBoard["current-score"]+1})
        }else{
          setScoreBoard({"current-score":0,"best-score":(scoreBoard["best-score"]<scoreBoard["current-score"] ? scoreBoard["current-score"]:scoreBoard["best-score"])})
          setCards(arr)
        }
      }
    } )
  }



  function shuffle(state) {
    let array = state.slice()
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setCards(array)
  }
  return (
    <div className="app">
      <header>
        <div>Your goal is to click every image only once</div>
        <div className="score">
          <p>Score : {scoreBoard["current-score"]}</p>
          <p>Best Score : {scoreBoard["best-score"]}</p>
        </div>
      </header>
      <div className="game">
        {cards.map((el) => (
          <Card id={el.id} key={el.id} clicked={el.clicked} handleClick={handleClick} imgs={imgs}/>
        ))}
      </div>
      <div className="winner" style={scoreBoard["current-score"]==10 ? {display:"block"} :{display:"none"}}>
        You Won
      </div>
    </div>
  );
}

export default App;

