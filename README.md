
# CAFS

![cafs](https://socialify.git.ci/Ohuru-Tech/cafs/image?description=1&descriptionEditable=A%20Cloud%20agnostic%20file%20server%20built%20in%20Django%20and%20React%20with%20AWS%2C%20GCP%20and%20Azure%20integrations.%20&font=Source%20Code%20Pro&language=1&name=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)

## Run Locally
| Backend                                                                      | Frontend                                                                    |
|------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Clone the project <br > ```git clone https://github.com/Ohuru-Tech/cafs.git``` | Clone the project <br> ```git clone https://github.com/Ohuru-Tech/cafs.git ``` |
| Go to the project directory <br> ```cd cafs/cloud_agnostic_storage ```      | Go to the project directory <br> ```cd cafs/frontend  ```    |
| Install Dependencies <br> ``` pip3 install -r requirements.txt ```           | Install Dependencies <br>  ``` yarn install ```                              |
| Start the server  <br> ```python3 manage.py runserver ```                    | Start the server <br> ``` yarn start ```                                    |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
# Hosts that can make request to the server
CLOUD_AGNOSTIC_STORAGE_ALLOWED_HOSTS=127.0.0.1,

# Django secret key
CLOUD_AGNOSTIC_STORAGE_SECRET_KEY=secret-key

# Database settings for dev and prod
CLOUD_AGNOSTIC_STORAGE_DATABASE_URL_DEV=sqlite:///cloud_agnostic_storage_dev.sqlite
CLOUD_AGNOSTIC_STORAGE_DATABASE_URL_PROD=psql://cloud_agnostic_storage_user:test_password@127.0.0.1:5432/cloud_agnostic_storage_db

# Admin username and password
CLOUD_AGNOSTIC_STORAGE_ADMIN_EMAIL=admin@cloud_agnostic_storage.com
CLOUD_AGNOSTIC_STORAGE_ADMIN_PASSWORD=tempPassword@1234

# Static url
CLOUD_AGNOSTIC_STORAGE_STATIC_URL=/static/

# Add apps and middleware to dev
CLOUD_AGNOSTIC_STORAGE_DEV_INSTALLED_APPS=debug_toolbar
CLOUD_AGNOSTIC_STORAGE_DEV_MIDDLEWARE=debug_toolbar.middleware.DebugToolbarMiddleware

# Email settings
CLOUD_AGNOSTIC_STORAGE_EMAIL_HOST=127.0.0.1
CLOUD_AGNOSTIC_STORAGE_EMAIL_PORT=1025
CLOUD_AGNOSTIC_STORAGE_EMAIL_HOST_USER=user
CLOUD_AGNOSTIC_STORAGE_EMAIL_HOST_PASSWORD=password
CLOUD_AGNOSTIC_STORAGE_EMAIL_USE_TLS=off
CLOUD_AGNOSTIC_STORAGE_MAIL_COMMUNICATOR_NAME="Admin"
CLOUD_AGNOSTIC_STORAGE_CONTACT_EMAIL=contact@cloud_agnostic_storage.com

CLOUD_AGNOSTIC_STORAGE_SESSION_COOKIE_HTTPONLY=off
CLOUD_AGNOSTIC_STORAGE_SESSION_COOKIE_SECURE=off
CLOUD_AGNOSTIC_STORAGE_CSRF_COOKIE_SECURE=off
CLOUD_AGNOSTIC_STORAGE_SECURE_BROWSER_XSS_FILTER=True
CLOUD_AGNOSTIC_STORAGE_SECURE_CONTENT_TYPE_NOSNIFF=True
CLOUD_AGNOSTIC_STORAGE_X_FRAME_OPTIONS=SAMEORIGIN
CLOUD_AGNOSTIC_STORAGE_SECURE_HSTS_SECONDS=31536000

# Auth settings
CLOUD_AGNOSTIC_STORAGE_LOGOUT_ON_PASSWORD_CHANGE=True
CLOUD_AGNOSTIC_STORAGE_OLD_PASSWORD_ENABLED=True
CLOUD_AGNOSTIC_STORAGE_EMAIL_VERIFICATION=none

# Celery settings
CLOUD_AGNOSTIC_STORAGE_CELERY_BROKER_DEV=amqp://cloud_agnostic_storage:pass@localhost:5672/cloud_agnostic_storage
CLOUD_AGNOSTIC_STORAGE_CELERY_BROKER_PROD=amqp://cloud_agnostic_storage:pass@localhost:5672/cloud_agnostic_storage

# Throttling rates
CLOUD_AGNOSTIC_STORAGE_ANNON_THROTTLE_RATE_PER_MIUTE=50
CLOUD_AGNOSTIC_STORAGE_USER_THROTTLE_RATE_PER_MIUTE=100

# This is used for forming the password reset
CLOUD_AGNOSTIC_STORAGE_PASSWORD_RESET_URL=http://localhost:3000/

# The number of results on a single page
CLOUD_AGNOSTIC_STORAGE_MAX_PAGE_SIZE=20

# URL settings
CLOUD_AGNOSTIC_STORAGE_API_PREFIX="api"
CLOUD_AGNOSTIC_STORAGE_API_VERSION="v1"
CLOUD_AGNOSTIC_STORAGE_PLATFORM_PREFIX="_platform"
CLOUD_AGNOSTIC_STORAGE_DOCS_PREFIX="docs"

CLOUD_AGNOSTIC_STORAGE_HOSTED_DOMAIN=https://cloud_agnostic_storage.com

SITE_ID=1
HTTP_X_FORWARDED_PROTO=https

# AWS default settings
DEFAULT_AWS_S3_ACCESS_KEY_ID = "access_key_id"
DEFAULT_AWS_S3_SECRET_ACCESS_KEY = "access_key_secret"
DEFAULT_AWS_STORAGE_BUCKET_NAME = "bucket_name"

# Azure settings
DEFAULT_AZURE_ACCOUNT_NAME = "account_name"
DEFAULT_AZURE_ACCOUNT_KEY = "access_key"
DEFAULT_AZURE_CONTAINER = "container_name"

# Fallback setting
DEFAULT_TO_ENV_CONFIGS=False
```

## Demo

The project frontend has been deployed on [https://exl-hack.surge.sh/](https://exl-hack.surge.sh/)


## Documentation

- [Redoc](https://clafs.herokuapp.com/_platform/docs/v1/redoc/#operation/Connection%20Update )
- [Swagger](https://clafs.herokuapp.com/_platform/docs/v1/swagger/)


## Authors

- [@amartya-dev](https://github.com/amartya-dev)
- [@theProgrammerDavid](https://github.com/theProgrammerDavid)


## Screenshots

![Signup](./assets/signup.png)

<hr>

![Login](./assets/login.png)

<hr>

![Upload1](./assets/upload1.jpeg)

<hr>

![UploadOptions](./assets/upload_options.png)

<hr>

![fileList](./assets/fileList.png)

<hr>

![fileList](./assets/redoc.png)

<hr>

![fileList](./assets/swagger.png)