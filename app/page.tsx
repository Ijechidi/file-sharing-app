"use client";
import { motion } from 'framer-motion'
import { Upload, Download, Share2 } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-[100vh] bg-[#F8F9FB]">
      <nav className="py-[2rem]">
        <div className="max-w-[72rem] mx-auto flex justify-between items-center">
          <h2 className="text-white text-[1.5rem] font-[600] -ml-[6rem]">FileShare </h2>
          <div className="flex items-center gap-[6rem] mr-[-6rem]">
            <button className="bg-[#E91E63] text-white px-[2rem] py-[0.6rem] rounded-[9999px] text-[1rem] 
              hover:bg-[#E91E63]/80 hover:scale-[1.05] transition-all duration-[200ms] border-[2px] border-transparent hover:border-[#E91E63]">
              Login
            </button>
            <button className="bg-[#FFC107] text-[#222222] px-[2rem] py-[0.6rem] rounded-[9999px] text-[1rem]
              hover:bg-[#FFC107]/80 hover:scale-[1.05] transition-all duration-[200ms] border-[2px] border-transparent hover:border-[#FFC107]">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[72rem] mx-auto px-[1rem]">
        <div className="grid md:grid-cols-[repeat(2,1fr)] gap-[3rem] items-center py-[4rem]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-[3rem] font-bold text-[#222222] mb-6">
              Secure File Sharing Made Simple
            </h1>
            <p className="text-[#757575] text-[1.125rem] mb-[3rem] max-w-lg">
              Share your files securely with anyone, anywhere. Fast, reliable, and encrypted file transfers at your fingertips.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFC107] text-[#222222] px-[2.5rem] py-[1rem] rounded-[9999px] text-[1.125rem] 
                hover:bg-[#FFC107]/80 transition-all duration-[200ms] border-[2px] border-transparent hover:border-[#FFC107]"
            >
              Start Sharing Now
            </motion.button>
          </motion.div>

         
        </div>

        <div className="py-[2rem] flex flex-col items-center">
          <div className="flex flex-col items-center gap-[0.5rem] mb-[3rem]">
            <h2 className="font-bold text-[#222222] text-[3rem]">
              How It Works
            </h2>
            
          </div>
          <div className="grid md:grid-cols-[repeat(3,1fr)] gap-[2rem] max-w-[64rem] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-[#222222] mb-4">Upload Files</h3>
              <Upload className="w-12 h-12 text-[#00A4CC] mb-4" />
              <p className="text-[#757575] text-center">Drag and drop or browse your files</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-[#222222] mb-4">Share Instantly</h3>
              <Share2 className="w-12 h-12 text-[#00A4CC] mb-4" />
              <p className="text-[#757575] text-center">Generate secure sharing links</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-[#222222] mb-4">Download</h3>
              <Download className="w-12 h-12 text-[#00A4CC] mb-4" />
              <p className="text-[#757575] text-center">Access files from anywhere</p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}