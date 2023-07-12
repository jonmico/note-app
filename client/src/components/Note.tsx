import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';

interface NoteProps {
  note: NoteModel;
  className?: string;
}

export default function Note({ note, className }: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  const createdUpdatedText =
    updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;

  return (
    <Card className={`${styles.noteCard} ${className ? className : ''}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
}
