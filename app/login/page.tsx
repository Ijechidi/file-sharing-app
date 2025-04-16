"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'

// Ajoutez cette interface pour typer l'erreur
interface AuthError {
  message: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      if (data.user) {
        router.push('/dashboard')
      }
    } catch (error) {
      // Typage de l'erreur
      const authError = error as AuthError
      alert(authError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) throw error
    } catch (error) {
      // Typage de l'erreur
      const authError = error as AuthError
      alert(authError.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[42rem]  w-full mx-auto bg-[#F8F9FB] rounded-[2rem] shadow-lg overflow-hidden py-[6rem] my-[8rem]"
      >
        <div className="w-full bg-[#E91E63] h-2" />
        <div className="max-w-[450px] mx-auto px-8 py-12">
          <button onClick={() => router.push('/')} className="mb-8 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222222]">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Champ Email */}
            <div className="flex-col">
              <label className="text-[#151717] font-semibold mb-2 block">Email</label>
              <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-all duration-200 focus-within:border-[#E91E63]">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32">
                  <g data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"/></g>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-3 flex-1 outline-none bg-transparent"
                  placeholder="Enter your Email"
                  required
                />
              </div>
            </div>

            {/* Champ Password */}
            <div className="flex-col">
              <label className="text-[#151717] font-semibold mb-2 block">Password</label>
              <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 transition-all duration-200 focus-within:border-[#E91E63]">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="-64 0 512 512">
                  <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"/><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"/>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-3 flex-1 outline-none bg-transparent"
                  placeholder="Enter your Password"
                  required
                />
              </div>
            </div>

            {/* Remember me et Forgot password */}
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300"/>
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#E91E63] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Bouton Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#E91E63] text-white h-[50px] rounded-[10px] font-medium hover:bg-[#E91E63]/90 transition-colors mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#E91E63] hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Séparateur */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1 h-[1px] bg-gray-200"/>
              <span className="text-gray-500">Or With</span>
              <div className="flex-1 h-[1px] bg-gray-200"/>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-[10px] h-[50px] hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 512 512">
                <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"/>
                <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"/>
                <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/>
                <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"/>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}