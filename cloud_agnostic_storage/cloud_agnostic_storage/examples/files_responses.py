files_list_get_200_example = {
    "count": 2,
    "next": None,
    "previous": None,
    "results": [
        {
            "id": 2,
            "file": None,
            "file_gcloud": None,
            "file_azure": None,
            "file_s3": "https://s3.amazonaws.com/some_bucket/asasa",
        },
        {
            "id": 6,
            "file": None,
            "file_gcloud": None,
            "file_azure": (
                "https://some_name.blob.core.windows.net/some_container/file"
            ),
            "file_s3": None,
        },
    ],
}


file_read_200_example = {
    "id": 2,
    "file": None,
    "file_gcloud": None,
    "file_azure": None,
    "file_s3": "https://s3.amazonaws.com/some_bucket/asasa",
}
