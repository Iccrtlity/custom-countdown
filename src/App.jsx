import { useState, useEffect } from 'react';

function App() {
  const [lessons, setLessons] = useState(() => JSON.parse(localStorage.getItem('myLessons')) || []);
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
    setLessonTitle('');
    setCurrentQuestions([]);
  };

  return (
    <div className="app-container">
      <h1>Lektion erstellen</h1>
      <input placeholder="Titel der Lektion (z.B. Spanisch Vokabeln)" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
      
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '10px' }}>
        <input placeholder="Frage" value={qText} onChange={(e) => setQText(e.target.value)} />
        <input placeholder="Antwort" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)} />
        <button onClick={addQuestion} style={{ backgroundColor: '#2b82c9' }}>Frage hinzufügen</button>
      </div>

      <h3 style={{ marginTop: '20px' }}>Fragen in dieser Lektion ({currentQuestions.length})</h3>
      {currentQuestions.map((q, i) => <div key={i} className="lesson-card"><strong>Q:</strong> {q.text} | <strong>A:</strong> {q.answer}</div>)}
      
      <button onClick={saveLesson} style={{ marginTop: '20px', backgroundColor: '#58cc02' }}>Lektion in Bibliothek speichern</button>

      <hr style={{ margin: '40px 0' }} />

      <h2>Deine Bibliothek ({lessons.length})</h2>
      {lessons.map((l, i) => (
        <div key={i} className="lesson-card">
          <h4 style={{ margin: '0 0 10px' }}>{l.title}</h4>
          <p>{l.questions.length} Fragen enthalten</p>
        </div>
      ))}
    </div>
  );
}
export default App;
