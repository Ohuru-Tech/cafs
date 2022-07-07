from django.db import models

from cloud_agnostic_storage.apps.accounts.models import User


class S3Connection(models.Model):
    bucket_name = models.CharField(max_length=255)
    access_key = models.CharField(max_length=255)
    secret_key = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.bucket_name}"


class AzureConnection(models.Model):
    account_name = models.CharField(max_length=255)
    account_key = models.CharField(max_length=255)
    container_name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.container_name}"


class GCloudConnection(models.Model):
    bucket_name = models.CharField(max_length=255)
    connection_json = models.JSONField()


class CloudConnection(models.Model):
    user = models.OneToOneField(
        to=User, on_delete=models.CASCADE, related_name="connection"
    )
    s3_connection = models.OneToOneField(
        to=S3Connection,
        on_delete=models.CASCADE,
        related_name="connection",
        blank=True,
        null=True,
    )
    azure_connection = models.OneToOneField(
        to=AzureConnection,
        on_delete=models.CASCADE,
        related_name="connection",
        blank=True,
        null=True,
    )
    gcp_connection = models.OneToOneField(
        to=GCloudConnection,
        on_delete=models.CASCADE,
        related_name="connection",
        blank=True,
        null=True,
    )

    def __str__(self) -> str:
        return f"{self.user.name}'s Cloud"
