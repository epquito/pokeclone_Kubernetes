from django.contrib import admin
from django.urls import path, include, re_path  # Import re_path here
from django.http import HttpResponse
from django.conf import settings
import os
from django.conf.urls.static import static


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
]

# Adding a catch-all route for SPA routing, excluding URLs starting with 'static/' using regex
urlpatterns += [
    re_path(r"^(?!static/|api/).*$", front_end, name="front_end_spa"),
]
