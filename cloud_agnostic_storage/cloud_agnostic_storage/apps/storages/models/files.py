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
