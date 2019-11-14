from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from produtos import views

router = DefaultRouter()
router.register(r'', views.ProdutosViewSet)