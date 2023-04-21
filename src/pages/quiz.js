import { useState, useContext } from 'react';
import withAuth from '../lib/withAuth';
import Layout from '../components/layout';

import { useUserContext } from '../lib/UserContext';
import Question from '../components/question';
import questionsData from '../questions_list.json';

const Questions = () => {
  const { userState, setUserState } = useUserContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false); // Add a new state variable


  const handleAnswer = (selected) => {
    let newScore = currentScore;
  
    if (selected === questionsData[currentQuestion].correct) {
      newScore = currentScore + 1;
    }
  
    if (currentQuestion + 1 < questionsData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(score + newScore);
      setQuizCompleted(true);
    }
  
    setCurrentScore(newScore);
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <Layout>
      <h1 className='max-w-lg text-3xl font-medium tracking-tight sm:text-4xl'>Hi {userState?.firstName},</h1>
      <p className='mt-2 text-lg leading-8 text-body'>Here is your question of the day: </p>
      <div className='mt-6'>
        {quizCompleted ? (
          <div className='w-full border py-10 px-6 rounded-xl bg-background-l3 '>
            <h2 className='text-center text-2xl font-medium tracking-tight sm:text-3xl'>Thanks for playing today!</h2>
            <p className='text-center mt-6 text-lg leading-8 text-body'>Your score: {score}</p>
          </div>
        ) : (
          <Question question={questionsData[currentQuestion].question} options={questionsData[currentQuestion].options} onSelect={handleAnswer} />
        )}
      </div>
      <p className='mt-6 text-lg leading-8 text-body'>Your score: {currentScore}</p>
      <button className='text-icon' onClick={resetQuiz}>
        Reset
      </button>
    </Layout>
  );
};

export default withAuth(Questions);
