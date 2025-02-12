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


  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        setIsLoading(true);
        setError(false);
        const response = await axios.get<QuizApiResponse>('https://opentdb.com/api.php?amount=10')

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

const handleNextQuestion = () => {
  if(currentQuestionID < questions.length - 1){
    setCurrentQuestionID(currentQuestionID + 1);
  }else{
    setFinished(true);
  }
}

    if(isLoading) return <div>Loading...</div>

    if(error) return <div>Error! Please try again.</div>

    if(finished){
      return <div>Finished!</div>
    }

    return (
        <>
            <h2>{decodeHtml(questions[currentQuestionID]?.question)}</h2>
            <p>{decodeHtml(questions[currentQuestionID]?.correct_answer)}</p>
            <button onClick={handleNextQuestion}>{currentQuestionID === questions.length - 1 ? 'Finish' : 'Next Question'}</button>
        </>
    );
}

export default App;

