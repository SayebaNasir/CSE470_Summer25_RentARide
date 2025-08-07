import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const CarCard = ({ car }) => {
  const currencyy = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car-details/${car._id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg shadow transition-all duration-900 ease-linear hover:scale-105">
      <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-full transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 bg-black/75 text-white px-3 py-1 text-sm rounded-md backdrop-blur-sm">
          <span className="font-semibold">{currencyy}{car.pricePerDay}</span>
          <span className="ml-1 text-xs text-white/60"> per day </span>
        </div>

      </div>

      <div>
        <div classname="mb-4">
          <h3 className="text-base font-semibold text-gray-900">{car.brand} {car.nodel}</h3>
          <p className="text-xs text-gray-500">{car.category} - {car.year}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <img src={assets.users_icon} alt="Seats" className="w-4 h-4" />
            <span>{car.seating_capacity} Seats </span>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.car_icon} alt="Transmission" className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.fuel_icon} alt="Fuel" className="w-4 h-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.location_icon} alt="Location" className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
