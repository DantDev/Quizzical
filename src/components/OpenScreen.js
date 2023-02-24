import React from "react";

function OpenScreen(props) {
    return(
        <div className="start-container">
            <div className="start-center">
            <h1 className="start-title">Quizzicall</h1>
            <button onClick={props.startQuiz} className="start-btn">Start Game</button>
            </div>
        </div>
    )
}

export default OpenScreen;