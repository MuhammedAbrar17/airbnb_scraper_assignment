export default function Navbar() {
    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-rose-500">airbnb</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                Become a Host
              </button>
              <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }