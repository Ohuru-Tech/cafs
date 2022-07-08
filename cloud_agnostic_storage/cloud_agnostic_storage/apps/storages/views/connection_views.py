from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from drf_psq import PsqMixin, Rule
from drf_yasg.utils import swagger_auto_schema
from rest_framework.exceptions import NotAuthenticated
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from cloud_agnostic_storage.apps.storages.models.connection import (
    CloudConnection,
)
from cloud_agnostic_storage.apps.storages.serializers import (
    CloudConnectionSerializer,
)
from cloud_agnostic_storage.docs.connection_docs import (
    ConnectionCreate,
    ConnectionRetrieve,
    ConnectionUpdate,
)


@method_decorator(
    swagger_auto_schema(**ConnectionRetrieve.swagger_setup), "retrieve"
)
@method_decorator(
    swagger_auto_schema(**ConnectionCreate.swagger_setup), "create"
)
@method_decorator(
    swagger_auto_schema(**ConnectionUpdate.swagger_setup), "partial_update"
)
class ConnectionViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    PsqMixin,
    GenericViewSet,
):
    http_method_names = ["patch", "post", "get", "delete"]
    pagination_class = None
    psq_rules = {
        "list": [Rule([IsAuthenticated], CloudConnectionSerializer)],
        "retrieve": [Rule([IsAuthenticated], CloudConnectionSerializer)],
        "create": [Rule([IsAuthenticated], CloudConnectionSerializer)],
        "partial_update": [Rule([IsAuthenticated], CloudConnectionSerializer)],
        "destroy": [Rule([IsAuthenticated], CloudConnectionSerializer)],
    }

    def get_object(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return get_object_or_404(CloudConnection, user=self.request.user)
        else:
            raise NotAuthenticated

    def get_queryset(self):
        return CloudConnection.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
