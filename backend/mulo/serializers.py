from rest_framework import serializers
from .models import Reviewer, Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['user_id', 'stage_name', 'song_title', 'video_id', 'genre', 'year' ]



class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = ['user_id', 'song', 'city', 'state', 'favorite_lyric', 'favorite_instrument', 'rating', 'overview' ]
        depth = 1