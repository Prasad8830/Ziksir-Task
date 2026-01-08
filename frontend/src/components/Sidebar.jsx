import React, { useState } from 'react'
import { removeToken, getUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

// Icons (simple SVG placeholders)
const PlusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
const SearchIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" /></svg>
const ArchiveIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M5 8l1-4h12l1 4M10 12h4" /></svg>
const HelpIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 9a3 3 0 115.12 2.12A2.25 2.25 0 0012 13.5m0 3h.01" /></svg>
const SettingsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L9.94 17.65a1 1 0 01-1.69.06l-1.08-1.62a1 1 0 00-.83-.45H4.5a1 1 0 01-.97-1.22l.4-1.6a1 1 0 00-.2-.92L2.1 10.1a1 1 0 01.2-1.4l1.42-.95a1 1 0 00.44-.83V5.5a1 1 0 011.22-.97l1.6.4a1 1 0 00.92-.2L9.7 3.1a1 1 0 011.4.2l.95 1.42a1 1 0 00.83.44H14.5a1 1 0 01.97 1.22l-.4 1.6a1 1 0 00.2.92l1.63 1.8a1 1 0 01-.2 1.4l-1.42.95a1 1 0 00-.44.83v1.42a1 1 0 01-1.22.97l-1.6-.4a1 1 0 00-.92.2z" /><circle cx="12" cy="12" r="3" /></svg>

export default function Sidebar({ notes = [], onCreateNote, onViewAll, onNoteClick }) {
  const [showProfile, setShowProfile] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const user = getUser()
  const avatarLetter = (user?.username || user?.name || 'U').charAt(0).toUpperCase()
  const displayName = user?.name || user?.username || 'User'
  const displayHandle = user?.username ? `@${user.username}` : (user?.email || 'user')
  const profileGreeting = user?.username ? `Hi ${user.username}` : 'Profile'

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  // Filter notes based on search query
  const searchResults = searchQuery.trim()
    ? notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <div className="sticky top-6 flex flex-col h-[calc(100vh-3rem)]">
      {/* Top section */}
      <div className=" p-4 rounded-2xl mb-1">
        {/* User profile */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-300 to-lime-500 flex items-center justify-center text-black font-bold text-lg">
              {avatarLetter}
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">{displayName}</div>
              <div className="text-xs text-gray-500">{displayHandle}</div>
            </div>
            <span className="ml-auto text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </button>

          {/* Profile popup */}
          {showProfile && (
            <div className="absolute left-0 top-14 w-full bg-white rounded-xl shadow-lg border p-3 z-10">
              <div className="text-sm font-medium mb-2 px-2">{profileGreeting}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Create Note button */}
        <button
          onClick={onCreateNote}
          className="w-full flex items-center gap-3 px-3 py-2 bg-black text-white rounded-lg mb-3"
        >
          <PlusIcon />
          <span className="font-semibold text-sm">Create Note</span>
        </button>

        {/* Search and Archives */}
        <nav className="space-y-1">
            <button onClick={onViewAll} className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
            <ArchiveIcon />
            <span>All Notes</span>
          </button>
          <hr />
          {isSearching ? (
            <div className="flex items-center gap-2 px-3 py-2">
              <SearchIcon />
              <input
                type="text"
                autoFocus
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery.trim()) {
                    setIsSearching(false)
                  }
                }}
                className="flex-1 text-sm outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setIsSearching(false) }}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsSearching(true)}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
            >
              <SearchIcon />
              <span>Search</span>
            </button>
          )}
          
        </nav>
      </div>

      {/* Search results section (scrollable) */}
      {isSearching && searchResults.length > 0 && (
        <div className=" p-4 rounded-2xl border border-gray-100 mb-4 flex-5 overflow-hidden flex flex-col h-50">
          <div className="text-xs font-semibold text-gray-500 mb-2">Search Results</div>
          <div className="overflow-y-auto flex-1 space-y-2">
            {searchResults.map((note, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  onNoteClick(note)
                  setIsSearching(false)
                  setSearchQuery('')
                }}
                className="text-sm text-gray-700 truncate px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                {note.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section */}
      <hr />
      <div className=" p-4 rounded-2xl border border-gray-100">
        <nav className="space-y-1">
          <button disabled className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 cursor-not-allowed rounded-lg text-sm">
            <HelpIcon />
            <span>Help</span>
          </button>
          <button disabled className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 cursor-not-allowed rounded-lg text-sm">
            <SettingsIcon />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
