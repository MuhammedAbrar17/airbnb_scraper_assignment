import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}/`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
  );

  if (!listing) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Listing not found</h2>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-500">
            ★ <span className="ml-1 text-gray-800">{listing.ratings}</span>
          </div>
          <span className="mx-2">·</span>
          <span className="text-gray-600">{listing.num_reviews} reviews</span>
          <span className="mx-2">·</span>
          <span className="text-gray-600">{listing.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <img 
                src={listing.image_url || 'https://via.placeholder.com/800x500'} 
                alt={listing.title}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            {listing.images?.slice(1, 5).map((img, index) => (
              <div key={index}>
                <img 
                  src={img} 
                  alt={`${listing.title} - ${index + 1}`}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">About this place</h2>
            <p className="text-gray-700 text-lg">
              {listing.description || 'No description available.'}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listing.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-rose-500">✓</span>
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xl font-bold">${listing.price_per_night}</p>
                <p className="text-gray-600">per night</p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{listing.ratings}</span>
              </div>
            </div>

            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 mb-6">
              Reserve
            </button>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>${listing.price_per_night} x 5 nights</span>
                <span>${(listing.price_per_night * 5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$30.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(listing.price_per_night * 5 + 30).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}