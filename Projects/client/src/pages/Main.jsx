import React from 'react';
import AboutUs from '../components/about/AboutUs';
import Charity from '../components/charity/Charity';
import Events from '../components/news/Events';
import Home from '../components/home/Home';
import Reviews from '../components/reviews/Reviews';
import Schools from '../components/school/Schools';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';

const Main = () => {
  return (
    <>
      <Home />
      <Schools />
      <Events />
      <Reviews />
      <Charity />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
};

export default Main;
