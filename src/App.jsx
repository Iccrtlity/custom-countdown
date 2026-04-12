import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import Quiz from './Quiz';

function App() {
  const [lessons, setLessons] = useState(() => JSON.parse(localStorage.getItem('myLessons')) || []);
  useEffect(() => localStorage.setItem('myLessons', JSON.stringify(lessons)), [lessons]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Lern-App</h1>
              <Link to="/editor"><button>Neue Lektion erstellen</button></Link>
              <h2 style={{ fontSize: '16px', marginTop: '30px', color: '#666' }}>Deine Lektionen</h2>
              {lessons.map((l, i) => (
                <Link key={i} to={`/quiz/${i}`}>
                  <div className="card"><strong>{l.title}</strong></div>
                </Link>
              ))}
            </>
          } />
          <Route path="/editor" element={<Editor lessons={lessons} setLessons={setLessons} />} />
          <Route path="/quiz/:id" element={<Quiz lessons={lessons} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
