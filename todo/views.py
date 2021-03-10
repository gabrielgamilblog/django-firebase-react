from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from rest_framework.generics import UpdateAPIView

from .models import ToDo
from .serializers import TodoDoneSerializer


class DashView(TemplateView):
    template_name = 'dash.html'


class ToDoCreateView(CreateView):
    model = ToDo
    fields = ['name']


class UpdateTodoAPIView(UpdateAPIView):
    serializer_class = TodoDoneSerializer

    def get_queryset(self):
        return ToDo.objects.filter(is_done=False)