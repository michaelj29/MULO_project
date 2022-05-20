from django.contrib import admin
from .models import Song, Reviewer

# Register your models here.
admin.site.register(Song)
admin.site.register(Reviewer)