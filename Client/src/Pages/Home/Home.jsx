import React from 'react';
import Slider from './Slider';
import GridLayout from './GridLayout';
import AdvertisementSection from './AdvertisementSection';
import LatestReviews from './LatestReviews';
import Featured from './Shared/Featured';
import Premium from './Premium';
import FAQ from './FAQ';
import CallToAgent from './CallToAgent';

const Home = () => {
    return (
        <div>
           <Slider/>
           <AdvertisementSection/>
           <LatestReviews/>
           <Featured/>
           <Premium/>
            <GridLayout/>
            <CallToAgent/>
            <FAQ/>
        </div>
    );
};

export default Home;