export default function Footer() {
    return (
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:underline">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Safety information</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:underline">Disaster relief</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Support refugees</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hosting</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:underline">Try hosting</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">AirCover for Hosts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Airbnb</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:underline">Newsroom</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2025 Airbnb Clone, Inc.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:underline">Privacy</a>
              <a href="#" className="text-gray-600 hover:underline">Terms</a>
              <a href="#" className="text-gray-600 hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }