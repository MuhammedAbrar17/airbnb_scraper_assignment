import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/listings/${id}/`);
        setListing(response.data);
      } catch (err) {
        setError('Failed to load listing');
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!listing) return <div className="text-center py-8">Listing not found</div>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img 
            src={listing.image_url} 
            alt={listing.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          
          <h2 className="text-xl font-semibold mb-4">About this place</h2>
          <p className="text-gray-700 mb-6">
            {listing.description || 'No description available.'}
          </p>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <p>{listing.location}</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm h-fit sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">
              ${listing.price_per_night} <span className="font-normal">night</span>
            </p>
            {listing.ratings && (
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span>{listing.ratings}</span>
              </div>
            )}
          </div>
          
          <button className="w-full bg-airbnb-red text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
            Reserve
          </button>
          
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>${listing.price_per_night} x 5 nights</span>
              <span>${(listing.price_per_night * 5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>$30.00</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 font-medium">
              <span>Total</span>
              <span>${(listing.price_per_night * 5 + 30).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}