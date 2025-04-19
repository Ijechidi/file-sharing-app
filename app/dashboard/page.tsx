"use client"
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

import { Upload, Download, Share2, Trash2, Search, Filter, FolderOpen, Clock, Star } from 'lucide-react'
import { FileDetails } from '../../types/file'
import { formatFileSize, getFileTypeIcon } from '../../lib/fileUtils'

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

      console.log('Uploading file:', file.name, 'Size:', file.size)
      console.log('User ID:', user?.id)

      // Upload to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('files')
        .upload(`${user?.id}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (storageError) {
        console.error('Storage error:', storageError.message)
        throw storageError
      }

      console.log('Storage success:', storageData)

      // Create file record in database
      const { error: dbError } = await supabase
        .from('files')
        .insert({
          name: file.name,
          size: file.size,
          type: file.type,
          path: `${user?.id}/${file.name}`,
          owner_id: user?.id
        })

      if (dbError) {
        console.error('Database error:', dbError.message)
        throw dbError
      }
      
      // Refresh files list
      fetchFiles()
    } catch (error: any) {
      console.error('Detailed error:', error.message)
      alert(`Error uploading file: ${error.message}`)
    } finally {
      setUploading(false)
    }
}

  const fetchFiles = async () => {
    try {
      const { data: filesData, error } = await supabase
        .from('files')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setFiles(filesData || [])
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="bg-white border-b border-[#E0E7FF]">
        <div className="max-w-[72rem] mx-auto px-[2rem] py-[1.25rem]  flex items-center justify-between">
          <h1 className="text-[1.5rem] font-bold text-[#00A4CC]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-[#4B5563] text-sm font-medium">{user?.email}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[72rem] mx-auto px-[2rem] py-[2rem]">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E0E7FF]">
          <nav className="flex justify-between px-[2rem] py-[0.5rem]">
            <button
              onClick={() => setActiveTab('myFiles')}
              className={`${
                activeTab === 'myFiles'
                  ? 'border-[#00A4CC] text-[#00A4CC] bg-[#EEF2FF]'
                  : 'border-transparent text-[#6B7280] hover:text-[#00A4CC] hover:bg-[#F5F7FF]'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <FolderOpen className="w-[1.25rem] h-[1.25rem] mr-3" />
              My Files
            </button>

            <button
              onClick={() => setActiveTab('shared')}
              className={`${
                activeTab === 'shared'
                  ? 'border-[#00A4CC] text-[#00A4CC] bg-blue-50'
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
                  ? 'border-[#00A4CC] text-[#00A4CC] bg-blue-50'
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
                  ? 'border-[#00A4CC] text-[#00A4CC] bg-blue-50'
                  : 'border-transparent text-[#666] hover:text-[#1a1a1a] hover:bg-gray-50'
              } flex items-center py-[1rem] px-[2rem] border-b-2 font-medium text-[0.95rem] rounded-t-lg transition-all`}
            >
              <Star className="w-[1.25rem] h-[1.25rem] mr-3" />
              Starred
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-[2rem] mt-[2rem]">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-[0.875rem] rounded-xl border border-[#E0E7FF] 
                focus:border-[#00A4CC] focus:ring-2 focus:ring-[#E0E7FF] outline-none transition-all
                text-[#374151] placeholder-[#9CA3AF]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-[0.875rem] rounded-xl 
            bg-white border border-[#E0E7FF] hover:border-[#00A4CC] hover:bg-[#F5F7FF] transition-all">
            <Filter className="w-5 h-5 text-[#6B7280]" />
            <span className="text-[#374151] font-medium">Filter</span>
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-[2rem] shadow-sm border border-[#E0E7FF] mb-[2rem]">
          <div className="border-2 border-dashed border-[#E0E7FF] rounded-xl p-[2rem] 
            hover:border-[#00A4CC] hover:bg-[#F5F7FF] transition-all group">
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
              <input
                id="fileInput"
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-[#00A4CC] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                {uploading ? 'Uploading...' : 'Upload Files'}
              </h3>
              <p className="text-[#6B7280]">Drag and drop files here or click to browse</p>
            </label>
          </div>
        </div>

        {/* Files List */}
        <div className="bg-white rounded-xl p-[2rem] shadow-sm border border-[#E0E7FF]">
          <h2 className="text-[1.25rem] font-semibold mb-6 text-[#111827]">Your Files</h2>
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 rounded-xl border border-[#E0E7FF] 
                  hover:border-[#00A4CC] hover:bg-[#F5F7FF] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-[#F5F7FF] group-hover:bg-white transition-colors">
                    {/* Icône basée sur le type de fichier */}
                  </div>
                  <div>
                    <h3 className="text-[#111827] font-medium">{file.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{new Date(file.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-[#F5F7FF] transition-colors">
                    <Share2 className="w-5 h-5 text-[#6B7280]" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#F5F7FF] transition-colors">
                    <Download className="w-5 h-5 text-[#6B7280]" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#F5F7FF] transition-colors">
                    <Trash2 className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}