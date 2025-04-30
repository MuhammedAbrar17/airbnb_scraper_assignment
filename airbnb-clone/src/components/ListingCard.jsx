import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <img 
          src={listing.image_url} 
          alt={listing.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg truncate">{listing.title}</h3>
            {listing.ratings && (
              <div className="flex items-center ml-2">
                <span className="text-yellow-500">★</span>
                <span>{listing.ratings}</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">{listing.location}</p>
          <p className="mt-2 text-gray-900">
            <span className="font-semibold">${listing.price_per_night}</span> night
          </p>
        </div>
      </div>
    </Link>
  );
}