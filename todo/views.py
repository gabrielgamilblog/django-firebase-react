from django.views.generic import TemplateView
from django.views.generic.edit import CreateView

from .models import ToDo


class DashView(TemplateView):
    template_name = 'dash.html'


class ToDoCreateView(CreateView):
    model = ToDo
    fields = ['name']
