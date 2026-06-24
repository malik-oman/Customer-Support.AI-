"use client"

import React, { useEffect, useState } from 'react'
import {  motion } from 'motion/react'
import { BsChatDots, BsCheck2 } from 'react-icons/bs'
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
       <div className='max-w-7xl mx-auto px-6 h-18 flex items-center justify-between'>
        <motion.div 
        onClick={()=>navigate.push("/")}
          initial={{opacity:0, x:-20}}
          animate={{opacity:1, x:0}}
          transition={{duration:0.5, delay:0.2}}
          className='text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer'
        >
          <div className='w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center'>
            <BsChatDots className='text-white' size={16}/>
          </div>
          Support.<span className='text-zinc-400 font-normal'>AI</span>
        </motion.div>

         <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition cursor-pointer'>Embed ChatBot</button>
        </div> 

       
      </motion.div>


      {/* MAIN CONTENT ===================================================== */}

      <div className='flex justify-center px-4 py-14 mt-20'>
        <motion.div className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'>
          
         <div className='mb-10'>
          <h1 className='text-2xl font-semibold'>ChatBot Settings</h1>
          <p className='text-zinc-500 mt-1'>Manage AI Chatbot Knowledge and business details</p>
         </div>

      {/* BUSINESS NAME AND EMAIL INPUT============================================= */}
          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Business Details</h1>
            <div className='space-y-4'>

              <input
              onChange={(e)=>setBusinessName(e.target.value)}
              value={businessName}
              className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' type="text" placeholder='Business Name'/>

              <input
                onChange={(e)=>setSupportEmail(e.target.value)}
                value={supportEmail}
              type="text" className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Support Email' />
            </div>
          </div>


            {/* ================KNOWLEDGE INPUT=================================== */}
          <div className='mb-10'>
            <h1 className='text-lg font-medium mb-4'>Knowledge Base</h1>
            <p className='text-sm text-zinc-500 mb-4'>Add FAQs, company information, policies, or support documentation for your AI assistant.</p>
            <div className='space-y-4'>

              <textarea
                onChange={(e)=>setKnowledge(e.target.value)}
                value={knowledge}
              className='w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' placeholder='Enter information about your business, products, services, delivery times, refund policy, return policy, FAQs, contact details, and any other knowledge your AI assistant should use when answering customer questions.'/>
            </div>
          </div>

    {/* =====================BUTTONS============================================= */}
          <div className='flex items-center gap-5'>
            <motion.button 
            onClick={handleSettings}
            whileHover={{scale:1.03}}
            whileTap={{scale: 0.97}}
            disabled={loading}
            className='px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60'
            >
              {loading ? "Saving..." : "Save"}
              </motion.button>

             {saved &&  <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className=" flex items-center gap-2 text-sm font-bold text-emerald-600"
          >
            <BsCheck2 size={22} />
            <span>Settings Saved</span>
          </motion.span>}
          </div>

        </motion.div>
      </div>

    </div>
  )
}

export default DashboardClient