import React, { useEffect, useMemo, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { getNotes, createNote as createNoteApi, deleteNote as deleteNoteApi, updateNote as updateNoteApi } from '../services/api'
import Sidebar from '../components/Sidebar'
import CreateNoteModal from '../components/CreateNoteModal'
import NoteDetailsModal from '../components/NoteDetailsModal'

const FilterButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${active ? 'bg-white text-gray-900 font-semibold shadow-sm' : 'text-gray-500 hover:text-gray-700'} px-4 py-2 rounded-full text-sm cursor-pointer`}
  >
    {children}
  </button>
)

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [rangeFilter, setRangeFilter] = useState('today')

  const filteredNotes = useMemo(() => {
    const now = new Date()

    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    const weekCutoff = new Date(now)
    weekCutoff.setDate(weekCutoff.getDate() - 7)

    const monthCutoff = new Date(now)
    monthCutoff.setDate(monthCutoff.getDate() - 30)

    return notes.filter(note => {
      const createdAt = new Date(note.createdAt)
      if (Number.isNaN(createdAt.getTime())) return true

      switch (rangeFilter) {
        case 'today':
          return createdAt >= startOfToday
        case 'week':
          return createdAt >= weekCutoff
        case 'month':
          return createdAt >= monthCutoff
        case 'all':
          return true
        default:
          return true
      }
    })
  }, [notes, rangeFilter])

  const fetchNotes = async () => {
    try {
      const res = await getNotes()
      setNotes(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const handleCreateNote = () => {
    setEditingNote(null)
    setShowCreateModal(true)
  }

  const handleSaveNote = async (values) => {
    const res = await createNoteApi(values)
    setNotes(prev => [res.data, ...prev])
  }

  const handleUpdateNote = async (values) => {
    if (!editingNote) return
    const res = await updateNoteApi(editingNote._id, values)
    setNotes(prev => prev.map(n => n._id === editingNote._id ? res.data : n))
    setEditingNote(null)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar with background */}
      <aside className="w-64 min-h-screen bg-neutral-50 px-4 py-6">
        <Sidebar onCreateNote={handleCreateNote} notes={notes} onViewAll={() => setRangeFilter('all')} onNoteClick={(note) => setSelectedNote(note)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 py-6 relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold">My Notes</h1>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-1 shadow-inner border border-gray-200 flex items-center gap-1">
                <FilterButton active={rangeFilter === 'today'} onClick={() => setRangeFilter('today')}>Today</FilterButton>
                <FilterButton active={rangeFilter === 'week'} onClick={() => setRangeFilter('week')}>This Week</FilterButton>
                <FilterButton active={rangeFilter === 'month'} onClick={() => setRangeFilter('month')}>This Month</FilterButton>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNotes.map(n => (
              <NoteCard key={n._id} note={n} onDelete={async (id) => {
                try { await deleteNoteApi(id); setNotes(prev => prev.filter(x => x._id !== id)) } catch (err) { console.error(err) }
              }} onClick={() => setSelectedNote(n)} />
            ))}
          </section>

          {/* Create Note Modal */}
          <CreateNoteModal 
            isOpen={showCreateModal} 
            onClose={() => { setShowCreateModal(false); setEditingNote(null) }} 
            onSave={editingNote ? handleUpdateNote : handleSaveNote}
            initialNote={editingNote}
          />

          {/* Note Details Modal */}
          {selectedNote && (
            <NoteDetailsModal 
              note={selectedNote}
              onClose={() => setSelectedNote(null)}
              onDelete={async (id) => {
                try { 
                  await deleteNoteApi(id)
                  setNotes(prev => prev.filter(x => x._id !== id))
                  setSelectedNote(null)
                } catch (err) { 
                  console.error(err) 
                }
              }}
              onEdit={(note) => {
                setEditingNote(note)
                setSelectedNote(null)
                setShowCreateModal(true)
              }}
            />
          )}
        </main>
    </div>
  )
}
