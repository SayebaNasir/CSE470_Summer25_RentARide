import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [popupVisible, setPopupVisible] = useState(false); // show booking form popup
  const [showConfirmMsg, setShowConfirmMsg] = useState(false); // show confirmed booking popup

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const foundCar = dummyCarData.find(c => c._id === id);
    setCar(foundCar || null);
  }, [id]);

  const today = new Date().toISOString().slice(0, 10);

  function calculateDays() {
    if (!pickupDate || !returnDate) return 0;

    let start = new Date(pickupDate);
    let end = new Date(returnDate);

    let count = 0;
    let current = new Date(start);
    while (current < end) {
      count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  }

  const days = calculateDays();
  const totalPrice = (days > 0 ? days : 1) * (car ? car.pricePerDay : 0);

  function openBookingPopup(e) {
    e.preventDefault();
    setPopupVisible(true);
  }

  const isValidContact = contact.length === 11 && contact.startsWith('01');
  const disableConfirm = !name.trim() || !address || !isValidContact;

  function confirmBooking() {
    if (disableConfirm) {
      setErrorMessage('Please fill all the required fields correctly!');
      return;
    }
    setErrorMessage('');
    setPopupVisible(false);
    setShowConfirmMsg(true);
  }

  function closeConfirmPopup() {
    setShowConfirmMsg(false);
    setName('');
    setAddress('');
    setContact('');
    setPickupDate('');
    setReturnDate('');
    setErrorMessage('');
  }

  if (!car) return null;

  const carDetails = [
    { icon: assets.users_icon, label: `${car.seating_capacity} seats` },
    { icon: assets.fuel_icon, label: car.fuel_type },
    { icon: assets.car_icon, label: car.transmission },
    { icon: assets.location_icon, label: car.location },
  ];

  const featuresList = ['Music Player', 'Bluetooth', 'GPS', 'Rear View Mirror', 'Comfortable Seats','Cup Holder'];

  return (
    <div className="relative px-6 md:px-16 lg:px-24 mt-16">
      <div className={(popupVisible || showConfirmMsg) ? 'blur-sm pointer-events-none select-none' : ''}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 cursor-pointer">
          <img
            src={assets.arrow_icon}
            alt="back"
            className="rotate-180 opacity-70 w-4 h-4"/>
          Back to all the cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full max-h-200 object-cover rounded-lg shadow mb-6"/>
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
                <p className="text-gray-600 text-lg">{car.category} - {car.year}</p>
              </div>

              <hr className="border-gray-300" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {carDetails.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center bg-gray-100 p-3 rounded">
                    <img src={icon} alt="" className="h-5 mb-1" />
                    <span className="text-gray-700 text-sm">{label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description:</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Features:</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                  {featuresList.map(feat => (
                    <li key={feat} className="flex items-center">
                      <img src={assets.check_icon} alt="check" className="h-4 mr-2" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <form onSubmit={openBookingPopup} className="shadow rounded-lg p-6 space-y-6 bg-white text-gray-700">
            <p className="text-2xl font-semibold flex justify-between">
              {currency}{car.pricePerDay}
              <span className="text-base font-normal text-gray-400"> per day</span>
            </p>
            <hr className="border-gray-300" />

            <div className="flex flex-col gap-2">
              <label htmlFor="pickup-date" className="font-medium">Pickup Date</label>
              <input
                type="date"
                id="pickup-date"
                min={today}
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="return-date" className="font-medium">Return Date</label>
              <input
                type="date"
                id="return-date"
                min={pickupDate || today}
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 transition text-white py-3 rounded font-semibold cursor-pointer"
            >
              Book Now!
            </button>
          </form>
        </div>
      </div>

      {/* Booking Popup */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blur background behind popup */}
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md z-10">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Your Booking</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <select
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="">Select Address</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Barishal">Barishal</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Bhairab">Bhairab</option>
            </select>

            <input
              type="text"
              placeholder="Contact Number (11 digits, start with 01)"
              maxLength={11}
              value={contact}
              onChange={e => {
                const val = e.target.value;
                if (val.length <= 11 && !isNaN(Number(val))) {
                  setContact(val);
                }
              }}
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
              type="text"
              value={`Total Bill: ${currency}${totalPrice}`}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700 font-medium mb-3 cursor-not-allowed"
            />

            {errorMessage && (
              <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={confirmBooking}
                disabled={disableConfirm}
                className={`px-4 py-2 rounded text-white ${
                  disableConfirm
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-purple-700 cursor-pointer'
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setPopupVisible(false);
                  setErrorMessage('');
                }}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmMsg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-[90%] z-10 text-center">
            <h2 className="text-xl font-semibold mb-4">Booking Approval On The Way!</h2>
            <p className="mb-4">
              Thank you <strong>{name.trim()}</strong>! Your booking request has been received. Kindly wait for the approval.<br />
              <strong>Address:</strong> {address} <br />
              <strong>Contact:</strong> {contact} <br />
              <strong>Your Total Bill:</strong> {currency}{totalPrice}
            </p>
            <button
              onClick={closeConfirmPopup}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetails;
