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
      if (searchParams) {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8000/api/listings/', {
            params: searchParams
          });
          setListings(response.data);
        } catch (error) {
          console.error('Error fetching listings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchListings();
  }, [searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Airbnb Clone</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Search onSearch={handleSearch} />
          </div>
          
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-8">Loading listings...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}