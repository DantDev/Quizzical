import React from "react";
import { decode } from "html-entities"

function SingleQuestion(props) {
    
    function clickAnswer(currentQuestion,answer){
        props.updateAnswer(currentQuestion,answer)
    }
    
    const answerElements = props.allAnswers.map((answer,index) => {
        return <button
        onClick={() => clickAnswer (props.question,answer)}
        key={index}
        className={`answer-btn ${answer === props.selectedAnswer ? "selected" : ""}
        ${props.showResults && answer === props.correctAnswer ? "correct" : ""}
        ${props.showResults && answer === props.selectedAnswer && answer !== props.correctAnswer ? "incorrect" : "" }
        ${props.showResults && answer !== props.correctAnswer ? "dimmed" : ""}`}
        disabled={props.showResults}
        >{decode(answer)}</button>
    })
    
    return(
        <div>
            <h1 className="question">{decode(props.question)}</h1>
            <div className="answer-btn-container">
            {answerElements}
            </div>
            <hr />
        </div>
    )
}

export default SingleQuestion;