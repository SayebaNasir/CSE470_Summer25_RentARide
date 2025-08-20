import React from 'react'

const Title = ({title, subtitle}) => {
  return (
    <>
      <h1 className='font-semibold text-4xl md:text-[40px]'>{title}</h1>
      <p className='text-pink-600 text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subtitle}</p>
    </>
  )
}

export default Title
