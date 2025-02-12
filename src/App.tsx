import { useEffect, useState } from "react";
import axios from 'axios';


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


function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentQuestionID, setCurrentQuestionID] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [playerResult, setPlayerResult] = useState<{correct: number, incorrect: number}>({correct: 0, incorrect: 0});


  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        setIsLoading(true);
        setError(false);
        const response = await axios.get<QuizApiResponse>('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy')

console.log(response.data);

      if(response.data.response_code === 0){
        setQuestions(response.data.results);
        setIsLoading(false);
      }else{
        setError(true);
        setIsLoading(false);
      }

    } catch (error) {
      setError(true)
      console.error('Error fetching questions:', error);
    } finally{
      setIsLoading(false);
    }
      
      
    }
    fetchQuestions();
  }, [])

  const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const handleAnswer = (answer: string) => {
  if(answer === questions[currentQuestionID]?.correct_answer){
    setPlayerResult({...playerResult, correct: playerResult.correct + 1});
  }else{
    setPlayerResult({...playerResult, incorrect: playerResult.incorrect + 1});
  }

  if(currentQuestionID < questions.length - 1){
    setCurrentQuestionID(currentQuestionID + 1);
  }else{
    setFinished(true);
  }
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

    if(isLoading) return <div className="flex flex-col gap-2 items-center justify-center h-screen">Loading...</div>

    if(error) return <div className="flex flex-col gap-2 items-center justify-center h-screen">Error! Please try again.</div>

    if(finished){
      return (<div className="flex flex-col gap-2 items-center justify-center h-screen">
        <h2>Finished</h2>
        <p>Correct: {playerResult.correct}</p>
        <p>Incorrect: {playerResult.incorrect}</p>
        <button onClick={() => window.location.reload()}>Play Again</button>
        </div>)
    }

    return (
        <><div className="flex flex-col gap-3 items-center justify-center h-screen">
            <h2>{decodeHtml(questions[currentQuestionID]?.question)}</h2>
            
            {questions[currentQuestionID] && 
                shuffleArray([...questions[currentQuestionID].incorrect_answers, questions[currentQuestionID].correct_answer]).map((answer: string) => (
                    <button key={answer} onClick={() => handleAnswer(answer)}>{decodeHtml(answer)}</button>
                ))
            }
            </div>
            {/* <button onClick={handleNextQuestion}>{currentQuestionID === questions.length - 1 ? 'Finish' : 'Next Question'}</button> */}
        </>
    );
}

export default App;

