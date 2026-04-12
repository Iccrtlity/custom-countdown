import { useState, useEffect } from 'react';

function App() {
  const [lessons, setLessons] = useState(() => JSON.parse(localStorage.getItem('myLessons')) || []);
  const [activeLesson, setActiveLesson] = useState(null); // Welche Lektion wird gerade gelernt?
  const [currentQIndex, setCurrentQIndex] = useState(0); // Welche Frage der Lektion?
  
  // Editor States
  const [lessonTitle, setLessonTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tempQuestions, setTempQuestions] = useState([]);

  useEffect(() => {
    localStorage.setItem('myLessons', JSON.stringify(lessons));
  }, [lessons]);

  const addTempQuestion = () => {
    if (!question || !answer) return;
    setTempQuestions([...tempQuestions, { text: question, answer }]);
    setQuestion(''); setAnswer('');
  };

  const saveLesson = () => {
    if (!lessonTitle || tempQuestions.length === 0) return;
    setLessons([...lessons, { title: lessonTitle, questions: tempQuestions }]);
    setLessonTitle(''); setTempQuestions([]);
  };

  // Quiz Logik
  const startQuiz = (lesson) => setActiveLesson(lesson);

  return (
    <div className="app-container">
      {activeLesson ? (
        // Quiz Ansicht
        <div>
          <button onClick={() => setActiveLesson(null)}>Zurück zur Bibliothek</button>
          <h2>{activeLesson.title}</h2>
          <div className="lesson-card">
            <p>{activeLesson.questions[currentQIndex].text}</p>
            <p style={{ color: '#58cc02' }}>Antwort: {activeLesson.questions[currentQIndex].answer}</p>
          </div>
          <button onClick={() => setCurrentQIndex((prev) => (prev + 1) % activeLesson.questions.length)}>Nächste Frage</button>
        </div>
      ) : (
        // Editor Ansicht
        <div>
          <h1>Lektion Editor</h1>
          <input placeholder="Titel" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
          <input placeholder="Frage" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <input placeholder="Antwort" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button onClick={addTempQuestion}>Frage hinzufügen</button>
          <button onClick={saveLesson} style={{ backgroundColor: '#58cc02' }}>Lektion speichern</button>
          
          <h2>Bibliothek</h2>
          {lessons.map((l, i) => (
            <div key={i} className="lesson-card" onClick={() => startQuiz(l)} style={{ cursor: 'pointer' }}>
              <strong>{l.title}</strong> ({l.questions.length} Fragen)
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
