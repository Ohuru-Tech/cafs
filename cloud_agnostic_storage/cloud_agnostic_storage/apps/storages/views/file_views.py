from drf_psq import PsqMixin, Rule
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from cloud_agnostic_storage.apps.storages.models import File
from cloud_agnostic_storage.apps.storages.serializers import FileSerializer


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
    pagination_class = None
    parser_classes = [MultiPartParser]
    psq_rules = {
        "list": [Rule([IsAuthenticated], FileSerializer)],
        "retrieve": [Rule([IsAuthenticated], FileSerializer)],
        "create": [Rule([IsAuthenticated], FileSerializer)],
        "partial_update": [Rule([IsAuthenticated], FileSerializer)],
        "destroy": [Rule([IsAuthenticated], FileSerializer)],
    }

    def get_queryset(self):
        return File.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
