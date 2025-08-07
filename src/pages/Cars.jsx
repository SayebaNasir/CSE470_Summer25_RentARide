import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'

const Cars = () => {
  const [searchText, setSearchText] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [priceRange, setPriceRange] = useState('')

  const filteredCars = dummyCarData.filter(car => {
    const textMatch = car.model.toLowerCase().includes(searchText.toLowerCase()) ||
                      car.brand.toLowerCase().includes(searchText.toLowerCase())

    const carPrice = Number(car.pricePerDay)
    let priceMatch = true

    if (!isNaN(carPrice)) {
      if (priceRange === 'under1500') {
        priceMatch = carPrice < 1500
      } else if (priceRange === '1500to2000') {
        priceMatch = carPrice >= 1500 && carPrice < 2000
      } else if (priceRange === '2000to2500') {
        priceMatch = carPrice >= 2000 && carPrice < 2500
      } else if (priceRange === '2500to3000') {
        priceMatch = carPrice >= 2500 && carPrice < 3000
      } else if (priceRange === '3000to3500') {
        priceMatch = carPrice >= 3000 && carPrice < 3500
      }
    }

    return textMatch && priceMatch
  })

  return (
    <div>
      <div className='car-section flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title 
          title="All Available Cars" 
          subtitle="Browse to choose from our selected cars for your next adventure!" 
        />

        {/* Search & Filter */}
        <div className='search-bar flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow relative'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4.5 mr-2' />
          <input
            type="text"
            placeholder="Search by car model"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full h-full outline-none text-gray-500'
          />
          <img 
            src={assets.filter_icon} 
            alt="filter" 
            className='w-4 h-4.5 ml-2 cursor-pointer' 
            onClick={() => setShowFilter(!showFilter)}
          />

          {/* Price Filter Dropdown */}
          {showFilter && (
            <div className='absolute right-0 top-full mt-2 bg-white border rounded shadow p-2 z-10 w-56'>
              <div onClick={() => { setPriceRange('under1500'); setShowFilter(false); }} className='cursor-pointer px-3 py-1 hover:bg-gray-100'>Less than 1500৳</div>
              <div onClick={() => { setPriceRange('1500to2000'); setShowFilter(false); }} className='cursor-pointer px-3 py-1 hover:bg-gray-100'>1500৳ to 1999৳</div>
              <div onClick={() => { setPriceRange('2000to2500'); setShowFilter(false); }} className='cursor-pointer px-3 py-1 hover:bg-gray-100'>2000৳ to 2499৳</div>
              <div onClick={() => { setPriceRange('2500to3000'); setShowFilter(false); }} className='cursor-pointer px-3 py-1 hover:bg-gray-100'>2500৳ to 2999৳</div>
              <div onClick={() => { setPriceRange('3000to3500'); setShowFilter(false); }} className='cursor-pointer px-3 py-1 hover:bg-gray-100'>3000৳ to 3499৳</div>
              <div onClick={() => { setPriceRange(''); setShowFilter(false); }} className='text-red-500 px-3 py-1 mt-1 border-t text-center cursor-pointer hover:bg-gray-100'>Clear Filter</div>
            </div>
          )}
        </div>
      </div>

      {/* Car List */}
      <div className='car-list px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, i) => (
            <CarCard key={i} car={car} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars