import logging
import os

from django.core.management.base import BaseCommand
from cloud_agnostic_storage.apps.accounts.models import User

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)

ADMIN_EMAIL = os.getenv(
    "CLOUD_AGNOSTIC_STORAGE_ADMIN_EMAIL", "admin@cloud_agnostic_storage.com"
)
ADMIN_PASS = os.getenv("CLOUD_AGNOSTIC_STORAGE_ADMIN_PASSWORD", "tempPassword@1234")


class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            User.objects.create_superuser(
                email=ADMIN_EMAIL, password=ADMIN_PASS
            )
            logger.info(f"Admin User created with email: {ADMIN_EMAIL}")
        else:
            logger.info(
                "Admin user can only be created when "
                + "there are no existing users"
            )
