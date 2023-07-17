from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.


class EmpresaAmbulancias(models.Model):
    nome_usuario = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    endereco = models.CharField(max_length=200)
    telefone = models.CharField(max_length=20)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.nome_usuario


class Ambulancia(models.Model):
    OPTION1 = "Ambulância tipo A"
    OPTION2 = "Ambulância tipo B"
    OPTION3 = "Ambulância tipo C"
    OPTION4 = "Ambulância tipo D"

    OPTIONS = [
        (OPTION1, "Ambulância tipo A"),
        (OPTION2, "Ambulância tipo B"),
        (OPTION3, "Ambulância tipo C"),
        (OPTION4, "Ambulância tipo D"),
    ]

    empresa = models.ForeignKey(EmpresaAmbulancias, on_delete=models.CASCADE)
    placa = models.CharField(max_length=7, validators=[
                             MinLengthValidator(7)], unique=True)
    nome_motorista = models.CharField(max_length=100)
    tipo_ambulancia = models.CharField(max_length=20, choices=OPTIONS)

    def __str__(self):
        return self.placa


class Hospital(models.Model):
    nome = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14, validators=[
                            MinLengthValidator(14)], unique=True)
    endereco = models.CharField(max_length=200)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Paciente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, validators=[
                           MinLengthValidator(11)], unique=True)
    telefone = models.CharField(max_length=11, validators=[
                                MinLengthValidator(11)], unique=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    endereco = models.CharField(max_length=200)
    descricao = models.CharField(max_length=200)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.cpf


class Agendamento(models.Model):
    empresa_ambulancia = models.ForeignKey(
        EmpresaAmbulancias, on_delete=models.CASCADE)
    ambulancia = models.ForeignKey(Ambulancia, on_delete=models.CASCADE)
    hospital_origem = models.ForeignKey(
        Hospital, related_name='hospital_origem', on_delete=models.CASCADE)
    hospital_destino = models.ForeignKey(
        Hospital, related_name='hospital_destino', on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    duracao = models.IntegerField()
