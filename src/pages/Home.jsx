// Home.jsx
import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import About from './About'
import Testimonial from './Testimonial'
import ShopByCollection from '../components/ShopByCollection'
import FreaturesSection from '../components/FeaturesSection'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* FULL WIDTH HERO */}
      <Hero />

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ShopByCollection/>
        <LatestCollection/>
        <BestSeller/>
        <FreaturesSection/>
        {/* <Testimonial/> */}
        {/* <OurPolicy/>
        <About/>  */}

      </div>
    </div>
  )
}

export default Home
