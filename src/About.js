import React from 'react';
import HeroSection from './components/HeroSection';
import { useProductContext } from './context/productContext';

const About = () => {

  // const {myName} =useContext(AppContext);
  const {myName} = useProductContext();


  const data = {
    name: "TrendSetters E-commerce",
  };
  return <>
      {myName}
      <HeroSection myData={data} />
    </>
};



export default About;