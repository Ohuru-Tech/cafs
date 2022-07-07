from rest_framework import serializers

from cloud_agnostic_storage.apps.storages.models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        exclude = ("user",)
        read_only_fields = ("id",)
