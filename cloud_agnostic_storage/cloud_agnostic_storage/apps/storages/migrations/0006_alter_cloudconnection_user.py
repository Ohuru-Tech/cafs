# Generated by Django 3.2.10 on 2022-07-07 12:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('storages', '0005_auto_20220707_1232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cloudconnection',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='connection', to=settings.AUTH_USER_MODEL),
        ),
    ]