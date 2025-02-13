import { useEffect, useState } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import QuizSelection from './components/QuizSelection';
import QuizResults from './components/QuizResults';
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

interface QuizApiResponse {
    response_code: number;
    results: Question[];
}

interface QuizSettings {
    category: string;
    difficulty: string;
    type: string;
    amount: number;
}

function App() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);
    const [playerResult, setPlayerResult] = useState<{
        correct: number;
        incorrect: number;
    }>({ correct: 0, incorrect: 0 });
    const [quizSettings, setQuizSettings] = useState<QuizSettings>({ category: 'any', difficulty: 'any', type: 'any', amount: 10 });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setError(false);

                const response = await axios.get<QuizApiResponse>(
                    `https://opentdb.com/api.php?amount=${quizSettings.amount}${quizSettings.category === 'any' ? '' : `&category=${quizSettings.category}`}${quizSettings.difficulty === 'any' ? '' : `&difficulty=${quizSettings.difficulty}`}${quizSettings.type === 'any' ? '' : `&type=${quizSettings.type}`}`
                );

                if (response.data.response_code === 0) {
                    setQuestions(response.data.results);
                    setIsLoading(false);
                } else {
                    setError(true);
                    setIsLoading(false);
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching questions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, [quizSettings]);

    const handleFinishQuiz = () => {
        setFinished(true);
        setStarted(false);
    };

    const handleStartQuiz = (quizSettings: QuizSettings) => {
        setStarted(true);
        setFinished(false);
        setQuizSettings(quizSettings);
    };

    const handlePlayAgain = () => {
        setFinished(false);
        setStarted(false);
        setPlayerResult({ correct: 0, incorrect: 0 });
        setQuizSettings({ category: 'any', difficulty: 'any', type: 'any', amount: 10 });
    };

    if (isLoading)
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                Error! Please try again.
            </div>
        );

    if (finished) {
        return (
            <QuizResults playerResult={playerResult} handlePlayAgain={handlePlayAgain} />
        );
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            {started ? (
                <Quiz
                    questions={questions}
                    setPlayerResult={setPlayerResult}
                    playerResult={playerResult}
                    handleFinishQuiz={handleFinishQuiz}
                />
            ) : (
                <QuizSelection handleStartQuiz={handleStartQuiz} />
            )}
        </div>
    );
}

export default App;
