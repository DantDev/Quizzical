import React from "react"
import OpenScreen from "./components/OpenScreen";
import Questions from "./components/Questions";

function App() {
  const [startGame, setStartGame] = React.useState(false)

  function startQuiz() {
    setStartGame(true)
  }

  return (
    <div>
      {startGame ? <Questions/> :<OpenScreen startQuiz={startQuiz}/>}
          </div>
  );
}

export default App;
