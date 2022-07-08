from drf_yasg import openapi

from cloud_agnostic_storage.apps.storages.serializers.file_serializers import (
    FileSerializer,
)
from cloud_agnostic_storage.docs.docs_utils import fields_to_md
from cloud_agnostic_storage.examples import (
    file_read_200_example,
    files_list_get_200_example,
)


class FileCreate:
    desc = f"""
File Create is an API endpoint to upload a file to a cloud associated
with a particular user.

By using this endpoint, you can make a post call with 
{fields_to_md(FileSerializer.fields_names)} fields.

The `file`, `file_s3`, `file_gcloud` and `file_azure` fields refer to
local instance, AWS S3, Google Cloud and Azure respectively. You only need
to set the field with the required destination for it to work.

Setting one of the file fields is cumpolsary otherwise you will get a `400`
response.

There is an environment variable called `DEFAULT_TO_ENV_CONFIGS` which if set
will try to look for general configs for all three clouds as fallbacks, 
it is false by default i.e. with each request, we will validate if the user
has set the required cloud credentials to be able to upload to that specific
cloud instance.

Please refer to the `.env.template` and look for the relevant keys to set.
    """  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            schema=FileSerializer,
        ),
        "401": openapi.Response(
            description="Unauthorized",
        ),
        "403": openapi.Response(
            description="Permission Denied",
        ),
    }

    swagger_setup = {
        "operation_id": "File Upload",
        "operation_description": desc,
        "request_body": FileSerializer,
        "responses": responses,
    }


class FileUpdate:
    desc = f"""
File Update is an API endpoint to update an uploaded file to a cloud associated
with a particular user.

By using this endpoint, you can make a post call with 
{fields_to_md(FileSerializer.fields_names)} fields.

The validations are same as in the create call.

NOTE: Updating the file will only update the references to that particular file instance
and will not actually delete the file from storage, you might have to make the delete
call for that. For instance, if you make a patch call and update the `file_azure`, a new
file will be uploaded and associated with that id with the current user, the old file will not
be deleted from the cloud, only the reference to it will be deleted.
    """  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            schema=FileSerializer,
        ),
        "401": openapi.Response(
            description="Unauthorized",
        ),
        "403": openapi.Response(
            description="Permission Denied",
        ),
    }

    swagger_setup = {
        "operation_id": "File Update",
        "operation_description": desc,
        "request_body": FileSerializer,
        "responses": responses,
    }


class FilesList:
    desc = f"""
The Files List API is used to get a list of all the files of a user
You can also specify the `page` and `page_size` query params in order to
get the files on `page` (number) and also limit the number of entries on
that page using `page_size` query parameter
"""  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            examples={"application/json": files_list_get_200_example},
        )
    }

    swagger_setup = {
        "operation_id": "Files List",
        "operation_description": desc,
        "responses": responses,
        "security": [],
    }


class FilesRetrieve:
    desc = f"""
The Files Retrieve API is used to get a particular file for the user by `id`
as a `URL` param.
"""  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            examples={"application/json": file_read_200_example},
        )
    }

    swagger_setup = {
        "operation_id": "Files Retrieve",
        "operation_description": desc,
        "responses": responses,
        "security": [],
    }
