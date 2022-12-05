from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import RedirectView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

admin.site.site_title = 'Kubota Administration'
admin.site.site_header = 'KubotaAdministration'

schema_view = get_schema_view(
   openapi.Info(
      title="Kubota API V1",
      default_version='v1',
   ),
   public=True,
   permission_classes=(AllowAny,),
   authentication_classes=(JWTAuthentication,),
)

urlpatterns = [
   re_path(r'docs/(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'docs$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

   path('', RedirectView.as_view(url='/docs'), name='go-to-docs'),
   path('admin/', admin.site.urls),
   path('syncdata/', include('syncdata.urls', namespace='syncdata')),
   path('account/', include('account.urls', namespace='account')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)