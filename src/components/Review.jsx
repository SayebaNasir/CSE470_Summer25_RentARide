import React from 'react';
import testimonialImage3 from '../assets/testimonial_image_3.jpeg';
import testimonialImage4 from '../assets/testimonial_image_4.jpg';
import chomchom from '../assets/chomchom.png';

const reviews = [
  {
    name: 'Saheer',
    image: chomchom,
    text: 'I\'ve been using Rent-A-Ride for some months and it has been incredibly user-friendly, making my adventure planning much easier.',
    rating: 5,
  },
  {
    name: 'Siara',
    image: testimonialImage3,
    text: 'My family members also love using Rent-A-Ride. It\'s simple, effective and made our life so much smoother!',
    rating: 3,
  },
  {
    name: 'Arshan',
    image: testimonialImage4,
    text: 'Rent-A-Ride is easy to use and saves me tons of time but needs more variations of trending cars 🥺',
    rating: 4,
  },
];

function ReviewCard({ name, image, text, rating }) {
  return (
    <div className="w-80 border rounded-lg p-6 shadow bg-white">
      <img
        src={image}
        alt={name}
        className="h-24 w-24 object-cover rounded-full mx-auto -mt-14"
      />
      <h3 className="mt-4 text-lg font-medium">{name}</h3>
      <p className="text-gray-500">{text}</p>
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </div>
  );
}

export default function Review() {
  // Put Siara in the middle by ordering explicitly
  const orderedReviews = [reviews[0], reviews[1], reviews[2]];

  return (
    <section className="pt-10 text-center">
      <h2 className="text-2xl font-bold mb-9">Check What Our Customers Say About Us</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {orderedReviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </div>
    </section>
  );
}




