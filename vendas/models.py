from django.db import models

class Venda(models.Model):
    class Meta:
        db_table = 'vendas'
    
    quantidade_itens = models.IntegerField()
    datahora = models.DateTimeField()
    longitude = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    altura = models.CharField(max_length=200)
    valorTotal = models.DecimalField(decimal_places=3, max_digits=9)

    def __str__(self):
        return self.valorTotal
