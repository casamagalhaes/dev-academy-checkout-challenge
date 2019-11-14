from django.shortcuts import render
from rest_framework import viewsets
from vendas.models import Venda
from vendas.serializers import VendaSerializer

class VendasViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer
