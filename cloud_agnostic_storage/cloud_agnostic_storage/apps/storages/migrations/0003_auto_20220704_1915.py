# Generated by Django 3.2.8 on 2022-07-04 19:15

import cloud_agnostic_storage.apps.common.storage_backends.connectors.azure
import cloud_agnostic_storage.apps.common.storage_backends.connectors.gcp
import cloud_agnostic_storage.apps.common.storage_backends.connectors.s3
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storages', '0002_auto_20220704_1836'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='file_azure',
            field=models.FileField(blank=True, null=True, storage=cloud_agnostic_storage.apps.common.storage_backends.connectors.azure.AzureStorage, upload_to=''),
        ),
        migrations.AddField(
            model_name='file',
            name='file_gcloud',
            field=models.FileField(blank=True, null=True, storage=cloud_agnostic_storage.apps.common.storage_backends.connectors.gcp.GoogleCloudStorage, upload_to=''),
        ),
        migrations.AddField(
            model_name='file',
            name='file_s3',
            field=models.FileField(blank=True, null=True, storage=cloud_agnostic_storage.apps.common.storage_backends.connectors.s3.S3Boto3Storage, upload_to=''),
        ),
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
