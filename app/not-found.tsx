'use client'

import Link from 'next/link'
import { ArrowLeft, Home, GamepadIcon } from 'lucide-react'

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white min-h-screen flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
          <div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2000ms' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '4000ms' }}
          />
        </div>

        <div className="text-center max-w-2xl mx-auto px-6 relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="rounded-xl bg-linearient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg shadow-cyan-500/25">
              <GamepadIcon className="h-8 w-8 text-white" />
            </div>
            <span className="bg-linearient-to-r from-cyan-400 to-blue-400 bg-clip-text text-2xl font-black tracking-tight text-transparent">
              MyLifeQuest
            </span>
          </div>

          {/* Main Content */}
          <div className="bg-linearient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm shadow-2xl">
            {/* Error Code */}
            <div className="text-8xl font-black bg-linearient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
              404
            </div>

            {/* Main Message */}
            <h1 className="text-3xl font-bold text-cyan-200 mb-4">
              Adventure Awaits Elsewhere
            </h1>

            {/* Description */}
            <div className="space-y-4 text-cyan-300/80 text-lg leading-relaxed mb-8">
              <p>
                Maybe this page is <span className="text-cyan-400 font-semibold">Coming Soon</span>
              </p>
              <p>
                Or maybe it is <span className="text-blue-400 font-semibold">Not Found</span>
              </p>
              <p className="text-cyan-200/60">
                Why don't you go back for a moment and come later?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/dashboard"
                className="flex items-center gap-3 bg-linearient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 group"
              >
                <Home className="w-5 h-5" />
                Back to Dashboard
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-3 border-2 border-cyan-500/40 hover:border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
                <span className="text-cyan-400/60 group-hover:text-cyan-300">(Previous Page)</span>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center space-x-6 opacity-50">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-cyan-400/40 text-sm">
              If you believe this is an error, contact our support team
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}