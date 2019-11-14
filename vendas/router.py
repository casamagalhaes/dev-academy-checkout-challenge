from rest_framework.routers import DefaultRouter
from vendas import views

router = DefaultRouter()
router.register(r'', views.VendasViewSet)