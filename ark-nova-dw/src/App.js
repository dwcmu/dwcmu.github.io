import { useCallback, useState } from "react";
import { getInitializedPlayingCards } from "./CardUtils";
import Card from "./Card";
import "./App.css";
import Button from "react-bootstrap/Button";

const cardsStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 12,
};

function App() {
  const [cards, setCards] = useState(getInitializedPlayingCards());
  const onClickShuffle = useCallback(() => {
    setCards(getInitializedPlayingCards());
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          This is a zoo game. All images and game mechanics are owned by the
          original game
        </p>
        <p> Here are the 6 starting cards, randomly drawn: </p>
        <div style={cardsStyle}>
          {cards.slice(0, 6).map((cardIndex) => (
            <Card index={cardIndex} key={cardIndex} />
          ))}
        </div>
        <p>
          Click this <Button onClick={onClickShuffle}> Button </Button> to
          shuffle again
        </p>
      </header>
    </div>
  );
}

export default App;
