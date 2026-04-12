import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Editor({ lessons, setLessons }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [qText, setQText] = useState('');
  const [qAnswer, setQAnswer] = useState('');

  const addQuestion = () => {
    if (!qText || !qAnswer) return;
    setQuestions([...questions, { text: qText, answer: qAnswer }]);
    setQText(''); setQAnswer('');
  };

  const saveLesson = () => {
    if (!title || questions.length === 0) return;
    setLessons([...lessons, { title, questions }]);
    navigate('/');
  };

  return (
    <div>
      <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>Neue Lektion erstellen</h1>
      <input placeholder="Titel der Lektion" value={title} onChange={(e) => setTitle(e.target.value)} />
      
      <div style={{ margin: '20px 0', padding: '15px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <input placeholder="Frage" value={qText} onChange={(e) => setQText(e.target.value)} />
        <input placeholder="Antwort" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)} />
        <button onClick={addQuestion}>Frage hinzufügen</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', color: '#666' }}>Fragen ({questions.length})</h2>
        {questions.map((q, i) => (
          <div key={i} className="card" style={{ fontSize: '14px' }}>
            <strong>Q:</strong> {q.text} <br />
            <strong>A:</strong> {q.answer}
          </div>
        ))}
      </div>

      <button onClick={saveLesson} style={{ background: '#059669' }}>Lektion speichern</button>
      <button onClick={() => navigate('/')} style={{ background: '#6b7280' }}>Zurück</button>
    </div>
  );
}
