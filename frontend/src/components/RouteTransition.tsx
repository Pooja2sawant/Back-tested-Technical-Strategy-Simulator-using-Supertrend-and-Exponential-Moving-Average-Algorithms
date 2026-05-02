import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function RouteTransition(props: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="w-full"
    >
      {props.children}
    </motion.div>
  )
}
