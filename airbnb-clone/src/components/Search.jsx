import { useState } from 'react';

export default function Search({ onSearch }) {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, dates, guests });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
            placeholder="Where are you going?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Dates</label>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
            placeholder="Add dates"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-airbnb-red focus:border-transparent"
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>
                {num} guest{num !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-airbnb-red text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}