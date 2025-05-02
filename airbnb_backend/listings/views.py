# listings/views.py
from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer
from django.db.models import Q

class ListingList(generics.ListCreateAPIView):
    serializer_class = ListingSerializer
    
    def get_queryset(self):
        queryset = Listing.objects.all()
        location = self.request.query_params.get('location', None)
        guests = self.request.query_params.get('guests', None)
        
        if location:
            queryset = queryset.filter(
                Q(location__icontains=location) |
                Q(title__icontains=location)
            )
        if guests:
            queryset = queryset.filter(max_guests__gte=guests)
            
        return queryset

class ListingDetail(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer