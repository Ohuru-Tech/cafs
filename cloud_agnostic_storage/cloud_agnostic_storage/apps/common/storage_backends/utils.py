import os
import posixpath

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured, SuspiciousFileOperation
from django.utils.encoding import force_bytes


def to_bytes(content):
    """
    Wrap Django's force_bytes to pass through bytearrays.
    """
    if isinstance(content, bytearray):
        return content

    return force_bytes(content)


def setting(name, default=None):
    """A helper function to either return the django
    setting / None or the default value

    Args:
        name (string): the name of the setting
        default (any, optional): The default setting value. Defaults to None.

    Returns:
        any: the setting value
    """
    return getattr(settings, name, default)


def clean_name(name):
    """Cleans name to make it OS agnostic

    Args:
        name (string): File of the name

    Returns:
        string: The cleaned name
    """
    clean_name = posixpath.normpath(name).replace("\\", "/")

    if name.endswith("/") and not clean_name.endswith("/"):
        clean_name = clean_name + "/"

    if clean_name == ".":
        clean_name = ""

    return clean_name


def safe_join(base, *paths):
    base_path = base
    base_path = base_path.rstrip("/")
    paths = [p for p in paths]

    final_path = base_path + "/"
    for path in paths:
        _final_path = posixpath.normpath(posixpath.join(final_path, path))
        if path.endswith("/") or _final_path + "/" == final_path:
            _final_path += "/"
        final_path = _final_path
    if final_path == base_path:
        final_path += "/"

    base_path_len = len(base_path)
    if (
        not final_path.startswith(base_path)
        or final_path[base_path_len] != "/"
    ):
        raise ValueError(
            "the joined path is located outside of the base path component"
        )

    return final_path.lstrip("/")


def check_location(storage):
    if storage.location.startswith("/"):
        correct = storage.location.lstrip("/")
        raise ImproperlyConfigured(
            "{}.location cannot begin with a leading slash. Found '{}'. Use"
            " '{}' instead.".format(
                storage.__class__.__name__,
                storage.location,
                correct,
            )
        )


def lookup_env(names):
    for name in names:
        value = os.environ.get(name)
        if value:
            return value


def get_available_overwrite_name(name, max_length):
    if max_length is None or len(name) <= max_length:
        return name

    dir_name, file_name = os.path.split(name)
    file_root, file_ext = os.path.splitext(file_name)
    truncation = len(name) - max_length

    file_root = file_root[:-truncation]
    if not file_root:
        raise SuspiciousFileOperation(
            'Storage tried to truncate away entire filename "%s". '
            "Please make sure that the corresponding file field "
            'allows sufficient "max_length".' % name
        )
    return os.path.join(dir_name, f"{file_root}{file_ext}")
