from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Song, Reviewer
from .serializers import SongSerializer, ReviewerSerializer
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_songs(request):
    songs = Song.objects.all()
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_reviews(request):
    reviews = Reviewer.objects.all()
    serializer = ReviewerSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_song(request):
    if request.method == 'POST':
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_review(request):
    if request.method == 'POST':
        serializer = ReviewerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_review(request, pk):
    review = get_object_or_404(Reviewer, pk=pk)
    if request.method == 'GET':
        reviews = Reviewer.objects.filter(user_id=request.user.id)
        serializer = ReviewerSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReviewerSerializer(review, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
