
'use client';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
   // NOTE: Handles cache update locally
   const queryClient = useQueryClient();

   // NOTE: Defines mutation inside the component
   const mutation = useMutation({
  mutationFn: deleteNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  },
  onError: (err) => {
    console.error('❌ Delete failed:', err);
    alert('This note could not be deleted. It may already be gone.');
  },
});

 
   const handleDelete = (id: number) => {
     mutation.mutate(id); // NOTE: Triggers API call
  };
  console.log('[NoteList] Rendering notes:', notes.map(n => n.id));

  return (
    
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleDelete(note.id)} // NOTE: Internal handler
            disabled={mutation.isPending} 
          >{mutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
            <Link className={css.link} href={`/notes/${note.id}`}>
             View details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
