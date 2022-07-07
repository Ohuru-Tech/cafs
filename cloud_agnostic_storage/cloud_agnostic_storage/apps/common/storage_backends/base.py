from django.core.exceptions import ImproperlyConfigured
from django.core.files.storage import Storage


class CustomBaseStorage(Storage):
    def __init__(self, **settings):
        default_settings = self.get_default_settings()

        for name, value in default_settings.items():
            if not hasattr(self, name):
                setattr(self, name, value)

        for name, value in settings.items():
            if name not in default_settings:
                raise ImproperlyConfigured(
                    f"Invalid setting '{name}' for {self.__class__.__name__}"
                )
            setattr(self, name, value)

    def get_default_settings(self):
        return {}
