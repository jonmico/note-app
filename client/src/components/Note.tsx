import styles from '../styles/Note.module.css';
import styleUtils from '../styles/utils.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

export default function Note({
  note,
  className,
  onDeleteNoteClicked,
  onNoteClicked,
}: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  const createdUpdatedText =
    updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;

  return (
    <Card
      className={`${styles.noteCard} ${className ? className : ''}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(evt: React.MouseEvent) => {
              onDeleteNoteClicked(note);
              evt.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
}
