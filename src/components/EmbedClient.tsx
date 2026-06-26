"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  BsX,
  BsClipboard,
  BsCheck2,
  BsSendFill,
  BsChatDotsFill,
  BsArrowLeft,
  BsCircleFill,
} from 'react-icons/bs'

function TypingDots() {
  return (
    <div className="flex gap-1 bg-white border border-zinc-200 rounded-2xl rounded-tl-sm px-3 py-2.5 w-fit shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function EmbedClient({ ownerId }: { ownerId: string }) {
  const [copied, setCopied] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(true)
  const router = useRouter()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com'

  const embedCode = `<script 
src="${appUrl}/chatBot.js"
data-owner-id="${ownerId}">
</script>`

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const steps = [
    { title: 'Copy the snippet', desc: 'Click the copy button on the code block above.' },
    { title: 'Paste it in your HTML', desc: 'Drop it right before the closing </body> tag.' },
    { title: 'Reload your site', desc: "That's it — the widget shows up automatically." },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-lg font-bold cursor-pointer select-none"
          >
            <span className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-xs">
              S
            </span>
            Support<span className="text-zinc-400">.AI</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400 transition-colors"
          >
            <BsArrowLeft className="text-xs" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase mb-2">Setup</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Embed your chatbot</h1>
          <p className="text-zinc-500 mb-10 max-w-xl">
            Paste one snippet into your site and the widget appears, fully wired to your account.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: code + steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-8"
          >
            <div className="rounded-2xl bg-zinc-900 overflow-hidden shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-900/5">
              <div className="flex items-center justify-between px-4 h-11 bg-zinc-950/40 border-b border-white/5">
                <span className="text-xs font-mono text-zinc-400">embed-snippet.html</span>
                <button
                  onClick={copyCode}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-all ${
                    copied ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {copied ? <BsCheck2 /> : <BsClipboard />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="px-5 py-5 text-[13px] leading-6 font-mono overflow-x-auto">
                <code>
                  <span className="text-zinc-500">&lt;</span>
                  <span className="text-sky-400">script</span>
                  {'\n'}
                  <span className="text-emerald-400">  src</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-amber-300">"{appUrl}/chatBot.js"</span>
                  {'\n'}
                  <span className="text-emerald-400">  data-owner-id</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-amber-300">"{ownerId}"</span>
                  <span className="text-zinc-500">&gt;</span>
                  {'\n'}
                  <span className="text-zinc-500">&lt;/</span>
                  <span className="text-sky-400">script</span>
                  <span className="text-zinc-500">&gt;</span>
                </code>
              </pre>
            </div>

            <div className="relative pl-2">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {i !== steps.length - 1 && (
                    <span className="absolute left-[15px] top-8 bottom-0 w-px bg-zinc-200" />
                  )}
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-zinc-300 text-xs font-semibold flex items-center justify-center text-zinc-700">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-zinc-900">{step.title}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: live preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Live preview</h2>
                <p className="text-sm text-zinc-500">How it looks on your site</p>
              </div>
              <button
                onClick={() => setPreviewOpen((o) => !o)}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {previewOpen ? 'Hide widget' : 'Show widget'}
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/60 overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-10 bg-zinc-100 border-b border-zinc-200">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-3 flex-1 text-center text-[11px] text-zinc-400 bg-white rounded-md py-1 px-3 truncate max-w-[200px] mx-auto">
                  your-website.com
                </span>
              </div>

              <div className="relative h-[420px] bg-zinc-50 p-6">
                <div className="space-y-2.5">
                  <div className="h-3 w-32 rounded bg-zinc-200" />
                  <div className="h-2 w-48 rounded bg-zinc-200/70" />
                  <div className="h-2 w-40 rounded bg-zinc-200/70" />
                  <div className="h-2 w-44 rounded bg-zinc-200/70" />
                </div>

                <motion.button
                  onClick={() => setPreviewOpen((o) => !o)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg shadow-zinc-900/30"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {previewOpen ? (
                      <motion.span
                        key="x"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <BsX className="text-xl" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="chat"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <BsChatDotsFill className="text-base" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {previewOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute bottom-20 right-5 w-72 rounded-2xl bg-white border border-zinc-200 shadow-2xl shadow-zinc-900/15 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 text-white">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                            S
                          </span>
                          <div>
                            <p className="text-sm font-medium leading-tight">Customer Support</p>
                            <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                              <BsCircleFill className="text-emerald-400 text-[6px]" /> Online
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setPreviewOpen(false)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <BsX className="text-lg" />
                        </button>
                      </div>

                      <div className="bg-zinc-50 px-3 py-4 space-y-2 h-44 overflow-y-auto">
                        <div className="max-w-[85%] bg-white border border-zinc-200 rounded-2xl rounded-tl-sm px-3 py-2 text-[13px] text-zinc-700 shadow-sm">
                          👋 Hi there! How can I help you today?
                        </div>
                        <TypingDots />
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-zinc-200 bg-white">
                        <input
                          disabled
                          placeholder="Type a message..."
                          className="flex-1 text-[13px] bg-zinc-100 rounded-full px-3 py-2 outline-none placeholder:text-zinc-400"
                        />
                        <button className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center flex-shrink-0">
                          <BsSendFill className="text-xs" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EmbedClient