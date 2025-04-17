"use client"
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import { Upload, Download, Share2, Trash2, Search, Filter, FolderOpen, Clock, Star } from 'lucide-react'

interface FileItem {
  name: string
  size: number
  created_at: string
  id: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('myFiles')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      const { data, error } = await supabase.storage
        .from('files')
        .upload(`${user?.id}/${file.name}`, file)

      if (error) throw error
      
      // Refresh files list after upload
      fetchFiles()
    } catch (error) {
      alert('Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .list(`${user?.id}/`)

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchFiles()
    }
  }, [user])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-[72rem] mx-auto px-[2rem] py-[1.25rem] flex items-center justify-between">
          <h1 className="text-[1.5rem] font-bold text-[#1a1a1a]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#666] text-sm">{user?.email}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[72rem] mx-auto px-[2rem] py-[2rem]">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-[1rem] shadow-sm mb-[2rem]">
          <nav className="flex justify-between px-[2rem] py-[0.5rem]">
            <button
              onClick={() => setActiveTab('myFiles')}
              className={`${
                activeTab === 'myFiles'
                  ? 'border-[#2563eb] text-[#2563eb] bg-blue-50'
                  : 'border-transparent text-[#666] hover:text-[#1a1a1a] hover:bg-gray-50'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <FolderOpen className="w-[1.25rem] h-[1.25rem] mr-3" />
              My Files
            </button>

            <button
              onClick={() => setActiveTab('shared')}
              className={`${
                activeTab === 'shared'
                  ? 'border-[#2563eb] text-[#2563eb] bg-blue-50'
                  : 'border-transparent text-[#666] hover:text-[#1a1a1a] hover:bg-gray-50'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <Share2 className="w-[1.25rem] h-[1.25rem] mr-3" />
              Shared with me
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`${
                activeTab === 'recent'
                  ? 'border-[#2563eb] text-[#2563eb] bg-blue-50'
                  : 'border-transparent text-[#666] hover:text-[#1a1a1a] hover:bg-gray-50'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <Clock className="w-[1.25rem] h-[1.25rem] mr-3" />
              Recent
            </button>

            <button
              onClick={() => setActiveTab('starred')}
              className={`${
                activeTab === 'starred'
                  ? 'border-[#2563eb] text-[#2563eb] bg-blue-50'
                  : 'border-transparent text-[#666] hover:text-[#1a1a1a] hover:bg-gray-50'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <Star className="w-[1.25rem] h-[1.25rem] mr-3" />
              Starred
            </button>
          </nav>
        </div>

        {activeTab === 'myFiles' && (
          <>
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-[2rem]">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-[0.875rem] rounded-[0.75rem] border border-gray-200 
                    focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-[0.875rem] rounded-[0.75rem] 
                border border-gray-200 hover:border-[#2563eb] hover:bg-blue-50 transition-all">
                <Filter className="w-5 h-5 text-[#666]" />
                <span className="text-[#1a1a1a]">Filter</span>
              </button>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-[1rem] p-[2rem] shadow-sm mb-[2rem] border border-gray-100">
              <div className="border-2 border-dashed border-gray-200 rounded-[0.75rem] p-[2rem] 
                hover:border-[#2563eb] hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileInput"
                  disabled={uploading}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-[#2563eb] mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">Upload Files</h3>
                  <p className="text-[#666]">Drag and drop files here or click to browse</p>
                </label>
              </div>
            </div>

            {/* Files List */}
            <div className="bg-white rounded-[1rem] p-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-[1.25rem] font-semibold mb-6 text-[#1a1a1a]">Your Files</h2>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 rounded-[0.75rem] border border-gray-100 
                      hover:border-[#2563eb] hover:bg-blue-50 transition-all"
                  >
                    {/* ... contenu du fichier ... */}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'shared' && (
          <div className="bg-white rounded-[2rem] p-[2rem] shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Shared with me</h2>
            {/* Shared files content */}
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="bg-white rounded-[2rem] p-[2rem] shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Recent Files</h2>
            {/* Recent files content */}
          </div>
        )}

        {activeTab === 'starred' && (
          <div className="bg-white rounded-[2rem] p-[2rem] shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Starred Files</h2>
            {/* Starred files content */}
          </div>
        )}
      </div>
    </div>
  )
}