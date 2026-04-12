import { useState, useEffect } from 'react';
import { lessons } from './data/lessons';

function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved).score : 0;
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify({ score }));
  }, [score]);

  const handleAnswer = (selected) => {
    const correct = lessons[currentLessonIndex].questions[currentQuestionIndex].answer;
    if (selected === correct) setScore((s) => s + 10);
    
    if (currentQuestionIndex < lessons[currentLessonIndex].questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert('Lektion beendet! Dein Punktestand: ' + score);
    }
  };

  const question = lessons[currentLessonIndex].questions[currentQuestionIndex];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>{lessons[currentLessonIndex].title}</h1>
      <p>Punkte: {score}</p>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h3>{question.text}</h3>
        {question.options.map((opt) => (
          <button key={opt} onClick={() => handleAnswer(opt)} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '15px' }}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
