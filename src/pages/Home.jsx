import React from "react";
import Banner from "../components/home/Banner";
import HowItWorks from "../components/home/HowItWorks";
import Services from "../components/home/Services";
import Brands from "../components/home/Brands";
import FeaturedSection from "../components/home/FeaturedSection";
import MerchantCTA from "../components/home/MerchantCTA";
import Review from "../components/home/reviewSection/Review";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Brands></Brands>
      <FeaturedSection></FeaturedSection>
      <MerchantCTA></MerchantCTA>
      <Review></Review>
    </div>
  );
};

export default Home;
