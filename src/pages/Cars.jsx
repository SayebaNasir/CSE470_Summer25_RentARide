
import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'

const Cars = () => {
  const [searchText, setSearchText] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const filteredCars = dummyCarData.filter((car) => {
    const text = searchText.toLowerCase()
    const matchesText =
      car.model.toLowerCase().includes(text) ||
      car.brand.toLowerCase().includes(text) ||
      (car.features && car.features.join(' ').toLowerCase().includes(text))

    const matchesRating = selectedRating === 0 || car.rating === selectedRating

    return matchesText && matchesRating
  })

  return (
    <div>
      <div className='car-section flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title 
          title="All Available Cars" 
          subtitle="Browse to choose from our selected cars for your next adventure!" 
        />

        <div className='search-bar flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow relative'>
          <img src={assets.search_icon} alt="Search Icon" className='icon w-4 h-4.5 mr-2' />
          <input
            type="text"
            placeholder="Search by car model"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='input w-full h-full outline-none text-gray-500'
          />
          <img 
            src={assets.filter_icon} 
            alt="Filter Icon" 
            className='icon w-4 h-4.5 ml-2 cursor-pointer' 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
          />

          {/* Star rating filter dropdown */}
          {isFilterOpen && (
            <div className='filter-dropdown absolute right-0 top-full mt-2 bg-white border rounded shadow p-2 z-10 w-32'>
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  onClick={() => {
                    setSelectedRating(selectedRating === star ? 0 : star)
                    setIsFilterOpen(false)
                  }}
                  className={`filter-option cursor-pointer px-3 py-1 hover:bg-gray-100 ${
                    selectedRating === star ? 'font-bold text-blue-600' : ''
                  }`}
                >
                  {star} Star{star > 1 ? 's' : ''}
                </div>
              ))}
              <div
                onClick={() => {
                  setSelectedRating(0)
                  setIsFilterOpen(false)
                }}
                className='clear-filter cursor-pointer px-3 py-1 mt-1 border-t hover:bg-gray-100 text-red-500 text-center'>
                Clear Filter
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='car-list px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='result-count'>Showing {filteredCars.length} Cars</p>

        <div className='car-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars