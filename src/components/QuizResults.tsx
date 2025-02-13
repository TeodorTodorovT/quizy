
const QuizResults = ({playerResult, handlePlayAgain}: {playerResult: {correct: number, incorrect: number}, handlePlayAgain: () => void}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <p>You got {playerResult.correct} out of {playerResult.correct + playerResult.incorrect} questions correct</p>
        <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  )
}

export default QuizResults