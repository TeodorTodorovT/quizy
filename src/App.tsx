import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Quiz from './components/Quiz';
import QuizSelection from './components/QuizSelection';
import QuizResults from './components/QuizResults';
import Header from './components/Header';
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
    const [error, setError] = useState<{error: boolean, code: number | null}>({error: false, code: null});
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
                setError({error: false, code: null});

                const response = await axios.get<QuizApiResponse>(
                    `https://opentdb.com/api.php?amount=${quizSettings.amount}${quizSettings.category === 'any' ? '' : `&category=${quizSettings.category}`}${quizSettings.difficulty === 'any' ? '' : `&difficulty=${quizSettings.difficulty}`}${quizSettings.type === 'any' ? '' : `&type=${quizSettings.type}`}`
                );

                if (response.data.response_code === 0) {
                    setQuestions(response.data.results);
                    setIsLoading(false);
                } else {
                    setError({error: true, code: response.data.response_code});
                    setIsLoading(false);
                }
            } catch (error: unknown) {
                setError({error: true, code: (error as AxiosError).status ?? null});
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

    return (
        <div className="max-h-screen bg-green-700 flex flex-col">
            <Header />
            <main className="flex-1 overflow-hidden -mt-24">
                <div className="flex flex-col gap-2 items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
                    {isLoading && (
                        <div className="text-white text-2xl font-bold">
                            Loading...
                        </div>
                    )}

                    {error.error && (
                        <div className="text-white text-2xl font-bold flex flex-col gap-2">
                            {error.code === 429 ? "Too many attempts. Please try again later." : "Error! Please try again."}
                            <button onClick={() => window.location.reload()} className='bg-green-600 p-3 rounded-lg hover:bg-green-500 focus:bg-green-500'>
                                Reload
                            </button>
                        </div>
                    )}

                    {!isLoading && !error.error && finished && (
                        <QuizResults 
                            playerResult={playerResult} 
                            handlePlayAgain={handlePlayAgain} 
                        />
                    )}

                    {!isLoading && !error.error && !finished && (
                        started ? (
                            <Quiz
                                questions={questions}
                                setPlayerResult={setPlayerResult}
                                playerResult={playerResult}
                                handleFinishQuiz={handleFinishQuiz}
                            />
                        ) : (
                            <QuizSelection handleStartQuiz={handleStartQuiz} />
                        )
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
