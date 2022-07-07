from django.contrib import admin

from cloud_agnostic_storage.apps.storages.models import (
    AzureConnection,
    CloudConnection,
    File,
    GCloudConnection,
    S3Connection,
)


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "file",
        "file_s3",
        "file_azure",
        "file_gcloud",
    )


@admin.register(CloudConnection)
class CloudConnectionAdmin(admin.ModelAdmin):
    list_display = ["user"]


@admin.register(AzureConnection)
class AzureConnectionAdmin(admin.ModelAdmin):
    list_display = ["container_name"]


@admin.register(S3Connection)
class S3ConnectionAdmin(admin.ModelAdmin):
    list_display = ["bucket_name"]


@admin.register(GCloudConnection)
class GCloudConnectionAdmin(admin.ModelAdmin):
    list_display = ["bucket_name"]
