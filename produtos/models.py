from django.db import models

class Produto(models.Model):
    class Meta:
        db_table = 'produtos'
    
    descricao = models.CharField(max_length=200)
    preco = models.DecimalField(max_digits=9, decimal_places=3)

    def __str__(self):
        return self.descricao