"use client"
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Upload, Share2, Trash2, FolderOpen, Clock, Star, Users } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
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
    } catch (error) {
      alert('Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'myFiles':
        return (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
            </div>

            {/* Files List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">My Files</h3>
              {/* Files list will go here */}
            </div>
          </div>
        )
      case 'shared':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Shared with me</h3>
            {/* Shared files list */}
          </div>
        )
      case 'recent':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Files</h3>
            {/* Recent files list */}
          </div>
        )
      case 'starred':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Starred Files</h3>
            {/* Starred files list */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-[#222222]">Dashboard</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('myFiles')}
              className={`${
                activeTab === 'myFiles'
                  ? 'border-[#E91E63] text-[#222222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              My Files
            </button>

            <button
              onClick={() => setActiveTab('shared')}
              className={`${
                activeTab === 'shared'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Users className="w-5 h-5 mr-2" />
              Shared with me
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`${
                activeTab === 'recent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Clock className="w-5 h-5 mr-2" />
              Recent
            </button>

            <button
              onClick={() => setActiveTab('starred')}
              className={`${
                activeTab === 'starred'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <Star className="w-5 h-5 mr-2" />
              Starred
            </button>
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}