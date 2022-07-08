from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from cloud_agnostic_storage.apps.storages.models import File

DEFAULT_FALLBACK = getattr(settings, "DEFAULT_TO_ENV_CONFIGS")


class FileSerializer(serializers.ModelSerializer):
    fields_names = ["file_s3", "file_azure", "file", "file_gcloud"]

    def validate_file_gcloud(self, value):
        if not DEFAULT_FALLBACK:
            # Check if the user does not have
            user = self.context.get("request").user
            if not user.connection.gcp_connection:
                raise ValidationError("GCP connection settings not set")
        return value

    def validate_file_s3(self, value):
        if not DEFAULT_FALLBACK:
            # Check if the user does not have
            user = self.context.get("request").user
            if not user.connection.s3_connection:
                raise ValidationError("S3 connection settings not set")
        return value

    def validate_file_azure(self, value):
        if not DEFAULT_FALLBACK:
            # Check if the user does not have
            user = self.context.get("request").user
            if not user.connection.azure_connection:
                raise ValidationError("Azure connection settings not set")
        return value

    def validate(self, attrs):
        if (
            "file_azure" not in self.initial_data
            and "file_s3" not in self.initial_data
            and "file_gcloud" not in self.initial_data
            and "file" not in self.initial_data
        ):
            raise ValidationError("One of the files need to be set")

        return super().validate(attrs)

    class Meta:
        model = File
        exclude = ("user",)
        read_only_fields = ("id",)


class FileReadSerializer(serializers.ModelSerializer):
    file_azure = serializers.SerializerMethodField()
    file_s3 = serializers.SerializerMethodField()
    file_gcloud = serializers.SerializerMethodField()

    def get_file_azure(self, obj):
        if obj.file_azure:
            return obj.access_url
        return None

    def get_file_s3(self, obj):
        if obj.file_s3:
            return obj.access_url
        return None

    def get_file_gcloud(self, obj):
        if obj.file_gcloud:
            return obj.access_url
        return None

    class Meta:
        model = File
        exclude = ("access_url",)
