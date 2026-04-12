import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Quiz({ lessons }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons[id];
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('');

  if (!lesson) return <div>Lektion nicht gefunden!</div>;

  const check = () => {
    if (input.toLowerCase() === lesson.questions[index].answer.toLowerCase()) {
      setMsg('Richtig! ✅');
    } else {
      setMsg('Falsch! ❌');
    }
  };

  return (
    <div className="app-container">
      <h1>{lesson.title}</h1>
      <div className="lesson-card">
        <h3>{lesson.questions[index].text}</h3>
        {!msg ? (
          <>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={check}>Prüfen</button>
          </>
        ) : (
          <>
            <p>{msg}</p>
            <button onClick={() => { 
              if (index < lesson.questions.length - 1) { setIndex(index + 1); setMsg(''); setInput(''); }
              else navigate('/'); 
            }}>Weiter</button>
          </>
        )}
      </div>
    </div>
  );
}
