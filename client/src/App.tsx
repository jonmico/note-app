import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Note } from './models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const initialNotes: Note[] = await response.json();
        setNotes(initialNotes);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
    void loadNotes();
  }, []);

  return <div>{JSON.stringify(notes)}</div>;
}

export default App;
