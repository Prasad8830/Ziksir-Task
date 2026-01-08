import React from 'react'

// Random pastel colors for note headers
const headerColors = [
  'bg-purple-200',
  'bg-pink-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-indigo-200',
]

export default function NoteCard({ note, onDelete, onClick }) {
  // Pick a consistent color based on note ID
  const colorIndex = note._id ? note._id.charCodeAt(0) % headerColors.length : 0
  const headerColor = headerColors[colorIndex]
  
  // Format time only (no date)
  const timeOnly = new Date(note.createdAt).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })

  return (
    <div 
      className="border rounded-3xl p-2 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl border overflow-hidden">
        {/* Header section with title and time */}
        <div className={`${headerColor} px-4 py-3 flex items-center justify-between`}>
          <h3 className="font-semibold text-base text-gray-800">{note.title}</h3>
          <span className="text-sm text-gray-600">{timeOnly}</span>
        </div>
        
        {/* Body section */}
        <div className="px-4 py-3">
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.description}</p>
        </div>
      </div>
    </div>
  )
}
