import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <Link 
      to={`/listing/${listing.id}`} 
      className="block transform transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative pb-3/4">
          <img 
            src={listing.image_url || 'https://via.placeholder.com/300x200'} 
            alt={listing.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 font-medium">{listing.ratings || 'New'}</span>
          </div>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{listing.location}</p>
          <p className="text-gray-500 text-sm mb-3">{listing.property_type}</p>
          <p className="font-bold text-gray-900">
            ${listing.price_per_night} <span className="font-normal">night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}