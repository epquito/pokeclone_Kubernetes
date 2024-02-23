"""
URL configuration for pokeclone_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
import os


# Serve the index.html for the root URL
def front_end(request):
    index_file_path = os.path.join(settings.STATIC_ROOT, "index.html")
    with open(index_file_path, "rb") as file:
        return HttpResponse(file.read(), content_type="text/html")


def health(request):
    return HttpResponse("OK", status=200)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/user/", include("user_app.urls")),
    path("api/v1/pokemon/", include("pokemon_app.urls")),
    path("api/v1/team/", include("team_app.urls")),
    path("health/", health, name="health"),
    path(
        "", front_end, name="front_end"
    ),  # Serve the frontend's index.html at the root URL
]
