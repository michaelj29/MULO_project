# Generated by Django 4.0.4 on 2022-05-20 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_artist',
            field=models.BooleanField(default=False, verbose_name='artist status'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_reviewer',
            field=models.BooleanField(default=False, verbose_name='reviewer status'),
        ),
    ]
