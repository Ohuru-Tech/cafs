from drf_yasg import openapi

from cloud_agnostic_storage.apps.storages.serializers.connection_serializers import (
    CloudConnectionSerializer,
)
from cloud_agnostic_storage.docs.docs_utils import fields_to_md
from cloud_agnostic_storage.examples import connection_response


class ConnectionCreate:
    desc = f"""
Connection Create is an API endpoint to upload a file to a cloud associated
with a particular user.

By using this endpoint, you can make a post call with 
{fields_to_md(CloudConnectionSerializer.fields_names)} fields.

Setting one of the connection fields is cumpolsary otherwise you will get a `400`
response.
    """  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            examples={"application/json": connection_response},
        ),
        "401": openapi.Response(
            description="Unauthorized",
        ),
        "403": openapi.Response(
            description="Permission Denied",
        ),
    }

    swagger_setup = {
        "operation_id": "Connection Create",
        "operation_description": desc,
        "request_body": CloudConnectionSerializer,
        "responses": responses,
    }


class ConnectionUpdate:
    desc = f"""
Connection Update is an API endpoint to update connection setting

By using this endpoint, you can make a post call with 
{fields_to_md(CloudConnectionSerializer.fields_names)} fields.

The validations are same as in the create call.
    """  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            examples={"application/json": connection_response},
        ),
        "401": openapi.Response(
            description="Unauthorized",
        ),
        "403": openapi.Response(
            description="Permission Denied",
        ),
    }

    swagger_setup = {
        "operation_id": "Connection Update",
        "operation_description": desc,
        "request_body": CloudConnectionSerializer,
        "responses": responses,
    }


class ConnectionRetrieve:
    desc = f"""
The Connection Retrieve API is used to get a particular connection by id
"""  # noqa

    responses = {
        "200": openapi.Response(
            description="OK",
            examples={"application/json": connection_response},
        )
    }

    swagger_setup = {
        "operation_id": "Connection Retrieve",
        "operation_description": desc,
        "responses": responses,
    }
