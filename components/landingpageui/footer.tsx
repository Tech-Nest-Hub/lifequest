"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800/50 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-black text-white">MyLifeQuest</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Gamify your life. Turn everyday goals into epic quests and level up your real-world character.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/50 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">© {currentYear} MyLifeQuest. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-zinc-400">
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
