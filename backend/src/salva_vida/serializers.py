from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

# Serializers define the API representation.


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class EmpresaAmbulanciasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.EmpresaAmbulancias
        fields = ['id', 'nome_usuario', 'email',
                  'endereco', 'telefone', 'senha']


class AmbulanciaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Ambulancia
        fields = ['id', 'empresa', 'placa',
                  'nome_motorista', 'tipo_ambulancia']


class HospitalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Hospital
        fields = ['id', 'nome', 'cnpj', 'endereco', 'senha']


class PacienteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Paciente
        fields = ['id', 'nome', 'cpf', 'telefone', 'hospital',
                  'email', 'endereco', 'descricao', 'senha']


class AgendamentoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Agendamento
        fields = ['id', 'empresa_ambulancia', 'ambulancia', 'hospital_origem',
                  'hospital_destino', 'paciente', 'data_inicio', 'data_fim', 'duracao']
