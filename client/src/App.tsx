import { useEffect, useState } from 'react';

import { Note as NoteModel } from './models/note';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const initialNotes = (await response.json()) as NoteModel[];
        setNotes(initialNotes);
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }
    loadNotes().catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </div>
  );
}

export default App;
