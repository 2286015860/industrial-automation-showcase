import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

gsap.defaults({
  duration: 0.72,
  ease: 'power3.out',
})

export { gsap, ScrollTrigger, useGSAP }

