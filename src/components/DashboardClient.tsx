"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { BsChatDots, BsCheck2, BsRobot, BsGear, BsBuilding, BsEnvelope, BsBook, BsSave, BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function DashboardClient({ownerId}:{ownerId:string}) {

  const navigate = useRouter()  

  const [businessName,setBusinessName] = useState("")
  const [supportEmail,setSupportEmail] = useState("")
  const [knowledge,setKnowledge] = useState("")
  const [loading,setLoading] = useState(false)
  const [saved,setSaved] = useState(false)

  const handleSettings = async () => {
    setLoading(true)
      try {
        const result = await axios.post("/api/settings",{ownerId, businessName,supportEmail, knowledge})
        setLoading(false)
        setSaved(true)
        setTimeout(()=>setSaved(false),4000)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  }

  useEffect(()=>{
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const result = await axios.post("/api/settings/get",{ownerId})
          setBusinessName(result.data.businessName)
          setSupportEmail(result.data.supportEmail)
          setKnowledge(result.data.knowledge)
        } catch (error) {
          console.log(error)
        }
      }
      handleGetDetails()
    }
  },[ownerId])


  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>

  {/*NAVBAR ====================== DASHBOARD====================  */}

  <motion.div
      initial={{y:-60, opacity:0}}
      animate={{y:0, opacity:1}}
      transition={{duration:0.6, ease:[0.22, 1, 0.36, 1]}}
      className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-zinc-100/80'
      >
       <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between'>
        <motion.div 
        onClick={()=>navigate.push("/")}
          initial={{opacity:0, x:-20}}
          animate={{opacity:1, x:0}}
          transition={{duration:0.5, delay:0.2}}
          className='text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer'
        >
          <div className='w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-900/20'>
            <BsChatDots className='text-white' size={16}/>
          </div>
          Support.<span className='text-zinc-400 font-normal'>AI</span>
        </motion.div>

         <motion.button 
           whileHover={{scale:1.03}}
           whileTap={{scale:0.97}}
           className='px-3 sm:px-4 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-sm'
         >
           <BsRobot size={14} />
           <span className="hidden sm:inline">Embed ChatBot</span>
         </motion.button>
        </div> 


      </motion.div>


      {/* MAIN CONTENT ===================================================== */}

      <div className='flex justify-center px-3 sm:px-4 py-10 sm:py-14 mt-16 sm:mt-20'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='w-full max-w-3xl bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-zinc-100 p-6 sm:p-10'
        >

         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className='mb-8 sm:mb-10'
         >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-900/15">
              <BsGear className="text-white" size={18} />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>ChatBot Settings</h1>
          </div>
          <p className='text-zinc-400 mt-2 text-sm sm:text-base ml-13 pl-0.5'>Manage AI Chatbot Knowledge and business details</p>
         </motion.div>

      {/* BUSINESS NAME AND EMAIL INPUT============================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mb-8 sm:mb-10'
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center">
                <BsBuilding className="text-zinc-600" size={16} />
              </div>
              <h2 className='text-base sm:text-lg font-semibold'>Business Details</h2>
            </div>
            <div className='space-y-4'>

              <div className="group">
                <label className="text-xs font-medium text-zinc-500 mb-1.5 block ml-1">Business Name</label>
                <input
                onChange={(e)=>setBusinessName(e.target.value)}
                value={businessName}
                className='w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all duration-300 hover:border-zinc-300' type="text" placeholder='Enter your business name'/>
              </div>

              <div className="group">
                <label className="text-xs font-medium text-zinc-500 mb-1.5 block ml-1">Support Email</label>
                <input
                  onChange={(e)=>setSupportEmail(e.target.value)}
                  value={supportEmail}
                type="email" className='w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all duration-300 hover:border-zinc-300' placeholder='support@yourcompany.com' />
              </div>
            </div>
          </motion.div>


            {/* ================KNOWLEDGE INPUT=================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='mb-8 sm:mb-10'
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center">
                <BsBook className="text-zinc-600" size={16} />
              </div>
              <h2 className='text-base sm:text-lg font-semibold'>Knowledge Base</h2>
            </div>
            <p className='text-xs sm:text-sm text-zinc-400 mb-4 leading-relaxed'>Add FAQs, company information, policies, or support documentation for your AI assistant.</p>
            <div className='space-y-4'>

              <textarea
                onChange={(e)=>setKnowledge(e.target.value)}
                value={knowledge}
              className='w-full h-48 sm:h-54 rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 py-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all duration-300 hover:border-zinc-300 resize-none' placeholder='Enter information about your business, products, services, delivery times, refund policy, return policy, FAQs, contact details, and any other knowledge your AI assistant should use when answering customer questions.'/>
            </div>
          </motion.div>

    {/* =====================BUTTONS============================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5'
          >
            <motion.button 
            onClick={handleSettings}
            whileHover={{scale:1.03, y: -1}}
            whileTap={{scale: 0.97}}
            disabled={loading}
            className='w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all duration-300 disabled:opacity-60 shadow-lg shadow-zinc-900/15 flex items-center justify-center gap-2 cursor-pointer'
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <BsSave size={15} />
                  Save Settings
                </>
              )}
              </motion.button>

             {saved &&  <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100"
          >
            <BsCheck2 size={20} />
            <span>Settings Saved</span>
          </motion.span>}
          </motion.div>

        </motion.div>
      </div>

    </div>
  )
}

export default DashboardClient