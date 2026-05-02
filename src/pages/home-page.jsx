import React from 'react'
import HeroSec from '../components/heroSec/heroSec'
import DealsSection from '../components/dealsBanner/DealsSection'
import PreorderBanner from '../components/promoBanner/PreorderBanner'
import BestSeller from '../components/featuredProducts/BestSeller'

const HomePage = () => {
    return (
        <>
            <HeroSec />
            <DealsSection />
            <PreorderBanner />
            <BestSeller />
        </>
    )
}

export default HomePage
