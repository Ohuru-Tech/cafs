from django.db import models
from google.oauth2 import service_account

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
    GCloudConnection,
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
    access_url = models.URLField(blank=True, null=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def _initialize_storage_instance(self):
        if self.file_s3:
            try:
                aws_connection_details = self.user.connection.s3_connection
                self.file_s3.storage = S3Boto3Storage(
                    access_key=aws_connection_details.access_key,
                    secret_key=aws_connection_details.secret_key,
                    bucket_name=aws_connection_details.bucket_name,
                )
                self.access_url = self.file_s3.url
            except (S3Connection.DoesNotExist, AttributeError):
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
                self.access_url = self.file_azure.url
            except (AzureConnection.DoesNotExist, AttributeError):
                pass
        if self.file_gcloud:
            try:
                gcloud_connection_details = self.user.gcp_connection
                self.file_gcloud.storage = GCloudConnection(
                    bucket_name=gcloud_connection_details.bucket_name,
                    credentials=service_account.Credentials.from_service_account_info(
                        gcloud_connection_details.connection_json
                    ),
                )
                self.access_url = self.file_gcloud.url
            except (GCloudConnection.DoesNotExist, AttributeError):
                pass

    def save(self, *args, **kwargs):
        self._initialize_storage_instance()
        return super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self._initialize_storage_instance()
        return super().delete(using, keep_parents)
