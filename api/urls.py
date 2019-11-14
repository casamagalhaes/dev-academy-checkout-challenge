from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from produtos.router import router as produto_router
from vendas.router import router as venda_router

urlpatterns = [
    url('vendas/', include(venda_router.urls)),
    url('produtos/', include(produto_router.urls)),
    path('admin/', admin.site.urls),
]
