import { useState, useEffect } from 'react';

function App() {
  const [lessons, setLessons] = useState(() => JSON.parse(localStorage.getItem('myLessons')) || []);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    localStorage.setItem('myLessons', JSON.stringify(lessons));
  }, [lessons]);

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center' }}>Lektion Erstellen</h1>
      <input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Frage" value={text} onChange={(e) => setText(e.target.value)} />
      <input placeholder="Antwort" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={() => { 
        if(!title || !text || !answer) return;
        setLessons([...lessons, { title, text, answer }]);
        setTitle(''); setText(''); setAnswer('');
      }}>Hinzufügen</button>
      
      {lessons.map((l, i) => (
        <div key={i} className="lesson-card">
          <strong>{l.title}</strong>
          <div>{l.text}</div>
          <div style={{ color: '#58cc02' }}>Antwort: {l.answer}</div>
        </div>
      ))}
    </div>
  );
}
export default App;
