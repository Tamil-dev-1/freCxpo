import React from 'react'
import Hero from '../../components/hero/Hero'
import About from '../../components/about/About'
import WhatUCan from '../../components/whatucan/WhatUCan'
import Schedule from '../../components/shedules/Shedule'
import Highlights from '../../components/highlights/Highlights'
import Registration from '../../components/registration/Registration'
import CTA from '../../components/cta/CTA'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <WhatUCan />
      <Schedule />
      <Highlights />
      <Registration />
      <CTA />
    <Footer />
    </div>
  )
}

export default Home
