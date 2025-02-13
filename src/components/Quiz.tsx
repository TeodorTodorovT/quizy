import { useState } from "react";

type Difficulty = 'easy' | 'medium' | 'hard';
type QuestionType = 'multiple' | 'boolean';

interface Question {
    category: string;
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

const Quiz = ({questions, setPlayerResult, handleFinishQuiz, playerResult}: {questions: Question[], setPlayerResult: (playerResult: {correct: number, incorrect: number}) => void, handleFinishQuiz: () => void, playerResult: {correct: number, incorrect: number}}) => {
    const [currentQuestionID, setCurrentQuestionID] = useState<number>(0);

                            

    
    const decodeHtml = (html: string): string => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const handleAnswer = (answer: string) => {
        if (answer === questions[currentQuestionID]?.correct_answer) {
            setPlayerResult({
                ...playerResult,
                correct: playerResult.correct + 1,
            });
        } else {
            setPlayerResult({
                ...playerResult,
                incorrect: playerResult.incorrect + 1,
            });
        }

        if (currentQuestionID < questions.length - 1) {
            setCurrentQuestionID(currentQuestionID + 1);
        } else {
            handleFinishQuiz();
        }
    };

    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center h-screen">
            <h2>{decodeHtml(questions[currentQuestionID]?.question)}</h2>

            {questions[currentQuestionID] &&
                shuffleArray([
                    ...questions[currentQuestionID].incorrect_answers,
                    questions[currentQuestionID].correct_answer,
                ]).map((answer: string) => (
                    <button key={answer} onClick={() => handleAnswer(answer)}>
                        {decodeHtml(answer)}
                    </button>
                ))}
        </div>
    );
};

export default Quiz;
