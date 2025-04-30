import scrapy
import json

class AirbnbSpider(scrapy.Spider):
    name = 'airbnb'
    start_urls = ['https://www.airbnb.com/s/homes']
    
    def parse(self, response):
       
        for listing in response.css('div._gig1e7'):
            yield {
                'title': listing.css('div._1e9w8hic::text').get(),
                'location': listing.css('div._1tanv1h::text').get(),
                'price_per_night': listing.css('span._1p7iugi::text').get(),
                'ratings': listing.css('span._18khxk1::text').get(),
                'num_reviews': listing.css('span._a7a5sx::text').get(),
                'image_url': listing.css('img::attr(src)').get()
            }