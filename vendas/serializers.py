from rest_framework import serializers
from vendas.models import Venda

class VendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venda
        fields = '__all__'