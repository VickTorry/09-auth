'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import css from './NoteDetails.module.css'

export default function NoteDetailsClient() {
  const { id } = useParams()
  const idNum = Number(id)

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', idNum],
    queryFn: () => fetchNoteById(idNum),
    enabled: !isNaN(idNum),
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !note) return <p>Something went wrong.</p>

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
