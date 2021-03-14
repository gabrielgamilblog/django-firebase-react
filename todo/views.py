from django.views.generic import TemplateView
from rest_framework.generics import UpdateAPIView, CreateAPIView

from .models import ToDo
from .serializers import TodoDoneSerializer, TodoCreateSerializer


class DashView(TemplateView):
    template_name = 'dash.html'


class CreateTodoAPIView(CreateAPIView):
    serializer_class = TodoCreateSerializer


class UpdateTodoAPIView(UpdateAPIView):
    serializer_class = TodoDoneSerializer

    def get_queryset(self):
        return ToDo.objects.filter(is_done=False)