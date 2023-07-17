from . import models
from . import serializers
from rest_framework import viewsets
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class EmpresaAmbulanciasViewSet(viewsets.ModelViewSet):
    queryset = models.EmpresaAmbulancias.objects.all()
    serializer_class = serializers.EmpresaAmbulanciasSerializer


class AmbulanciaViewSet(viewsets.ModelViewSet):
    queryset = models.Ambulancia.objects.all()
    serializer_class = serializers.AmbulanciaSerializer


class HospitalViewSet(viewsets.ModelViewSet):
    queryset = models.Hospital.objects.all()
    serializer_class = serializers.HospitalSerializer


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = models.Paciente.objects.all()
    serializer_class = serializers.PacienteSerializer


class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = models.Agendamento.objects.all()
    serializer_class = serializers.AgendamentoSerializer
