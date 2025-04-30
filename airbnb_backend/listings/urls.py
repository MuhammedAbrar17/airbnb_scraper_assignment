
from django.urls import path
from .views import ListingList, ListingDetail

urlpatterns = [
    path('listings/', ListingList.as_view(), name='listing-list'),
    path('listings/<int:pk>/', ListingDetail.as_view(), name='listing-detail'),
]
