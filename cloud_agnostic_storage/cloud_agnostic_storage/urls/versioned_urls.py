from django.urls import include, path
from rest_framework.routers import SimpleRouter

from cloud_agnostic_storage.apps.accounts.views import ProfileViewSet
from cloud_agnostic_storage.apps.storages.views import FileViewSet
from cloud_agnostic_storage.apps.storages.views.connection_views import (
    ConnectionViewSet,
)

router = SimpleRouter()
router.register("profile", ProfileViewSet, basename="profile")
router.register("files", FileViewSet, basename="files")
router.register("connections", ConnectionViewSet, basename="connections")

versioned_urls = [path("", include(router.urls))]
