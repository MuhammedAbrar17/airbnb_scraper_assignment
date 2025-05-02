import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/listings/`;
        const params = searchParams || {};
        const response = await axios.get(url, { params });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-500 to-amber-500 py-20 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-xl">Discover unique homes and experiences</p>
      </div>

      {/* Main Content - Properly Centered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar - Centered */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl">
            <Search onSearch={handleSearch} />
          </div>
        </div>

        {/* Listings Grid - Centered */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No listings found. Try different search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}