from .base import Common, rel
from .environment import env


class Dev(Common):
    ALLOWED_HOSTS = ["*"]

    INSTALLED_APPS = Common.INSTALLED_APPS
    MIDDLEWARE = Common.MIDDLEWARE

    # Add only dev based installed apps here
    INSTALLED_APPS += env.list(
        "CLOUD_AGNOSTIC_STORAGE_DEV_INSTALLED_APPS",
        default=[],
    )

    # Add only dev based middleware here
    MIDDLEWARE += env.list("CLOUD_AGNOSTIC_STORAGE_DEV_MIDDLEWARE", default=[])

    # Keep debug true in development
    DEBUG = True

    # Use local database
    DATABASES = {
        "default": env.db(
            "CLOUD_AGNOSTIC_STORAGE_DATABASE_URL_DEV",
            default=f"sqlite:///cloud_agnostic_storage_dev.sqlite",
        )
    }

    # Mail
    EMAIL_HOST = "localhost"
    EMAIL_PORT = 1025
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

    # Disable CORS check
    CORS_ORIGIN_ALLOW_ALL = True

    # Make the email verification as not necessary
    ACCOUNT_EMAIL_VERIFICATION = "none"

    # Celery broker config
    BROKER_URL = env.str(
        "CLOUD_AGNOSTIC_STORAGE_CELERY_BROKER_DEV",
        default="amqp://cloud_agnostic_storage:pass@localhost:5672/cloud_agnostic_storage",
    )

    USE_X_FORWARDED_HOST = False
    SECURE_PROXY_SSL_HEADER = None
