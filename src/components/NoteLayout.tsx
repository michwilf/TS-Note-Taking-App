import React from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from '../App'

export type NoteLayoutProps = {
    notes: Note[]
}

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
    
    const { id } = useParams<{ id: string }>()
    const note = notes.find(note => note.id === id)

    if (!note) {
        return <Navigate to="/" />
    }

  return (
    <Outlet context={note} />
  )
}

export function useNote() {
    return useOutletContext<Note>()
}
