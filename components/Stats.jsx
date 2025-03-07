"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Rocket, DollarSign, Trophy, Users } from "lucide-react"

const stats = [
  {
    icon: Rocket,
    value: 500,
    suffix: "+",
    label: "Startups Funded",
    gradient: "from-[rgb(238,43,105)] to-[rgb(238,43,105)]/80",
  },
  {
    icon: DollarSign,
    value: 200,
    prefix: "$",
    suffix: "M+",
    label: "Investments",
    gradient: "from-[rgb(238,43,105)]/90 to-[#fbd443]/90",
  },
  {
    icon: Trophy,
    value: 50,
    suffix: "+",
    label: "Unicorns",
    gradient: "from-[#fbd443]/80 to-[#fbd443]",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Founders",
    gradient: "from-[#fbd443] to-[rgb(238,43,105)]",
  },
]

const Counter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current > value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <div className="relative w-full mt-6 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-950 to-black py-20">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[rgb(238,43,105)]/20 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#fbd443]/20 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[rgb(238,43,105)]/20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl">
                {/* Gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20`}></div>

                {/* Card content */}
                <div className="relative space-y-6 p-8">
                  {/* Icon */}
                  <div className="inline-flex rounded-xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur-lg">
                    <stat.icon className="h-6 w-6 text-[rgb(238,43,105)] transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Number */}
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </h3>
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(238,43,105)]/0 to-[#fbd443]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "rgb(238,43,105)" : "#fbd443",
              opacity: 0.2,
              animation: `float-particle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

