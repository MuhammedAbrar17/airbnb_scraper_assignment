import scrapy
import json
from urllib.parse import urlencode

class AirbnbSpider(scrapy.Spider):
    name = 'airbnb'
    
    def __init__(self, location='Paris', check_in=None, check_out=None, guests=1, *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.location = location
        self.guests = guests
        
        # Set default dates if not provided
        import datetime
        today = datetime.date.today()
        self.check_in = check_in or (today + datetime.timedelta(days=7)).strftime('%Y-%m-%d')
        self.check_out = check_out or (today + datetime.timedelta(days=14)).strftime('%Y-%m-%d')
        
        self.api_url = 'https://www.airbnb.com/api/v3/ExploreSections'
    
    def start_requests(self):
        query_params = {
            'operationName': 'ExploreSections',
            'locale': 'en',
            'currency': 'USD',
            'variables': json.dumps({
                'request': {
                    'metadataOnly': False,
                    'version': '1.8.2',
                    'itemsPerGrid': 20,
                    'tabId': 'home_tab',
                    'refinementPaths': ['/homes'],
                    'checkin': self.check_in,
                    'checkout': self.check_out,
                    'adults': self.guests,
                    'query': self.location,
                    'cdnCacheSafe': False,
                    'simpleSearchTreatment': 'simple_search_only',
                    'treatmentFlags': [],
                    'screenSize': 'large',
                }
            }),
            'extensions': json.dumps({
                'persistedQuery': {
                    'version': 1,
                    'sha256Hash': '13aa9970e501078a9dd6fea4c9e1a7a0b9a5a9d5d8e3e8e8e8e8e8e8e8e8e8e'
                }
            })
        }
        
        url = f"{self.api_url}?{urlencode(query_params)}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'X-Airbnb-API-Key': 'd306zoyjsyarp7ifhu67rjxn52tv0t20',  # This is Airbnb's public API key
        }
        
        yield scrapy.Request(url, headers=headers, callback=self.parse_api_response)
    
    def parse_api_response(self, response):
        data = json.loads(response.text)
        
        # Extract listing data from the API response
        sections = data.get('data', {}).get('presentation', {}).get('explore', {}).get('sections', [])
        
        for section in sections:
            if section.get('sectionComponentType') == 'listings':
                for item in section.get('items', []):
                    listing = item.get('listing', {})
                    if listing:
                        yield self.process_listing(listing)
        
        # Handle pagination if needed
        # You would extract the next page cursor from the response here
    
    def process_listing(self, listing):
        # Process the listing data into the format we need
        amenities = listing.get('amenities', [])
        host_info = listing.get('host', {})
        
        return {
            'title': listing.get('title'),
            'location': self.location,
            'address': listing.get('location', {}).get('address'),
            'price_per_night': listing.get('price', {}).get('rate', {}).get('amount'),
            'currency': listing.get('price', {}).get('rate', {}).get('currency'),
            'total_price': listing.get('price', {}).get('total', {}).get('amount'),
            'images': [img.get('picture') for img in listing.get('images', [])],
            'ratings': listing.get('avgRating'),
            'description': listing.get('description'),
            'num_reviews': listing.get('reviewsCount'),
            'amenities': amenities,
            'host': {
                'name': host_info.get('name'),
                'about': host_info.get('about'),
                'response_time': host_info.get('responseTime'),
                'is_superhost': host_info.get('isSuperhost', False)
            },
            'property_type': listing.get('roomTypeCategory')
        }