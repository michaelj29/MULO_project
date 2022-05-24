from django.urls import path
from mulo import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:pk>/', views.user_review),
    path('', views.user_song),
    path('create/', views.post_review),
    path('all-songs/', views.get_all_songs),
    path('all-reviews/', views.get_all_reviews),
]