from django.views.generic import TemplateView


class DashView(TemplateView):
    template_name = 'dash.html'