import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import CarCard from './CarCard';
import { assets, dummyCarData } from '../assets/assets';

const FeaturedSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/cars');
    scrollTo(0, 0);
  };

  return (
    <section className="py-20 px-4 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center bg-white">
      <div className="mb-12 text-center">
        <Title 
          title="Featured Cars" 
          subtitle="Ready. Set. Roam — discover your perfect ride!" 
        />
      </div>

      {/*Car Cards Grid*/}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {dummyCarData.slice(0, 6).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* Explore Button */}
      <button
        onClick={handleNavigate}
        className="mt-14 px-8 py-3 rounded-xl text-sm font-medium border border-gray-300 bg-gradient-to-l from-rose-100 to-sky-100 hover:from-rose-200 hover:to-sky-200 transition duration-300 ease-in-out shadow-sm hover:shadow-md">
        Explore All The Cars
      </button>
    </section>
  );
};

export default FeaturedSection;

