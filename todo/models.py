from django.db import models
from django.urls import reverse


class ToDo(models.Model):
    name = models.CharField(max_length=255)
    is_done = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('dash')