from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'empresa-ambulancias', views.EmpresaAmbulanciasViewSet)
router.register(r'ambulancia', views.AmbulanciaViewSet)
router.register(r'hospital', views.HospitalViewSet)
router.register(r'paciente', views.PacienteViewSet)
router.register(r'agendamento', views.AgendamentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
