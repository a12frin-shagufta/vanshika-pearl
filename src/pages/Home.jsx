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
import Wholesale from '../components/Wholesale'
import MakingProcess from '../components/MakingProcess'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* FULL WIDTH HERO */}
      <Hero />

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

       
        <LatestCollection/>
         <ShopByCollection/>
         <Wholesale/>
        <BestSeller/>
          {/* <About/>   */}
        <FreaturesSection/>
                <MakingProcess />
         
        {/* <Testimonial/> */}
        {/* <OurPolicy/>
        // <About/>  */}

      </div>
    </div>
  )
}

export default Home
