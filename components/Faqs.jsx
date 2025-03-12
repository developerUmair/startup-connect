// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Minus } from "lucide-react";

// const faqs = [
//   {
//     id: 1,
//     question: "What makes LaunchPad different from other accelerators?",
//     answer:
//       "We combine intensive mentorship, seed funding, and a vast network of successful founders. Our unique approach focuses on rapid iteration and product-market fit, with access to over 500+ industry experts and investors. Unlike others, we provide lifetime support and alumni resources.",
//   },
//   {
//     id: 2,
//     question: "How much funding do startups typically receive?",
//     answer:
//       "We typically invest $500K for 7% equity in each startup. This includes the initial investment and follow-on funding opportunities. Our terms are founder-friendly and designed to help you focus on building rather than fundraising.",
//   },
//   {
//     id: 3,
//     question: "What is the application and selection process?",
//     answer:
//       "Our process involves three stages: written application, video interview, and final pitch. We evaluate based on team capability, market opportunity, and product innovation. Applications are reviewed by experienced founders and investors.",
//   },
//   {
//     id: 4,
//     question: "What industries do you focus on?",
//     answer:
//       "We're industry-agnostic but have deep expertise in AI/ML, SaaS, FinTech, Healthcare, and Enterprise Software. We look for startups with high growth potential and scalable business models across all sectors.",
//   },
//   {
//     id: 5,
//     question: "What support do startups receive during the program?",
//     answer:
//       "Our 12-week program includes weekly 1:1 mentoring, technical workshops, founder talks, and networking events. You'll get office space, legal support, cloud credits, and access to our partner network worth over $1M in perks.",
//   },
// ];

// export default function Faqs() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#1a1033] py-20 px-4 sm:px-6 lg:px-8 rounded-2xl">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Frequently asked questions
//           </h2>
//           <p className="text-lg text-gray-400">
//             Everything you need to know about joining Startup Connect
//           </p>
//         </div>

//         <div className="space-y-6">
//           {faqs.map((faq) => (
//             <div key={faq.id} className="group">
//               <button
//                 onClick={() =>
//                   setActiveIndex(activeIndex === faq.id ? null : faq.id)
//                 }
//                 className="w-full flex items-center justify-between p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-6">
//                   <span
//                     className={`flex items-center justify-center w-12 h-12 rounded-xl text-lg font-semibold transition-colors duration-300
//                       ${activeIndex === faq.id ? "bg-[rgb(238,43,105)] text-white" : "bg-[#fbd443] text-black"}`}
//                   >
//                     {faq.id}
//                   </span>
//                   <span className="text-left text-lg font-medium text-white">
//                     {faq.question}
//                   </span>
//                 </div>
//                 <div className="ml-6 flex-shrink-0">
//                   <motion.div
//                     animate={{ rotate: activeIndex === faq.id ? 45 : 0 }} 
//                     transition={{ duration: 0.2, ease: "easeInOut" }} 
//                   >
//                     <Plus className="w-6 h-6 text-[#fbd443]" />
//                   </motion.div>
//                 </div>
//               </button>

//               <AnimatePresence>
//                 {activeIndex === faq.id && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="overflow-hidden"
//                   >
//                     <div className="p-6 pt-4 pl-24 text-gray-400 leading-relaxed">
//                       {faq.answer}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Sparkles, Lightbulb } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What makes LaunchPad different from other accelerators?",
    answer:
      "We combine intensive mentorship, seed funding, and a vast network of successful founders. Our unique approach focuses on rapid iteration and product-market fit, with access to over 500+ industry experts and investors. Unlike others, we provide lifetime support and alumni resources.",
  },
  {
    id: 2,
    question: "How much funding do startups typically receive?",
    answer:
      "We typically invest $500K for 7% equity in each startup. This includes the initial investment and follow-on funding opportunities. Our terms are founder-friendly and designed to help you focus on building rather than fundraising.",
  },
  {
    id: 3,
    question: "What is the application and selection process?",
    answer:
      "Our process involves three stages: written application, video interview, and final pitch. We evaluate based on team capability, market opportunity, and product innovation. Applications are reviewed by experienced founders and investors.",
  },
  {
    id: 4,
    question: "What industries do you focus on?",
    answer:
      "We're industry-agnostic but have deep expertise in AI/ML, SaaS, FinTech, Healthcare, and Enterprise Software. We look for startups with high growth potential and scalable business models across all sectors.",
  },
  {
    id: 5,
    question: "What support do startups receive during the program?",
    answer:
      "Our 12-week program includes weekly 1:1 mentoring, technical workshops, founder talks, and networking events. You'll get office space, legal support, cloud credits, and access to our partner network worth over $1M in perks.",
  },
]

export default function EnhancedFAQs() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const containerRef = useRef(null)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-[#1a1033] to-black py-20 px-4 sm:px-6 lg:px-8 rounded-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-1/4 h-[500px] w-[500px] rounded-full bg-[rgb(238,43,105)]/10 blur-3xl"></div>
        <div className="absolute right-[5%] top-3/4 h-[400px] w-[400px] rounded-full bg-[#fbd443]/10 blur-3xl"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * -100, null],
              x: [null, Math.random() * 100, null],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundColor: i % 2 === 0 ? "rgb(238,43,105)" : "#fbd443",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto" ref={containerRef}>
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-16 -left-16 text-[rgb(238,43,105)]/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="w-32 h-32" />
        </motion.div>

        <motion.div
          className="absolute -bottom-16 -right-16 text-[#fbd443]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Lightbulb className="w-32 h-32" />
        </motion.div>

        {/* Header with gradient text */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443]">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-400">Everything you need to know about joining LaunchPad</p>

          {/* Decorative line */}
          <div className="mt-8 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443]"></div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(faq.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient border on hover */}
              <AnimatePresence>
                {hoveredIndex === faq.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443] opacity-70 blur-sm"
                  />
                )}
              </AnimatePresence>

              <div className="relative">
                <div
                  className={`w-full rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 transition-all duration-300 ${activeIndex === faq.id ? "rounded-b-none border-b-0" : ""}`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-2 md:p-6"
                  >
                    <div className="flex items-center gap-3 md:gap-6">
                      <motion.span
                        className={`flex items-center justify-center w-12 h-12 rounded-xl text-lg font-semibold transition-colors duration-500`}
                        animate={{
                          backgroundColor:
                            activeIndex === faq.id
                              ? "rgb(238,43,105)"
                              : hoveredIndex === faq.id
                                ? "rgba(251,212,67,0.9)"
                                : "rgba(251,212,67,0.8)",
                          color: activeIndex === faq.id ? "#ffffff" : "#000000",
                          scale: hoveredIndex === faq.id ? 1.05 : 1,
                        }}
                      >
                        {faq.id}
                      </motion.span>
                      <span className="text-left text-base md:text-lg font-medium text-white">{faq.question}</span>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                      <motion.div
                        animate={{
                          rotate: activeIndex === faq.id ? 45 : 0,
                          backgroundColor: activeIndex === faq.id ? "rgb(238,43,105)" : "rgba(251,212,67,0.2)",
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex items-center justify-center w-8 h-8 rounded-full"
                      >
                        <Plus className={`w-5 h-5 ${activeIndex === faq.id ? "text-white" : "text-[#fbd443]"}`} />
                      </motion.div>
                    </div>
                  </button>
                </div>

                <AnimatePresence>
                  {activeIndex === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden rounded-b-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 border-t-0"
                    >
                      <div className="relative p-6 pt-2 pl-5 md:pl-24 text-gray-300 leading-relaxed">
                        {/* Decorative element */}
                        <div className="absolute left-[15px] md:left-[24px] top-0 w-0.5 h-full bg-gradient-to-b from-[rgb(238,43,105)] to-[#fbd443] opacity-30"></div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

