from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    ratings = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    image_url = models.URLField(blank=True)
    
    def __str__(self):
        return self.title