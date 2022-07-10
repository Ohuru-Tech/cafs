from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from cloud_agnostic_storage.apps.storages.models.connection import (
    AzureConnection,
    CloudConnection,
    GCloudConnection,
    S3Connection,
)


class AzureConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AzureConnection
        fields = "__all__"
        read_only_fields = ("id",)


class S3ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = S3Connection
        fields = "__all__"
        read_only_fields = ("id",)


class GCloudConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GCloudConnection
        fields = "__all__"
        read_only_fields = ("id",)


class CloudConnectionSerializer(serializers.ModelSerializer):
    fields_names = ["azure_connection", "s3_connection", "gcp_connection"]
    azure_connection = AzureConnectionSerializer(required=False)
    s3_connection = S3ConnectionSerializer(required=False)
    gcp_connection = GCloudConnectionSerializer(required=False)

    def create(self, validated_data):
        azure_connection_data = validated_data.pop("azure_connection", None)
        s3_connection_data = validated_data.pop("s3_connection", None)
        gcp_connection_data = validated_data.pop("gcp_connection", None)

        azure_connection_object = None
        s3_connection_object = None
        gcp_connection_object = None

        if azure_connection_data:
            serializer = AzureConnectionSerializer(
                data=azure_connection_data,
            )
            serializer.is_valid(raise_exception=True)
            azure_connection_object = serializer.save()

        if s3_connection_data:
            serializer = S3ConnectionSerializer(
                data=s3_connection_data,
            )
            serializer.is_valid(raise_exception=True)
            s3_connection_object = serializer.save()

        if gcp_connection_data:
            serializer = GCloudConnectionSerializer(
                data=gcp_connection_data,
            )
            serializer.is_valid(raise_exception=True)
            gcp_connection_object = serializer.save()

        instance = super().create(validated_data)
        instance.azure_connection = azure_connection_object
        instance.s3_connection = s3_connection_object
        instance.gcp_connection = gcp_connection_object
        instance.save()

        return instance

    def update(self, instance, validated_data):
        azure_connection_data = validated_data.pop("azure_connection", None)
        s3_connection_data = validated_data.pop("s3_connection", None)
        gcp_connection_data = validated_data.pop("gcp_connection", None)

        if azure_connection_data:
            if instance.azure_connection:
                serializer = AzureConnectionSerializer(
                    instance=instance.azure_connection,
                    data=azure_connection_data,
                    partial=True,
                )

                serializer.is_valid(raise_exception=True)
                serializer.save()
            else:

                serializer = AzureConnectionSerializer(
                    data=azure_connection_data,
                )
                serializer.is_valid(raise_exception=True)
                instance.azure_connection = serializer.save()

        if s3_connection_data:
            if instance.s3_connection:
                serializer = S3ConnectionSerializer(
                    instance=instance.s3_connection,
                    data=s3_connection_data,
                    partial=True,
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
            else:
                serializer = S3ConnectionSerializer(
                    data=s3_connection_data,
                )
                serializer.is_valid(raise_exception=True)
                instance.s3_connection = serializer.save()

        if gcp_connection_data:
            if instance.gcp_connection:
                serializer = GCloudConnectionSerializer(
                    instance=instance.gcp_connection,
                    data=gcp_connection_data,
                    partial=True,
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
            else:
                serializer = GCloudConnectionSerializer(
                    data=gcp_connection_data,
                )
                serializer.is_valid(raise_exception=True)
                instance.gcp_connection = serializer.save()

        return super().update(instance, validated_data)

    def validate(self, attrs):
        if (
            "azure_connection" not in self.initial_data
            and "s3_connection" not in self.initial_data
            and "gcp_connection" not in self.initial_data
        ):
            raise ValidationError("One of the connections need to be set")

        return super().validate(attrs)

    class Meta:
        model = CloudConnection
        exclude = ("user",)
        read_only_fields = ("id",)
