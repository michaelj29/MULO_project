from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Song(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    stage_name = models.CharField(max_length=100, default="Artist Name")
    song_title = models.CharField(max_length=50)
    video_id = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year = models.IntegerField()

class Reviewer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    favorite_lyric = models.CharField(max_length=100)
    favorite_instrument = models.CharField(max_length=50)
    rating = models.PositiveIntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(5)])
    overview = models.CharField(max_length=500)