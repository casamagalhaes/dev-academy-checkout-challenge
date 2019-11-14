from django.shortcuts import render
from rest_framework import viewsets
from produtos.models import Produto
from produtos.serializers import ProdutoSerializer


class ProdutosViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
