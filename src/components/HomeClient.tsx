"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BsChatDots, BsLightning, BsGlobe, BsShieldCheck, BsClock, BsStars } from "react-icons/bs";
import { FiArrowRight, FiLogOut, FiLayout, FiChevronRight } from "react-icons/fi";
import axios from 'axios'


function HomeClient({email}:{email:string}) {

// FEATURES ARRAY======================================

 const features = [
  {
    title: "Plug & Play Setup",
    description:
      "Integrate Support.AI into your website within minutes with a simple setup process. No coding required.",
    icon: BsLightning
  },
  {
    title: "Add the Chatbot Anywhere",
    description:
      "Embed the AI chatbot on any page of your website to assist visitors instantly and boost engagement.",
    icon: BsGlobe
  },
  {
    title: "Admin Controlled",
    description:
      "Manage conversations, customize responses, and control chatbot behavior from one powerful dashboard.",
    icon: BsShieldCheck
  },
  {
    title: "Always Online",
    description:
      "Provide 24/7 customer support and never miss a visitor inquiry, even outside business hours.",
    icon: BsClock
  },
  {
    title: "Smart AI Responses",
    description:
      "Deliver fast, accurate, and human-like answers using advanced AI technology trained on your data.",
    icon: BsStars
  },
];


const handleLogin = () => {
    window.location.href="/api/auth/login"
}

const handleLogOut = async () => {
    try {
      const result = await axios.get("/api/auth/logout")
            window.location.href="/"
    } catch (error) {
      console.log(error)
    }
}


const popupRef = useRef<HTMLDivElement>(null)
useEffect(()=>{
  const handler = (e:MouseEvent) => {

    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
       setOpen(false)
    }

  }
  document.addEventListener("mousedown", handler)
  return ()=> document.removeEventListener("mousedown", handler)
},[])

const firstLetter = email?.[0]?.toUpperCase() || ""

const [open,setOpen] = useState(false)


  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-slate-50 to-zinc-100 text-zinc-900 overflow-x-hidden selection:bg-zinc-900 selection:text-white'>

      {/* NAVBAR SECTION========================================== */}
      <motion.div
      initial={{y:-60, opacity:0}}
      animate={{y:0, opacity:1}}
      transition={{duration:0.6, ease:[0.22, 1, 0.36, 1]}}
      className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-zinc-100/80'
      >
       <div className='max-w-7xl mx-auto px-6 h-18 flex items-center justify-between'>
        <motion.div 
          initial={{opacity:0, x:-20}}
          animate={{opacity:1, x:0}}
          transition={{duration:0.5, delay:0.2}}
          className='text-xl font-bold tracking-tight flex items-center gap-2'
        >
          <div className='w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center'>
            <BsChatDots className='text-white' size={16}/>
          </div>
          Support.<span className='text-zinc-400 font-normal'>AI</span>
        </motion.div>

      {/* LOGIN PROFILE ========================================== */}
        {
        email?<div className='relative' ref={popupRef}>
            <motion.button
              whileHover={{scale:1.08}}
              whileTap={{scale:0.95}}
              onClick={()=>setOpen(!open)}
              className='w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-zinc-900/20 cursor-pointer'
            >
              {firstLetter}
            </motion.button>

         <AnimatePresence>   
       {open &&  
       <motion.div 
       initial={{opacity:0, y:-10, scale:0.95}}
       animate={{opacity:1, y:0, scale:1}}
       exit={{opacity:0, y:-10, scale:0.95}}
       transition={{duration:0.2, ease:"easeOut"}}
       className='absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl shadow-zinc-900/10 border border-zinc-100 overflow-hidden'
       >

          <button className='w-full text-left px-5 py-3.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors duration-200 flex items-center gap-3'>
            <FiLayout size={16} className='text-zinc-400'/>
            Dashboard
          </button>
          <div className='mx-4 h-px bg-zinc-100'/>
          <button onClick={handleLogOut} className='w-full text-left px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200 flex items-center gap-3'>
            <FiLogOut size={16}/>
            Logout
          </button>
          </motion.div>}

          </AnimatePresence>
        </div> : <motion.button
        whileHover={{scale:1.05, y:-1}}
        whileTap={{scale:0.97}}
        onClick={handleLogin}
        className='px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-zinc-900/15 flex items-center gap-2 cursor-pointer'
        >
          Login
          <FiArrowRight size={14}/>
        </motion.button>
        }


        </div> 
      </motion.div>

        {/* HOME SECTION============================================= */}

        <section className='pt-40 pb-32 px-6'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center'>

            {/* LEFT DIV================================================ */}
            <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease:[0.22, 1, 0.36, 1]}}
            className='space-y-8'
            >
              <motion.div
                initial={{opacity:0, x:-20}}
                animate={{opacity:1, x:0}}
                transition={{duration:0.6, delay:0.3}}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 tracking-wide uppercase'
              >
                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'/>
                AI-Powered Support
              </motion.div>

               <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900'>
                AI Customer <br/>
                <span className='text-zinc-400'>Support</span> Built<br/>
                for Modern Sites
               </h1> 
               <p className='text-lg md:text-xl text-zinc-500 max-w-lg leading-relaxed'>
                Add a powerful AI chatbot to your website in minutes.
                Let your customers get instant answers using your own business knowledge base.
               </p>

          <div className='flex flex-wrap gap-4 pt-2'> 

             {email ? 
          <motion.button 
            whileHover={{scale:1.04, y:-2}}
            whileTap={{scale:0.98}}
            className='px-8 py-4 rounded-2xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-zinc-900/20 flex items-center gap-2 cursor-pointer'
          >
            Go to Dashboard
            <FiArrowRight size={18}/>
          </motion.button> :  
          <motion.button
            whileHover={{scale:1.04, y:-2}}
            whileTap={{scale:0.98}}
            onClick={handleLogin}
            className='px-8 py-4 rounded-2xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-zinc-900/20 flex items-center gap-2 cursor-pointer'
          >
            Get Started Free
            <FiArrowRight size={18}/>
          </motion.button>  }



            <motion.a 
              whileHover={{scale:1.04, y:-2}}
              whileTap={{scale:0.98}}
              href='#feature' 
              className='px-8 py-4 rounded-2xl border-2 border-zinc-200 text-zinc-700 font-semibold hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-300 flex items-center gap-2'
            >
              Learn More
            </motion.a>   
          </div>
            </motion.div>

            {/* RIGHT DIV================================================= */}

            <motion.div
            initial={{opacity:0, scale:0.9, x:40}}
            animate={{opacity:1, scale:1, x:0}}
            transition={{duration:0.8, delay:0.2, ease:[0.22, 1, 0.36, 1]}}
            className='relative'
            >
              {/* Decorative elements */}
              <div className='absolute -top-8 -right-8 w-64 h-64 bg-zinc-100 rounded-full blur-3xl opacity-60'/>
              <div className='absolute -bottom-8 -left-8 w-48 h-48 bg-zinc-200 rounded-full blur-3xl opacity-40'/>

              <div className='relative rounded-3xl bg-white shadow-2xl shadow-zinc-900/8 border border-zinc-100 p-8 overflow-hidden'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-3 h-3 rounded-full bg-red-400'/>
                  <div className='w-3 h-3 rounded-full bg-yellow-400'/>
                  <div className='w-3 h-3 rounded-full bg-green-400'/>
                  <div className='ml-auto text-xs font-medium text-zinc-400'>Live Chat Preview</div>
                </div>

               <div className='space-y-4'>
                <motion.div 
                  initial={{opacity:0, x:20}}
                  animate={{opacity:1, x:0}}
                  transition={{delay:0.6}}
                  className='bg-zinc-900 text-white rounded-2xl rounded-br-sm px-5 py-3 text-sm ml-auto w-fit max-w-[80%] shadow-lg shadow-zinc-900/10'
                >
                  Do you offer cash on delivery?
                </motion.div>
                <motion.div 
                  initial={{opacity:0, x:-20}}
                  animate={{opacity:1, x:0}}
                  transition={{delay:0.9}}
                  className='bg-zinc-100 rounded-2xl rounded-bl-sm px-5 py-3 text-sm w-fit max-w-[80%] text-zinc-700'
                >
                  Yes, Cash on Delivery is available for all orders! 🚀
                </motion.div>
                <motion.div 
                  initial={{opacity:0, x:20}}
                  animate={{opacity:1, x:0}}
                  transition={{delay:1.2}}
                  className='bg-zinc-900 text-white rounded-2xl rounded-br-sm px-5 py-3 text-sm ml-auto w-fit max-w-[80%] shadow-lg shadow-zinc-900/10'
                >
                  What about return policy?
                </motion.div>
                <motion.div 
                  initial={{opacity:0, x:-20}}
                  animate={{opacity:1, x:0}}
                  transition={{delay:1.5}}
                  className='bg-zinc-100 rounded-2xl rounded-bl-sm px-5 py-3 text-sm w-fit max-w-[80%] text-zinc-700'
                >
                  30-day hassle-free returns on all products! ✨
                </motion.div>
                </div> 

                  {/* Typing indicator */}
                  <div className='mt-4 flex items-center gap-2 px-2'>
                    <div className='w-2 h-2 rounded-full bg-zinc-400 animate-bounce'/>
                    <div className='w-2 h-2 rounded-full bg-zinc-400 animate-bounce' style={{animationDelay:'0.1s'}}/>
                    <div className='w-2 h-2 rounded-full bg-zinc-400 animate-bounce' style={{animationDelay:'0.2s'}}/>
                  </div>

                  <motion.div
                  animate={{y: [0, -10, 0], rotate: [0, 5, 0]}}
                  transition={{repeat: Infinity, duration: 4, ease:"easeInOut"}}
                  className='absolute -bottom-5 -right-5 w-16 h-16 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-2xl shadow-zinc-900/30'
                  >
                    <BsChatDots  size={24}/>
                  </motion.div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* FEATURES================================================== */}

        <section 
        id='feature'
        className='bg-white py-32 px-6 border-t border-zinc-100'>
            <div className='max-w-6xl mx-auto'>
              <motion.div
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:false, margin:"-100px"}}
              transition={{duration:0.6, ease:[0.22, 1, 0.36, 1]}}
              className='text-center mb-20'
              >
                <span className='inline-block px-4 py-2 rounded-full bg-zinc-100 text-xs font-bold text-zinc-500 tracking-widest uppercase mb-6'>
                  Features
                </span>
                <h2 className='text-4xl md:text-5xl font-bold tracking-tight text-zinc-900'>
                  Why Businesses Choose<br/>
                  <span className='text-zinc-400'>Support.AI</span>
                </h2>
                <p className='mt-6 text-lg text-zinc-500 max-w-2xl mx-auto'>
                  Everything you need to deliver exceptional customer support, powered by cutting-edge AI technology.
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
                {features.map((f,index)=>{
                  const Icon = f.icon;
                  return (
                  <motion.div key={index}
                  initial={{opacity:0, y:40}}
                  whileInView={{opacity:1, y:0}}
                  transition={{delay: index*0.1, duration:0.5, ease:[0.22, 1, 0.36, 1]}}
                  viewport={{once:false, margin:"-50px"}}
                  whileHover={{y:-8, transition:{duration:0.3}}}
                  className='group bg-zinc-50 rounded-3xl p-8 border border-zinc-100 hover:border-zinc-200 hover:bg-white hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-500 cursor-default'
                  >
                    <div className='w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-zinc-900/20'>
                      <Icon className='text-white' size={24}/>
                    </div>
                    <h3 className='text-xl font-bold text-zinc-900 mb-3'>{f.title}</h3>
                    <p className='text-zinc-500 leading-relaxed text-sm'>{f.description}</p>
                    <div className='mt-6 flex items-center gap-2 text-xs font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300 uppercase tracking-wider'>
                      Learn more <FiChevronRight size={14} className='group-hover:translate-x-1 transition-transform duration-300'/>
                    </div>
                  </motion.div>
                )})}
              </div>

            </div>
        </section>

        {/* CTA SECTION ============================================= */}
        <section className='py-32 px-6 bg-zinc-900 text-white overflow-hidden relative'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px]'/>
            <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-600 rounded-full blur-[120px]'/>
          </div>
          <motion.div 
            initial={{opacity:0, y:40}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:false}}
            transition={{duration:0.7}}
            className='max-w-4xl mx-auto text-center relative z-10'
          >
            <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
              Ready to Transform Your<br/>Customer Support?
            </h2>
            <p className='text-lg text-zinc-400 max-w-xl mx-auto mb-10'>
              Join thousands of businesses already using Support.AI to deliver instant, intelligent customer experiences.
            </p>
         
          </motion.div>
        </section>

        {/* FOOTER============================================== */}

        <footer className='py-16 px-6 bg-white border-t border-zinc-100'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center'>
                  <BsChatDots className='text-white' size={16}/>
                </div>
                <span className='text-lg font-bold tracking-tight'>Support.<span className='text-zinc-400 font-normal'>AI</span></span>
              </div>
              <p className='text-sm text-zinc-400'>
                &copy; {new Date().getFullYear()} Support.AI. All rights reserved.
              </p>
              <div className='flex items-center gap-6'>
                <a href='#' className='text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200'>Privacy</a>
                <a href='#' className='text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200'>Terms</a>
                <a href='#' className='text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200'>Contact</a>
              </div>
            </div>
          </div>
        </footer>


    </div>
  )
}

export default HomeClient