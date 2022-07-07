from django.db import models

from cloud_agnostic_storage.apps.accounts.models import User
from cloud_agnostic_storage.apps.common.storage_backends.connectors.azure import (
    AzureStorage,
)
from cloud_agnostic_storage.apps.common.storage_backends.connectors.gcp import (
    GoogleCloudStorage,
)
from cloud_agnostic_storage.apps.common.storage_backends.connectors.s3 import (
    S3Boto3Storage,
)
from cloud_agnostic_storage.apps.storages.models.connection import (
    AzureConnection,
    S3Connection,
)


def file_directory_path(instance, filename):
    return f"users/{instance.user.id}/{filename}"


class File(models.Model):
    # default file
    file = models.FileField(blank=True, null=True)
    # file on google cloud
    file_gcloud = models.FileField(
        storage=GoogleCloudStorage, blank=True, null=True
    )
    # file on azure
    file_azure = models.FileField(storage=AzureStorage, blank=True, null=True)
    # file on aws
    file_s3 = models.FileField(storage=S3Boto3Storage, blank=True, null=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.file_s3:
            try:
                aws_connection_details = self.user.connection.s3_connection
                self.file_s3.storage = S3Boto3Storage(
                    access_key=aws_connection_details.access_key,
                    secret_key=aws_connection_details.secret_key,
                    bucket_name=aws_connection_details.bucket_name,
                )
            except S3Connection.DoesNotExist:
                pass
        if self.file_azure:
            try:
                azure_connection_details = (
                    self.user.connection.azure_connection
                )
                self.file_azure.storage = AzureStorage(
                    account_name=azure_connection_details.account_name,
                    account_key=azure_connection_details.account_key,
                    azure_container=azure_connection_details.container_name,
                )
            except AzureConnection.DoesNotExist:
                pass
        return super().save(*args, **kwargs)
