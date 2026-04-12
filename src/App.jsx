import { useState, useEffect } from 'react';

function App() {
  const [lessons, setLessons] = useState(() => JSON.parse(localStorage.getItem('myLessons')) || []);
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  // --- Editor States ---
  const [lessonTitle, setLessonTitle] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [qText, setQText] = useState('');
  const [qAnswer, setQAnswer] = useState('');

  useEffect(() => {
    localStorage.setItem('myLessons', JSON.stringify(lessons));
  }, [lessons]);

  const addQuestion = () => {
    if (!qText || !qAnswer) return;
    setCurrentQuestions([...currentQuestions, { text: qText, answer: qAnswer }]);
    setQText(''); setQAnswer('');
  };

  const saveLesson = () => {
    if (!lessonTitle || currentQuestions.length === 0) return;
    setLessons([...lessons, { title: lessonTitle, questions: currentQuestions }]);
    setLessonTitle(''); setCurrentQuestions([]);
  };

  // --- Spiel-Logik ---
  const checkAnswer = () => {
    const correct = activeLesson.questions[currentQIndex].answer;
    if (userAnswer.trim().toLowerCase() === correct.trim().toLowerCase()) {
      setFeedback('Richtig! ✅');
    } else {
      setFeedback('Falsch. Richtig wäre: ' + correct);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setUserAnswer('');
    if (currentQIndex < activeLesson.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setActiveLesson(null);
      setCurrentQIndex(0);
    }
  };

  if (activeLesson) {
    const q = activeLesson.questions[currentQIndex];
    return (
      <div className="app-container">
        <h1>{activeLesson.title}</h1>
        <div className="lesson-card">
          <h3>{q.text}</h3>
          {!feedback ? (
            <>
              <input placeholder="Deine Antwort eingeben..." value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
              <button onClick={checkAnswer}>Überprüfen</button>
            </>
          ) : (
            <>
              <p style={{ fontWeight: 'bold' }}>{feedback}</p>
              <button onClick={handleNext}>Weiter</button>
            </>
          )}
        </div>
        <button onClick={() => { setActiveLesson(null); setFeedback(null); }} style={{ marginTop: '20px', background: '#ccc' }}>Zurück zur Bibliothek</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Lektion erstellen</h1>
      <input placeholder="Titel" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
      <input placeholder="Frage" value={qText} onChange={(e) => setQText(e.target.value)} />
      <input placeholder="Antwort" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)} />
      <button onClick={addQuestion}>Frage hinzufügen</button>
      <button onClick={saveLesson} style={{ background: '#58cc02', marginTop: '10px' }}>Lektion speichern</button>

      <h2>Deine Bibliothek</h2>
      {lessons.map((l, i) => (
        <div key={i} className="lesson-card" onClick={() => setActiveLesson(l)} style={{ cursor: 'pointer' }}>
          <strong>{l.title}</strong> ({l.questions.length} Fragen)
        </div>
      ))}
    </div>
  );
}
export default App;
