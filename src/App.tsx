import { useState, useEffect } from 'react';
import { Lesson } from './types';

function App() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Daten sicher laden
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        setLessons(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.error("Daten korrupt, starte mit leerer Liste", e);
      setLessons([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }, [lessons]);

  const clearData = () => {
    localStorage.removeItem('lessons');
    setLessons([]);
    setActiveLesson(null);
  };

  return (
    <div className="app-container">
      {activeLesson ? (
        <div>
          <h2>{activeLesson.title}</h2>
          <p>{activeLesson.questions?.[qIndex]?.text || "Keine Frage vorhanden"}</p>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={() => {
            const correctAnswer = activeLesson.questions?.[qIndex]?.answer || "";
            const isCorrect = input.toLowerCase() === correctAnswer.toLowerCase();
            setFeedback(isCorrect ? 'Richtig!' : 'Falsch.');
            setTimeout(() => {
              setFeedback(null);
              setInput('');
              if (activeLesson.questions && qIndex < activeLesson.questions.length - 1) {
                setQIndex(qIndex + 1);
              } else {
                setActiveLesson(null);
              }
            }, 1000);
          }}>Prüfen</button>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      ) : (
        <div>
          <h1>Bibliothek</h1>
          {lessons.length === 0 && <p>Keine Lektionen gefunden.</p>}
          {lessons.map((l, i) => (
            <button key={i} className="lesson-btn" onClick={() => { setActiveLesson(l); setQIndex(0); }}>
              {l.title} ({l.questions?.length || 0} Fragen)
            </button>
          ))}
          <button onClick={clearData} style={{ marginTop: '20px', background: '#ff4444', color: 'white' }}>
            Daten löschen und App neu starten
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
