from django.utils.decorators import method_decorator
from drf_psq import PsqMixin, Rule
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from cloud_agnostic_storage.apps.common.pagination import (
    DynamicPageSizePagination,
)
from cloud_agnostic_storage.apps.storages.models import File
from cloud_agnostic_storage.apps.storages.serializers import FileSerializer
from cloud_agnostic_storage.apps.storages.serializers.file_serializers import (
    FileReadSerializer,
)
from cloud_agnostic_storage.docs.file_docs import (
    FileCreate,
    FilesList,
    FilesRetrieve,
    FileUpdate,
)


@method_decorator(swagger_auto_schema(**FilesList.swagger_setup), "list")
@method_decorator(
    swagger_auto_schema(**FilesRetrieve.swagger_setup), "retrieve"
)
@method_decorator(swagger_auto_schema(**FileCreate.swagger_setup), "create")
@method_decorator(
    swagger_auto_schema(**FileUpdate.swagger_setup), "partial_update"
)
class FileViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    PsqMixin,
    GenericViewSet,
):
    http_method_names = ["patch", "post", "get", "delete"]
    pagination_class = DynamicPageSizePagination
    parser_classes = [MultiPartParser]
    psq_rules = {
        "list": [Rule([IsAuthenticated], FileReadSerializer)],
        "retrieve": [Rule([IsAuthenticated], FileReadSerializer)],
        "create": [Rule([IsAuthenticated], FileSerializer)],
        "partial_update": [Rule([IsAuthenticated], FileSerializer)],
        "destroy": [Rule([IsAuthenticated], FileSerializer)],
    }

    def get_queryset(self):
        return File.objects.order_by("-id")

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            FileReadSerializer(obj).data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
