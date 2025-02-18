const QuizResults = ({
    playerResult,
    handlePlayAgain
}: {
    playerResult: { correct: number, incorrect: number },
    handlePlayAgain: () => void
}) => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center text-center px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white">
                Quiz Complete!
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white">
                You got <span className="font-bold text-green-300">{playerResult.correct}</span> out 
                of <span className="font-bold">{playerResult.correct + playerResult.incorrect}</span> questions correct
            </p>

            <button 
                onClick={handlePlayAgain} 
                className="mt-4 px-6 py-3 text-base sm:text-lg font-bold 
                         bg-green-500 text-white rounded-lg
                         hover:bg-green-400 focus:bg-green-400 
                         transition-colors duration-200
                         shadow-lg hover:shadow-xl
                         transform hover:scale-[1.02]"
            >
                Play Again
            </button>
        </div>
    );
};

export default QuizResults