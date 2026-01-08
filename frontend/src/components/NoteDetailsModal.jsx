import React from 'react'

// Random pastel colors matching NoteCard
const headerColors = [
  'bg-purple-200',
  'bg-pink-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-indigo-200',
]

export default function NoteDetailsModal({ note, onClose, onDelete, onEdit }) {
  if (!note) return null

  // Pick a consistent color based on note ID
  const colorIndex = note._id ? note._id.charCodeAt(0) % headerColors.length : 0
  const headerColor = headerColors[colorIndex]

  // Format date and time for header
  const dateTime = new Date(note.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  const handleDelete = () => {
    onDelete(note._id)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${headerColor} px-6 py-4 flex items-center justify-between`}>
          <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
          <span className="text-sm text-gray-700">{dateTime}</span>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap">{note.description}</p>
        </div>

        {/* Footer with Edit/Delete */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => {
              if (onEdit) onEdit(note)
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
