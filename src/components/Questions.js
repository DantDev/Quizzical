import React from "react";
import SingleQuestion from "./SingleQuestion";

function Questions() {
    const [question, setQuestion] = React.useState([])
    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
    const [showWarning , setShowWarning] = React.useState(false)
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)
    const [showResults, setShowResults] = React.useState(false)
    React.useEffect(() => {
        if(question.length === 0){
            fetch("https://opentdb.com/api.php?amount=5")
            .then((res) => res.json())
            .then((data) => {
                setQuestion(data.results)
                setQuestionsAndAnswers(
                    data.results.map((questionObject) => {
                        return {
                            question: questionObject.question,
                            shuffledAnswers: shuffle([
                                ...questionObject.incorrect_answers,
                                questionObject.correct_answer
                            ]),
                        correctAnswer: questionObject.correct_answer,
                        selectedAnswer: ""
                        }
                    })
                )
            })
        }
    },[question])
    
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex !== 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
    
    function updateAnswer(currentQuestion, answer){
        setQuestionsAndAnswers(prevQuestion => prevQuestion.map((questionObject) => {
            return questionObject.question === currentQuestion 
            ? {...questionObject, selectedAnswer: answer}
            : questionObject
        }))
    } 

    function checkAnswers() {
        const notAllAnswered = questionsAndAnswers.some((questionObject) => questionObject.selectedAnswer === "" )
        setShowWarning(notAllAnswered)
        if(!notAllAnswered){
            questionsAndAnswers.forEach((questionObject) => {
                if(questionObject.selectedAnswer === questionObject.correctAnswer){
                    setNumCorrectAnswers(prevNumCorrectAnswers => prevNumCorrectAnswers + 1)
                }
            })
            setShowResults(true)
        }
    }

    function playAgain() {
        setQuestion([])
        setQuestionsAndAnswers([])
        setShowResults(false)
        setNumCorrectAnswers(0)
    }

    const questionElements = questionsAndAnswers.map((questionObject, index) => {
        return <SingleQuestion
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        updateAnswer={updateAnswer} 
        selectedAnswer={questionObject.selectedAnswer}
        showResults={showResults}
        correctAnswer={questionObject.correctAnswer}
        />
    })  
    
    return(
        <div>
            {questionElements}
            <div className="text-center">
                {showWarning && <p className="warning-text">You have questions that you not answered*</p>}
                {question.length > 0 && !showResults ? <button className="check-btn" onClick={checkAnswers}>Check Answers</button> : null}

                {showResults && (
                    <div className="result-container"> 
                        <p className="result-text">You have scored {numCorrectAnswers}/5 correct answers.</p>
                        <button onClick={playAgain} className="play-btn">Play Again</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Questions;